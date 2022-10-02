import { Module } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { UserService } from './user.service';

@Module({
  providers: [
    {
      provide: Services.USER,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: Services.USER,
      useClass: UserService,
    },
  ],
})
export class UsersModule {}
