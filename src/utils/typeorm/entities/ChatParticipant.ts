import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Conversation } from './Conversation';

@Entity({ name: 'chat_participants' })
export class ChatParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Conversation, (conversations) => conversations.participant)
  @JoinTable()
  conversations: Conversation[];
}
