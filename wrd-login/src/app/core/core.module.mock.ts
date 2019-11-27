import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { LoginHandlerService } from '@app/core/api/event-handler/login-handler.service';
import { LOGIN_HANDLER_SERVICE } from '@app/core/api/event-handler/login-handler.interface';
import { LoginModalModule } from '@app/features/login-modal/login-modal.module';
import { LoginMockService } from '@app/core/service/login-mock.service';
import { LOGIN_HTTP_SERVICE } from '@app/core/service/login.interface';

@NgModule({
  imports: [ LoginModalModule ],
  exports: [ LoginModalModule ]
})
export class CoreModuleMock {
  constructor(@Optional() @SkipSelf() parentModule: CoreModuleMock) {
    if (parentModule) {
      throw new Error('CoreModuleMock is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModuleMock,
      providers: [
        { provide: LOGIN_HANDLER_SERVICE, useClass: LoginHandlerService },
        { provide: LOGIN_HTTP_SERVICE, useClass: LoginMockService }
      ],
    };
  }
}
