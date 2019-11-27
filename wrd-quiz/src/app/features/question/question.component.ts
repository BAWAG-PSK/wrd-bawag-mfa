import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '@app/shared/models/question.model';
import { UserAnswer } from '@app/shared/models/user-answer.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @Output() answerSet: EventEmitter<UserAnswer> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
