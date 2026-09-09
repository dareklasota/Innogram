import { UserOrmEntity } from './user.orm-entity.js';
import { DbSchema } from '../enums/db-schema.enum.js';
import { NotificationType } from '../enums/notification.enum.js';
import { 
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';

@Entity('notifications', {
  schema: DbSchema.NOTIFICATION
})
export class NotificationOrmEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'jsonb' })
  data: {};

  @Column({ name: 'is_read', default: false })
  isRead: boolean;

  @Column({ type: 'timestamptz', name: 'read_at' })
  readAt: Date;

  @Column({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;
  
  @ManyToOne(() => UserOrmEntity, user => user.notificationsCreated)
  @JoinColumn({ name: 'created_by '})
  createdBy: Relation<UserOrmEntity>;

  @Column({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UserOrmEntity, user => user.notificationsUpdated)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: Relation<UserOrmEntity>;
}