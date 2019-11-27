import { Question } from '@app/shared/models/question.model';

export interface Quiz {
  category: string;
  questions: Question[];
}
