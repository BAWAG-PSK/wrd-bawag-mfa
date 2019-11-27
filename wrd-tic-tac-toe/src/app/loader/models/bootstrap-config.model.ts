import { Script } from '@app/loader/models/script.model';
import { Style } from '@app/loader/models/style.model';

/**
 * The bootstrap configuration created by the a task within the `gulpfile.js` of the MF.
 * It basically specifies how the CL can successfully load a MF.
 *
 * Scripts can be either ordinary *.js-bundles that do NOT contain a MF or the main.js bundle.
 */
export interface BootstrapConfig {
  /** the context of the MF, e.g. /assets/login */
  app: string;

  /** the scripts to load from the MF, usually only the bundle that contains the MF (main.js) */
  scripts: Script[];

  /** the styles to load from the MF, usually only the global style (styles.css) */
  styles: Style[];
}
