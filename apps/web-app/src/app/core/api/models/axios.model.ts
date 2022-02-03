import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface AxiosApiService {
  baseUrl: string;
  instance: AxiosInstance;
  createAxiosInstance(): AxiosInstance;
  abortController(): void;
}

export interface InterceptorsHandler {
  onInterceptRequest?: (config: AxiosRequestConfig) => void;
  onInterceptRequestError?: (error: AxiosError) => void;
  onInterceptResponse?: (config: AxiosResponse) => void;
  onInterceptResponseError?: (error: AxiosError) => void;
}
