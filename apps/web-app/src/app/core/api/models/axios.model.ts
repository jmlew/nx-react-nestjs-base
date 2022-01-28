import { AxiosInstance } from 'axios';

export interface AxiosApiService {
  baseUrl: string;
  axiosInstance: AxiosInstance;
  createAxiosInstance(): AxiosInstance;
}
