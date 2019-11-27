import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { QUIZ_SERVICE_TOKEN } from '@app/core/quiz/quiz.interface';
import { QuizServiceMock } from '@app/core/quiz/quiz.service.mock';

@NgModule({
  imports: [],
  exports: []
})
export class CoreModuleMock {
  constructor(@Optional() @SkipSelf() parentModule: CoreModuleMock) {
    if (parentModule) {
      throw new Error('CoreModuleMock is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModuleMock,
      providers: [
        { provide: QUIZ_SERVICE_TOKEN, useClass: QuizServiceMock },
      ],
    };
  }
}
