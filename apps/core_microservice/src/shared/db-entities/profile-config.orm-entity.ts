import { UserOrmEntity } from './user.orm-entity.js';
import { DbSchema } from '../enums/db-schema.enum.js';
import { 
  Entity, 
  PrimaryColumn, 
  Column, 
  ManyToOne,
  JoinColumn,
  type Relation
} from 'typeorm';

@Entity('profile_configurations', {
  schema: DbSchema.MAIN
})
export class ProfileConfigOrmEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @Column({ name: 'config_key', length: 100 })
  configKey: string;

  @Column({ name: 'is_admin_accessible_only', default: false })
  isAdminAccessibleOnly: boolean;

  @Column({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @ManyToOne(() => UserOrmEntity, user => user.profileConfigurationsCreated)
  @JoinColumn({ name: 'created_by' })
  createdBy: Relation<UserOrmEntity>;

  @Column({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;

  @ManyToOne(() => UserOrmEntity, user => user.profileConfigurationsUpdated)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: Relation<UserOrmEntity>;

  @Column({ name: 'updated_by', nullable: true })
  updatedById: string;
}