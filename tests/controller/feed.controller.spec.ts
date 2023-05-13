import { Request as Req, Response as Res } from 'express';
import moment from 'moment';

import { FeedRepository } from '../../src/feed/infrastructure/repository/feed.repository';
import { FeedController } from '../../src/feed/infrastructure/rest/feed.controller';
import { Feeds } from '../../src/shared/domain/news';
import { GetDailyNews } from '../../src/shared/infrastructure/daily-news/get-daily-news';
import { Request } from '../../src/shared/infrastructure/request/request';

describe('FeedController', () => {
  const req = {} as unknown as Req;
  const res = {} as unknown as Res;
  const date = moment().format('YYYY-MM-DD');
  const feed: Feeds = {
    date,
    title: 'titleTest',
    resume: 'resumeTest',
    link: 'link.test',
  };
  let getDaily: GetDailyNews;
  let repository: FeedRepository;
  let controller: FeedController;

  beforeAll(() => {
    getDaily = new GetDailyNews(new Request());
    repository = new FeedRepository();
    controller = new FeedController(getDaily, repository);
  });

  beforeEach(() => {
    req.params = { id: 'id' };
    req.body = feed;
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    getDaily.elPais = jest.fn().mockResolvedValue([feed, feed]);
    getDaily.elMundo = jest.fn().mockResolvedValue([feed, feed]);
    repository.findAllByDate = jest.fn().mockResolvedValue([feed, feed]);
    repository.insertMany = jest.fn().mockResolvedValue(true);
    repository.deleteOne = jest.fn().mockResolvedValue(true);
    repository.create = jest.fn().mockResolvedValue(feed);
    repository.findById = jest.fn().mockResolvedValue(feed);
    repository.updateOne = jest.fn().mockResolvedValue({ matchedCount: 1 });
    repository.findOneByAll = jest
      .fn()
      .mockResolvedValueOnce(feed)
      .mockResolvedValueOnce(null);
  });

  it('getNews', async () => {
    await controller.getNews(req, res);

    expect(getDaily.elPais).toBeCalledTimes(1);
    expect(getDaily.elMundo).toBeCalledTimes(1);
    expect(repository.findOneByAll).toBeCalledTimes(4);
  });

  it('getOneNews', async () => {
    await controller.getOneNews(req, res);

    expect(repository.findById).toBeCalledTimes(1);
  });

  it('deleteNews', async () => {
    await controller.deleteNews(req, res);

    expect(repository.deleteOne).toBeCalledTimes(1);
  });

  describe('newNews', () => {
    it('with feed', async () => {
      await controller.newNews(req, res);

      expect(repository.findOneByAll).toBeCalledTimes(1);
      expect(repository.create).toBeCalledTimes(0);
    });

    it('without feed', async () => {
      repository.findOneByAll = jest.fn().mockResolvedValue(null);

      await controller.newNews(req, res);

      expect(repository.findOneByAll).toBeCalledTimes(1);
      expect(repository.create).toBeCalledTimes(1);
    });
  });

  describe('updateNews', () => {
    it('with matches', async () => {
      await controller.updateNews(req, res);

      expect(repository.findOneByAll).toBeCalledTimes(1);
      expect(repository.create).toBeCalledTimes(0);
    });

    it('without matches', async () => {
      repository.findOneByAll = jest.fn().mockResolvedValue(null);

      await controller.updateNews(req, res);

      expect(repository.updateOne).toBeCalledTimes(1);
      expect(repository.findOneByAll).toBeCalledTimes(1);
    });
  });
});
