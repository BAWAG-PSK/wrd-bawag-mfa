import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PROFILE_SERVICE_TOKEN, ProfileInterface } from '@app/core/profile/profile.interface';
import { Profile } from '@app/shared/models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;

  constructor(private fb: FormBuilder,
              @Inject(PROFILE_SERVICE_TOKEN) private service: ProfileInterface) {
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nickName: ['', Validators.required]
    });
  }

  save(): void {
    if (this.profileForm.valid) {
      this.service.saveProfile(this.profileForm.value as Profile);
    } else {
      // TODO: touch every control to display validation message
    }
  }

}
