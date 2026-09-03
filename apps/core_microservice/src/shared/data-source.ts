import 'dotenv/config';
import { DataSource } from 'typeorm';
// import { AccountOrmEntity } from './db-entities/account.orm-entity.js';
// import { AssetOrmEntity } from './db-entities/asset.orm-entity.js';
// import { ChatOrmEntity } from './db-entities/chat.orm-entity.js';
// import { CommentOrmEntity } from './db-entities/comment.orm-entity.js';
// import { MessageOrmEntity } from './db-entities/message.orm-entity.js';
// import { PostOrmEntity } from './db-entities/post.orm-entity.js';
// import { ProfileConfigOrmEntity } from './db-entities/profile-config.orm-entity.js';
// import { ProfileOrmEntity } from './db-entities/profile.orm-entity.js';
// import { UserOrmEntity } from './db-entities/user.orm-entity.js';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  entities: [
    // AccountOrmEntity,
    // AssetOrmEntity,
    // ChatOrmEntity,
    // CommentOrmEntity,
    // MessageOrmEntity,
    // PostOrmEntity,
    // ProfileConfigOrmEntity,
    // ProfileOrmEntity,
    // UserOrmEntity
  ],
  migrations: ['./src/shared/migrations/*{.ts,.js}']
});
