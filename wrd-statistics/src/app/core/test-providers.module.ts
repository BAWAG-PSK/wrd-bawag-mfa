import { STATISTICS_SERVICE_TOKEN } from '@app/core/statistics/statistics.interface';
import { StatisticsServiceMock } from '@app/core/statistics/statistics.service.mock';

export const TEST_PROVIDER = [
  { provide: STATISTICS_SERVICE_TOKEN, useClass: StatisticsServiceMock }
];
