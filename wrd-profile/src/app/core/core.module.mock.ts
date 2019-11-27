import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { PROFILE_SERVICE_TOKEN } from '@app/core/profile/profile.interface';
import { ProfileServiceMock } from '@app/core/profile/profile.service.mock';

@NgModule({
  imports: [],
  exports: []
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
        { provide: PROFILE_SERVICE_TOKEN, useClass: ProfileServiceMock }
      ]
    };
  }
}
