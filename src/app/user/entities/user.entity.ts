import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Index('usersEmailIdx', ['email'])
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 'user' })
  role: string;
}
