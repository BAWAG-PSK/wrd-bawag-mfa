import { BootstrapConfig } from './models/bootstrap-config.model';
import { VersionConfig } from './models/version-config.model';
import { AppRegistry } from './app-registry';
import { Style } from './models/style.model';
import { Script } from './models/script.model';
import { ElementFactory, ElementTypes } from './utils/element.factory';
import { DomUtils } from './utils/dom.utils';
import { AppConfigLoader } from './utils/app-config-loader';

/**
 * API:
 *  - loadApp: loads the micro fronted of the given appId
 */
export class AppLoader {
  /** script- and link-urls */
  private static cache = new Map<string, Promise<any>>();

  /**
   * Multi-staged process consists of:
   *  1. load bootstrap.json (details how to bootstrap an app)
   *  2. load stylesheet (global style - styles.scss)
   *  3. load scripts if specified
   *  4. load the app/micro frontend
   *  5. return the AppModule (loaded in previous step)
   */
  public static async loadApp(app: string): Promise<any> {
    // load bootstrap.json (protocol how to bootstrap the MF)
    const config: BootstrapConfig = await AppConfigLoader.loadConfig(app);

    // so later it can be retrieved by the MasterState
    AppRegistry.registerApp(config);

    // load css first
    await AppLoader.loadStyles(config.styles);

    // we distinguish between js files that do expose a module, e.g. AppModule (see main.js)
    // and ones that don't (ordinary scripts)
    // usually in prod-build everything gets bundled into main.js (so next line won't have an effect)
    await AppLoader.loadScripts(config.scripts.filter(s => !(s.name && s.module)));

    // loads the main.js and returns the AppModule which gets lazy loaded by Angular
    return AppLoader.loadMicroFrontend(config.scripts.filter(s => s.name && s.module));
  }

  /**
   * Load the UI version for the given MF
   * @param app The context of the MF (which gets resolved by the proxy)
   */
  public static async loadVersion(app: string): Promise<VersionConfig> {
    return AppConfigLoader.fetchVersion(app);
  }

  /**
   * Loads css stylesheets.
   */
  private static async loadStyles(styles: Style[]): Promise<any> {
    const style = styles.shift();
    if (!style) {
      return;
    }

    await AppLoader.getOrCreatePromise(style, ElementTypes.STYLE);

    return AppLoader.loadStyles(styles); // load next style
  }

  /**
   * Loads additional scripts that are non-micro-frontends.
   * The micro frontend gets loaded in the end to avoid conflicts (MF could depend on some script).
   */
  private static async loadScripts(scripts: Script[]): Promise<any> {
    const script = scripts.shift();

    if (!script) {
      return;
    }

    await AppLoader.getOrCreatePromise(script, ElementTypes.SCRIPT);

    return AppLoader.loadScripts(scripts); // load next script
  }

  /**
   * Webpack assigned the AppModule (or factory) to a variable on the window object.
   * The definition is inside the LastCallWebpackPlugin inside the webpack.config.js (ignore *** below):
   * <code>
   * new LastCallWebpackPlugin({
   *   assetProcessors: [
   *     {
   *       regExp: /main.[a-f0-9]{20}.js$/,
   *       phase: 'compilation.optimize-chunk-assets',
   *       processor: (assetName, asset) => {
   *         return Promise.resolve(asset.source().replace('var ***AppModuleNgFactory***',
   *                                                       `window.login = {};\nvar ***AppModuleNgFactory*** = window.login.AppModule`))
   *       }
   *     }
   *   ],
   *   canPrint: true
   * })
   * </code>
   *
   * So basically "window[script.name][script.module]" means "window.login.AppModule".
   */
  private static async loadMicroFrontend(scripts: Script[]): Promise<any> {
    const promiseArray = [];
    let resolvedScript;
    if (scripts && scripts.length === 1) {
      resolvedScript = await AppLoader.getOrCreatePromise(scripts[0], ElementTypes.SCRIPT);
    } else {
      // handles differential loading
      scripts.forEach(async script => {
        promiseArray.push(AppLoader.getOrCreatePromise(script, ElementTypes.SCRIPT));
      });
      // in case of type modules vs nomodule - only 1 script gets executed
      resolvedScript = (await AppLoader.resolveFirst(promiseArray)) as Script;
    }

    // wait for micro frontend (main.js) to be loaded
    if (window[resolvedScript.name][resolvedScript.module]) {
      // Load successful - AppModule got attached to window object
      return window[resolvedScript.name][resolvedScript.module];
    } else {
      throw new Error(`"${ resolvedScript.name }" was not created by "${ resolvedScript.url }"`);
    }
  }

  /**
   * Resolves the first promise and returns this one. This is needed when differential loading is enabled,
   * because two bundles get built (es5 and es2015) but only one gets resolved.
   */
  private static async resolveFirst(promises): Promise<any> {
    const firstResolvedPromise = new Promise(resolve => promises.forEach(promise => promise.then(resolve)));
    return firstResolvedPromise; // https://github.com/ng-packagr/ng-packagr/issues/696
  }

  /**
   * Appends the script or style to the DOM and returns a Promise which gets resolved once the script or style is loaded.
   */
  private static getOrCreatePromise(script: Script | Style, type: ElementTypes): Promise<any> {
    if (AppLoader.cache.has(script.url)) {
      return AppLoader.cache.get(script.url);
    } else {
      const promise: Promise<any> = new Promise((resolve, reject) => {
        switch (type) {
          case ElementTypes.SCRIPT:
            return DomUtils.addScriptToDOM(ElementFactory.createScriptElement(script as Script, resolve, reject));
          case ElementTypes.STYLE:
            // TODO: figure out how to pass '/assets/wrd-web' from external source
            return DomUtils.addStyleToDOM('/assets/wrd-web', ElementFactory.createLinkElement(script as Style, resolve, reject));
        }
      });

      AppLoader.cache.set(script.url, promise);
      return promise;
    }
  }
}
