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
import { Routes, Services } from './utils/types';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private authService: IAuthService) {}
  @Post('register')
  @UsePipes(ValidationPipe)
  registerUser(@Body() creatUserDto: creatUserDto) {}
  @Post('login')
  login() {}
  @Get('status')
  status() {}
  @Post('logout')
  logout() {}
}
