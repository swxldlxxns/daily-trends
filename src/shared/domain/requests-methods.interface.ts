import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestsMethodsInterface {
  get(config: AxiosRequestConfig): Promise<AxiosResponse>;
}
