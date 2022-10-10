import { Conversation, User } from '../utils/typeorm';
import { CreateConversationDetails } from '../utils/types';

export interface IConversationsService {
  createConversation(user: User, conversationParams: CreateConversationDetails);
  getConversations(id: number): Promise<Conversation[]>;
  findConversationById(id: number): Promise<Conversation>;
}
