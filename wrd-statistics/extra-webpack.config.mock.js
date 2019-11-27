/**
 * WARNING: THIS CONFIGURATION FILE MUST >>  NOT << BE USED IN PRODUCTION
 *
 * The whole purpose of this file is to enable source maps for debugging in development in mock mode only when used with the CL.
 * In contrast to the "real" configuration, this one DOES NOT contain the "LastCallWebpackPlugin", because it modifies the bundle
 * and destroys the source map. However, the functionality of "LastCallWebpackPlugin" has been outsourced to the gulpfile.js.
 * In there you have the task "instrument:main.js", which basically performs the same operation as LastCallWebpackPlugin.
 *
 * Additionally, for this to work, uglification must be turned off (see "optimization": false in angular.json in "build-ext-mock").
 * Because otherwise the string-replacement (gulp-task) will fail. In production, however, we do not have the source maps available,
 * but the bundles are uglyfied.
 */

const path = require('path');
const {Externals} = require('share-loader');

module.exports = {
  output: {
    filename: '[name].[chunkhash:20].js',
    path: path.resolve('./dist'),
    chunkFilename: '[name].js',
    library: 'login-lib',
    libraryTarget: 'umd'
  },
  externals: [
    Externals({
      namespace: 'wrd-web-app',
      modules: [/@angular/,/@clr\/ui/,/@clr\/angular/,/rxjs/,/@wrd-web\/shared/],
      exclude: [/router.ngfactory/,/clr-angular.ngfactory/]
    })
  ],
  optimization: {
    runtimeChunk: false,
  }
};
