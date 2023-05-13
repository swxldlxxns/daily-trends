import { getDailyNews, logger } from '../../shared/infrastructure/dependencies';
import { Feed } from './repository/feed';
import { FeedController } from './rest/feed.controller';

export const feedRepository = new Feed();
export const feedController = new FeedController(
  logger,
  getDailyNews,
  feedRepository,
);
