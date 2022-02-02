import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreateUserResponse,
  GetUserResponse,
  GetUsersResponse,
  UpdateUserResponse,
  User,
  UserDetails,
} from '@api-interfaces/features/models/user-api-data.model';

import * as fromUtilsLib from '@shared-utils';
import * as fromSharedUtils from '../../shared/utils';
import * as usersDb from '../../../assets/db/users.json';

@Injectable()
export class UserService {
  private usersDb: GetUsersResponse;

  constructor() {
    this.usersDb = { ...usersDb };
  }

  getAllUsers(): Observable<GetUsersResponse> {
    return fromSharedUtils.toStreamWithDelay(this.usersDb);
  }

  getUserById(id: number): Observable<GetUserResponse> {
    const user: User = fromUtilsLib.getById(this.usersDb.data, id);
    const response: GetUserResponse = { data: user };
    return fromSharedUtils.toStreamWithDelay(response);
  }

  createUser(params: UserDetails): Observable<CreateUserResponse> {
    const user: CreateUserResponse = this.normaliseNewUser(params);
    this.addUserToDb(user);
    return fromSharedUtils.toStreamWithDelay(user);
  }

  updateUser(id: number, params: UserDetails): Observable<UpdateUserResponse> {
    const current: User = fromUtilsLib.getById(this.usersDb.data, id);
    const user: UpdateUserResponse = this.normaliseEditedUser({
      ...current,
      ...params,
    });
    this.updateUserInDb(user);
    return fromSharedUtils.toStreamWithDelay(user);
  }

  deleteUser(id: number): Observable<number> {
    this.removeUserFromDb(id);
    return fromSharedUtils.toStreamWithDelay(id);
  }

  deleteUsers(ids: number[]): Observable<number[]> {
    this.removeUsersFromDb(ids);
    return fromSharedUtils.toStreamWithDelay(ids);
  }

  doesUserExist(id: number): boolean {
    return this.usersDb.data.some((item: User) => fromUtilsLib.isIdMatch(id, item));
  }

  isUserDuplicate(user: UserDetails): boolean {
    return this.usersDb.data.some((item: User) => item.email === user.email);
  }

  private updateUserInDb(user: User) {
    this.usersDb.data = fromUtilsLib.updateInCollection(user, this.usersDb.data);
  }

  private addUserToDb(user: User) {
    this.usersDb.data = fromUtilsLib.addToCollection(user, this.usersDb.data);
  }

  private removeUserFromDb(id: number) {
    this.usersDb.data = fromUtilsLib.removeIdFromCollection(id, this.usersDb.data);
  }

  private removeUsersFromDb(ids: number[]) {
    this.usersDb.data = fromUtilsLib.removeIdsFromCollection(ids, this.usersDb.data);
  }

  private normaliseNewUser(params: UserDetails): CreateUserResponse {
    const id: number = fromUtilsLib.getNextCollectionId(this.usersDb.data);
    const createdAt: string = fromUtilsLib.getCurrentDateString();
    return { ...params, id, createdAt };
  }

  private normaliseEditedUser(user: User) {
    const updatedAt: string = fromUtilsLib.getCurrentDateString();
    return { ...user, updatedAt };
  }
}
