import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { LoginHandlerService } from '@app/core/api/event-handler/login-handler.service';
import { LOGIN_HANDLER_SERVICE } from '@app/core/api/event-handler/login-handler.interface';
import { LoginModalModule } from '@app/features/login-modal/login-modal.module';
import { LoginService } from '@app/core/service/login.service';
import { LOGIN_HTTP_SERVICE } from '@app/core/service/login.interface';

@NgModule({
  imports: [ LoginModalModule ],
  exports: [ LoginModalModule ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: LOGIN_HANDLER_SERVICE, useClass: LoginHandlerService },
        { provide: LOGIN_HTTP_SERVICE, useClass: LoginService }
      ]
    };
  }
}
