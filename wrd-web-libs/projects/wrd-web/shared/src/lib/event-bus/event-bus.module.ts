import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EVENT_BUS_SERVICE } from './api/i-event-bus.service';
import { EventBusService } from './internal/event-bus.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class EventBusModule {
  /**
   * Makes sure that this module gets instantiated only once!
   */
  constructor(@Optional() @SkipSelf() parentModule: EventBusModule) {
    if (parentModule) {
      throw new Error('EventBusModule is already loaded. Import it in the AppModule only');
    }
  }

  /** provide those services globally for the app */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EventBusModule,
      providers: [{ provide: EVENT_BUS_SERVICE, useClass: EventBusService }]
    };
  }
}
