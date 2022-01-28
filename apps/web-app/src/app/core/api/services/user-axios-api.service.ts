import axios, { AxiosInstance } from 'axios';
import { UserApiUri } from '@api-interfaces/enums/api-config.enum';
import { getEnvVar, isDev, isUseMockInDev } from '../../../shared/utils';
import { EnvVar } from '../../../shared/enums/environment.enum';
import { AxiosApiService } from '../models/axios.model';

export class UserAxiosApiService implements AxiosApiService {
  private static singletonInstance: UserAxiosApiService;
  axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = this.createAxiosInstance();
  }

  static getInstance(): UserAxiosApiService {
    if (!UserAxiosApiService.singletonInstance) {
      UserAxiosApiService.singletonInstance = new UserAxiosApiService();
    }
    return this.singletonInstance;
  }

  createAxiosInstance() {
    return axios.create({
      baseURL: this.baseUrl,
      timeout: 2000,
    });
  }

  get baseUrl(): string {
    return isDev() && isUseMockInDev() ? UserApiUri.MockBase : UserApiUri.Base;
  }

  get apiAccessKey(): string {
    return getEnvVar(EnvVar.API_ACCESS_KEY);
  }
}
