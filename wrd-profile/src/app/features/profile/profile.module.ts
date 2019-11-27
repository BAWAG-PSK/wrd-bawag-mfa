import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from '@app/features/profile/profile.component';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ClarityModule, ReactiveFormsModule, AvatarModule],
  exports: [ProfileComponent]
})
export class ProfileModule {
}
