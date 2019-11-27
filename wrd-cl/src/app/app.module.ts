import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from '@env/environment';
import { CoreModuleMock } from '@app/core/core.module.mock';
import { CoreModule } from '@app/core/core.module';
import { GlobalInjector } from '@app/app.utils';
import { WrdWebSharedModule } from '@wrd-web/shared';
import { APP_ROUTES } from '@app/app.routes';
import { RouterModule } from '@angular/router';
import { MaintenanceModule } from '@app/features/maintenance/maintenance.module';
import { PageNotFoundModule } from '@app/features/page-not-found/page-not-found.module';
import { NgxsStoreModule } from '@app/store/store.module';
import { DashboardModule } from '@app/features/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    HttpClientModule,
    WrdWebSharedModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES),
    MaintenanceModule,
    PageNotFoundModule,
    DashboardModule,
    NgxsStoreModule,
    environment.mock ? CoreModuleMock.forRoot() : CoreModule.forRoot()
  ],
  providers: [ { provide: APP_BASE_HREF, useValue: '/assets/wrd-cl/' } ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(private injector: Injector) {
    GlobalInjector.init(this.injector); // we hide our injector
  }
}
