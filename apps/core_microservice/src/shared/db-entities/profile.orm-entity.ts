import { UserOrmEntity } from './user.orm-entity.js';
import { DbSchema } from '../enums/db-schema.enum.js';
import { PostOrmEntity } from './post.orm-entity.js';
import { CommentOrmEntity } from './comment.orm-entity.js';
import { MessageOrmEntity } from './message.orm-entity.js';
import { 
  Column, 
  Entity,
  JoinColumn, 
  OneToMany, 
  OneToOne, 
  PrimaryColumn,
  type Relation
} from 'typeorm';

@Entity('profiles', {
  schema: DbSchema.MAIN
})
export class ProfileOrmEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @OneToOne(() => UserOrmEntity, {
    cascade: true
  })
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserOrmEntity>;

  @OneToMany(() => PostOrmEntity, (post) => post.profile)
  posts: Relation<PostOrmEntity[]>;

  @OneToMany(() => CommentOrmEntity, comment => comment.profile)
  comments: Relation<CommentOrmEntity[]>;

  @OneToMany(() => MessageOrmEntity, message => message.createdBy)
  messages: Relation<MessageOrmEntity[]>;

  @Column({
    length: 50,
    unique: true
  })
  username: string;

  @Column({
    name: 'display_name',
    length: 100
  })
  displayName: string;

  @Column('date')
  birthday: Date;

  @Column({
    type: 'text',
    nullable: true
  })
  bio: string | null;

  @Column({
    type: 'varchar',
    name: 'avatar_url',
    length: 500,
    nullable: true,
  })
  avatarUrl: string | null;

  @Column({
    name: 'is_public',
    default: true
  })
  isPublic: boolean;

  @Column({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @OneToOne(() => UserOrmEntity)
  @JoinColumn({
    name: 'created_by',
  })
  createdBy: Relation<UserOrmEntity>;

  @Column({
    type: 'timestamptz',
    name: 'updated_at'
  })
  updatedAt: Date;

  @OneToOne(() => UserOrmEntity)
  @JoinColumn({
    name: 'updatedBy'
  })
  updatedBy: Relation<UserOrmEntity>;

  @Column({ default: false })
  deleted: boolean;
}