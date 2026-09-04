import { DbSchema} from '../enums/db-schema.enum.js'; 
import { AuthProvider } from '../enums/auth-provider.enum.js';
import { UserOrmEntity } from './user.orm-entity.js';
import { 
  Column, 
  Entity, 
  JoinColumn, 
  OneToOne, 
  PrimaryColumn,
  type Relation
} from 'typeorm';

@Entity('accounts', {
  schema: DbSchema.AUTH
})
export class AccountOrmEntity {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => UserOrmEntity)
  @JoinColumn({
    name: 'user_id'
  })
  user: Relation<UserOrmEntity>

  @Column({
    length: 255,
    unique: true
  })
  email: string;

  @Column({
    name: 'password_hash',
    length: 255
  })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: AuthProvider,
    default: AuthProvider.LOCAL
  })
  provider: AuthProvider;

  @Column({
    name: 'provider_id',
    length: 255,
    nullable: true
  })
  providerId: string;

  @Column({
    name: 'last_login_at',
    type: 'timestamptz',
    nullable: true
  })
  lastLoginAt: Date;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @OneToOne(() => UserOrmEntity)
  @JoinColumn({
    name: 'created_by'
  })
  createdBy: Relation<UserOrmEntity>

  @Column({
    type: 'timestamptz',
    name: 'updated_at'
  })
  updatedAt: Date;

  @OneToOne(() => UserOrmEntity)
  @JoinColumn({
    name: 'updated_by'
  })
  updatedBy: Relation<UserOrmEntity>;
}