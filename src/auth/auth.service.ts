import { Inject, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { IUserService } from 'src/users/user';
import { Services } from 'src/utils/constants';
import { conparePassword } from 'src/utils/helpers';
import { validationUser } from 'src/utils/types';

import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject(Services.USER) private userService: IUserService) {}
  async validateUser(userDetails: validationUser) {
    const user = await this.userService.findUser({ email: userDetails.email });
    if (!user)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    const isPasswordValid = await conparePassword(
      userDetails.password,
      user.password,
    );
    console.log(isPasswordValid);
    return isPasswordValid ? user : null;
  }
}
