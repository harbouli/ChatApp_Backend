import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChatParticipant } from './ChatParticipant';

@Entity({ name: 'conversations' })
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => ChatParticipant, (participant) => participant.conversations)
  participant: ChatParticipant;

  //   @Column({ name: 'author_id' })
  //   authorId: number;
  //   @Column({ name: 'recipient_id' })
  //   recipientId: number;
}
