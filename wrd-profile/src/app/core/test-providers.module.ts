import { PROFILE_SERVICE_TOKEN } from '@app/core/profile/profile.interface';
import { ProfileServiceMock } from '@app/core/profile/profile.service.mock';

export const TEST_PROVIDER = [
  { provide: PROFILE_SERVICE_TOKEN, useClass: ProfileServiceMock }
];
