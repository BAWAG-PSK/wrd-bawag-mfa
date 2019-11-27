import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '@app/app.component';
import { RouterModule } from '@angular/router';
import { HomescreenModule } from '@app/features/homescreen/homescreen.module';
import { CoreModule } from '@app/core/core.module';

/**
 * Imports modules that are needed by both AppModules (feature=MF + root=standalone).
 * DO NOT import HttpClientModule here, as it will get imported by the feature module and create
 * an own instance of HttpClient, which therefore will NOT BE HANDLED by any HTTP-Interceptor of the CL.
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule, // <router-outlet> in AppComponent
    CoreModule.forRoot(),
    HomescreenModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [],
  providers: [],
  exports: [ AppComponent ]
})
export class AppCommonModule {
}
