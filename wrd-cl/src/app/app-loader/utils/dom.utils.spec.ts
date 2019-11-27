import { AppendStrategy, DomUtils } from './dom.utils';

describe('DomUtils', () => {
  function removeFromDOM(elements: HTMLElement[]) {
    elements.forEach(e => e.parentNode.removeChild(e));
  }

  describe('script', () => {
    let scriptElement: HTMLScriptElement;

    beforeEach(() => {
      scriptElement = document.createElement('script');
      scriptElement.id = 'test_script';
      scriptElement.type = 'text/javascript';
      scriptElement.src = 'https://github.com/test-url';
    });

    it('should add script to DOM when script is executing', () => {
      const currentScript: HTMLScriptElement = document.createElement('script');
      currentScript.id = 'test_current_script';
      document.body.appendChild(currentScript);
      const spy: jest.SpyInstance = jest.spyOn(document, 'currentScript', 'get').mockReturnValue(currentScript);

      DomUtils.addScriptToDOM(scriptElement);

      const scripts: HTMLScriptElement[] = Array.from(document.getElementsByTagName('script'));
      expect(scripts.length).toEqual(2);
      expect(scripts[0].id).toEqual('test_current_script');
      expect(scripts[1].id).toEqual('test_script');

      removeFromDOM(scripts);
      spy.mockReset();
    });

    it('should add script to DOM', () => {
      DomUtils.addScriptToDOM(scriptElement);

      const e: HTMLScriptElement = document.getElementById('test_script') as HTMLScriptElement;
      expect(e.src).toEqual(scriptElement.src);

      e.parentNode.removeChild(e);
    });

    it('should add script to DOM when document.body is null', () => {
      const spy: jest.SpyInstance = jest.spyOn(document, 'body', 'get').mockReturnValue(undefined);

      DomUtils.addScriptToDOM(scriptElement);

      const e: HTMLScriptElement = document.getElementById('test_script') as HTMLScriptElement;
      expect(e.src).toEqual(scriptElement.src);

      e.parentNode.removeChild(e);
      spy.mockReset();
    });
  });

  describe('style', () => {
    let styleElement: HTMLLinkElement;

    beforeEach(() => {
      styleElement = document.createElement('link');
      styleElement.id = 'test_style';
      styleElement.href = 'some-mf/style.css';
      // document.querySelector('link[href="some-mf/style.css"]')
    });

    it('should add style to DOM', () => {
      DomUtils.addStyleToDOM('jest', styleElement);

      const e: HTMLLinkElement = document.getElementById('test_style') as HTMLLinkElement;
      expect(e.href).toEqual(styleElement.href);

      e.parentNode.removeChild(e);
    });

    it('should add style to DOM when document.head is null', () => {
      const spy: jest.SpyInstance = jest.spyOn(document, 'head', 'get').mockReturnValue(undefined);

      DomUtils.addStyleToDOM('jest', styleElement);

      const e: HTMLLinkElement = document.getElementById('test_style') as HTMLLinkElement;
      expect(e.href).toEqual(styleElement.href);

      e.parentNode.removeChild(e);
      spy.mockReset();
    });

    it('should enable style if disabled and should be (re)-added', () => {
      // simulate that the style has already been disabled
      styleElement.disabled = true;
      styleElement.href = 'jest/some-mf/style.css'; // 'jest' prefix necessary because addStyle needs context
      DomUtils.addStyleToDOM('jest', styleElement);

      const e: HTMLLinkElement = document.getElementById('test_style') as HTMLLinkElement;
      expect(e.disabled).toEqual(styleElement.disabled);
      expect(e.href).toEqual(styleElement.href);

      // create second style that has the same "href" as the previous one
      // addStyleToDOM must not add it, rather enable the old one
      const styleElement2: HTMLLinkElement = document.createElement('link');
      styleElement2.href = 'some-mf/style.css';
      jest.spyOn(styleElement2, 'baseURI', 'get').mockReturnValue('https://github.com/');
      DomUtils.addStyleToDOM('jest', styleElement2);

      const styles: HTMLLinkElement[] = Array.from(document.getElementsByTagName('link'));
      expect(styles.length).toEqual(1);
      expect(styles[0].disabled).toEqual(false);

      e.parentNode.removeChild(e);
    });

    it('should add two styles to DOM s2 then s1 because default insert-strategy is FIRST', () => {
      DomUtils.addStyleToDOM('jest', styleElement);
      const styleElement2: HTMLLinkElement = document.createElement('link');
      styleElement2.href = 'some-mf/style2.css';
      DomUtils.addStyleToDOM('jest', styleElement2);

      const styles: HTMLLinkElement[] = Array.from(document.getElementsByTagName('link'));
      expect(styles.length).toEqual(2);
      expect(styles[0].href).toEqual('https://github.com/some-mf/style2.css');
      expect(styles[1].href).toEqual('https://github.com/some-mf/style.css');

      removeFromDOM(styles);
    });

    it('should add two styles to DOM s1 then s2 because of insert-strategy is LAST', () => {
      DomUtils.addStyleToDOM('jest', styleElement);
      const styleElement2: HTMLLinkElement = document.createElement('link');
      styleElement2.href = 'some-mf/style2.css';
      DomUtils.addStyleToDOM('jest', styleElement2, AppendStrategy.LAST);

      const styles: HTMLLinkElement[] = Array.from(document.getElementsByTagName('link'));
      expect(styles.length).toEqual(2);
      expect(styles[0].href).toEqual('https://github.com/some-mf/style.css');
      expect(styles[1].href).toEqual('https://github.com/some-mf/style2.css');

      removeFromDOM(styles);
    });

    it('should do nothing when the style to be enabled does not exist', () => {
      expect(DomUtils.enableStyle('xxx', true)).toEqual(false);
    });
  });
});
