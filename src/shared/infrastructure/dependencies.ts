import { GetDailyNews } from './daily-news/get-daily-news';
import { Logger } from './logger/logger';
import { Request } from './request/request';

export const logger = new Logger();
export const request = new Request();
export const getDailyNews = new GetDailyNews(request);
