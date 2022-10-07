import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { Routes, Services } from 'src/utils/constants';
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
  createConversation(@Body() createConversationPayload: CreateConversationDto) {
    this.conversationService.createConversation(createConversationPayload);
  }
}
