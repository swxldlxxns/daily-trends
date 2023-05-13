import { LoggerInterface } from '../../domain/logger.interface';

export class Logger implements LoggerInterface {
  info(message: string): void {
    console.log('[INFO]', message);
  }

  error(message: string): void {
    console.error('[ERROR]', message);
  }
}
