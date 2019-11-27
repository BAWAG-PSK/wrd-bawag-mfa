import { Injectable, InjectionToken } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { APP_LOGIN } from '@app/app.constants';
import { NavigationService } from '@app/core/navigation/navigation.service';

/** use this token to inject the refresh resolver */
export const REFRESH_RESOLVER_SERVICE = new InjectionToken('refresh-resolver-service');

/**
 * Handles page refresh.
 * If the user pressed the F5 button or hits the refresh icon in the browser then a page-refresh is triggered.
 * Of course, the proxy cannot resolve this issue as it cannot request the browser to load a specific MF without the CL.
 * Therefore the following solution is in place:
 * 1. When a page refresh gets triggered, e.g. on the products (`/assets/lucy-web/products`)
 * 2. The proxy is unable to resolve the route and redirects to response (`/?redirectTo=${realTarget}`)
 * 2a. `/` corresponds to the CL (`/assets/lucy-web`)
 * 2b. `redirectTo=${realTarget}` is a query parameter which gets processed by the route resolver of the '/'-route
 * 2c. realTarget is the MF which the CL needs to load/redirect to once it is up
 * 3. The refresh route resolver then routes to the correct MF (if found), else redirect to the login MF
 */
@Injectable({
  providedIn: 'root'
})
export class RefreshResolverService implements Resolve<void> {

  /** constructor which injects the navigator to perform a proper redirect */
  constructor(private navigator: NavigationService) {
  }

  /**
   * The resolve function resolves nothing, BUT redirects to the correct MF.
   *
   * @param route The {@link ActivatedRouteSnapshot}
   * @param state The {@link RouterStateSnapshot}
   * @return The resolved accounts
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> | Observable<never> {
    const target = route.queryParamMap.get('redirectTo');

    if (target) {
      this.navigator.navigate(this.normalize(target))
    } else {
      this.navigator.navigate(APP_LOGIN);
    }

    return;
  }

  /** pre-processes the redirectTo value and removes the leading  '/' if present */
  private normalize(redirectTo: string): string {
    return redirectTo.charAt(0) === '/' ? redirectTo.substring(1) : redirectTo;
  }

}
