import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';
import { QuestionModule } from '@app/features/question/question.module';
import { TEST_PROVIDER } from '@app/core/test-providers.module';
import { QUIZ_SERVICE_TOKEN, QuizInterface } from '@app/core/quiz/quiz.interface';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let service: QuizInterface;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
             imports: [QuestionModule],
             providers: [TEST_PROVIDER]
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    service = TestBed.get(QUIZ_SERVICE_TOKEN);

    component = fixture.componentInstance;
    component.question = service.getQuiz('IT').questions[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
