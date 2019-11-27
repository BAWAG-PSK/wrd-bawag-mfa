/** Where to append the style/link-element */
export enum AppendStrategy {
  /**
   * Append before any other style.
   * This is the choice for MFs, so that the CL can overwrite them.
   */
  FIRST,
  /**
   * Append after any other style.
   * The is the choice if you load themes, so that the themes overwrite any other style.
   */
  LAST
}

/**
 * Utils class that adds <script>/<link> elements to the index.html.
 * Styles or <link>-elements go into the <head> whereas <script>-elements go into the bottom of the body.
 */
export class DomUtils {
  /**
   * Returns true if the document has the <link>-element specified by the selector, else fasle
   * @param selector The css-selector
   */
  public static hasStyle(selector: string): boolean {
    return document.querySelector(selector) !== null;
  }

  /** creates a proper css-selector for a given url */
  public static toStyleSelector(url: string) {
    return `link[href="${ url }"]`;
  }

  /**
   * To reduce loading time, we append script-tags (belonging to MFs) at the bottom of the body.
   * The initial page-load loads the following scripts:
   *
   * <pre>
   * idx |                    script
   * -----------------------------------------------------------
   *  0  |  "/wrd-web/runtime.87cb09b72b914a81d411.js"
   *  1  |  "/wrd-web/polyfills-es5.1d51f9e4544dadd2b43c.js"
   *  2  |  "/wrd-web/polyfills.c27d1a77327bce8b97bd.js"
   *  3  |  "/wrd-web/styles.734d103c9b1176938d1c.js"
   *  4  |  "/wrd-web/scripts.d4fd701397a53b76f529.js"
   *  5  |  "/wrd-web/main.cc02a8f58247fb56f87a.js"
   *  6  |  "/login/main.7fe024bcb7e4ee212378.js"
   * </pre>
   *
   * @param scriptElement The script to append to the body
   */
  public static addScriptToDOM(scriptElement: HTMLScriptElement): void {
    if (document.currentScript) {
      // the currently executing script
      document.currentScript.parentNode.appendChild(scriptElement);
    } else {
      (document.body || document.getElementsByTagName('body')[0]).appendChild(scriptElement);
    }
  }

  /**
   * Adds the stylesheet to the DOM if it is not existing yet, otherwise enables it.
   *
   * @param linkElement The element to insert or enable
   * @param strategy Where to insert the element
   * @param appContext: e.g. "/assets/wrd-web"
   */
  public static addStyleToDOM(appContext: string, linkElement: HTMLLinkElement, strategy: AppendStrategy = AppendStrategy.FIRST): void {
    const linkElements: HTMLLinkElement[] = Array.from(document.getElementsByTagName('link'));
    if (linkElements.length > 0) {
      let selector;
      if (!DomUtils.msieversion()) {
        selector = DomUtils.toStyleSelector(`${ appContext }/${ linkElement.href.substring(linkElement.baseURI.length) }`);
      } else {
        selector = DomUtils.toStyleSelector(`${ appContext }/${ linkElement.href.substring(linkElement.href.length) }`);
      }
      if (DomUtils.hasStyle(selector)) {
        DomUtils.enableStyle(selector);
      } else {
        DomUtils.insertStyle(linkElement, strategy, linkElements);
      }
    } else {
      (document.head || document.getElementsByTagName('head')[0]).appendChild(linkElement);
    }
  }

  /**
   * Enables or disables a stylesheet with respect to the parameter enable
   *
   * @param selector The css-selector which selects the <link>-element to enable/disable
   * @param enable Whether to enable (`true`) or to disable (`false`) it
   * @return false if the element could not be found, else true
   */
  public static enableStyle(selector: string, enable = true): boolean {
    const existingLinkElement: HTMLLinkElement = document.querySelector(selector);
    if (existingLinkElement) {
      existingLinkElement.disabled = !enable;
      return true;
    }
    return false;
  }

  /**
   * Inserts the given stylesheet (<link>-element) into the DOM.
   *
   * @param linkElement The element to insert
   * @param strategy Where to put it relative to the other <link>-elements
   * @param linkElements All the existing <link>-elements
   */
  private static insertStyle(linkElement: HTMLLinkElement, strategy: AppendStrategy, linkElements: HTMLLinkElement[]): void {
    switch (strategy) {
      case AppendStrategy.FIRST:
        const firstLinkElement = linkElements[0];
        firstLinkElement.parentNode.insertBefore(linkElement, firstLinkElement);
        break;
      case AppendStrategy.LAST:
        const lastLinkElement = linkElements[linkElements.length - 1];
        lastLinkElement.parentNode.appendChild(linkElement);
        break;
    }
  }

  private static msieversion(): boolean {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);
    console.log('is internet explorer?!', isIE);
    return isIE;
  }
}
