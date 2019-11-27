import { NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appStatesExternal } from './app.routes';
import { AppCommonModule } from '@app/app.common.module';
import { NgxsStoreModule } from '@app/store/store.external.module';
import { AppComponent } from '@app/app.component';

@NgModule({
  imports: [
    AppCommonModule,
    RouterModule.forChild(appStatesExternal),
    NgxsStoreModule
  ],
  declarations: [],
  bootstrap: [],
  providers: [],
  exports: [AppCommonModule],
  entryComponents: [AppComponent]
})
export class AppModule {
  static component: Type<AppComponent> = AppComponent;
}
