import { Injectable } from '@angular/core';
import { Statistic } from '@app/shared/models/statistic.model';
import { StatisticsInterface } from '@app/core/statistics/statistics.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService implements StatisticsInterface {

  constructor() { }

  getStatistics(): Statistic[] {
    return null;
  }

}
