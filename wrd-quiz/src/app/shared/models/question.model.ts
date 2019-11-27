export interface Answer {
  key: string;
  value: string;
}

export interface Question {
  id: string;
  question: string;
  answers: Answer[];
  correctAnswer: string;
}
