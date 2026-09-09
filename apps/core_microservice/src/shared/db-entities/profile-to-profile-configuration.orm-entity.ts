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
import { ProfileConfigOrmEntity } from './profile-config.orm-entity.js';

@Entity('profiles_to_profiles_cinfigurations', {
  schema: DbSchema.MAIN
})
@Unique(['profile', 'profileConfiguration'])
export class ProfileToProfileConfigurationEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @ManyToOne(() => ProfileOrmEntity, profile => profile.profileConfigurations)
  @JoinColumn({ name: 'profile_id' })
  profile: Relation<ProfileOrmEntity>;

  @ManyToOne(() => ProfileConfigOrmEntity, config => config.profileConfigurations)
  @JoinColumn({ name: 'profile_configuration_id' })
  profileConfiguration: Relation<ProfileConfigOrmEntity>;

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