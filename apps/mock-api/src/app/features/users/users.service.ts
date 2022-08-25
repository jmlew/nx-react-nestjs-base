/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import * as fromUtilsLib from '@example-app/shared/util-common';
import {
  CreateUserResponse,
  DeleteUserResponse,
  GetUserResponse,
  GetUsersResponse,
  UpdateUserResponse,
  User,
  UserDetails,
} from '@example-app/users/domain';
import { Injectable } from '@nestjs/common';

import * as usersDb from '../../../assets/db/users.json';
import { EntitiesApiBaseService } from '../../shared/services';

@Injectable()
export class UsersService extends EntitiesApiBaseService<User, number> {
  constructor() {
    const primaryKey = 'id';
    super(primaryKey);
    this.initDb();
  }

  initDb() {
    const db = { ...usersDb }.data as User[];
    this.createEntities(db);
  }

  getAllUsers(): GetUsersResponse {
    const data: User[] = this.selectAll();
    return { data };
  }

  getUserById(id: number): GetUserResponse {
    const data: User = this.selectOne(id);
    return { data };
  }

  createUser(params: UserDetails): CreateUserResponse {
    const user: CreateUserResponse = this.normaliseNewUser(params);
    this.addEntity(user);
    return user;
  }

  updateUser(id: number, params: User): UpdateUserResponse {
    const user: UpdateUserResponse = this.normaliseEditedUser(params);
    this.updateEntity(id, user);
    return user;
  }

  deleteUser(id: number): DeleteUserResponse {
    this.removeEntity(id);
    return { id, status: 'removed' };
  }

  deleteUsers(ids: number[]): number[] {
    this.removeEntities(ids);
    return ids;
  }

  doesUserExist(id: number): boolean {
    return this.doesEntityExist(id);
  }

  isFieldDuplicate(user: UserDetails, field: string, ignoreValue: any = null): boolean {
    const users: User[] = this.selectAll();
    return users
      .filter((item: User) => ignoreValue === null || item[field] !== ignoreValue)
      .some((item: User) => item[field] === user[field]);
  }

  private normaliseNewUser(params: UserDetails): CreateUserResponse {
    const ids: number[] = this.selectIds();
    const id: number = Math.max(...ids) + 1;
    return { ...params, id, createdAt: this.timestamp() };
  }

  private normaliseEditedUser(user: User) {
    return { ...user, updatedAt: this.timestamp() };
  }

  private timestamp(): string {
    return fromUtilsLib.getUtcDateToIso();
  }
}
