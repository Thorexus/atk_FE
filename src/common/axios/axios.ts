import BaseAxios from './base-axios';
import { AxiosRequestConfig } from 'axios';
import { getAccessToken } from './token';

class Axios extends BaseAxios {
  override interceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = getAccessToken();

    if (config.headers && config.headers['Authorization']) {
      return {
        ...config,
        headers: {
          Authorization: config.headers['Authorization'],
        },
      };
    } else if (token) {
      return {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      return {
        ...config,
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
    }
  };
}

export default Axios;
