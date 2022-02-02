import {
  GetUserResponse,
  GetUsersResponse,
  UpdateUserResponse,
  UserDetails,
} from '@api-interfaces/features/models/user-api-data.model';
import { UserApiUri, UserApiParam } from '@api-interfaces/features/enums/user-api.enum';
import { AxiosInstance, AxiosResponse } from 'axios';
import { UserAxiosApiService } from './user-axios-api.service';

export class UserApiService {
  constructor(private axios: AxiosInstance) {}

  getUser(userId: string): Promise<AxiosResponse<GetUserResponse>> {
    return this.axios.get<GetUserResponse>(`${UserApiUri.Users}/${userId}`);
  }

  getUsers(pageIndex: number): Promise<AxiosResponse<GetUsersResponse>> {
    const params = { [UserApiParam.Page]: pageIndex };
    return this.axios.get<GetUsersResponse>(UserApiUri.Users, { params });
  }

  updateUser(
    userId: string,
    values: UserDetails
  ): Promise<AxiosResponse<UpdateUserResponse>> {
    return this.axios.put<UpdateUserResponse>(`${UserApiUri.Users}/${userId}`, values);
  }
}

export const userService = new UserApiService(UserAxiosApiService.instance.axiosInstance);
