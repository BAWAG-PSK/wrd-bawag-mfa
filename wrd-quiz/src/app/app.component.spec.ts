import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TEST_PROVIDER } from '@app/core/test-providers.module';
import { QuizModule } from '@app/features/quiz/quiz.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        QuizModule
      ],
      providers: [
        TEST_PROVIDER
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
