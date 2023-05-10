import express, { Request, Response, Router } from 'express';

const feedRouter: Router = express.Router();

feedRouter.get('/', (req: Request, res: Response) => {
  res.json({ hello: 'world!' });
});

export { feedRouter };
