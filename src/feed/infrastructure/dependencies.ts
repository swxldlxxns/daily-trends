import { getDailyNews } from '../../shared/infrastructure/dependencies';
import { Feed } from '../application/feed';
import { FeedController } from './rest/feed.controller';

export const feedRepository = new Feed();
export const feedController = new FeedController(getDailyNews, feedRepository);
