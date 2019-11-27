import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsComponent } from './statistics.component';
import { StatisticsModule } from '@app/features/statistics/statistics.module';
import { TEST_PROVIDER } from '@app/core/test-providers.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
             imports: [StatisticsModule, NoopAnimationsModule],
             providers: [TEST_PROVIDER]
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
