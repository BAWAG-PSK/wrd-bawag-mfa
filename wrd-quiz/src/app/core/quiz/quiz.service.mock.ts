import { Injectable } from '@angular/core';
import { QuizInterface } from '@app/core/quiz/quiz.interface';
import { Quiz } from '@app/shared/models/quiz.model';
import { QuizResult } from '@app/shared/models/quiz-result.model';
import getQuiz from '@app/core/quiz/fixtures/quiz.fixture';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceMock implements QuizInterface {

  constructor() {
  }

  getQuiz(category: string): Quiz {
    return getQuiz();
  }

  sendQuizResult(result: QuizResult) {

  }

}
