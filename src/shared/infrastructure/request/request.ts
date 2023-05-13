import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { RequestsMethodsInterface } from '../../domain/requests-methods.interface';

export class Request implements RequestsMethodsInterface {
  async get(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return axios.request({
      ...config,
      method: 'GET',
    });
  }
}
