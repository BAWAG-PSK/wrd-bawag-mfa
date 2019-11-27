const gulp = require('gulp');
const fs = require('fs');
const jsonfile = require('jsonfile');

// IMPORTANT: must be same as var in window.var (see extra-webpack.config.js -> LastCallWebpackPlugin)
const APP = 'statistics';
const outputFolder = './dist/assets/';
const config = {
  dir: './dist',
  outputFile: outputFolder + 'bootstrap.json'
};

const bootstrapJson = {
  app: `/assets/${ APP }`,
  scripts: [],
  styles: [
    { order: 1, url: 'styles.css' } // <--- replace url
  ]
};

const es2015Tags = [ 'constructor' ];

/**
 * NOTE: Only to be used in "prod:ext:mock"-mode.
 *
 * This task contains the functionality of the "LastCallWebpackPlugin" and can only be used when uglification is turned off.
 * For a more detailed explanation see "extra-webpack.config.mock.js".
 */
gulp.task('instrument:main.js', async function (done) {
  const files = fs.readdirSync(config.dir);
  let fileMap = new Map();

  files.filter(isMainJs).forEach(mainJs => {
    const data = fs.readFileSync(`${ config.dir }/${ mainJs }`, 'utf8').toString();
    const content = data.replace('var AppModuleNgFactory', `window.statistics = {};\nvar AppModuleNgFactory = window.statistics.AppModule`);
    fileMap.set(mainJs, content);
  });

  for (let [ fileName, newFileContent ] of fileMap) {
    fs.writeFileSync(`${ config.dir }/${ fileName }`, newFileContent, 'utf8');
  }

  done();
});

/**
 * Generates the bootstrap.json with respect to differential loading.
 *
 * case ENABLED (see tsconfig.json -> target: "es5"):
 *   If differential loading is enabled then two main*.js bundles will get generated.
 *   One of them is for the elderly (e.g. IE11) ---> es5 (<script nomodule>)
 *   Whereas the other one is for the modern (e.g. Chrome 70) ---> es2015 (<script type="module">)
 *
 *   Legacy browsers do not execute scripts with type="module" (BUT DO download them).
 *   Modern browsers do not execute scripts with nomodule (AND DO NOT download them).
 *
 *
 * case DISABLED (see tsconfig.json -> target: "es2015"):
 *   Only one main*.js get generated, therefore we delete the type property ("module"/"nomodule").
 */
gulp.task('generate:bootstrap.json', function (done) {
  let files = fs.readdirSync(config.dir); // string[]

  // handlePolyfills(files.filter(isPolyfill));
  handleMainJs(files.filter(isMainJs));
  handleStyle(files.filter(isStyleCss)[0]);

  writeJsonFile(config.outputFile, bootstrapJson);

  done();
});

const isMainJs = (fileName) => fileName.startsWith('main') && fileName.endsWith('.js');
const isStyleCss = (fileName) => fileName.startsWith('style') && fileName.endsWith('.css');

const handleStyle = (file) => bootstrapJson.styles[0].url = file;

const isES2015 = (contents) => {
  let ok = false;
  for (const item of es2015Tags) {
    if (contents.includes(item)) {
      ok = true;
      break;
    }
  }
  return ok;
};

const handleMainJs = (files) => {
  let es5Script = { order: 1, async: false, type: "nomodule", defer: true, url: 'main.js', name: APP, module: 'AppModule' }; // <--- replace url
  let es2015Script = { order: 1, async: false, type: "module", defer: true, url: 'main.js', name: APP, module: 'AppModule' }; // <--- replace url

  // case DISABLED
  if (files.length === 1) {
    delete es5Script.type; // need to delete the type, otherwise modern browser won't load it
    es5Script.url = files[0];
    bootstrapJson.scripts.push(es5Script);
    return;
  }

  // case ENABLED
  const bundles = files.map(file => {
    return {
      name: file,
      size: fs.statSync(`${ config.dir }/${ file }`).size,
      isES2015: isES2015(fs.readFileSync(`${ config.dir }/${ file }`, 'utf8'))
    }
  });

  // es2015 bundle is smaller than es5 bundle and has keywords like "constructor" in it
  const isFirstBundleEs2015 = (bundles[0].size < bundles[1].size) && (bundles[0].isES2015 && !bundles[1].isES2015);
  es2015Script.url = isFirstBundleEs2015 ? bundles[0].name : bundles[1].name;
  es5Script.url = isFirstBundleEs2015 ? bundles[1].name : bundles[0].name;

  bootstrapJson.scripts.push(es2015Script, es5Script);
};

const writeJsonFile = (outputFile, content) => {
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }
  jsonfile.writeFileSync(outputFile, content);
}
