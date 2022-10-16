import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from './Message';
import { User } from './User';
// Conversation Entity
@Entity({ name: 'conversations' })
export class Conversation {
  // ID Column
  @PrimaryGeneratedColumn()
  id: number;
  // Creator Column Relation With User One User to One Conversation
  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  creator: User;
  // Recipient Column Relation With User One Conversation to One User
  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  recipient: User;
  // Message Relation With Messages One Conversation to Many Messages
  @OneToMany(() => Message, (message) => message.conversation, {
    cascade: ['insert', 'remove', 'update'],
  })
  @JoinColumn()
  messages: Message[];

  // CreatedAt Column
  @CreateDateColumn({ name: 'created_at' })
  createdAt: number;
  // Last Message Column
  @OneToOne(() => Message)
  @JoinColumn({ name: 'last_message' })
  lastMessage: Message;

  // Last MSG Sent Column
  @UpdateDateColumn({ name: 'updated_at' })
  lastMessageSentAt: number;
}
