import * as cheerio from 'cheerio';
import moment from 'moment';

import { DailyNewsInterface } from '../../domain/daily-news.interface';
import { Feeds } from '../../domain/news';
import { Request } from '../request/request';

export class GetDailyNews implements DailyNewsInterface {
  constructor(private readonly _request: Request) {}

  async elMundo(): Promise<Feeds[]> {
    const news: Feeds[] = [];
    const date = moment().format('YYYY-MM-DD');
    const { data, status } = await this._request.get({
      url: 'https://www.elmundo.es/',
      responseEncoding: 'latin1',
    });
    let count = 0;

    if (status === 200) {
      const $: cheerio.CheerioAPI = cheerio.load(data);
      const principal: cheerio.Cheerio<cheerio.Element> = $(
        '.ue-c-cover-content__main .ue-c-cover-content__headline-group',
      );

      principal.each((i: number, e: cheerio.Element): boolean => {
        const title = $(e).find('span').text().trim();
        const resume = $(e).find('h2').text().trim();
        const link = $(e).find('a').attr('href');

        if (title && resume && link) {
          const result: Feeds = { title, resume, link, date };

          news.push(result);
          count++;
        }

        if (count === 5) return false;
      });
    }

    return news;
  }

  async elPais(): Promise<Feeds[]> {
    const news: Feeds[] = [];
    const date = moment().format('YYYY-MM-DD');
    const { data, status } = await this._request.get({
      url: 'https://elpais.com/',
      responseEncoding: 'utf-8',
    });
    let count = 0;

    if (status === 200) {
      const $: cheerio.CheerioAPI = cheerio.load(data);
      const principal: cheerio.Cheerio<cheerio.Element> =
        $('article.c.c-d.c--m').first();
      const articles: cheerio.Cheerio<cheerio.Element> = $(
        'article.c.c-d.c--m-n',
      );

      news.push({
        date,
        title: principal.find('header h2').text(),
        resume: principal.find('p').text(),
        link: principal.find('a').attr('href'),
      });

      articles.each((i: number, e: cheerio.Element): boolean => {
        const title = $(e).find('header h2').text();
        const resume = $(e).find('p').text();
        const link = $(e).find('a').attr('href');

        if (title && resume && link) {
          const result: Feeds = { title, resume, link, date };

          news.push(result);
          count++;
        }
        if (count === 4) return false;
      });
    }

    return news;
  }
}
