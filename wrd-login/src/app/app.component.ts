import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { LOGIN_HANDLER_SERVICE, LoginHandlerInterface } from '@app/core/api/event-handler/login-handler.interface';
import { DestroyEvent, RegisterEvent, RegisterEventPayload } from '@wrd-web/shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(@Inject(LOGIN_HANDLER_SERVICE) public loginHandler: LoginHandlerInterface) {
  }

  ngOnInit(): void {
    this.loginHandler.dispatchRegisterEvent(new RegisterEvent(new RegisterEventPayload('LOGIN')));
  }

  ngOnDestroy(): void {
    this.loginHandler.dispatchDestroyEvent(new DestroyEvent());
  }
}
