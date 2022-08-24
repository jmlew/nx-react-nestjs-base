/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { toStreamWithDelay } from '../../shared/utils';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import {
  CreateUserResponse,
  DeleteUserResponse,
  GetUserResponse,
  GetUsersResponse,
  UpdateUserResponse,
  User,
  UserDetails,
} from '@example-app/users/domain';

enum ErrorMessage {
  TestBadRequest = 'Sample response to simulate an invalid request.',
  NoUserMatch = 'User does not exist in the Mock DB.',
  DuplicateEmail = 'Duplicate email in Mock CRM DB.',
  DuplicatePrimaryId = 'Duplicate primary ID in Mock CRM DB.',
}

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('reset')
  getResetDb(): string {
    this.userService.initDb();
    return 'Mock API Users DB has been reset.';
  }

  @Get()
  getUsers(): Observable<GetUsersResponse> {
    return this.toStream(this.userService.getAllUsers());
  }

  @Get(':id')
  getUser(@Param('id') id: string): Observable<GetUserResponse> {
    const userId: number = parseInt(id, 10);
    if (!this.userService.doesUserExist(userId)) {
      throw new BadRequestException(ErrorMessage.NoUserMatch);
    }
    return this.toStream(this.userService.getUserById(userId));
  }

  @Post()
  createUser(@Body() params: UserDetails): Observable<CreateUserResponse> {
    if (this.userService.isFieldDuplicate(params, 'email')) {
      throw new BadRequestException(ErrorMessage.DuplicateEmail);
    }
    return this.toStream(this.userService.createUser(params));
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() params: User
  ): Observable<UpdateUserResponse> {
    const userId: number = parseInt(id, 10);
    if (!this.userService.doesUserExist(userId)) {
      throw new BadRequestException(ErrorMessage.NoUserMatch);
    }
    return this.toStream(this.userService.updateUser(userId, params), 1000);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Observable<DeleteUserResponse> {
    const userId: number = parseInt(id, 10);
    if (!this.userService.doesUserExist(userId)) {
      throw new BadRequestException(ErrorMessage.NoUserMatch);
    }
    return this.toStream(this.userService.deleteUser(userId));
  }

  /**
   * Failed versions. Test the below by uncommenting the CRUD method decorator in teh
   * corresponding functions above to disable and use the below versions instead.
   */

  @Get()
  @HttpCode(400)
  getUsersFailed(): Observable<HttpException> {
    return this.toStream(new BadRequestException(ErrorMessage.TestBadRequest), 1000);
  }

  @Get(':id')
  @HttpCode(400)
  getUserFailed(@Param('id') id: string): Observable<HttpException> {
    return this.toStream(new BadRequestException(ErrorMessage.TestBadRequest), 1000);
  }

  @Post()
  @HttpCode(400)
  createUserFailed(@Body() params: UserDetails): Observable<HttpException> {
    return this.toStream(new BadRequestException(ErrorMessage.TestBadRequest), 1000);
  }

  @Put(':id')
  @HttpCode(400)
  updateUserFaile(
    @Param('id') id: string,
    @Body() params: User
  ): Observable<HttpException> {
    // throw new BadRequestException(ErrorMessage.TestBadRequest);
    return this.toStream(new BadRequestException(ErrorMessage.TestBadRequest), 1000);
  }

  @Delete(':id')
  @HttpCode(400)
  deleteUserFailed(@Param('id') id: string): Observable<HttpException> {
    // throw new BadRequestException(ErrorMessage.TestBadRequest);
    return this.toStream(new BadRequestException(ErrorMessage.TestBadRequest), 1000);
  }

  private toStream<T>(data: T, delay = 500) {
    return toStreamWithDelay(data, delay);
  }
}
