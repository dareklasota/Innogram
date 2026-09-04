import { DbSchema } from '../enums/db-schema.enum.js';
import { UserRole } from '../enums/user-role.enum.js';
import { CommentOrmEntity } from './comment.orm-entity.js';
import { AssetOrmEntity } from './asset.orm-entity.js';
import { ChatOrmEntity } from './chat.orm-entity.js';
import { PostOrmEntity } from './post.orm-entity.js';
import { MessageOrmEntity } from './message.orm-entity.js';
import { ProfileConfigOrmEntity } from './profile-config.orm-entity.js';
import { 
  Column, 
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne, 
  PrimaryColumn,
  type Relation
} from 'typeorm';

@Entity('users', {
  schema: DbSchema.AUTH
})
export class UserOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  @OneToMany(() => CommentOrmEntity, comment => comment.createdBy)
  commentsCreated: Relation<CommentOrmEntity[]>;

  @OneToMany(() => CommentOrmEntity, comment => comment.updatedBy)
  commentsUpdated: Relation<CommentOrmEntity[]>;

  @OneToMany(() => AssetOrmEntity, asset => asset.createdBy)
  assetsCreated: Relation<AssetOrmEntity[]>;

  @OneToMany(() => AssetOrmEntity, asset => asset.updatedBy)
  assetsUpdated: Relation<AssetOrmEntity[]>;

  @OneToMany(() => ChatOrmEntity, chat => chat.createdBy)
  chatsCreated: Relation<ChatOrmEntity[]>;

  @OneToMany(() => ChatOrmEntity, chat => chat.updatedBy)
  chatsUpdated: Relation<ChatOrmEntity[]>;

  @OneToMany(() => MessageOrmEntity, message => message.createdBy)
  messagesCreated: Relation<MessageOrmEntity[]>;

  @OneToMany(() => MessageOrmEntity, message => message.updatedBy)
  messagesUpdated: Relation<MessageOrmEntity[]>;

  @OneToMany(() => PostOrmEntity, post => post.createdBy)
  postsCreated: Relation<PostOrmEntity[]>;

  @OneToMany(() => PostOrmEntity, post => post.updatedBy)
  postsUpdated: Relation<PostOrmEntity[]>;

  @OneToMany(() => ProfileConfigOrmEntity, config => config.createdBy)
  profileConfigurationsCreated: Relation<ProfileConfigOrmEntity>;

  @OneToMany(() => ProfileConfigOrmEntity, config => config.updatedBy)
  profileConfigurationsUpdated: Relation<ProfileConfigOrmEntity[]>;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @OneToOne(() => UserOrmEntity)
  @JoinColumn({ name: 'created_by' })
  createdBy: Relation<UserOrmEntity>;

  @Column({
    name: 'updated_at',
    type: 'timestamptz'
  })
  updatedAt: Date;

  @OneToOne(() => UserOrmEntity)
  @JoinColumn({
    name: 'updated_by'
  })
  updatedBy: Relation<UserOrmEntity>
} 