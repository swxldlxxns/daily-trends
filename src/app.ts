import bodyParser from 'body-parser';
import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import moment from 'moment';
import * as mongoose from 'mongoose';

import { feedRouter } from './feed/infrastructure/rest/feed.router';
import { config } from './shared/infrastructure/config';
import { Logger } from './shared/infrastructure/logger/logger';

export class App {
  private readonly _server = config.server;
  private readonly _database = config.database;

  app: Express;

  constructor(private readonly _logger: Logger) {
    this.app = express();
  }

  start() {
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      this._logger.log({
        date: moment().toDate(),
        method: req.method,
        url: req.url,
        query: req.query,
        body: req.body,
      });
      next();
    });
    this.app.use('/feed', feedRouter);
    this._listen();
  }

  private _listen() {
    const { PORT } = this._server;

    this.app.listen(PORT, async () => {
      this._logger.info(`Starting application on port: ${PORT}`);
      await this._mongodb();
    });
  }

  private async _mongodb() {
    const { DB_CONNECTION, DB_NAME, DB_PASS, DB_USER, DB_PORT, DB_HOST } =
      this._database;

    await mongoose
      .connect(
        `${DB_CONNECTION}://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
        {
          authSource: 'admin',
          retryWrites: true,
          ssl: false,
          writeConcern: { w: 'majority' },
        },
      )
      .then(() => this._logger.info(`Connected to ${DB_CONNECTION}`))
      .catch((error) =>
        this._logger.info(
          `Error to connect to ${DB_CONNECTION}: ${error.message}`,
        ),
      );
  }
}
