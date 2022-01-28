import {
  ApiGetUserResponse,
  ApiGetUsersResponse,
} from '@api-interfaces/models/api-req-res.model';
import { UserApiUri } from '@api-interfaces/enums/api-config.enum';
import { AxiosInstance, AxiosResponse } from 'axios';
import { UserAxiosApiService } from './user-axios-api.service';

export class UserApiService {
  constructor(private axios: AxiosInstance) {}

  getUser(userId: string): Promise<AxiosResponse<ApiGetUserResponse>> {
    return this.axios.get(`${UserApiUri.Users}/${userId}`);
  }

  getUsers(pageIndex: number): Promise<AxiosResponse<ApiGetUsersResponse>> {
    const params = { [UserApiUri.PageIndex]: pageIndex };
    return this.axios.get(UserApiUri.Users, { params });
  }
}

export const userService = new UserApiService(UserAxiosApiService.instance.axiosInstance);
