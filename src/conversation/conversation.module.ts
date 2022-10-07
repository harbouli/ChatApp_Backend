import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatParticipant, Conversation } from 'src/utils/typeorm';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, ChatParticipant])],
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class ConversationModule {}
