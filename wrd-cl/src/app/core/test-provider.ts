import { LOGIN_HANDLER_SERVICE } from '@app/core/api/event-handler/login/i-login-handler.service';
import { REFRESH_RESOLVER_SERVICE } from '@app/core/resolver/refresh/refresh-resolver.service';
import { RefreshResolverServiceMock } from '@app/core/resolver/refresh/refresh-resolver.service.mock';
import { LoginHandlerServiceMock } from '@app/core/api/event-handler/login/login-handler.service.mock';

/**
 * Use this constant in unit tests to mock away dependencies as follows:
 *
 * ```
 * configureTestSuite(() => {
 *   TestBed.configureTestingModule({
 *     imports: [ModuleUnderTest],
 *     providers: [...TEST_PROVIDER]
 *   });
 * });
 * ```
 */
export const TEST_PROVIDER = [
  { provide: LOGIN_HANDLER_SERVICE, useClass: LoginHandlerServiceMock },

  { provide: REFRESH_RESOLVER_SERVICE, useClass: RefreshResolverServiceMock }
];
