import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRoutes } from './app.routes';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from './app.common.module';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { WrdWebSharedModule } from '@wrd-web/shared';

@NgModule({
  imports: [
    AppCommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ClarityModule,
    WrdWebSharedModule.forRoot()
  ],
  declarations: [],
  bootstrap: [ AppComponent ],
  providers: [ { provide: APP_BASE_HREF, useValue: '/assets/profile/' } ],
  exports: []
})
export class AppModule {
}
