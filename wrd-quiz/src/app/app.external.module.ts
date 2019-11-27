import { NgModule, Type } from '@angular/core';
import { AppCommonModule } from './app.common.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

export const appStatesExternal = [{ path: '', component: AppComponent }];

@NgModule({
  imports: [AppCommonModule, RouterModule.forChild(appStatesExternal)],
  declarations: [],
  bootstrap: [],
  providers: [],
  exports: [],
  entryComponents: [AppComponent]
})
export class AppModule {
  static component: Type<AppComponent> = AppComponent;
}
