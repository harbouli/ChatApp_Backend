import { Controller, Get, Inject, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { IAuthService } from './auth';
import { creatUserDto } from './dtos/CreateUser.dto';
import { Routes, Services } from '../utils/constants';
import { instanceToPlain } from 'class-transformer';
import { IUserService } from 'src/users/user';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USER) private userService: IUserService,
  ) {}
  @Post('register')
  async registerUser(@Body() creatUserDto: creatUserDto) {
    return instanceToPlain(this.userService.createUser(creatUserDto));
  }
  @Post('login')
  login() {}
  @Get('status')
  status() {}
  @Post('logout')
  logout() {}
}
