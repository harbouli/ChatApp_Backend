import { Conversation, Message, User } from './typeorm';

export type CreateUserDetails = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type ValidateUserDetails = {
  email: string;
  password: string;
};

export type FindUserParams = Partial<{
  id: number;
  email: string;
}>;

export type CreateConversationDetails = {
  recipientId: number;
  message: string;
};

export type ConversationIdentityType = 'author' | 'recipient';

export type FindParticipationById = {
  id: number;
};

export interface AuthenticatorRequest extends Request {
  user: User;
}

export type CreateParticipationDetails = {
  id: number;
};

export type CreateMessageParams = {
  content: string;
  conversationId: number;
  user: User;
};

export type CreateMessageResponse = {
  conversation: Conversation;
  message: Message;
};
