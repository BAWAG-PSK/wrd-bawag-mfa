import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { REFRESH_RESOLVER_SERVICE, RefreshResolverService } from '@app/core/resolver/refresh/refresh-resolver.service';
import { LOGIN_HANDLER_SERVICE } from '@app/core/api/event-handler/login/i-login-handler.service';
import { LoginHandlerService } from '@app/core/api/event-handler/login/login-handler.service';

/** custom event handler */
const EVENT_HANDLER = [
  { provide: LOGIN_HANDLER_SERVICE, useClass: LoginHandlerService } // NEW API which uses the private event bus
];

/** mocked services */
const MOCK_SERVICES = [];

/**
 * Provides mocked core-modules which use backend services (over http).
 * Also other (singleton) core-services can be mocked and provided in here.
 */
@NgModule({
  imports: [],
  exports: []
})
export class CoreModuleMock {
  /**
   * Makes sure that this module gets instantiated only once!
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModuleMock) {
    if (parentModule) {
      throw new Error('CoreModuleMock is already loaded. Import it in the AppModule only');
    }
  }

  /** provide those services globally for the app */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModuleMock,
      providers: [
        { provide: REFRESH_RESOLVER_SERVICE, useClass: RefreshResolverService },
        // NO HTTP_INTERCEPTOR here - because we mock every http call

        ...EVENT_HANDLER
        // ...MOCK_SERVICES
      ]
    };
  }
}
