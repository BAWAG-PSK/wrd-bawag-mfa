import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { LoginRequest, LoginResponse } from '@app/core/service/login.dto';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`/login`, loginRequest).pipe(take(1));
  }
}
