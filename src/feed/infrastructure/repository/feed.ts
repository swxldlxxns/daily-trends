import { UpdateResult } from 'mongodb';

import { Feeds } from '../../../shared/domain/news';
import { newsModel } from '../../../shared/infrastructure/schemas/feeds.schema';
import { FeedRepository } from '../../domain/feed.repository';

export class Feed implements FeedRepository {
  async findAllByDate(date: string): Promise<Feeds[]> {
    return newsModel.find({ date });
  }

  async findOneByAll(options: Feeds): Promise<Feeds | null> {
    return newsModel.findOne(options);
  }

  async findById(_id: string): Promise<Feeds | null> {
    return newsModel.findById(_id);
  }

  async insertMany(data: Feeds[]): Promise<void> {
    await newsModel.insertMany(data);
  }

  async create(data: Feeds): Promise<Feeds> {
    return newsModel.create(data);
  }

  async updateOne(_id: string, data: Feeds): Promise<UpdateResult> {
    return newsModel.updateOne({ _id }, { ...data });
  }

  async deleteOne(_id: string): Promise<void> {
    await newsModel.deleteOne({ _id });
  }
}
