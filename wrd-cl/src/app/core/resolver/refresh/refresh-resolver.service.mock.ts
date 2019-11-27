import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { APP_LOGIN } from '@app/app.constants';
import { NavigationService } from '@app/core/navigation/navigation.service';

/**
 * Redirects to login
 */
@Injectable({
  providedIn: 'root'
})
export class RefreshResolverServiceMock implements Resolve<void> {
  /** constructor which injects the navigation service to be able to navigate to the login */
  constructor(private navigator: NavigationService) {}

  /**
   * Redirects to login
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> | Observable<never> {
    this.navigator.navigate(APP_LOGIN);
    return;
  }
}
