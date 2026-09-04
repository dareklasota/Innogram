import { DbSchema } from '../enums/db-schema.enum.js';
import { PostOrmEntity } from './post.orm-entity.js';
import { ProfileOrmEntity } from './profile.orm-entity.js';
import { UserOrmEntity } from './user.orm-entity.js';
import { 
  Column, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  OneToMany, 
  PrimaryColumn,
  type Relation
} from 'typeorm';

@Entity('comments', {
  schema: DbSchema.MAIN
})
export class CommentOrmEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @ManyToOne(() => PostOrmEntity, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Relation<PostOrmEntity>;

  @ManyToOne(() => ProfileOrmEntity, profile => profile.comments)
  @JoinColumn({ name: 'profile_id' })
  profile: Relation<ProfileOrmEntity>;

  @ManyToOne(() => CommentOrmEntity, comment => comment.children)
  @JoinColumn({ name: 'parent_comment_id' })
  parentComment: Relation<CommentOrmEntity>;

  @Column({ 
    name: 'parent_comment_id',
    nullable: true 
  })
  parentCommentId: string | null;

  @OneToMany(() => CommentOrmEntity, comment => comment.parentComment)
  children: Relation<CommentOrmEntity[]>;

  @Column('text')
  content: string;

  @Column({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @ManyToOne(() => UserOrmEntity, user => user.commentsCreated)
  @JoinColumn({ name: 'created_by' })
  createdBy: Relation<UserOrmEntity>;

  @Column({
    type: 'timestamptz',
    name: 'updated_at'
  })
  updatedAt: Date;

  @ManyToOne(() => UserOrmEntity, user => user.commentsUpdated)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: Relation<UserOrmEntity>;
}