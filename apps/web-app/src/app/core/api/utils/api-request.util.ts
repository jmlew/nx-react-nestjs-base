import axios, { AxiosInstance } from 'axios';
import { ApiUrl } from '@api-interfaces/enums/api-config.enum';
import { getEnvVar, isDev, isUseMockInDev } from '../../../shared/utils';
import { EnvVar } from '../../../shared/enums/environment.enum';

class SampleApi {
  instance: AxiosInstance;

  constructor() {
    this.instance = this.getAxiosInstance();
  }

  private getAxiosInstance() {
    return axios.create({
      baseURL: this.apiBase,
    });
  }

  get apiBase(): string {
    const baseUrl: string = isDev() && isUseMockInDev() ? ApiUrl.MockBase : ApiUrl.Base;
    return `${baseUrl}${ApiUrl.Latest}?${ApiUrl.AccessKey}=${getEnvVar(
      EnvVar.API_ACCESS_KEY
    )}`;
  }
}

export const sampleApi = new SampleApi();
