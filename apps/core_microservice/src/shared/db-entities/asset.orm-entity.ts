import { UserOrmEntity } from "./user.orm-entity.js";
import { DbSchema } from "../enums/db-schema.enum.js";
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, type Relation } from "typeorm";

@Entity('assets', {
  schema: DbSchema.MAIN
})
export class AssetOrmEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @Column({ name: 'file_name', length: 255 })
  fileName: string;

  @Column({ name: 'file_path',length: 500 })
  filePath: string;

  @Column({ name: 'file_type', length: 100 })
  fileType: string;

  @Column({ name: 'file_size' })
  fileSize: number;

  @Column({ name: 'order_index', default: 0 })
  orderIndex: number

  @Column({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @ManyToOne(() => UserOrmEntity, user => user.assetsCreated)
  @JoinColumn({ name: 'created_by' })
  createdBy: Relation<UserOrmEntity>;

  @Column({
    type: 'timestamptz',
    name: 'updated_at'
  })
  updatedAt: Date;

  @ManyToOne(() => UserOrmEntity, user => user.assetsUpdated)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: Relation<UserOrmEntity>;
}