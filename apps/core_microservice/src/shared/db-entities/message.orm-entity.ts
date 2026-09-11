import { UserOrmEntity } from './user.orm-entity.js';
import { DbSchema } from '../enums/db-schema.enum.js';
import { ProfileOrmEntity } from './profile.orm-entity.js';
import { ChatOrmEntity } from './chat.orm-entity.js';
import { 
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
  OneToMany
} from 'typeorm';

@Entity('messages', {
  schema: DbSchema.MAIN
})
export class MessageOrmEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @ManyToOne(() => ChatOrmEntity, chat => chat.messages)
  @JoinColumn({ name: 'chat_id' })
  chat: Relation<ChatOrmEntity>;

  @ManyToOne(() => ProfileOrmEntity, profile => profile.messages)
  @JoinColumn({ name: 'profile_id' })
  profile: Relation<ProfileOrmEntity>;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column('text')
  content: string;

  @OneToMany(() => MessageOrmEntity, message => message.replies)
  @JoinColumn({ name: 'reply_to_message_id' })
  replyToMessage: Relation<MessageOrmEntity>;

  @ManyToOne(() => MessageOrmEntity, message => message.replyToMessage)
  replies: Relation<MessageOrmEntity[]>;

  @Column({ type: 'boolean', default: false })
  isEdited: boolean;

  @Column({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @ManyToOne(() => UserOrmEntity, user => user.messagesCreated)
  @JoinColumn({ name: 'created_by '})
  createdBy: Relation<UserOrmEntity>;

  @Column({
    type: 'timestamptz',
    name: 'updated_at'
  })
  updatedAt: Date;

  @ManyToOne(() => UserOrmEntity, user => user.messagesUpdated)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: Relation<UserOrmEntity>;

  @Column({ name: 'updated_by', nullable: true })
  updatedById: string | null;

  @Column({ default: false })
  deleted: boolean;
}