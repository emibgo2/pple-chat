import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import UserService from './user.service';
import { User } from './user.schema';
import { log } from 'console';
import { Validate } from 'class-validator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  async getUser(@Param('username') username: string): Promise<User> {
    return await this.userService.getUser(username);
  }
  @Post()
  async createUser(@Body() user: User) {
    log('create try user', user);
    return await this.userService.createUser(user);
  }
}
