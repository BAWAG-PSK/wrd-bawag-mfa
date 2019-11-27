import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TEST_PROVIDER } from '@app/core/test-providers.module';
import { StatisticsModule } from '@app/features/statistics/statistics.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        StatisticsModule
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
