import {
  Controller,
  Get,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { IAuthService } from './auth';
import { creatUserDto } from './dtos/CreateUser.dto';
import { Routes, Services } from '../utils/constants';
import { IUserService } from 'src/users/user';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USER) private userService: IUserService,
  ) {}
  @Post('register')
  @UsePipes(ValidationPipe)
  registerUser(@Body() creatUserDto: creatUserDto) {
    this.userService.createUser(creatUserDto);
  }
  @Post('login')
  login() {}
  @Get('status')
  status() {}
  @Post('logout')
  logout() {}
}
