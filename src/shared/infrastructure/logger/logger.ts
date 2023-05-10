import { Log } from '../../domain/logger';

export class Logger implements Log {
  info(message: string): void {
    console.log(message);
  }

  error(message: string): void {
    console.error(message);
  }
}
