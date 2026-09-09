import { 
  Column,
  Entity,
  JoinColumn, 
  ManyToOne, 
  PrimaryColumn,
  Unique,
  type Relation 
} from 'typeorm';
import { DbSchema } from '../enums/db-schema.enum.js';
import { UserOrmEntity } from './user.orm-entity.js';
import { ProfileOrmEntity } from './profile.orm-entity.js';
import { ChatOrmEntity } from './chat.orm-entity.js';
import { ChatRole } from '../enums/chat-role.enum.js';

@Entity('chats_participants', {
  schema: DbSchema.MAIN
})
@Unique(['profile', 'chat'])
export class ChatParticipantOrmEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @ManyToOne(() => ProfileOrmEntity, profile => profile.chatParticipants)
  @JoinColumn({ name: 'profile_id' })
  profile: Relation<ProfileOrmEntity>;

  @ManyToOne(() => ChatOrmEntity, chat => chat.chatParticipants)
  @JoinColumn({ name: 'chat_id' })
  chat: Relation<ChatOrmEntity>;

  @Column({
    type: 'enum',
    enum: ChatRole,
    default: ChatRole.MEMBER
  })
  role: ChatRole;

  @Column({
    type: 'timestamptz',
    name: 'joined_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  joinedAt: Date;

  @Column({
    type: 'timestamptz',
    name: 'left_at',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true
  })
  leftAt: Date | null;

  @Column({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @ManyToOne(() => UserOrmEntity, user => user)
  @JoinColumn({ name: 'created_by '})
  createdBy: Relation<UserOrmEntity>;
  
  @Column({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
  
  @ManyToOne(() => UserOrmEntity, user => user)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: Relation<UserOrmEntity>;
}