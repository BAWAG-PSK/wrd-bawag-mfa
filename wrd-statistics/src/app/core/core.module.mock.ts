import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { STATISTICS_SERVICE_TOKEN } from '@app/core/statistics/statistics.interface';
import { StatisticsServiceMock } from '@app/core/statistics/statistics.service.mock';

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
        { provide: STATISTICS_SERVICE_TOKEN, useClass: StatisticsServiceMock }
      ]
    };
  }
}
