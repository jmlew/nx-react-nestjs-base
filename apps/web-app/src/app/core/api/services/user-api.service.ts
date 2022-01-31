import {
  GetUserResponse,
  GetUsersResponse,
} from '@api-interfaces/features/models/user-api-data.model';
import { UserApiUri } from '@api-interfaces/features/enums/user-api-config.enum';
import { AxiosInstance, AxiosResponse } from 'axios';
import { UserAxiosApiService } from './user-axios-api.service';

export class UserApiService {
  constructor(private axios: AxiosInstance) {}

  getUser(userId: string): Promise<AxiosResponse<GetUserResponse>> {
    return this.axios.get(`${UserApiUri.Users}/${userId}`);
  }

  getUsers(pageIndex: number): Promise<AxiosResponse<GetUsersResponse>> {
    const params = { [UserApiUri.PageIndex]: pageIndex };
    return this.axios.get(UserApiUri.Users, { params });
  }
}

export const userService = new UserApiService(UserAxiosApiService.instance.axiosInstance);
