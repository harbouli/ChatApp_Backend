import { User } from '../utils/typeorm';
import { CreateUserDetails, FindUserParams } from '../utils/types';

export interface IUserService {
  // Create User And Validate If The User Already Exists
  createUser(userDetails: CreateUserDetails): Promise<User>;
  // Find User And Wirh Parms (Email Or Id)
  findUser(findUserParams: FindUserParams): Promise<User>;
  // Saver User Param User
  saveUser(user: User): Promise<User>;
}
