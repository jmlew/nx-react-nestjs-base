import axios, { AxiosInstance } from 'axios';
import { UserApiUri } from '@api-interfaces/enums/api-config.enum';
import { getEnvVar, isDev, isUseMockInDev } from '../../../shared/utils';
import { EnvVar } from '../../../shared/enums/environment.enum';

interface AxiosApiService {
  instance: AxiosInstance;
  apiBase: string;
  createAxiosInstance(): AxiosInstance;
}

class UserApiService implements AxiosApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = this.createAxiosInstance();
  }

  createAxiosInstance() {
    return axios.create({
      baseURL: this.apiBase,
      timeout: 2000,
    });
  }

  get instance(): AxiosInstance {
    return this.axiosInstance;
  }

  get apiBase(): string {
    return isDev() && isUseMockInDev() ? UserApiUri.MockBase : UserApiUri.Base;
  }

  get apiAccessKey(): string {
    return getEnvVar(EnvVar.API_ACCESS_KEY);
  }
}

export const userApiService = new UserApiService();
