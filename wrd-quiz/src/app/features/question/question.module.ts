import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from '@app/features/question/question.component';

@NgModule({
  declarations: [QuestionComponent],
  imports: [CommonModule, ClarityModule, ReactiveFormsModule],
  exports: [QuestionComponent]
})
export class QuestionModule {}
