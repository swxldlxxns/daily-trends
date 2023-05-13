import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { RequestsMethods } from '../../domain/requests-methods';

export class Request implements RequestsMethods {
  async get(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return axios.request({
      ...config,
      method: 'GET',
    });
  }
}
