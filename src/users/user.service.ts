import { Injectable } from '@nestjs/common';
import { createUserDetails } from 'src/utils/types';
import { IUserService } from './user';

@Injectable()
export class UserService implements IUserService {
  createUser(userDetails: createUserDetails) {
    console.log('User Created');
  }
}
