import { Feeds } from './news';

export interface DailyNews {
  elPais(): Promise<Feeds[]>;
  elMundo(): Promise<Feeds[]>;
}
