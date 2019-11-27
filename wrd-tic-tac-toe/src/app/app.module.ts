import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppCommonModule } from '@app/app.common.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from '@app/app.routes';
import { NgxsStoreModule } from '@app/store/store.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    AppCommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    NgxsStoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
