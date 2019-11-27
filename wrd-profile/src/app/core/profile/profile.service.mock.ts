import { Injectable } from '@angular/core';
import { ProfileInterface } from '@app/core/profile/profile.interface';
import { Profile } from '@app/shared/models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceMock implements ProfileInterface {

  constructor() { }

  getProfile(): Profile {
    return null;
  }

  saveProfile(profile: Profile): void {

  }

}
