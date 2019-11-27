import { InjectionToken } from '@angular/core';
import { Statistic } from '@app/shared/models/statistic.model';

/**
 * Use this token to inject the LoginHandlerService.
 */
export const STATISTICS_SERVICE_TOKEN = new InjectionToken('statistics-service');

export interface StatisticsInterface {
  getStatistics(): Statistic[];
}
