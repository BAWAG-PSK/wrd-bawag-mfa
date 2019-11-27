import { Inject, Injectable } from '@angular/core';
import { DestroyEvent, Endpoint, EVENT_BUS_SERVICE, EventBusInterface, RegisterEvent, RegisterEventPayload } from '@wrd-web/shared';

/**
 * Handles all outgoing events from login MF by using the private event-bus.
 */
@Injectable({
  providedIn: 'root'
})
export class LoginHandlerService {
  readonly APP_LOGIN = 'login';

  constructor(@Inject(EVENT_BUS_SERVICE) private bus: EventBusInterface) {
  }

  dispatchRegisterEvent(event: RegisterEvent | any) {
    this.bus.publish<RegisterEvent>(Endpoint.MF_LOGIN, new RegisterEvent({ mfId: this.APP_LOGIN } as RegisterEventPayload));
  }

  dispatchDestroyEvent(event: DestroyEvent | any) {
    // | any = adapter, because we still get the events from API v1
    this.bus.publish<DestroyEvent>(Endpoint.MF_LOGIN, new DestroyEvent());
  }
}
