import { LoggerInterface } from '../../domain/logger.interface';

export class Logger implements LoggerInterface {
  log(message: any): void {
    console.log('[LOG]', message);
  }

  info(message: string): void {
    console.log('[INFO]', message);
  }

  error(message: string): void {
    console.error('[ERROR]', message);
  }
}
