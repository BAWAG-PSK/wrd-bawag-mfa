import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { StatisticsComponent } from '@app/features/statistics/statistics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [CommonModule, ClarityModule, NgxChartsModule],
  exports: [StatisticsComponent]
})
export class StatisticsModule {}
