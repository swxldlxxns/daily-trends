import axios from 'axios';
import * as cheerio from 'cheerio';
import express, { Request, Response, Router } from 'express';
import { body } from 'express-validator';

import { validateFields } from '../../../shared/infrastructure/validation/validation';

const feedRouter: Router = express.Router();

feedRouter.get('/', async (req: Request, res: Response) => {
  const news = [];
  const d1 = await axios.request({
    url: 'https://www.elmundo.es/',
    method: 'GET',
    responseEncoding: 'latin1',
  });
  const d2 = await axios.request({
    url: 'https://elpais.com/',
    method: 'GET',
    responseEncoding: 'utf-8',
  });

  if (d1.status === 200) {
    const $: cheerio.CheerioAPI = cheerio.load(d1.data);
    const principal: cheerio.Cheerio<cheerio.Element> = $(
      '.ue-c-cover-content__main .ue-c-cover-content__headline-group',
    );

    principal.each((i: number, e: cheerio.Element) => {
      const result = {
        title: $(e).find('span').text().trim(),
        resume: $(e).find('h2').text().trim(),
        link: $(e).find('a').attr('href'),
      };

      news.push(result);
      if (i === 4) return false;
    });
  }

  if (d2.status === 200) {
    const $: cheerio.CheerioAPI = cheerio.load(d2.data);
    const principal: cheerio.Cheerio<cheerio.Element> =
      $('article.c.c-d.c--m').first();
    const articles: cheerio.Cheerio<cheerio.Element> = $(
      'article.c.c-d.c--m-n',
    );

    news.push({
      title: principal.find('header h2').text(),
      resume: principal.find('p').text(),
      link: principal.find('a').attr('href'),
    });

    articles.each((i: number, e: cheerio.Element) => {
      const result = {
        title: $(e).find('header h2').text(),
        resume: $(e).find('p').text(),
        link: $(e).find('a').attr('href'),
      };

      news.push(result);
      if (i === 3) return false;
    });
  }

  res.json(news);
});

feedRouter.post(
  '/',
  [
    body('title').exists().isString().isLength({ max: 50 }),
    body('resume').exists().isString().isLength({ max: 500 }),
    body('link').exists().isURL(),
    validateFields,
  ],
  (req: Request, res: Response) => {
    res.json({ hello: 'world!' });
  },
);

export { feedRouter };
