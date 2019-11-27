import { Script } from '@app/loader/models/script.model';
import { Style } from '@app/loader/models/style.model';

/**
 * The element types that this factory creates.
 */
export enum ElementTypes {
  /** creates a <script>-tag */
  SCRIPT,
  /** create a <link>-tag */
  STYLE
}

/**
 * Factory class that is responsible to create <script>- and <link>-elements wrt to the parameters passed to it.
 */
export class ElementFactory {
  /**
   * Creates and returns a <script>-element according to the specification passed.
   *
   * There are several ways an external script can be executed:
   *   - If async is present: The script is executed asynchronously with the rest of the page
   *     (the script will be executed while the page continues the parsing)
   *   - If async is not present and defer is present: The script is executed when the page has finished parsing
   *     defer scripts are also guaranteed to execute in the order that they appear in the document
   *   - If neither async or defer is present: The script is fetched and executed immediately,
   *     before the browser continues parsing the page
   *
   * @see https://www.w3schools.com/tags/att_script_defer.asp
   * @see https://stackoverflow.com/questions/10808109/script-tag-async-defer
   *
   * @param script The script-specification for the script to create
   * @param resolve What happens in the success case
   * @param reject What happens in the error case
   */
  public static createScriptElement(script: Script, resolve, reject): HTMLScriptElement {
    const scriptElement: HTMLScriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.src = script.url;
    scriptElement.async = script.async || false; // false = does not pause HTML parsing after script has been downloaded
    scriptElement.defer = script.defer || true; // true = script will not run until after the page has loaded
    if (script.type) {
      if (script.type === 'module') {
        scriptElement.type = 'module';
      } else {
        scriptElement.noModule = true;
      }
    }
    scriptElement.onerror = () => reject(new Error(`Failed to load '${script.url}'`));
    scriptElement.onload = () => resolve(script);

    return scriptElement;
  }

  /**
   * Creates and returns a <link>-element according to the specification passed.
   *
   * @param style The style-specification for the style to create
   * @param resolve What happens in the success case
   * @param reject What happens in the error case
   */
  public static createLinkElement(style: Style, resolve, reject): HTMLLinkElement {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = style.url;
    linkElement.onerror = () => reject(new Error(`Failed to load '${style.url}'`));
    linkElement.onload = resolve;

    return linkElement;
  }
}
