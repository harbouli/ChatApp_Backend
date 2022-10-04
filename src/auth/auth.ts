import { validationUser } from 'src/utils/types';

export interface IAuthService {
  validateUser(userCredentials: validationUser);
}
