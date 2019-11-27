import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { MaintenanceComponent } from '@app/features/maintenance/maintenance.component';
import { DashboardComponent } from '@app/features/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { DASHBOARD_ROUTES } from '@app/features/dashboard/dashboard.routes';

/**
 * Module that provides the {@link MaintenanceComponent}, basically tells the user that the application is currently not available.
 */
@NgModule({
  declarations: [ DashboardComponent ],
  imports: [ CommonModule, ClarityModule, RouterModule.forChild(DASHBOARD_ROUTES) ],
  exports: [ DashboardComponent ]
})
export class DashboardModule {

}
