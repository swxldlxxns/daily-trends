import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestsMethods {
  get(config: AxiosRequestConfig): Promise<AxiosResponse>;
}
