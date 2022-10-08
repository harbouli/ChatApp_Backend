import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { IUserService } from 'src/users/user';
import { Routes, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { IConversationService } from './conversation';
import { CreateConversationDto } from './dtos/createConversation.dto';

@Controller(Routes.CONVERSATION)
@UseGuards(AuthenticatedGuard)
export class ConversationController {
  constructor(
    @Inject(Services.CONVERSATION)
    private readonly conversationService: IConversationService,
  ) {}

  @Post()
  async createConversation(
    @AuthUser() user: User,
    @Body() createConversationPayload: CreateConversationDto,
  ) {
    const recipientId = createConversationPayload.recipientId;
    return this.conversationService.createConversation(
      user,
      createConversationPayload,
    );
  }
}
