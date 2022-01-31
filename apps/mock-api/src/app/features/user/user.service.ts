import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  GetUserResponse,
  GetUsersResponse,
  User,
} from '@api-interfaces/features/models/user-api-data.model';

import * as fromUtilsLib from '@shared-utils';
import * as fromSharedUtils from '../../shared/utils';
import * as usersDb from '../../../assets/db/users.json';

@Injectable()
export class UserService {
  private users: GetUsersResponse;

  constructor() {
    this.users = usersDb;
  }

  getAllUsers(): Observable<GetUsersResponse> {
    return fromSharedUtils.toStreamWithDelay(this.users);
  }

  getUserById(id: number): Observable<GetUserResponse> {
    const users: GetUsersResponse = this.users;
    const data: User = fromUtilsLib.getById(users.data, id);
    const response: GetUserResponse = { data };
    return fromSharedUtils.toStreamWithDelay(response);
  }
}
