import { Model, model, Schema } from 'mongoose';

import { Feeds } from '../../domain/news';

const feedsSchema: Schema<Feeds> = new Schema<Feeds>({
  title: { type: String, required: true },
  resume: { type: String, required: true },
  link: { type: String, required: true },
  date: { type: String, required: true },
});

export const newsModel: Model<Feeds> = model<Feeds>('feeds', feedsSchema);
