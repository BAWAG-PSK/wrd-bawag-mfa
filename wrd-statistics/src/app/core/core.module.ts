import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { STATISTICS_SERVICE_TOKEN } from '@app/core/statistics/statistics.interface';
import { StatisticsService } from '@app/core/statistics/statistics.service';

@NgModule({
  imports: [ ],
  exports: [ ]
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
        { provide: STATISTICS_SERVICE_TOKEN, useClass: StatisticsService }
      ]
    };
  }
}
