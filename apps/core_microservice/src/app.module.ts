import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountOrmEntity } from './shared/db-entities/account.orm-entity.js';
import { AssetOrmEntity } from './shared/db-entities/asset.orm-entity.js';
import { ChatOrmEntity } from './shared/db-entities/chat.orm-entity.js';
import { CommentOrmEntity } from './shared/db-entities/comment.orm-entity.js';
import { MessageOrmEntity } from './shared/db-entities/message.orm-entity.js';
import { NotificationOrmEntity } from './shared/db-entities/notification.orm-entity.js';
import { PostOrmEntity } from './shared/db-entities/post.orm-entity.js';
import { ProfileConfigOrmEntity } from './shared/db-entities/profile-config.orm-entity.js';
import { ProfileOrmEntity } from './shared/db-entities/profile.orm-entity.js';
import { UserOrmEntity } from './shared/db-entities/user.orm-entity.js';
import { AuditLogOrmEntity } from './shared/db-entities/audit-log.orm-entity.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [
        UserOrmEntity,
        AccountOrmEntity,
        ProfileOrmEntity,
        PostOrmEntity,
        CommentOrmEntity,
        AssetOrmEntity,
        ChatOrmEntity,
        MessageOrmEntity,
        ProfileConfigOrmEntity,
        NotificationOrmEntity,
        AuditLogOrmEntity
      ],
      migrations: ['./apps/core_microservice/src/shared/migrations/*{.ts,.js}'],
      synchronize: false
    }),

    //AssetModule, AuthModule, ChatModule, ContentModule, ProfileModule
  ],
})
export class AppModule {}
