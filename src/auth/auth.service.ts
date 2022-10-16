import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../users/user';
import { Services } from '../utils/constants';
import { compareHash } from '../utils/helpers';
import { ValidateUserDetails } from '../utils/types';
import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {
  // Inject User Service
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}
  // Valudation User Method
  async validateUser(userDetails: ValidateUserDetails) {
    // Reformate Email To Lower Case
    const email = userDetails.email.toLowerCase();
    // Check  Existing Email
    const user = await this.userService.findUser({ email });
    if (!user)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    // Compare Password
    const isPassworValid = await compareHash(
      userDetails.password,
      user.password,
    );

    // return User Value

    return isPassworValid ? user : null;
  }
}
