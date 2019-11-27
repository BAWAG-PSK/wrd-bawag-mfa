import { ElementFactory } from './element.factory';
import { fakeAsync, tick } from '@angular/core/testing';
import { Script } from '@app/app-loader/models/script.model';
import { Style } from '@app/app-loader/models/style.model';

describe('ElementFactory', () => {
  describe('createScriptElement', () => {
    describe('html element creation', () => {
      it('translates the style correctly into HTMLLinkElement', () => {
        const script: Script = { order: '1', async: false, defer: true, url: 'https://github.com/test-url', type: null };

        const scriptElement: HTMLScriptElement = ElementFactory.createScriptElement(script, null, null);
        expect(scriptElement.type).toEqual('text/javascript');
        expect(scriptElement.noModule).toBeUndefined();
        expect(scriptElement.src).toEqual(script.url);
        expect(scriptElement.async).toEqual(script.async);
        expect(scriptElement.defer).toEqual(script.defer);
      });

      it('translates the style correctly into HTMLLinkElement (type="module")', () => {
        const script: Script = { order: '1', async: true, defer: false, url: 'https://github.com/test-url', type: 'module' };

        const scriptElement: HTMLScriptElement = ElementFactory.createScriptElement(script, null, null);
        expect(scriptElement.type).toEqual('module');
        expect(scriptElement.noModule).toBeUndefined();
        expect(scriptElement.src).toEqual(script.url);
        expect(scriptElement.async).toEqual(script.async);
        expect(scriptElement.defer).toEqual(script.defer);
      });

      it('translates the style correctly into HTMLLinkElement (type="nomodule")', () => {
        const script: Script = { order: '1', async: undefined, defer: undefined, url: 'https://github.com/test-url', type: 'nomodule' };

        const scriptElement: HTMLScriptElement = ElementFactory.createScriptElement(script, null, null);
        expect(scriptElement.type).toEqual('text/javascript');
        expect(scriptElement.noModule).toEqual(true);
        expect(scriptElement.src).toEqual(script.url);
        expect(scriptElement.async).toEqual(false);
        expect(scriptElement.defer).toEqual(true);
      });
    });

    describe('dynamic execution', () => {
      const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC';
      const LOAD_SUCCESS_SRC = 'LOAD_SUCCESS_SRC';

      beforeEach(() => {
        Object.defineProperty(HTMLScriptElement.prototype, 'src', {
          // Define the property setter
          set(src) {
            if (src === LOAD_FAILURE_SRC) {
              // Call with setTimeout to simulate async loading
              setTimeout(() => this.onerror(this));
            } else if (src === LOAD_SUCCESS_SRC) {
              setTimeout(() => this.onload(this));
            }
          }
        });
      });

      it('successes to load the script', fakeAsync(() => {
        const script: Script = { order: '1', async: false, defer: true, url: LOAD_SUCCESS_SRC, type: 'module' };

        new Promise((resolve, reject) => ElementFactory.createScriptElement(script, resolve, reject))
          .catch(e => fail('must invoke onload and not onerror'))
          .then(s => expect(s).toBe(script));

        tick(100);
      }));

      it('fails to load the script due to wrong src', fakeAsync(() => {
        const script: Script = { order: '1', async: false, defer: true, url: LOAD_FAILURE_SRC, type: 'module' };

        new Promise((resolve, reject) => ElementFactory.createScriptElement(script, resolve, reject)).catch(e => {
          expect(e).toBeInstanceOf(Error);
          expect(e.message).toBe(`Failed to load 'LOAD_FAILURE_SRC'`);
        });

        tick(100);
      }));
    });
  });

  describe('createLinkElement', () => {
    describe('html element creation', () => {
      it('translates the style correctly into HTMLLinkElement', () => {
        const style: Style = { order: '1', url: 'https://github.com/test-url' };

        const linkElement: HTMLLinkElement = ElementFactory.createLinkElement(style, null, null);
        expect(linkElement.rel).toEqual('stylesheet');
        expect(linkElement.href).toEqual(style.url);
      });
    });

    describe('dynamic execution', () => {
      const LOAD_FAILURE_HREF = 'LOAD_FAILURE_HREF';
      const LOAD_SUCCESS_HREF = 'LOAD_SUCCESS_HREF';

      beforeEach(() => {
        Object.defineProperty(HTMLLinkElement.prototype, 'href', {
          // Define the property setter
          set(href) {
            if (href === LOAD_FAILURE_HREF) {
              // Call with setTimeout to simulate async loading
              setTimeout(() => this.onerror(this));
            } else if (href === LOAD_SUCCESS_HREF) {
              setTimeout(() => this.onload(this));
            }
          }
        });
      });

      it('successes to load the style', fakeAsync(() => {
        const style: Style = { order: '1', url: LOAD_SUCCESS_HREF };

        new Promise((resolve, reject) => ElementFactory.createLinkElement(style, resolve, reject))
          .catch(e => fail('must invoke onload and not onerror'))
          .then(s => expect(s).toBe(style));

        tick(100);
      }));

      it('fails to load the style due to wrong href', fakeAsync(() => {
        const style: Style = { order: '1', url: LOAD_FAILURE_HREF };

        new Promise((resolve, reject) => ElementFactory.createLinkElement(style, resolve, reject)).catch(e => {
          expect(e).toBeInstanceOf(Error);
          expect(e.message).toBe(`Failed to load 'LOAD_FAILURE_HREF'`);
        });

        tick(100);
      }));
    });
  });
});
