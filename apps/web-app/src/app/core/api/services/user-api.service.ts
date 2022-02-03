import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  GetUserResponse,
  GetUsersResponse,
  UpdateUserResponse,
  UserDetails,
} from '@api-interfaces/features/models/user-api-data.model';
import { UserApiUri, UserApiParam } from '@api-interfaces/features/enums/user-api.enum';

import { UserAxiosApiService } from './user-axios-api.service';
import { InterceptorsHandler } from '../models/axios.model';
import { AxiosApiInterceptorsService } from './axios-api-interceptors.service';
import { getApiErrorMessage, normaliseApiErrorMessage } from '../utils';

export class UserApiService {
  constructor(private axios: AxiosInstance) {
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

  deleteUser(userId: number): Promise<AxiosResponse<number>> {
    return this.axios.delete<number>(`${UserApiUri.Users}/${userId}`);
  }

  /**
   * Adds custom API interceptor callbacks to all CRUD methods within this service.
   */
  private addInterceptors() {
    const handlers: InterceptorsHandler = {
      onInterceptResponseError: (error: AxiosError) => {
        // Replace the default error message with the most useful AxiosError value.
        normaliseApiErrorMessage(error);
      },
      // onInterceptRequestError: (error: AxiosError) => {},
      // onInterceptResponse: (config: AxiosResponse) => {},
      // onInterceptRequest: (config: AxiosRequestConfig) => {},
    };

    const interceptors: AxiosApiInterceptorsService = new AxiosApiInterceptorsService(
      this.axios
    );
    interceptors.addHandlers(handlers);
  }
}
const axiosService: UserAxiosApiService = new UserAxiosApiService();
export const userService: UserApiService = new UserApiService(axiosService.axiosInstance);
