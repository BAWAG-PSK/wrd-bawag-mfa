import { QuizServiceMock } from '@app/core/quiz/quiz.service.mock';
import { QUIZ_SERVICE_TOKEN } from '@app/core/quiz/quiz.interface';


export const TEST_PROVIDER = [
  { provide: QUIZ_SERVICE_TOKEN, useClass: QuizServiceMock },
];
