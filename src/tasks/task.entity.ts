import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { ITask } from './task.model';

@Entity()
export class Task implements ITask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'user' })
  user: number;
}
