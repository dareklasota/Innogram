import { 
  Check,
  Column,
  Entity,
  Index,
  JoinColumn, 
  ManyToOne, 
  PrimaryColumn,
  Unique,
  type Relation 
} from 'typeorm';
import { DbSchema } from '../enums/db-schema.enum.js';
import { UserOrmEntity } from './user.orm-entity.js';
import { ProfileOrmEntity } from './profile.orm-entity.js';

@Entity('profiles_follows', {
  schema: DbSchema.MAIN
})
@Unique(['followerProfile', 'followedProfile'])
@Check('"follower_profile_id" != "followed_profile_id"')
export class ProfileFollowOrmEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @ManyToOne(() => ProfileOrmEntity, profile => profile.following)
  @JoinColumn({ name: 'follower_profile_id' })
  followerProfile: Relation<ProfileOrmEntity>;

  @ManyToOne(() => ProfileOrmEntity, profile => profile.followers)
  @JoinColumn({ name: 'followed_profile_id' })
  followedProfile: Relation<ProfileOrmEntity>;

  @Column()
  accepted: boolean;

  @Column({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @ManyToOne(() => UserOrmEntity, user => user.messagesCreated)
  @JoinColumn({ name: 'created_by '})
  createdBy: Relation<UserOrmEntity>;
  
  @Column({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
  
  @ManyToOne(() => UserOrmEntity, user => user.messagesUpdated)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: Relation<UserOrmEntity>;
}