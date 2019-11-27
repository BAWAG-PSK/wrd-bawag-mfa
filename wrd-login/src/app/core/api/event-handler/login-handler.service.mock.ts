import { Injectable } from '@angular/core';

import { LoginHandlerInterface } from '@app/core/api/event-handler/login-handler.interface';
import { DestroyEvent, RegisterEvent } from '@wrd-web/shared';

/**
 * Handles all incoming events from login MF
 */
@Injectable({
  providedIn: 'root'
})
export class LoginHandlerServiceMock implements LoginHandlerInterface {
  dispatchRegisterEvent(event: RegisterEvent) {
  }

  dispatchDestroyEvent(event: DestroyEvent) {
  }
}
