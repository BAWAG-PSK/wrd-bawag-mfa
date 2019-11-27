import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TEST_PROVIDER } from '@app/core/test-providers.module';
import { ProfileModule } from '@app/features/profile/profile.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        ProfileModule, HttpClientTestingModule
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
