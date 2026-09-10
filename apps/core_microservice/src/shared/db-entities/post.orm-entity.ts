import { ProfileOrmEntity } from './profile.orm-entity.js';
import { DbSchema } from '../enums/db-schema.enum.js';
import { CommentOrmEntity } from './comment.orm-entity.js';
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

@Entity('posts', {
  schema: DbSchema.MAIN
})
export class PostOrmEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @ManyToOne(() => ProfileOrmEntity, (profile) => profile.posts)
  @JoinColumn({ name: 'profile_id' })
  profile: Relation<ProfileOrmEntity>;

  @OneToMany(() => CommentOrmEntity, comment => comment.post)
  comments: Relation<CommentOrmEntity[]>;

  @Column('text')
  content: string;

  @Column({ name: 'is_archived', default: false })
  isArchived: boolean;

  @Column({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @ManyToOne(() => UserOrmEntity, user => user.postsCreated)
  @JoinColumn({ name: 'created_by' })
  createdBy: Relation<UserOrmEntity>;

  @Column({
    type: 'timestamptz',
    name: 'updated_at'
  })
  updatedAt: Date;

  @ManyToOne(() => UserOrmEntity, user => user.postsUpdated)
  updatedBy: Relation<UserOrmEntity>;
}