import express, { Request, Response, Router } from 'express';
import { body } from 'express-validator';

import { validateFields } from '../../../shared/infrastructure/validation/validation';

const feedRouter: Router = express.Router();

feedRouter.get('/', (req: Request, res: Response) => {
  res.json({ hello: 'world!' });
});

feedRouter.post(
  '/',
  [body('test').exists().isString(), validateFields],
  (req: Request, res: Response) => {
    res.json({ hello: 'world!' });
  },
);

export { feedRouter };
