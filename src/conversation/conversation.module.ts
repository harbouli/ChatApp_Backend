import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Services } from 'src/utils/constants';
import { Conversation } from 'src/utils/typeorm';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation]), UsersModule],
  controllers: [ConversationController],
  providers: [
    {
      provide: Services.CONVERSATION,
      useClass: ConversationService,
    },
  ],
})
export class ConversationModule {}
