import { Injectable } from '@nestjs/common';
import { CreateConversationDetails } from '../utils/types';
@Injectable()
export class ConversationService {
  createConversation(params: CreateConversationDetails) {}
}
