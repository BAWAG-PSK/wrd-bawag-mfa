import { Inject, Injectable, OnDestroy } from '@angular/core';
import { LoginHandlerInterface } from '@app/core/api/event-handler/login/i-login-handler.service';
import { APP_LOGIN } from '@app/app.constants';
import { Emittable, Emitter } from '@ngxs-labs/emitter';
import { DestroyEvent, Endpoint, Event, EVENT_BUS_SERVICE, EventBusInterface, NextEvent, RegisterEvent } from '@wrd-web/shared';
import { Subscription } from 'rxjs';
import { NavigationService } from '@app/core/navigation/navigation.service';
import { MasterState } from '@app/store/master.state';

@Injectable({
  providedIn: 'root'
})
export class LoginHandlerService implements LoginHandlerInterface, OnDestroy {
  /**
   * Handles all incoming events from login MF by using the private event-bus.
   * Because this event-bus is not accessible from the outside (console), we do not need extra security measures,
   * like the secure-event API.
   *
   * All the models are within "@wrd-web/shared".
   */
  /** emits into the state that the login MF got registered */
  @Emitter(MasterState.setRegistered) public registerApp: Emittable<string>;
  /** emits into the state that the login MF got registered */
  @Emitter(MasterState.setDestroyed) public destroyApp: Emittable<string>;
  private subscriptions: Subscription[] = [];

  /** injects the router and secure event service to secure/verify events */
  constructor(@Inject(EVENT_BUS_SERVICE) private bus: EventBusInterface, private navigator: NavigationService) {
    this.init();
  }

  /** contains all the event-handling - basically a big switch/case which handles every event separately */
  init(): void {
    this.subscriptions.push(
      this.bus.of(Endpoint.MF_LOGIN).subscribe((event: Event) => {
        switch (event.name) {
          case RegisterEvent.NAME:
            const e = event as RegisterEvent;
            this.registerApp.emit(e.payload.mfId);
            break;

          case DestroyEvent.NAME:
            this.destroyApp.emit(APP_LOGIN);
            break;

          case NextEvent.NAME:
            this.changeRoute('dashboard');
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /** changes the route to the route at hand */
  changeRoute(route) {
    this.navigator.navigate(route);
  }
}
