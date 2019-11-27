import { InjectionToken } from '@angular/core';
import { Quiz } from '@app/shared/models/quiz.model';
import { QuizResult } from '@app/shared/models/quiz-result.model';

/**
 * Use this token to inject the LoginHandlerService.
 */
export const QUIZ_SERVICE_TOKEN = new InjectionToken('quiz-service');

export interface QuizInterface {
  getQuiz(category: string): Quiz;

  sendQuizResult(result: QuizResult): void;
}
