import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@app/core/core.module';
import { environment } from '@env/environment';
import { CoreModuleMock } from '@app/core/core.module.mock';
import { QuizModule } from '@app/features/quiz/quiz.module';

/**
 * Imports modules that are needed by both AppModules (feature=MF + root=standalone).
 * DO NOT import HttpClientModule here, as it will get imported by the feature module and create
 * an own instance of HttpClient, which therefore will NOT BE HANDLED by any HTTP-Interceptor of the CL.
 */
@NgModule({
  imports: [
    CommonModule,
    environment.mock ? CoreModuleMock.forRoot() : CoreModule.forRoot(),
    QuizModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [],
  providers: [],
  exports: [ AppComponent ]
})
export class AppCommonModule {
}
