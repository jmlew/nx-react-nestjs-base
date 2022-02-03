import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface AxiosApiService {
  baseUrl: string;
  axiosInstance: AxiosInstance;
  createAxiosInstance(): AxiosInstance;
}

export interface InterceptorsHandler {
  onInterceptRequest?: (config: AxiosRequestConfig) => void;
  onInterceptRequestError?: (error: AxiosError) => void;
  onInterceptResponse?: (config: AxiosResponse) => void;
  onInterceptResponseError?: (error: AxiosError) => void;
}
