import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Endpoint, EVENT_BUS_SERVICE, EventBusInterface, NextEvent } from '@wrd-web/shared';
import { LOGIN_HTTP_SERVICE, LoginInterface } from '@app/core/service/login.interface';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: [ './login-modal.component.scss' ]
})
export class LoginModalComponent implements OnInit {
  public loginForm: FormGroup;
  public passwordShow = false;

  constructor(@Inject(LOGIN_HTTP_SERVICE) private loginService: LoginInterface,
              @Inject(EVENT_BUS_SERVICE) private bus: EventBusInterface) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.status === 'VALID') {
      this.loginService.login(this.loginForm.value).subscribe(res => {
        console.log(res.status);
        return this.bus.publish(Endpoint.MF_LOGIN, new NextEvent());
      });
    }
  }
}
