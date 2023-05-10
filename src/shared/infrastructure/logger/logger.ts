import { Log } from '../../domain/logger';

export class Logger implements Log {
  info(message: string): void {
    console.log('[INFO]', message);
  }

  error(message: string): void {
    console.error('[ERROR]', message);
  }
}
