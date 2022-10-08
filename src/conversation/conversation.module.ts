import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantModule } from 'src/participant/participant.module';
import { UsersModule } from 'src/users/users.module';
import { Services } from 'src/utils/constants';
import { ChatParticipant, Conversation } from 'src/utils/typeorm';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, ChatParticipant]),
    ParticipantModule,
    UsersModule,
  ],
  controllers: [ConversationController],
  providers: [
    {
      provide: Services.CONVERSATION,
      useClass: ConversationService,
    },
  ],
})
export class ConversationModule {}
