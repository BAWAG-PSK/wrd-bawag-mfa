/**
 * The generic environment object.
 *
 * - production: Disables Angular's development mode, which turns off assertions and other checks within the framework.
 * - stamp: contains the version, which will get appended to certain files (cms) to have cache busting
 * - hmr: no HRM in production
 * - mock: no mock mode in production
 *
 * @see https://angular.io/api/core/enableProdMode
 * @see https://webpack.js.org/concepts/hot-module-replacement/
 */
export const environment = {
  production: true,
  stamp: '',
  hmr: false,
  mock: false,
  apiUrl: 'http://localhost:50000'
};
