import * as fromUtilsLib from '@example-app/shared/util-common';
import { EntitiesService, Entity } from '@example-app/shared/util-common';
import {
  CreateUserResponse,
  GetUserResponse,
  GetUsersResponse,
  UpdateUserResponse,
  User,
  UserDetails,
} from '@example-app/users/domain';
import { Injectable } from '@nestjs/common';

import * as usersDb from '../../../assets/db/users.json';

type UserEntities = Entity<User>;

@Injectable()
export class UsersService {
  private usersDb: GetUsersResponse;
  private entityService: EntitiesService<User>;
  private userEntities: UserEntities;
  private primaryId: keyof User = 'id';

  constructor() {
    this.entityService = new EntitiesService(this.primaryId);
    this.initData();
  }

  initData() {
    this.usersDb = { ...usersDb };
    const data: User[] = this.usersDb.data;
    this.userEntities = this.entityService.createEntities(data);
  }

  getAllUsers(): GetUsersResponse {
    const users: User[] = this.entityService.selectAll(this.userEntities);
    return { ...this.usersDb, data: users };
  }

  getUserById(id: number): GetUserResponse {
    const user: User = this.userEntities[id];
    const response: GetUserResponse = { data: user };
    return response;
  }

  createUser(params: UserDetails): CreateUserResponse {
    const user: CreateUserResponse = this.normaliseNewUser(params);
    this.addUserToDb(user);
    return user;
  }

  updateUser(id: number, params: UserDetails): UpdateUserResponse {
    this.updateUserInDb(id, this.normaliseEditedUser(params));
    return this.userEntities[id] as UpdateUserResponse;
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
    return this.userEntities[id] !== undefined;
  }

  isUserDuplicate(user: UserDetails, ignoreUserId: number = null): boolean {
    const users: User[] = this.entityService.selectAll(this.userEntities);
    return users
      .filter((item: User) => ignoreUserId === null || item.id !== ignoreUserId)
      .some((item: User) => item.email === user.email);
  }

  private updateUserInDb(id: number, changes: Partial<User>) {
    this.userEntities = this.entityService.updateOne({ id, changes }, this.userEntities);
  }

  private addUserToDb(user: User) {
    this.userEntities = this.entityService.addOne(user, this.userEntities);
  }

  private removeUserFromDb(id: number) {
    this.userEntities = this.entityService.removeOne(id, this.userEntities);
  }

  private removeUsersFromDb(ids: number[]) {
    this.userEntities = this.entityService.removeMany(ids, this.userEntities);
  }

  private normaliseNewUser(params: UserDetails): CreateUserResponse {
    const ids: number[] = this.entityService.selectIds(this.userEntities) as number[];
    const id: number = Math.max(...ids) + 1;
    return { ...params, id, createdAt: this.timestamp() };
  }

  private normaliseEditedUser(user: Partial<User>) {
    return { ...user, updatedAt: this.timestamp() };
  }

  private timestamp(): string {
    return fromUtilsLib.getUtcDateToIso();
  }
}
