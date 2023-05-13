import { Feeds } from './news';

export interface DailyNewsInterface {
  elPais(): Promise<Feeds[]>;
  elMundo(): Promise<Feeds[]>;
}
