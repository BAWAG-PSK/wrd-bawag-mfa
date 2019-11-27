import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { LoginRequest, LoginResponse } from '@app/core/service/login.dto';

@Injectable()
export class LoginMockService {
  constructor() {
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    if (loginRequest.username === 'weAreDevelopers' && loginRequest.password === '123') {
      return of({ status: 'authenticated' });
    } else {
      return throwError({ status: 'unAuthorized' });
    }
  }
}
