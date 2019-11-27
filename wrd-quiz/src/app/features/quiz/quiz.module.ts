import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from '@app/features/quiz/quiz.component';
import { QuestionModule } from '@app/features/question/question.module';

@NgModule({
  declarations: [QuizComponent],
  imports: [CommonModule, ClarityModule, ReactiveFormsModule, QuestionModule],
  exports: [QuizComponent]
})
export class QuizModule {}
