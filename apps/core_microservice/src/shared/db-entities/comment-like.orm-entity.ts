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
import { CommentOrmEntity } from './comment.orm-entity.js';

@Entity('comments_likes', {
  schema: DbSchema.MAIN
})
@Unique(['comment', 'profile'])
export class CommentLikeOrmEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @ManyToOne(() => CommentOrmEntity, comment => comment.commentLikes)
  @JoinColumn({ name: 'comment_id' })
  comment: Relation<CommentOrmEntity>;

  @ManyToOne(() => ProfileOrmEntity, profile =>profile.commentLikes)
  @JoinColumn({ name: 'profile_id' })
  profile: Relation<ProfileOrmEntity>;

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