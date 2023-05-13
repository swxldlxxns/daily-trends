import { getDailyNews } from '../../shared/infrastructure/dependencies';
import { FeedRepository } from './repository/feed.repository';
import { FeedController } from './rest/feed.controller';

export const feedRepository = new FeedRepository();
export const feedController = new FeedController(getDailyNews, feedRepository);
