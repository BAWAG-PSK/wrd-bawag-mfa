import { Injectable } from '@angular/core';
import getStats from '@app/core/statistics/fixtures/statistics.fixture';
import { StatisticsInterface } from '@app/core/statistics/statistics.interface';
import { Statistic } from '@app/shared/models/statistic.model';


@Injectable({
  providedIn: 'root'
})
export class StatisticsServiceMock implements StatisticsInterface {

  constructor() { }

  getStatistics(): Statistic[] {
    return getStats();
  }

}
