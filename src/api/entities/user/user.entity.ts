import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../base.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'The email is required' })
  email: string;

  @Column({ type: 'varchar', length: 70 })
  @IsNotEmpty({ message: 'The password is required' })
  @Exclude()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  @Exclude()
  refreshToken?: string;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
