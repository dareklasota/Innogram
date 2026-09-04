import { UserOrmEntity } from './user.orm-entity.js';
import { DbSchema } from '../enums/db-schema.enum.js';
import { ChatType } from '../enums/chat-type.enum.js';
import { MessageOrmEntity } from './message.orm-entity.js';
import { 
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn, 
  OneToMany,
  type Relation
} from 'typeorm';

@Entity('chats', {
  schema: DbSchema.MAIN
})
export class ChatOrmEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @OneToMany(() => MessageOrmEntity, message => message.chat)
  messages: Relation<MessageOrmEntity[]>;
  
  @Column({ name: 'file_name', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ 
    type: 'enum',
    enum: ChatType,
    default: ChatType.PRIVATE
  })
  type: ChatType;

  @Column({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @ManyToOne(() => UserOrmEntity, user => user.chatsCreated)
  @JoinColumn({ name: 'created_by '})
  createdBy: Relation<UserOrmEntity>;

  @Column({
    type: 'timestamptz',
    name: 'updated_at'
  })
  updatedAt: Date;

  @ManyToOne(() => UserOrmEntity, user => user.chatsUpdated)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: Relation<UserOrmEntity>;

  @Column({ name: 'updated_by', nullable: true })
  updatedById: string | null;
}