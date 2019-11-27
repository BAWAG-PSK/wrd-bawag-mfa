import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoginModalModule } from '@app/features/login-modal/login-modal.module';
import { TEST_PROVIDER } from '@app/core/test-providers.module';
import { WrdWebSharedModule } from '@wrd-web/shared';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        LoginModalModule, WrdWebSharedModule.forRoot()
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
