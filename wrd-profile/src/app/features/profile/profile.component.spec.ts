import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { ProfileModule } from '@app/features/profile/profile.module';
import { TEST_PROVIDER } from '@app/core/test-providers.module';
import { PROFILE_SERVICE_TOKEN, ProfileInterface } from '@app/core/profile/profile.interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let service: ProfileInterface;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
             imports: [ProfileModule, HttpClientTestingModule],
             providers: [TEST_PROVIDER]
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    service = TestBed.get(PROFILE_SERVICE_TOKEN);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
