import {
  Controller,
  Inject,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { CreateMessageDto } from './dtos/CreateMessage.dto';
import { IMessageService } from './message';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller(Routes.MESSAGE)
export class MessagesController {
  constructor(
    @Inject(Services.MESSAGE) private readonly messageService: IMessageService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async createMessage(
    @AuthUser() user: User,
    @Body()
    createMessageDto: CreateMessageDto,
  ) {
    const msg = await this.messageService.createMessage({
      ...createMessageDto,
      user,
    });
    this.eventEmitter.emit('message.create', msg);
    return;
  }
  @Get(':conversationId')
  async GetMessagesFromConversation(
    @Param('conversationId', ParseIntPipe) conversationId: number,
  ) {
    const messages = await this.messageService.getMessagesByConversationId(
      conversationId,
    );
    return {
      conversationId,
      messages,
    };
  }
}
