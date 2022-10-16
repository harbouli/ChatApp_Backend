import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { IUserService } from '../users/user';
import { Routes, Services } from '../utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/Guards';

@Controller(Routes.AUTH)
export class AuthController {
  // Inject User service To Create User In SignUp
  constructor(@Inject(Services.USERS) private userService: IUserService) {}

  // SigUp End point
  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return instanceToPlain(await this.userService.createUser(createUserDto));
  }

  // Login End point
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login() {}

  // Get User Status
  @UseGuards(AuthenticatedGuard)
  @Get('status')
  status(@Req() req: Request, @Res() res: Response) {
    return res.send(instanceToPlain(req.user));
  }

  @Post('logout')
  logout() {}
}
