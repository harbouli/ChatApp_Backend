import { User } from 'src/utils/typeorm';
import { CreateConversationDetails } from 'src/utils/types';

export interface IConversationService {
  createConversation(
    user: User,
    conversationDetails: CreateConversationDetails,
  );
}
