import { Component, Inject } from '@angular/core';
import { LOGIN_HANDLER_SERVICE, LoginHandlerInterface } from '@app/core/api/event-handler/login/i-login-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wrd-cl';

  /** constructor which injects all the event handler  */
  constructor(
    @Inject(LOGIN_HANDLER_SERVICE) private loginHandler: LoginHandlerInterface
  ) {
  }
}
