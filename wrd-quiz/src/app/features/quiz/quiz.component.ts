import { Component, Inject, OnInit } from '@angular/core';
import { QUIZ_SERVICE_TOKEN, QuizInterface } from '@app/core/quiz/quiz.interface';
import { Quiz } from '@app/shared/models/quiz.model';
import { Question } from '@app/shared/models/question.model';
import { UserAnswer } from '@app/shared/models/user-answer.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  currentSlide;

  quiz: Quiz;
  resultsContainer;

  userAnswers: Map<string, string> = new Map<string, string>();

  constructor(@Inject(QUIZ_SERVICE_TOKEN) private service: QuizInterface) {
  }

  ngOnInit() {
    this.quiz = this.service.getQuiz('IT');

    this.resultsContainer = document.getElementById('results');

    this.currentSlide = 0;
  }

  getQuestion(index: number): Question {
    return this.quiz.questions[index];
  }

  numQuestions(): number {
    return this.quiz ? this.quiz.questions.length : -1;
  }

  showResults() {
    const numCorrect = this.quiz.questions.filter(q => q.correctAnswer === this.userAnswers.get(q.id)).length;

    // TODO: some animation
    // if (numCorrect === this.quiz.questions.length) {
    //   alert('100 %');  // "lightgreen";
    // } else {
    //   // "red"
    // }

    this.resultsContainer.innerHTML = `${ numCorrect } out of ${ this.quiz.questions.length }`;
  }

  lockAnswer(answer: UserAnswer) {
    this.userAnswers.set(answer.questionId, answer.questionAnswer);
  }

  showNextSlide() {
    this.currentSlide++;
  }

  showPreviousSlide() {
    this.currentSlide--;
  }

}
