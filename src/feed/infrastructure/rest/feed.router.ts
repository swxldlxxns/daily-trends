import express, { Router } from 'express';
import { body } from 'express-validator';

import { validateFields } from '../../../shared/infrastructure/validation/validation';
import { feedController } from '../dependencies';

const handler = [
  body('title').exists().isString().isLength({ max: 50 }),
  body('resume').exists().isString().isLength({ max: 500 }),
  body('link').exists().isURL(),
  validateFields,
];
const feedRouter: Router = express.Router();

feedRouter.get('/', feedController.getNews.bind(feedController));

feedRouter.get('/:id', feedController.getOneNews.bind(feedController));

feedRouter.post('/', handler, feedController.newNews.bind(feedController));

feedRouter.put('/:id', handler, feedController.updateNews.bind(feedController));

feedRouter.delete('/:id', feedController.deleteNews.bind(feedController));

export { feedRouter };
