import { CreateConversationDetails } from 'src/utils/types';

export interface IConversationService {
  createConversation(conversationDetails: CreateConversationDetails);
}
