import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { InterceptorsHandlers } from './axios.model';

export class AxiosApiInterceptorsService {
  private handlers: InterceptorsHandlers;

  constructor(private axiosInstance: AxiosInstance) {}

  addHandlers(handlers: InterceptorsHandlers) {
    this.handlers = handlers;
    this.axiosInstance.interceptors.request.use(
      this.interceptRequest.bind(this),
      this.interceptRequestError.bind(this)
    );
    this.axiosInstance.interceptors.response.use(
      this.interceptResponse.bind(this),
      this.interceptResponseError.bind(this)
    );
  }

  /**
   * Adds interceptor logic prior to request being sent.
   */
  private interceptRequest(config: AxiosRequestConfig): AxiosRequestConfig {
    if (this.handlers.onInterceptRequest) {
      this.handlers.onInterceptRequest(config);
    }
    return config;
  }

  /**
   * Adds interceptor logic prior to request error being handled.
   */
  private interceptRequestError(error: AxiosError): Promise<AxiosError> {
    if (this.handlers.onInterceptRequestError) {
      this.handlers.onInterceptRequestError(error);
    }
    return Promise.reject(error);
  }

  /**
   * Adds interceptor logic prior to response being handled.
   */
  private interceptResponse(response: AxiosResponse): AxiosResponse {
    if (this.handlers.onInterceptResponse) {
      this.handlers.onInterceptResponse(response);
    }
    return response;
  }

  /**
   * Adds interceptor logic prior to response error being handled.
   */
  private interceptResponseError(error: AxiosError): Promise<AxiosError> {
    if (this.handlers.onInterceptResponseError) {
      this.handlers.onInterceptResponseError(error);
    }
    return Promise.reject(error);
  }
}
