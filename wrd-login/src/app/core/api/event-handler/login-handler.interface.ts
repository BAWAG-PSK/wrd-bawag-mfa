import { InjectionToken } from '@angular/core';
import { DestroyEvent, RegisterEvent } from '@wrd-web/shared';

export const LOGIN_HANDLER_SERVICE = new InjectionToken('[Login] login-handler-service');

export interface LoginHandlerInterface {
  dispatchRegisterEvent(event: RegisterEvent): void;

  dispatchDestroyEvent(event: DestroyEvent): void;
}
