import { User } from 'src/utils/typeorm';
import { ValidateUserDetails } from '../utils/types';

export interface IAuthService {
  // Validate User Credentials (Email And Password)
  validateUser(userCredentials: ValidateUserDetails): Promise<User | null>;
}
