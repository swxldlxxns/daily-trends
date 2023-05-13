import { Request, Response } from 'express';
import moment from 'moment/moment';
import { UpdateResult } from 'mongodb';

import { Feeds } from '../../../shared/domain/news';
import { GetDailyNews } from '../../../shared/infrastructure/daily-news/get-daily-news';
import { Logger } from '../../../shared/infrastructure/logger/logger';
import { FeedRepository } from '../../domain/feed.repository';

export class FeedController {
  constructor(
    private readonly _logger: Logger,
    private readonly _getDailyNews: GetDailyNews,
    private readonly _feedRepository: FeedRepository,
  ) {}

  async getNews(req: Request, res: Response) {
    const date = moment().format('YYYY-MM-DD');
    const elPais: Feeds[] = await this._getDailyNews.elPais();
    const elMundo: Feeds[] = await this._getDailyNews.elMundo();

    await this._newFeeds(elPais);
    await this._newFeeds(elMundo);

    const results: Feeds[] = await this._feedRepository.findAllByDate(date);

    res.status(200).json(results);
  }

  async getOneNews(req: Request, res: Response) {
    const { id } = req.params;
    const results: Feeds = await this._feedRepository.findById(id);

    res.status(200).json(results);
  }

  async newNews(req: Request, res: Response) {
    const { body } = req;
    const date = moment().format('YYYY-MM-DD');

    this._logger.info(JSON.stringify(body));

    let result: Feeds = await this._feedRepository.findOneByAll({
      ...body,
      date,
    });

    if (!result)
      result = await this._feedRepository.create({
        ...body,
        date,
      });

    res.status(201).json(result);
  }

  async updateNews(req: Request, res: Response) {
    const { body, params } = req;
    const { id } = params;

    this._logger.info(JSON.stringify(body));

    const { matchedCount }: UpdateResult = await this._feedRepository.updateOne(
      id,
      body,
    );
    let result: Feeds;

    if (matchedCount === 1)
      result = await this._feedRepository.findOneByAll(body);

    res.status(200).json(result);
  }

  async deleteNews(req: Request, res: Response) {
    const { id } = req.params;

    await this._feedRepository.deleteOne(id);
    res.status(200).json();
  }

  private async _newFeeds(news: Feeds[]): Promise<void> {
    const newFeeds: Feeds[] = [];

    for (const data of news) {
      const result: Feeds = await this._feedRepository.findOneByAll(data);

      if (result === null) newFeeds.push(data);
      this._logger.info(JSON.stringify(result));
    }
    if (newFeeds.length) await this._feedRepository.insertMany(newFeeds);
  }
}
