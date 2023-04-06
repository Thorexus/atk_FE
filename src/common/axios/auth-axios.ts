import BaseAxios from './base-axios';
import { AxiosRequestConfig } from 'axios';

class AuthAxios extends BaseAxios {
  override interceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    return {
      ...config,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
  };
}

export default AuthAxios;
