import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceComponent } from './maintenance.component';
import { TEST_PROVIDER } from '@app/core/test-provider';
import { MaintenanceModule } from '@app/features/maintenance/maintenance.module';
import { configureTestSuite } from 'ng-bullet';

describe('MaintenanceComponent', () => {
  let component: MaintenanceComponent;
  let fixture: ComponentFixture<MaintenanceComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [MaintenanceModule],
      providers: [...TEST_PROVIDER]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
