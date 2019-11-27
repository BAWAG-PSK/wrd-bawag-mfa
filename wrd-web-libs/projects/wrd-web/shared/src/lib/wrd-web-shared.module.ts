import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EventBusModule } from './event-bus/event-bus.module';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class WrdWebSharedModule {
  /**
   * Makes sure that this module gets instantiated only once!
   */
  constructor(@Optional() @SkipSelf() parentModule: WrdWebSharedModule) {
    if (parentModule) {
      throw new Error('WrdWebSharedModule is already loaded. Import it in the AppModule only');
    }
  }

  /** provide those services globally for the app */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WrdWebSharedModule,
      providers: [...EventBusModule.forRoot().providers]
    };
  }
}
