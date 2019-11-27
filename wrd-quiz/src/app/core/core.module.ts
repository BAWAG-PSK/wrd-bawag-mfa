import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { QUIZ_SERVICE_TOKEN } from '@app/core/quiz/quiz.interface';
import { QuizService } from '@app/core/quiz/quiz.service';

@NgModule({
  imports: [ ],
  exports: [ ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: QUIZ_SERVICE_TOKEN, useClass: QuizService }
      ]
    };
  }
}
