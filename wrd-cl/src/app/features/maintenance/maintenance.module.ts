import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { MaintenanceComponent } from '@app/features/maintenance/maintenance.component';

/**
 * Module that provides the {@link MaintenanceComponent}, basically tells the user that the application is currently not available.
 */
@NgModule({
  declarations: [ MaintenanceComponent ],
  imports: [ CommonModule, ClarityModule ],
  exports: [ MaintenanceComponent ]
})
export class MaintenanceModule {
}
