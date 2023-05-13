import axios from 'axios';
import * as cheerio from 'cheerio';
import express, { Request, Response, Router } from 'express';
import { body } from 'express-validator';

import { validateFields } from '../../../shared/infrastructure/validation/validation';

const feedRouter: Router = express.Router();

feedRouter.get('/', async (req: Request, res: Response) => {
  const news = [];
  const url = 'https://www.elmundo.es/';
  const { data, status } = await axios.get(url);

  if (status === 200) {
    const $: cheerio.CheerioAPI = cheerio.load(data);
    const principal: cheerio.Cheerio<cheerio.Element> = $(
      '.ue-c-cover-content__main .ue-c-cover-content__headline-group',
    );

    principal.each((i: number, e: cheerio.Element) => {
      news.push({
        title: $(e).find('span').text(),
        resume: $(e).find('h2').text(),
        link: $(e).find('a').attr('href'),
      });
      if (i === 4) return false;
    });
  }

  res.json(news);
});

feedRouter.post(
  '/',
  [body('test').exists().isString(), validateFields],
  (req: Request, res: Response) => {
    res.json({ hello: 'world!' });
  },
);

export { feedRouter };
