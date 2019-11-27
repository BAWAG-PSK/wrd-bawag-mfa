import { HasUrl } from './has-url.marker';

/**
 * Definition of a stylesheet (future <link>-element)
 */
export interface Style extends HasUrl {
  /** loading order (NOT IMPLEMENTED) */
  order: string;

  /** the name of the stylesheet, e.g. styles.808743534.css */
  url: string;
}
