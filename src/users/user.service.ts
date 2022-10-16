import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from '../utils/helpers';
import { User } from '../utils/typeorm';
import { CreateUserDetails, FindUserParams } from '../utils/types';
import { IUserService } from './user';

@Injectable()
export class UserService implements IUserService {
  // Injecting User Repository
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  // Create User Method
  async createUser(userDetails: CreateUserDetails) {
    // Reformate Email To Lower Case
    const email = userDetails.email.toLowerCase();
    // Check If User Is Already Exist In DB
    const existingUser = await this.userRepository.findOne({
      email,
    });
    if (existingUser)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    // Haching Password And Save Password In Database
    const password = await hashPassword(userDetails.password);
    const newUser = this.userRepository.create({
      ...userDetails,
      password,
      email,
    });
    return this.userRepository.save(newUser);
  }

  async findUser(findUserParams: FindUserParams): Promise<User> {
    // Find User (Email Or Password)
    return this.userRepository.findOne(findUserParams);
  }
  async saveUser(user: User) {
    // Save User
    return this.userRepository.save(user);
  }
}
