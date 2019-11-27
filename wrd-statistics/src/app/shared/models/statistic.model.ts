import { RunType } from '@app/shared/models/run.model';

export interface Statistic {
  game: string;
  runs: RunType[];
}
