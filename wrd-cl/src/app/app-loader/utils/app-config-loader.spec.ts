import { AppConfigLoader } from './app-config-loader';
import { BootstrapConfig } from '../models/bootstrap-config.model';
import { VersionConfig } from '../models/version-config.model';

describe('AppConfigLoader', () => {
  const config: BootstrapConfig = {
    app: 'app',
    scripts: [{ order: '1', async: false, defer: true, name: 'app', module: 'AppModule', url: 'app/main.js', type: 'module' }],
    styles: [{ order: '1', url: 'app/styles.css' }]
  };

  const version: VersionConfig = {
    version: '1.2.3'
  };

  describe('loadConfig', () => {
    it('should load the bootstrap.json correctly', async () => {
      // must cast to any because fetchConfig is a private method
      jest.spyOn(AppConfigLoader as any, 'fetchConfig').mockReturnValueOnce(config);

      const retriedConfig: BootstrapConfig = await AppConfigLoader.loadConfig('app');

      expect(retriedConfig.app).toEqual(config.app);
      expect(retriedConfig.scripts).toEqual(config.scripts);
      expect(retriedConfig.styles).toEqual(config.styles);
    });

    // Read this: https://jestjs.io/docs/en/tutorial-async
    it('should throw an error when the config cannot be retrieved', async () => {
      jest.spyOn(AppConfigLoader as any, 'fetchConfig').mockReturnValueOnce(undefined);
      let expectedErrorMessage = `Could not retrieve config for MF "app"! Make sure it is up and running!`;

      expect.assertions(1);
      await expect(AppConfigLoader.loadConfig('app')).rejects.toEqual(new Error(expectedErrorMessage));
    });

    it('should throw an error when the config is corrupt', async () => {
      jest.spyOn(AppConfigLoader as any, 'fetchConfig').mockReturnValueOnce({ scripts: [], styles: [] });
      let errorMessage;
      let expectedErrorMessage = `Retrieved config for MF "app" is invalid!`;

      try {
        await AppConfigLoader.loadConfig('app');
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toEqual(expectedErrorMessage);
    });
  });

  describe('fetchVersion', () => {
    function mockFetch(data: any, ok: boolean) {
      return jest.fn().mockImplementation(() =>
        Promise.resolve({
          ok,
          json: () => data
        })
      );
    }

    it('should fetch version', async () => {
      window.fetch = mockFetch(version, true);

      const result: VersionConfig = await (AppConfigLoader as any).fetchVersion('bootstrap');

      expect(result).toEqual(version);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should return null because NOK', async () => {
      window.fetch = mockFetch(config, false);

      const result: VersionConfig = await (AppConfigLoader as any).fetchVersion('bootstrap');

      expect(result).toBeNull();
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchConfig', () => {
    function mockFetch(data: any, ok: boolean) {
      return jest.fn().mockImplementation(() =>
        Promise.resolve({
          ok: ok,
          json: () => data
        })
      );
    }

    it('should fetch config', async () => {
      window.fetch = mockFetch(config, true);

      const result: BootstrapConfig = await (AppConfigLoader as any).fetchConfig('bootstrap');

      //const result = await (AppConfigLoader as any).fetchConfig('url-to-bootstrap.json');
      expect(result).toEqual(config);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should return null because NOK', async () => {
      window.fetch = mockFetch(config, false);

      const result: BootstrapConfig = await (AppConfigLoader as any).fetchConfig('bootstrap');

      //const result = await (AppConfigLoader as any).fetchConfig('url-to-bootstrap.json');
      expect(result).toBeNull();
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
