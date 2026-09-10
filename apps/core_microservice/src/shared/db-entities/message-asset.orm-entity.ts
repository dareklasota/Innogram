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
import { AssetOrmEntity } from './asset.orm-entity.js';

@Entity('messages_assets', {
  schema: DbSchema.MAIN
})
@Unique(['message', 'asset'])
export class MessageAssetOrmEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @ManyToOne(() => MessageOrmEntity, message => message.messageAssets)
  @JoinColumn({ name: 'message_id' })
  message: Relation<MessageOrmEntity>;

  @ManyToOne(() => AssetOrmEntity, asset => asset.messageAssets)
  @JoinColumn({ name: 'asset_id' })
  asset: Relation<AssetOrmEntity>;

  @Column({ name: 'order_index', default: 0 })
  orderIndex: number;

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