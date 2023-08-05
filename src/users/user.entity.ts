import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from './user.model';

@Entity()
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column()
  username: string;
}
