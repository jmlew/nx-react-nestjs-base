import axios, { AxiosInstance } from 'axios';

import { UserApiUri } from '@api-configs/features/enums/user-api.enum';

import { AxiosApiService } from '../../../core/api/models/axios.model';
import { EnvVar } from '../../../shared/enums/environment.enum';
import { getEnvVar, isDev, isUseMockInDev } from '../../../shared/utils';

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
