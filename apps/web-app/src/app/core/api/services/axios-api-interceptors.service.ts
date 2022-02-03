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

  private interceptRequest(config: AxiosRequestConfig): AxiosRequestConfig {
    // Add interceptor logic prior to request being sent.
    if (this.interceptorsHandler.onInterceptRequest) {
      this.interceptorsHandler.onInterceptRequest(config);
    }
    return config;
  }

  private interceptRequestError(error: AxiosError): Promise<AxiosError> {
    if (this.interceptorsHandler.onInterceptRequestError) {
      this.interceptorsHandler.onInterceptRequestError(error);
    }
    // Add interceptor logic prior to request error being handled.
    return Promise.reject(error);
  }

  private interceptResponse(response: AxiosResponse): AxiosResponse {
    if (this.interceptorsHandler.onInterceptResponse) {
      this.interceptorsHandler.onInterceptResponse(response);
    }
    // Add interceptor logic prior to response being handled.
    return response;
  }

  private interceptResponseError(error: AxiosError): Promise<AxiosError> {
    if (this.interceptorsHandler.onInterceptResponseError) {
      this.interceptorsHandler.onInterceptResponseError(error);
    }
    // Add interceptor logic prior to response error being handled.
    return Promise.reject(error);
  }
}
