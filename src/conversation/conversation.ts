import { Conversation, User } from '../utils/typeorm';
import { CreateConversationDetails } from '../utils/types';

export interface IConversationsService {
  // Create Conversation :Paramd User And {Recipient ,Content}
  createConversation(user: User, conversationParams: CreateConversationDetails);
  // Get Conversations Parm User Id
  getConversations(id: number): Promise<Conversation[]>;
  // Find Single Conversation Param ConversationId
  findConversationById(id: number): Promise<Conversation>;
}
