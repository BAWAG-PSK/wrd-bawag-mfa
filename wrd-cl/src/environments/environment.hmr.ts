// This file can be replaced during build by using the `fileReplacements` array (see `angular.json`).

/**
 * The generic environment object.
 *
 * - production: false
 * - stamp: contains the version, which will get appended to certain files (cms) to have cache busting
 * - hmr: Hot-Module-Replacement (HMR) webpack dev-feature can only be used for standalone development (`npm run serve or serve:mock`)
 * - mock: Replaces the @link{CoreModule with CoreModuleMock} and possibly some other services which are provided in components directly
 *         The idea is to replace the backend (or backend calls) with static responses (*.fixture-files)
 *
 * @see https://angular.io/api/core/enableProdMode
 * @see https://webpack.js.org/concepts/hot-module-replacement/
 */
export const environment = {
  production: false,
  stamp: '0.0.1',
  hmr: true,
  mock: false,
  apiUrl: 'http://localhost:50000'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
