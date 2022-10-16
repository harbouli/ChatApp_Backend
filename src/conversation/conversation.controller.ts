import {
  Body,
  Controller,
  Inject,
  Post,
  Get,
  UseGuards,
  Param,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { Routes, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { IConversationsService } from './conversation';
import { CreateConversationDto } from './dtos/createConversation.dto';

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticatedGuard)
export class ConversationController {
  // Inject Conversation Service
  constructor(
    @Inject(Services.CONVERSATION)
    private readonly conversationService: IConversationsService,
  ) {}
  // End point Create Conversation api/conversation
  @Post()
  async createConversation(
    // User From serializeUser Using Custom Decorator
    @AuthUser() user: User,
    // Body Request
    @Body() createConversationPayload: CreateConversationDto,
  ) {
    return this.conversationService.createConversation(
      user,
      createConversationPayload,
    );
  }
  // End Point Get All Conversations api/conversations
  @Get()
  async getConversations(@AuthUser() { id }: User) {
    return this.conversationService.getConversations(id);
  }
  // Get Conversation By Id End Point api/conversations/:id
  @Get(':id')
  getConversationById(@Param('id') id: number) {
    return this.conversationService.findConversationById(id);
  }
}
