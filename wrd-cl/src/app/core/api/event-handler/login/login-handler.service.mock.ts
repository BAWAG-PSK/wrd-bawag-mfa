import { Injectable } from '@angular/core';
import { LoginHandlerInterface } from '@app/core/api/event-handler/login/i-login-handler.service';

/**
 * Handles all incoming events from login MF
 */
@Injectable({
  providedIn: 'root'
})
export class LoginHandlerServiceMock implements LoginHandlerInterface {
  /** whether the user is authenticated or not */
  authenticated = false;

  /** noop */
  init(): void {}

  /** noop */
  changeRoute(route) {}

  /** sets the authenticated flag */
  set loggedIn(loggedIn: boolean) {
    this.authenticated = loggedIn;
  }

  /** returns the authenticated flag */
  get loggedIn(): boolean {
    return this.authenticated;
  }
}
