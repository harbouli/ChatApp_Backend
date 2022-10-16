import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './Message';
// User Entity
@Entity({ name: 'users' })
export class User {
  // Id Key
  @PrimaryGeneratedColumn()
  id: number;
  // Email
  @Column({ unique: true })
  email: string;
  // Firstname Column
  @Column()
  firstName: string;

  // Lastname Column
  @Column()
  lastName: string;

  // Password Column
  @Column()
  @Exclude()
  password: string;

  // Messages Relation One To Many
  @OneToMany(() => Message, (message) => message.author)
  @JoinColumn()
  messages: Message[];
}
