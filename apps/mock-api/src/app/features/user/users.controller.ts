import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';

import {
  ApiGetUserResponse,
  ApiGetUsersResponse,
} from '@api-interfaces/models/api-req-res.model';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Observable<ApiGetUsersResponse> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string): Observable<ApiGetUserResponse> {
    return this.userService.getUserById(Number(id));
  }
}
