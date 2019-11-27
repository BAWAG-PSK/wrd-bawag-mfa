import { HasUrl } from '@app/loader/models/has-url.marker';

/**
 * Definition of a js-bundle (either MF or not).
 * MF (main.js) must have the properties `name` and `module` set.
 */
export interface Script extends HasUrl {
  /** loading order (NOT IMPLEMENTED) */
  order: string;

  /** if the script should be loaded asynchronously (`false` by default) */
  async: boolean;

  /**
   * whether to execute the script when the page finished parsing (`true` by default)
   * @see https://www.w3schools.com/tags/att_script_defer.asp
   * @see https://stackoverflow.com/questions/10808109/script-tag-async-defer
   */
  defer: boolean;

  /** the name of the script, e.g. main.9345983457.js */
  url: string;

  /** the name of the variable it is provided in (window.<name>) */
  name?: string;

  /** the name of the module to load (always AppModule) */
  module?: string;

  /** es5 (nomodule) or es2015 (module) - important for differential loading */
  type: string;
}
