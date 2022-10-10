import { ChatParticipant } from 'src/utils/typeorm';
import {
  CreateParticipationDetails,
  FindParticipationById,
} from 'src/utils/types';

export interface IParticipantsService {
  findParticipant(
    participant: FindParticipationById,
  ): Promise<ChatParticipant | null>;

  createParticipant(
    participant: CreateParticipationDetails,
  ): Promise<ChatParticipant>;
  findParticipantConversations(id: number);
}
