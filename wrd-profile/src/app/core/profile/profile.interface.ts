import { InjectionToken } from '@angular/core';
import { Profile } from '@app/shared/models/profile.model';

/**
 * Use this token to inject the LoginHandlerService.
 */
export const PROFILE_SERVICE_TOKEN = new InjectionToken('profile-service');

export interface ProfileInterface {
  getProfile(): Profile;

  saveProfile(profile: Profile): void;
}
