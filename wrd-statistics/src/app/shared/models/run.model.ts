export type RunType = QuizRun;

export interface Run {
  start: string;
  stop: string;
}

export interface QuizRun extends Run {
  category: string;
  correct: number;
  wrong: number;
}
