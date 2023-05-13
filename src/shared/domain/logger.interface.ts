export interface LoggerInterface {
  log(message: any): void;
  info(message: string): void;
  error(message: string): void;
}
