import bodyParser from 'body-parser';
import express, { Express } from 'express';
import helmet from 'helmet';
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
    this.app.use('/feed', feedRouter);
    this._listen();
  }

  private _listen() {
    const { PORT } = this._server;

    this.app.listen(PORT, () => {
      this._logger.info(`Starting application on port: ${PORT}`);
      this._mongodb();
    });
  }

  private _mongodb() {
    const { DB_CONNECTION, DB_NAME, DB_PASS, DB_USER, DB_PORT, DB_HOST } =
      this._database;

    mongoose
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
          `Error to connect to ${DB_CONNECTION}://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}: ${error.message}`,
        ),
      );
  }
}
