import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface AxiosApiService {
  baseUrl: string;
  instance: AxiosInstance;
  createAxiosInstance(): AxiosInstance;
}

export interface InterceptorsHandlers {
  onInterceptRequest?: (config: AxiosRequestConfig) => void;
  onInterceptRequestError?: (error: AxiosError) => void;
  onInterceptResponse?: (config: AxiosResponse) => void;
  onInterceptResponseError?: (error: AxiosError) => void;
}
