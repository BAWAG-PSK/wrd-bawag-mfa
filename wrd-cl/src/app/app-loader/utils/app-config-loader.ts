import { BootstrapConfig } from '../models/bootstrap-config.model';
import { VersionConfig } from '../models/version-config.model';
import { Style } from '../models/style.model';
import { Script } from '../models/script.model';
import { HasUrl } from '../models/has-url.marker';

/**
 * Retrieves and returns the bootstrap.json config file.
 */
export class AppConfigLoader {
  /**
   * Loads the bootstrap config for a given MF.
   * If the config cannot be retrieved or the config is malformed the promise gets rejected.
   * @param app The context of the MF (which gets resolved by the proxy)
   */
  public static async loadConfig(app: string): Promise<BootstrapConfig> {
    let config: BootstrapConfig;

    // enforce cache-busting with query param
    config = (await AppConfigLoader.fetchConfig(`${app}/assets/bootstrap.json?stamp=${Date.now()}`)) as BootstrapConfig;

    if (!config) {
      return Promise.reject(new Error(`Could not retrieve config for MF "${app}"! Make sure it is up and running!`));
    }

    // check integrity of config
    if (!config.app) {
      return Promise.reject(new Error(`Retrieved config for MF "${app}" is invalid!`));
    }

    // bootstrap.json contains relative paths - we need to make them absolute to make them work
    config.styles = AppConfigLoader.makeUrlsAbsolute<Style>(config.styles, app);
    config.scripts = AppConfigLoader.makeUrlsAbsolute<Script>(config.scripts, app);

    return config;
  }

  /**
   * Fetches config containing version info about given MF.
   * @param url The url under which the uiversion.json can be retrieved
   */
  public static async fetchVersion(app: string): Promise<VersionConfig> {
    const version: VersionConfig = (await AppConfigLoader.fetchConfig(`${app}/assets/uiversion.json`)) as VersionConfig;

    return version;
  }

  /**
   * Performs the http-call
   * @param url The url under which the bootstrap.json can be retrieved
   */
  private static fetchConfig(url: string): Promise<BootstrapConfig | VersionConfig> {
    // fetch-error-handling according to: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
    const responseHandler = response => (response.ok ? response.json() : null);
    return fetch(url).then(response => responseHandler(response));
  }

  /**
   * The bootstrap config contains "relative" values (e.g. name of the js/scss file).
   * This methods makes it absolute by appending the context of the MF.
   *
   * @param scripts Style or Link
   * @param prefix The context/prefix
   */
  private static makeUrlsAbsolute<T extends HasUrl>(scripts: Array<T>, prefix: string): T[] {
    const mapping = (s: T) => {
      s.url = `${prefix}/${s.url}`;
      return s;
    };
    return scripts.map((s: T) => mapping(s)) as T[];
  }
}
