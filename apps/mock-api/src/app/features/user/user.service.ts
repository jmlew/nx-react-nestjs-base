import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import {
  User,
  ApiGetUsersResponse,
  ApiGetUserResponse,
} from '@api-interfaces/models/api-req-res.model';

import * as fromUtilsLib from '@shared-utils';
import * as fromSharedUtils from '../../shared/utils';
import * as usersDb from '../../../assets/db/users.json';

@Injectable()
export class UserService {
  private users: ApiGetUsersResponse;

  constructor() {
    this.users = usersDb;
  }

  getAllUsers(): Observable<ApiGetUsersResponse> {
    return fromSharedUtils.toStreamWithDelay(this.users);
  }

  getUserById(id: number): Observable<ApiGetUserResponse> {
    const users: ApiGetUsersResponse = this.users;
    const data: User = fromUtilsLib.getById(users.data, id);
    const response: ApiGetUserResponse = { data };
    return fromSharedUtils.toStreamWithDelay(response);
  }
}
