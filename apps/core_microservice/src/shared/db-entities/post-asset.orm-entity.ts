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
import { PostOrmEntity } from './post.orm-entity.js';
import { AssetOrmEntity } from './asset.orm-entity.js';
import { UserOrmEntity } from './user.orm-entity.js';

@Entity('posts_assets', {
  schema: DbSchema.MAIN
})
@Unique(['post', 'asset'])
export class PostAssetOrmEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @ManyToOne(() => PostOrmEntity, post => post.postAssets)
  @JoinColumn({ name: 'post_id' })
  post: Relation<PostOrmEntity>;

  @ManyToOne(() => AssetOrmEntity, asset => asset.postAssets)
  @JoinColumn({ name: 'asset_id' })
  asset: Relation<AssetOrmEntity>;

  @Column({ name: 'order_index', default: 0 })
  orderIndex: number;

  @ManyToOne(() => UserOrmEntity, user => user.messagesCreated)
  @JoinColumn({ name: 'created_by'})
  createdBy: Relation<UserOrmEntity>;
  
  @Column({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
  
  @ManyToOne(() => UserOrmEntity, user => user.messagesUpdated)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: Relation<UserOrmEntity>;
  
  @Column({ name: 'updated_by', nullable: true })
  updatedById: string | null;
}