import { LoginHandlerServiceMock } from '@app/core/api/event-handler/login-handler.service.mock';

import { LOGIN_HANDLER_SERVICE } from '@app/core/api/event-handler/login-handler.interface';
import { LoginMockService } from '@app/core/service/login-mock.service';
import { LOGIN_HTTP_SERVICE } from '@app/core/service/login.interface';

export const TEST_PROVIDER = [
  { provide: LOGIN_HANDLER_SERVICE, useClass: LoginHandlerServiceMock },
  { provide: LOGIN_HTTP_SERVICE, useClass: LoginMockService }
];
