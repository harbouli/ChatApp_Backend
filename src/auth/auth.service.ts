import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'src/users/user';
import { Services } from 'src/utils/constants';

import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject(Services.USER) private userService: IUserService) {}
  validateUser() {}
}
