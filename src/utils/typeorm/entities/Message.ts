import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversation } from './Conversation';
import { User } from './User';
// Messages Entity
@Entity({ name: 'messages' })
export class Message {
  // Id Column
  @PrimaryGeneratedColumn()
  id: number;
  // Content Column
  @Column('text', { nullable: true })
  content: string;
  // Created At Column
  @CreateDateColumn({ name: 'created_at' })
  createdAt: number;
  // Author Colum Relation with User Many Messages To One User
  @ManyToOne(() => User, (user) => user.messages)
  author: User;
  // Conversations Column Relation with Message Many Messages To One Conversation
  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;
}
