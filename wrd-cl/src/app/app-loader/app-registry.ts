import { BootstrapConfig } from './models/bootstrap-config.model';

/**
 * API:
 *  - registerApp: register app with its bootstrap config (from CL side) / MF needs to register again (two-way)
 *  - getBootstrapConfig: returns the bootstrap config for the given shorten appId ('login' not '/assets/login')
 */
export class AppRegistry {
  /** App ID (without root context '/assets') -> bootstrap config */
  private static registry = new Map<string, BootstrapConfig>();

  /**
   * Returns the bootstrap config for the given shorten appId ('login' not '/assets/login') or undefined.
   *
   * @param appId The ID of the app
   */
  public static getBootstrapConfig(appId: string): BootstrapConfig {
    return AppRegistry.registry.get(appId);
  }

  /**
   * Puts the bootstrap config into a map, where the App ID is the key.
   * App ID = the part without the root context ('/assets'), e.g. 'login' for '/assets/login'
   *
   * @param config The bootstrap config
   */
  public static registerApp(config: BootstrapConfig): void {
    // '/assets/appName' -> 'appName'
    const key = config.app.substring(config.app.lastIndexOf('/') + 1);
    AppRegistry.registry.set(key, JSON.parse(JSON.stringify(config)));
  }
}
