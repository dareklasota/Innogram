import { UserOrmEntity } from './user.orm-entity.js';
import { DbSchema } from '../enums/db-schema.enum.js';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, type Relation } from 'typeorm';

@Entity('audit_logs', {
  schema: DbSchema.MAIN
})
export class AuditLogOrmEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @ManyToOne(() => UserOrmEntity, user => user.auditLogs)
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserOrmEntity>;

  @Column({ length: 100 })
  action: string;

  @Column({ name: 'resource_type', length: 50 })
  resourceType: string;

  @Column({ name: 'resource_id',length: 36 })
  resourceId: string;

  @Column({ type: 'jsonb', name: 'old_values', nullable: true })
  oldValues: {};

  @Column({ type: 'jsonb', name: 'new_values', nullable: true })
  newValues: {};

  @Column({ type: 'inet', nullable: true })
  ipAddress: string;

  @Column({ type: 'text', name: 'user_agent', nullable: true })
  userAgent: number;

  @Column({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @ManyToOne(() => UserOrmEntity, user => user.auditLogsCreated)
  @JoinColumn({ name: 'created_by' })
  createdBy: Relation<UserOrmEntity>;

  @Column({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UserOrmEntity, user => user.auditLogsUpdated)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: Relation<UserOrmEntity>;
}