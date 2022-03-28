import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { UserApiParam, UserApiUri } from '@api-configs/features/enums/user-api.enum';
import {
  CreateUserResponse,
  GetUserResponse,
  GetUsersResponse,
  UpdateUserResponse,
  UserDetails,
} from '@api-configs/features/models/user-api-data.model';
import { MemoryStore } from '@custom-types';
import { ApiRequestMethod } from '@example-app/shared/data-access';
import {
  AxiosApiInterceptorsService,
  InterceptorsHandlers,
} from '@example-app/shared/data-access';
import { normaliseApiErrorMessage } from '@example-app/shared/util';

import { UserAxiosApiService } from './user-axios-api.service';

interface CacheEntry {
  all: boolean;
  user: {
    [id: number]: boolean;
  };
}

export class UserApiService {
  private axios: AxiosInstance;
  private staleCacheEntry: CacheEntry;

  constructor(private axiosApiService: UserAxiosApiService) {
    this.axios = axiosApiService.instance;
    this.staleCacheEntry = { all: false, user: {} };
    this.addInterceptors();
  }

  getUser(userId: number): Promise<AxiosResponse<GetUserResponse>> {
    return this.axios.get<GetUserResponse>(`${UserApiUri.Users}/${userId}`);
  }

  getUsers(pageIndex: number): Promise<AxiosResponse<GetUsersResponse>> {
    const params = { [UserApiParam.Page]: pageIndex };
    return this.axios.get<GetUsersResponse>(UserApiUri.Users, { params });
  }

  updateUser(
    userId: number,
    values: UserDetails
  ): Promise<AxiosResponse<UpdateUserResponse>> {
    return this.axios.put<UpdateUserResponse>(`${UserApiUri.Users}/${userId}`, values);
  }

  createUser(values: UserDetails): Promise<AxiosResponse<CreateUserResponse>> {
    return this.axios.post<CreateUserResponse>(UserApiUri.Users, values);
  }

  deleteUser(userId: number): Promise<AxiosResponse<number>> {
    return this.axios.delete<number>(`${UserApiUri.Users}/${userId}`);
  }

  get cacheStore(): MemoryStore {
    return this.axiosApiService.cacheStore;
  }

  /**
   * Sets the cache entry for a given user ID to stale. The request for getting all items
   * is set to stale when any individual item is set to stale.
   */
  setUserCacheToStale(userId: number) {
    this.staleCacheEntry.user[userId] = true;
    this.staleCacheEntry.all = true;
  }

  /**
   * Clears stale cache entries on get requests for items which have stale data.
   * Cache entries are cleared for items with request URLs matching the cache store's
   * keys.
   */
  private clearStaleCashEntries(config: AxiosRequestConfig, url: string) {
    if (url === UserApiUri.Users) {
      if (this.staleCacheEntry.all === true) {
        config.clearCacheEntry = true;
        this.staleCacheEntry.all = false;
      }
    } else {
      const userId: number | null = this.findCacheUserIdFromUrl(url);
      if (userId != null && this.staleCacheEntry.user[userId] === true) {
        config.clearCacheEntry = true;
        this.staleCacheEntry.user[userId] = false;
      }
    }
  }

  /**
   * Finds the user ID from the URL of a request to determine if a given item exists in
   * the stale cache collection.
   */
  private findCacheUserIdFromUrl(url: string): number | null {
    const userId: string | undefined = Object.keys(this.staleCacheEntry.user).find(
      (id: string) => `${UserApiUri.Users}/${id}` === url
    );
    return userId ? Number(userId) : null;
  }

  /**
   * Applies custom API interceptor callbacks to the Axios instance for all CRUD methods
   * within this service.
   */
  private addInterceptors() {
    const handlers: InterceptorsHandlers = {
      // Clear stale cache entries on GET requests for items which have stale data.
      onInterceptRequest: (config: AxiosRequestConfig) => {
        const { method, url } = config;
        if (method === ApiRequestMethod.Get && url != null) {
          this.clearStaleCashEntries(config, url);
        }
      },
      // Ensure the IDs of mutated entries are flagged as having stale data.
      onInterceptResponse: (res: AxiosResponse) => {
        const { config, data } = res;
        switch (config.method) {
          case ApiRequestMethod.Get:
            res.request.fromCache && console.log('GET from cache', this.cacheStore);
            break;
          case ApiRequestMethod.Post:
            this.setUserCacheToStale(data.id);
            break;
          case ApiRequestMethod.Put:
            this.setUserCacheToStale(data.id);
            break;
          case ApiRequestMethod.Delete:
            this.setUserCacheToStale(data);
            break;
          case ApiRequestMethod.Patch:
            break;
          default:
            break;
        }
      },
      onInterceptResponseError: (error: AxiosError) => {
        // Replace the default error message with the most useful AxiosError value.
        normaliseApiErrorMessage(error);
      },
      // onInterceptRequestError: (error: AxiosError) => {},
    };

    const interceptors: AxiosApiInterceptorsService = new AxiosApiInterceptorsService(
      this.axios
    );
    interceptors.addHandlers(handlers);
  }
}
const axiosService: UserAxiosApiService = new UserAxiosApiService();
export const userService: UserApiService = new UserApiService(axiosService);
