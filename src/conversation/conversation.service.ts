import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { CreateConversationDetails } from '../utils/types';
@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}
  createConversation(params: CreateConversationDetails) {}
}
