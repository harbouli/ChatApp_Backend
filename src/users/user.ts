import { User } from 'src/utils/typeorm';
import { createUserDetails, FindUserParams } from 'src/utils/types';

export interface IUserService {
  createUser(userDetails: createUserDetails): Promise<User>;
  findUser(findUserParameters: FindUserParams): Promise<User>;
}
