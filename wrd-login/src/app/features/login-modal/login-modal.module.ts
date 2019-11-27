import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { LoginModalComponent } from '@app/features/login-modal/login-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginModalComponent],
  imports: [CommonModule, ClarityModule, ReactiveFormsModule],
  exports: [LoginModalComponent]
})
export class LoginModalModule {}
