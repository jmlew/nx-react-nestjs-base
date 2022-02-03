import { AxiosRequestConfig, AxiosError, AxiosResponse, AxiosInstance } from 'axios';
import { InterceptorsHandler } from '../models/axios.model';

export class AxiosApiInterceptorsService {
  private interceptorsHandler: InterceptorsHandler;

  constructor(private axiosInstance: AxiosInstance) {}

  addHandlers(handler: InterceptorsHandler) {
    this.interceptorsHandler = handler;
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
    if (this.interceptorsHandler.onInterceptRequest) {
      this.interceptorsHandler.onInterceptRequest(config);
    }
    return config;
  }

  /**
   * Adds interceptor logic prior to request error being handled.
   */
  private interceptRequestError(error: AxiosError): Promise<AxiosError> {
    if (this.interceptorsHandler.onInterceptRequestError) {
      this.interceptorsHandler.onInterceptRequestError(error);
    }
    return Promise.reject(error);
  }

  /**
   * Adds interceptor logic prior to response being handled.
   */
  private interceptResponse(response: AxiosResponse): AxiosResponse {
    if (this.interceptorsHandler.onInterceptResponse) {
      this.interceptorsHandler.onInterceptResponse(response);
    }
    return response;
  }

  /**
   * Adds interceptor logic prior to response error being handled.
   */
  private interceptResponseError(error: AxiosError): Promise<AxiosError> {
    if (this.interceptorsHandler.onInterceptResponseError) {
      this.interceptorsHandler.onInterceptResponseError(error);
    }
    return Promise.reject(error);
  }
}
