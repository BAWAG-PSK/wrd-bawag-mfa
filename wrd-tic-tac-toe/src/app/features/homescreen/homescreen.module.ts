import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomescreenComponent } from './homescreen.component';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [ HomescreenComponent ],
  imports: [ CommonModule, RouterModule, ClarityModule ],
  exports: [ HomescreenComponent ]
})
export class HomescreenModule {
}
