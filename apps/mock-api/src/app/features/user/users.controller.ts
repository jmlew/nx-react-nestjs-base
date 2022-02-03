import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import {
  CreateUserResponse,
  GetUserResponse,
  GetUsersResponse,
  UpdateUserResponse,
  User,
  UserDetails,
} from '@api-interfaces/features/models/user-api-data.model';

import { UserService } from './user.service';

enum ErrorMessage {
  NoUserMatch = 'User does not exist in the Mock DB.',
  DuplicateEmail = 'Duplicate email in Mock CRM DB.',
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Observable<GetUsersResponse> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: number): Observable<GetUserResponse> {
    if (!this.userService.doesUserExist(id)) {
      throw new BadRequestException(ErrorMessage.NoUserMatch);
    }
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() params: UserDetails): Observable<CreateUserResponse> {
    if (this.userService.isUserDuplicate(params)) {
      throw new BadRequestException(ErrorMessage.DuplicateEmail);
    }
    return this.userService.createUser(params);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: number,
    @Body() params: User
  ): Observable<UpdateUserResponse> {
    if (!this.userService.doesUserExist(id)) {
      throw new BadRequestException(ErrorMessage.NoUserMatch);
    }
    if (this.userService.isUserDuplicate(params, id)) {
      throw new BadRequestException(ErrorMessage.DuplicateEmail);
    }
    return this.userService.updateUser(id, params);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Observable<number> {
    if (!this.userService.doesUserExist(id)) {
      throw new BadRequestException(ErrorMessage.NoUserMatch);
    }
    return this.userService.deleteUser(id);
  }

  @Delete()
  deleteUsers(@Body() ids: number[]): Observable<number[]> {
    return this.userService.deleteUsers(ids.map((id: number) => id));
  }
}
