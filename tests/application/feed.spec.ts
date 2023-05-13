import moment from 'moment';
import { UpdateResult } from 'mongodb';
import { Model } from 'mongoose';

import { Feed } from '../../src/feed/application/feed';
import { Feeds } from '../../src/shared/domain/news';
import { newsModel } from '../../src/shared/infrastructure/schemas/feeds.schema';

describe('Feed', () => {
  const date = moment().format('YYYY-MM-DD');
  const feed: Feeds = {
    date,
    title: 'titleTest',
    resume: 'resumeTest',
    link: 'link.test',
  };
  let repository: Feed;
  let model: Model<Feeds>;

  beforeAll(() => {
    repository = new Feed();
    model = newsModel;
  });

  beforeEach(() => {
    model.find = jest.fn().mockResolvedValue([feed]);
    model.findOne = jest.fn().mockResolvedValue(feed);
    model.findById = jest.fn().mockResolvedValue(feed);
    model.insertMany = jest.fn().mockResolvedValue(true);
    model.create = jest.fn().mockResolvedValue(feed);
    model.updateOne = jest.fn().mockResolvedValue({});
    model.deleteOne = jest.fn().mockResolvedValue(true);
  });

  it('findAllByDate', async () => {
    const result: Feeds[] = await repository.findAllByDate(date);

    expect(result).toEqual([feed]);
  });

  it('findOneByAll', async () => {
    const result: Feeds = await repository.findOneByAll(feed);

    expect(result).toEqual(feed);
  });

  it('findById', async () => {
    const result: Feeds = await repository.findById('id');

    expect(result).toEqual(feed);
  });

  it('insertMany', async () => {
    expect(await repository.insertMany([feed])).toBeUndefined();
  });

  it('create', async () => {
    const result: Feeds = await repository.create(feed);

    expect(result).toEqual(feed);
  });

  it('updateOne', async () => {
    const result: UpdateResult = await repository.updateOne('id', feed);

    expect(result).toEqual({});
  });

  it('deleteOne', async () => {
    expect(await repository.deleteOne('id')).toBeUndefined();
  });
});
