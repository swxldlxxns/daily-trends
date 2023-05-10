import bodyParser from 'body-parser';
import express, { Express } from 'express';
import helmet from 'helmet';

import { feedRouter } from './feed/infrastructure/rest/feed.router';
import { config } from './feed/shared/infrastructure/config';
import { Logger } from './feed/shared/infrastructure/logger/logger';

export class App {
  app: Express;

  constructor(private readonly _logger: Logger) {
    this.app = express();
  }

  start() {
    const { port } = config.server;

    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use('/feed', feedRouter);
    this.app.listen(port, () => {
      this._logger.info(`Starting application on port: ${port}`);
    });
  }
}
