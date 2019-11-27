import { InjectionToken } from '@angular/core';

/** use this injection token to inject the service */
export const LOGIN_HANDLER_SERVICE = new InjectionToken('login-handler-service');

/**
 * The interface of the event-handler.
 */
export interface LoginHandlerInterface {

  init();
}
