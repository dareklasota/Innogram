import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AssetModule } from './assets/asset.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ChatModule } from './chats/chat.module.js';
import { ContentModule } from './content/content.module.js';
import { ProfileModule } from './profiles/profile.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountOrmEntity } from './shared/db-entities/account.orm-entity.js';
import { AssetOrmEntity } from './shared/db-entities/asset.orm-entity.js';
import { ChatOrmEntity } from './shared/db-entities/chat.orm-entity.js';
import { CommentOrmEntity } from './shared/db-entities/comment.orm-entity.js';
import { MessageOrmEntity } from './shared/db-entities/message.orm-entity.js';
import { PostOrmEntity } from './shared/db-entities/post.orm-entity.js';
import { ProfileConfigOrmEntity } from './shared/db-entities/profile-config.orm-entity.js';
import { ProfileOrmEntity } from './shared/db-entities/profile.orm-entity.js';
import { UserOrmEntity } from './shared/db-entities/user.orm-entity.js';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [
        AccountOrmEntity,
        AssetOrmEntity,
        ChatOrmEntity,
        CommentOrmEntity,
        MessageOrmEntity,
        PostOrmEntity,
        ProfileConfigOrmEntity,
        ProfileOrmEntity,
        UserOrmEntity
      ],
    migrations: ['./apps/core_microservice/src/shared/migrations/*{.ts,.js}'],
    synchronize: true
  }), 
  AssetModule, AuthModule, ChatModule, ContentModule, ProfileModule],
})
export class AppModule {}
