import { Controller, Inject, Post, Body } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { CreateMessageDto } from './dtos/CreateMessage.dto';
import { IMessageService } from './message';

@Controller(Routes.MESSAGE)
export class MessagesController {
  constructor(
    @Inject(Services.MESSAGE) private readonly messageService: IMessageService,
  ) {}

  @Post()
  createMessage(
    @AuthUser() user: User,
    @Body()
    createMessageDto: CreateMessageDto,
  ) {
    return this.messageService.createMessage(createMessageDto);
  }
}
