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
import { MessageOrmEntity } from './message.orm-entity.js';
import { PostOrmEntity } from './post.orm-entity.js';
import { ProfileOrmEntity } from './profile.orm-entity.js';

@Entity('posts_likes', {
  schema: DbSchema.MAIN
})
@Unique(['post', 'profile'])
export class PostLikeOrmEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @ManyToOne(() => PostOrmEntity, post => post.postLikes)
  @JoinColumn({ name: 'post_id' })
  post: Relation<PostOrmEntity>;

  @ManyToOne(() => ProfileOrmEntity, profile => profile.postLikes)
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