import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IAxiosCacheAdapterOptions, ISetupCache, setupCache } from 'axios-cache-adapter';

import { UserApiUri } from '@api-configs/features/enums/user-api.enum';
import { ApiRequestMethod } from '@api-configs/shared/enums/api-state.enum';
import { MemoryStore } from '@custom-types';

import { AxiosApiService } from '../../../core/api/models/axios.model';
import { EnvVar } from '../../../shared/enums/environment.enum';
import { getEnvVar, isDev, isUseMockInDev } from '../../../shared/utils';

export class UserAxiosApiService implements AxiosApiService {
  private axiosInstance: AxiosInstance;
  private cache: ISetupCache;

  constructor() {
    this.cache = setupCache(this.setupCacheOptions());
    this.axiosInstance = this.createAxiosInstance();
  }

  createAxiosInstance() {
    return axios.create({
      baseURL: this.baseUrl,
      adapter: this.cache.adapter,
      timeout: 2000,
    });
  }

  private setupCacheOptions(): IAxiosCacheAdapterOptions {
    return {
      maxAge: 15 * 60 * 1000,
      exclude: {
        // Cache requests which include query params.
        query: false,
        // Methods on which to ignore caching.
        methods: [
          ApiRequestMethod.Post,
          ApiRequestMethod.Patch,
          ApiRequestMethod.Put,
          ApiRequestMethod.Delete,
        ],
      },
      invalidate: this.invalidateCache.bind(this),
    };
  }

  /**
   * Custom cache invalidation interceptor, used to invalidate the cache when a request
   * is made. Cached items are removed from the default in-memory cache store when the
   * request config includes the clearCacheEntry flag.
   */
  private async invalidateCache(
    config: IAxiosCacheAdapterOptions,
    req: AxiosRequestConfig
  ) {
    const key: string | null = config.key ? config.key(req) : null;
    if (key && req.clearCacheEntry) {
      console.log('clearCacheEntry', key);
      await this.cacheStore.removeItem(key);
    }
  }

  get instance(): AxiosInstance {
    return this.axiosInstance;
  }

  get cacheStore(): MemoryStore {
    return this.cache.store as MemoryStore;
  }

  get baseUrl(): string {
    return isDev() && isUseMockInDev() ? UserApiUri.MockBase : UserApiUri.Base;
  }

  get apiAccessKey(): string {
    return getEnvVar(EnvVar.API_ACCESS_KEY);
  }
}
