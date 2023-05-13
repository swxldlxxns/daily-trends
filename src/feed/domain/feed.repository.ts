import { UpdateResult } from 'mongodb';

import { Feeds } from '../../shared/domain/news';

export interface FeedRepository {
  findAllByDate(date: string): Promise<Feeds[]>;
  findOneByAll(options: Feeds): Promise<Feeds | null>;
  findById(_id: string): Promise<Feeds | null>;
  insertMany(data: Feeds[]): Promise<void>;
  create(data: Feeds): Promise<Feeds>;
  updateOne(_id: string, data: Feeds): Promise<UpdateResult>;
  deleteOne(_id: string): Promise<void>;
}
