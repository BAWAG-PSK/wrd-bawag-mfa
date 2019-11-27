import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { PROFILE_SERVICE_TOKEN } from '@app/core/profile/profile.interface';
import { ProfileService } from '@app/core/profile/profile.service';

@NgModule({
  imports: [],
  exports: []
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
        { provide: PROFILE_SERVICE_TOKEN, useClass: ProfileService }
      ]
    };
  }
}
