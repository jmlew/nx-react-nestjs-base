import axios, { AxiosInstance } from 'axios';
import { UserApiUri } from '@api-interfaces/features/enums/user-api.enum';
import { getEnvVar, isDev, isUseMockInDev } from '../../../shared/utils';
import { EnvVar } from '../../../shared/enums/environment.enum';
import { AxiosApiService } from '../models/axios.model';

export class UserAxiosApiService implements AxiosApiService {
  private axiosInstance: AxiosInstance;
  private controller: AbortController;

  constructor() {
    this.controller = new AbortController();
    this.axiosInstance = this.createAxiosInstance();
  }

  createAxiosInstance() {
    return axios.create({
      baseURL: this.baseUrl,
      timeout: 2000,
      signal: this.controller.signal,
    });
  }

  abortController() {
    this.controller.abort();
  }

  get instance(): AxiosInstance {
    return this.axiosInstance;
  }

  get baseUrl(): string {
    return isDev() && isUseMockInDev() ? UserApiUri.MockBase : UserApiUri.Base;
  }

  get apiAccessKey(): string {
    return getEnvVar(EnvVar.API_ACCESS_KEY);
  }
}
