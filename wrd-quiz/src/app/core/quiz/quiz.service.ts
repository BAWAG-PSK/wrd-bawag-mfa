import { Injectable } from '@angular/core';
import { QuizInterface } from '@app/core/quiz/quiz.interface';
import { Quiz } from '@app/shared/models/quiz.model';
import { QuizResult } from '@app/shared/models/quiz-result.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService implements QuizInterface {

  constructor() { }

  getQuiz(category: string): Quiz {
    return null;
  }


  sendQuizResult(result: QuizResult) {

  }

}
