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
  private usersList: User[];

  constructor() {
    this.usersDb = usersDb;
    this.usersList = this.usersDb.data;
  }

  getAllUsers(): Observable<GetUsersResponse> {
    return fromSharedUtils.toStreamWithDelay(this.usersDb);
  }

  getUserById(id: number): Observable<GetUserResponse> {
    const user: User = fromUtilsLib.getById(this.usersList, id);
    const response: GetUserResponse = { data: user };
    return fromSharedUtils.toStreamWithDelay(response);
  }

  createUser(params: UserDetails): Observable<CreateUserResponse> {
    const user: CreateUserResponse = this.normaliseNewUser(params);
    this.addUserToDb(user);
    return fromSharedUtils.toStreamWithDelay(user);
  }

  updateUser(id: number, params: UserDetails): Observable<UpdateUserResponse> {
    const current: User = fromUtilsLib.getById(this.usersList, id);
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
    return this.usersList.some((item: User) => fromUtilsLib.isIdMatch(id, item));
  }

  isUserDuplicate(user: UserDetails): boolean {
    return this.usersList.some((item: User) => item.email === user.email);
  }

  private updateUserInDb(user: User) {
    this.usersList = fromUtilsLib.updateInCollection(user, this.usersList);
  }

  private addUserToDb(user: User) {
    this.usersList = fromUtilsLib.addToCollection(user, this.usersList);
  }

  private removeUserFromDb(id: number) {
    this.usersList = fromUtilsLib.removeIdFromCollection(id, this.usersList);
  }

  private removeUsersFromDb(ids: number[]) {
    this.usersList = fromUtilsLib.removeIdsFromCollection(ids, this.usersList);
  }

  private normaliseNewUser(params: UserDetails): CreateUserResponse {
    const id: number = fromUtilsLib.getNextCollectionId(this.usersList);
    const createdAt: string = fromUtilsLib.getCurrentDateString();
    return { ...params, id, createdAt };
  }

  private normaliseEditedUser(user: User) {
    const updatedAt: string = fromUtilsLib.getCurrentDateString();
    return { ...user, updatedAt };
  }
}
