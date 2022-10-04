import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createUserDetails, FindUserParams } from 'src/utils/types';
import { IUserService } from './user';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { hachPassword } from 'src/utils/helpers';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createUser(userDetails: createUserDetails) {
    const existingUser = await this.userRepository.findOne({
      email: userDetails.email,
    });
    if (existingUser)
      throw new HttpException('Email Is Already Exist', HttpStatus.CONFLICT);
    const password = await hachPassword(userDetails.password);
    const newUser = this.userRepository.create({ ...userDetails, password });

    console.log('User Created');
    return this.userRepository.save(newUser);
  }

  findUser(findUserParameters: FindUserParams): Promise<User> {
    return this.userRepository.findOne(findUserParameters);
  }
}
