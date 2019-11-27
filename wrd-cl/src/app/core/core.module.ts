import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { LoginHandlerService } from '@app/core/api/event-handler/login/login-handler.service';
import { LOGIN_HANDLER_SERVICE } from '@app/core/api/event-handler/login/i-login-handler.service';
import { REFRESH_RESOLVER_SERVICE, RefreshResolverService } from '@app/core/resolver/refresh/refresh-resolver.service';

/** http interceptors */
const HTTP_INTERCEPTOR = [
  // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
];

/** custom event handler */
const EVENT_HANDLER = [
  { provide: LOGIN_HANDLER_SERVICE, useClass: LoginHandlerService } // NEW API which uses the private event bus
];

/** guards */
const GUARDS = [
  // { provide: AUTH_GUARD_SERVICE, useClass: AuthGuardService }
];

/** resolver */
const RESOLVER = [ { provide: REFRESH_RESOLVER_SERVICE, useClass: RefreshResolverService } ];

/**
 * The core module which provides all services inside the core-folder.
 * Those services are strict singletons! Non-singleton services should be co-located with the component and provided by the component.
 */
@NgModule({
  imports: [],
  exports: []
})
export class CoreModule {
  /**
   * Makes sure that this module gets instantiated only once!
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  /** provide those services globally for the app */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [

        ...HTTP_INTERCEPTOR,
        ...EVENT_HANDLER,
        ...GUARDS,
        ...RESOLVER

        // LogoutService
      ]
    };
  }
}
