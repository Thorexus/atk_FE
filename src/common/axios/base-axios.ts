import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

type BasicObject = Record<string, unknown>;

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

class BaseAxios {
  private httpClient: AxiosInstance;

  constructor(options: AxiosRequestConfig = {}) {
    this.httpClient = axios.create(options);
  }

  interceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    return config;
  };

  private axiosRequest<T>(config: AxiosRequestConfig) {
    const request = this.httpClient.request<T>(this.interceptor(config));
    return request;
  }

  public get<T>(
    url: string,
    params?: BasicObject,
    config?: AxiosRequestConfig,
  ) {
    const request = { method: HttpMethod.GET, url, params, ...config };

    return this.axiosRequest<T>(request);
  }

  public post<T>(
    url: string,
    payload: BasicObject | FormData,
    config: AxiosRequestConfig = {},
  ) {
    const request = {
      method: HttpMethod.POST,
      url,
      data: payload,
      ...config,
    };
    return this.axiosRequest<T>(request);
  }

  public put<T>(
    url: string,
    payload: BasicObject,
    config?: AxiosRequestConfig,
  ) {
    const request = {
      method: HttpMethod.PUT,
      url,
      data: payload,
      ...config,
    };
    return this.axiosRequest<T>(request);
  }

  public delete<T>(url: string, config: AxiosRequestConfig) {
    const request = {
      method: HttpMethod.DELETE,
      url,
      ...config,
    };
    return this.axiosRequest<T>(request);
  }
}

export default BaseAxios;
