import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '@app/core/service/login.dto';

export const LOGIN_HTTP_SERVICE = new InjectionToken('[Login] login-http-service');

export interface LoginInterface {
  login(loginRequest: LoginRequest): Observable<LoginResponse>;
}
