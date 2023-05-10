import { App } from './app';
import { logger } from './feed/shared/infrastructure/dependencies';

const app: App = new App(logger);

app.start();
