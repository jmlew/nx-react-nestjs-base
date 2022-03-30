import { AxiosResponse } from 'axios';

import {
  CreateUserResponse,
  GetUserResponse,
  GetUsersResponse,
  UpdateUserResponse,
  UserDetails,
} from '../entities/user-data.model';
import { userService } from '../infrastructure/user-api.service';

/*
  Facade for the Users domain which acts as a single API through which other feature
  components can interact with this domain.

  Hides details of state management, once this is integrated.
*/

export class UserFacade {
  getUser(userId: number): Promise<AxiosResponse<GetUserResponse>> {
    return userService.getUser(userId);
  }

  getUsers(pageIndex: number): Promise<AxiosResponse<GetUsersResponse>> {
    return userService.getUsers(pageIndex);
  }

  updateUser(
    userId: number,
    values: UserDetails
  ): Promise<AxiosResponse<UpdateUserResponse>> {
    return userService.updateUser(userId, values);
  }

  createUser(values: UserDetails): Promise<AxiosResponse<CreateUserResponse>> {
    return userService.createUser(values);
  }

  deleteUser(userId: number): Promise<AxiosResponse<number>> {
    return userService.deleteUser(userId);
  }
}

export const userFacade: UserFacade = new UserFacade();
