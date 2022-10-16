import { ISession } from 'connect-typeorm';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';
// Session Entity
@Entity({ name: 'sessions' })
export class Session implements ISession {
  // Expired Column
  @Index()
  @Column('bigint')
  expiredAt: number = Date.now();
  // ID Column
  @PrimaryColumn('varchar', { length: 255 })
  id: string;
  // Json Data Column
  @Column('text')
  json: string;
  // Delete Data Column
  @DeleteDateColumn()
  destroyedAt: Date;
}
