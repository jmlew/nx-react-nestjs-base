import { Injectable } from '@nestjs/common';
import {
  CreateUserResponse,
  GetUserResponse,
  GetUsersResponse,
  UpdateUserResponse,
  User,
  UserDetails,
} from '@api-interfaces/features/models/user-api-data.model';

import * as fromUtilsLib from '@shared-utils';
import * as usersDb from '../../../assets/db/users.json';

@Injectable()
export class UserService {
  private usersDb: GetUsersResponse;

  constructor() {
    this.initData();
  }

  initData() {
    this.usersDb = { ...usersDb };
  }

  getAllUsers(): GetUsersResponse {
    return this.usersDb;
  }

  getUserById(id: number): GetUserResponse {
    const user: User = fromUtilsLib.getById(this.usersDb.data, id);
    const response: GetUserResponse = { data: user };
    return response;
  }

  createUser(params: UserDetails): CreateUserResponse {
    const user: CreateUserResponse = this.normaliseNewUser(params);
    this.addUserToDb(user);
    return user;
  }

  updateUser(id: number, params: UserDetails): UpdateUserResponse {
    const current: User = fromUtilsLib.getById(this.usersDb.data, id);
    const user: UpdateUserResponse = this.normaliseEditedUser({
      ...current,
      ...params,
    });
    this.updateUserInDb(user);
    return user;
  }

  deleteUser(id: number): number {
    this.removeUserFromDb(id);
    return id;
  }

  deleteUsers(ids: number[]): number[] {
    this.removeUsersFromDb(ids);
    return ids;
  }

  doesUserExist(id: number): boolean {
    return this.usersDb.data.some((item: User) => fromUtilsLib.isIdMatch(id, item));
  }

  isUserDuplicate(user: UserDetails, ignoreUserId: number = null): boolean {
    return this.usersDb.data
      .filter((item: User) => ignoreUserId === null || item.id !== ignoreUserId)
      .some((item: User) => item.email === user.email);
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
    // const createdAt: string = fromUtilsLib.getCurrentDateString();
    const createdAt = 'somedate';
    return { ...params, id, createdAt };
  }

  private normaliseEditedUser(user: User) {
    // const updatedAt: string = fromUtilsLib.getCurrentDateString();
    const updatedAt = 'somedate';
    return { ...user, updatedAt };
  }
}
