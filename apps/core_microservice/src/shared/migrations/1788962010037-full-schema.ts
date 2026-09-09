import { MigrationInterface, QueryRunner } from "typeorm";

export class FullSchema1788962010037 implements MigrationInterface {
    name = 'FullSchema1788962010037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS main`);
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS auth`);
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS notification`);
        await queryRunner.query(`CREATE TYPE "main"."chats_participants_role_enum" AS ENUM('admin', 'member')`);
        await queryRunner.query(`CREATE TABLE "main"."chats_participants" ("id" character varying(36) NOT NULL, "role" "main"."chats_participants_role_enum" NOT NULL DEFAULT 'member', "joined_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "left_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "profile_id" character varying(36), "chat_id" character varying(36), "created_by " character varying, "updated_by" character varying, CONSTRAINT "UQ_e35913d87eff79d4430313e0b1b" UNIQUE ("profile_id", "chat_id"), CONSTRAINT "PK_bb39212ca0dee99682bd6904cdd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."messages_assets" ("id" character varying(36) NOT NULL, "order_index" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "message_id" character varying(36), "asset_id" character varying(36), "created_by " character varying, "updated_by" character varying, CONSTRAINT "UQ_92ea43d89895e77cb318982e49b" UNIQUE ("message_id", "asset_id"), CONSTRAINT "PK_4d47a1f95626bec47fa39c0bdd9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."posts_assets" ("id" character varying(36) NOT NULL, "order_index" integer NOT NULL DEFAULT '0', "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_by" character varying, "post_id" character varying(36), "asset_id" character varying(36), "created_by" character varying, CONSTRAINT "UQ_1188729b8baab72f24202b316ea" UNIQUE ("post_id", "asset_id"), CONSTRAINT "PK_c09218a1fdc5f87ee3dd32a8562" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."posts_likes" ("id" character varying(36) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "post_id" character varying(36), "profile_id" character varying(36), "created_by " character varying, "updated_by" character varying, CONSTRAINT "UQ_327119983a4164ea0c937df1f43" UNIQUE ("post_id", "profile_id"), CONSTRAINT "PK_2038d34048d51b766bca272ff5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."profiles_follows" ("id" character varying(36) NOT NULL, "accepted" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "follower_profile_id" character varying(36), "followed_profile_id" character varying(36), "created_by " character varying, "updated_by" character varying, CONSTRAINT "UQ_32580493d46f0f04500d87560ee" UNIQUE ("follower_profile_id", "followed_profile_id"), CONSTRAINT "CHK_888580cbe4d7c70690944915cc" CHECK ("follower_profile_id" != "followed_profile_id"), CONSTRAINT "PK_2afda6a64450b244f2afc2340f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."profiles_to_profiles_cinfigurations" ("id" character varying(36) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "profile_id" character varying(36), "profile_configuration_id" character varying(36), "created_by " character varying, "updated_by" character varying, CONSTRAINT "UQ_15d067714f2c8230c44b328b431" UNIQUE ("profile_id", "profile_configuration_id"), CONSTRAINT "PK_e90b2608d761a5b8f911e1a0ed4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."comments_likes" ("id" character varying(36) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "comment_id" character varying(36), "profile_id" character varying(36), "created_by " character varying, "updated_by" character varying, CONSTRAINT "UQ_9a8c3cd3bd75b88739122a8ad59" UNIQUE ("comment_id", "profile_id"), CONSTRAINT "PK_76e988dd40034228052b54157cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "notification"."notifications_type_enum" AS ENUM('like', 'comment', 'follow', 'subscription', 'system')`);
        await queryRunner.query(`CREATE TABLE "notification"."notifications" ("id" character varying(36) NOT NULL, "type" "notification"."notifications_type_enum" NOT NULL, "title" character varying(255) NOT NULL, "data" jsonb NOT NULL, "is_read" boolean NOT NULL DEFAULT false, "read_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_by " character varying, "updated_by" character varying, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."audit_logs" ("id" character varying(36) NOT NULL, "action" character varying(100) NOT NULL, "resource_type" character varying(50) NOT NULL, "resource_id" character varying(36) NOT NULL, "old_values" jsonb, "new_values" jsonb, "ipAddress" inet, "user_agent" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "user_id" character varying, "created_by" character varying, "updated_by" character varying, CONSTRAINT "PK_1bb179d048bbc581caa3b013439" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "main"."messages" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "main"."chats_participants" ADD CONSTRAINT "FK_68021766bd3dd7f7fb71c3273bc" FOREIGN KEY ("profile_id") REFERENCES "main"."profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."chats_participants" ADD CONSTRAINT "FK_1511c4daef0688dfba61bbc2021" FOREIGN KEY ("chat_id") REFERENCES "main"."chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."chats_participants" ADD CONSTRAINT "FK_4195246bca5480d65886245b064" FOREIGN KEY ("created_by ") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."chats_participants" ADD CONSTRAINT "FK_0aab09d1a1d52910cbdf97c6d1c" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."messages_assets" ADD CONSTRAINT "FK_d8d48ea4985e94a520b2159f3af" FOREIGN KEY ("message_id") REFERENCES "main"."messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."messages_assets" ADD CONSTRAINT "FK_27f4e06be67fbe5888840b5ab39" FOREIGN KEY ("asset_id") REFERENCES "main"."assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."messages_assets" ADD CONSTRAINT "FK_c383df6bb602c826fb63fba5e27" FOREIGN KEY ("created_by ") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."messages_assets" ADD CONSTRAINT "FK_3cb385c17b260de104cc81398cd" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."posts_assets" ADD CONSTRAINT "FK_af7c44cddba02664bdd375707c4" FOREIGN KEY ("post_id") REFERENCES "main"."posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."posts_assets" ADD CONSTRAINT "FK_e14e8b24da991d85f9ba90465b8" FOREIGN KEY ("asset_id") REFERENCES "main"."assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."posts_assets" ADD CONSTRAINT "FK_487941f5f655edddc6874166ea6" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."posts_assets" ADD CONSTRAINT "FK_fecb822cac17c2af443334ed48b" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."posts_likes" ADD CONSTRAINT "FK_6faf9115f9ab73dd332d218e9ba" FOREIGN KEY ("post_id") REFERENCES "main"."posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."posts_likes" ADD CONSTRAINT "FK_87047bfd925f32570f16d9ceec0" FOREIGN KEY ("profile_id") REFERENCES "main"."profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."posts_likes" ADD CONSTRAINT "FK_a621fd850f84f8d3480a302cfad" FOREIGN KEY ("created_by ") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."posts_likes" ADD CONSTRAINT "FK_1783d2bf6ceea78827c0c267463" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_follows" ADD CONSTRAINT "FK_722f4fb48096271c96380c6278c" FOREIGN KEY ("follower_profile_id") REFERENCES "main"."profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_follows" ADD CONSTRAINT "FK_90bd341302feb51c5eaa57aab32" FOREIGN KEY ("followed_profile_id") REFERENCES "main"."profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_follows" ADD CONSTRAINT "FK_330baf114d57da74a8427429e00" FOREIGN KEY ("created_by ") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_follows" ADD CONSTRAINT "FK_60ebef205b7d70c7103f8ec6e3f" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_to_profiles_cinfigurations" ADD CONSTRAINT "FK_a6335253c9c52c67b9cbab02e1f" FOREIGN KEY ("profile_id") REFERENCES "main"."profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_to_profiles_cinfigurations" ADD CONSTRAINT "FK_419ea3c085b279e5a67331ef409" FOREIGN KEY ("profile_configuration_id") REFERENCES "main"."profile_configurations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_to_profiles_cinfigurations" ADD CONSTRAINT "FK_d53f2c982704eb66fdb20ee865a" FOREIGN KEY ("created_by ") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_to_profiles_cinfigurations" ADD CONSTRAINT "FK_537fc2b7375954c9ef0e14feb53" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."comments_likes" ADD CONSTRAINT "FK_fab744c7db7ccbe1ded65166d73" FOREIGN KEY ("comment_id") REFERENCES "main"."comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."comments_likes" ADD CONSTRAINT "FK_1e3f43ccd0f517f3d248b952834" FOREIGN KEY ("profile_id") REFERENCES "main"."profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."comments_likes" ADD CONSTRAINT "FK_f455aba8cf7b0a937c5cbc978d2" FOREIGN KEY ("created_by ") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."comments_likes" ADD CONSTRAINT "FK_29029678099aef7c8e4b00cd3ad" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification"."notifications" ADD CONSTRAINT "FK_32a8c406c988d98e8548d4432d2" FOREIGN KEY ("created_by ") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification"."notifications" ADD CONSTRAINT "FK_e0517903116b233d60423efa296" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."audit_logs" ADD CONSTRAINT "FK_bd2726fd31b35443f2245b93ba0" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."audit_logs" ADD CONSTRAINT "FK_8532632c77cc7a1da52966cb37f" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."audit_logs" ADD CONSTRAINT "FK_11acfa80f86df2becee8b55a328" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "main"."audit_logs" DROP CONSTRAINT "FK_11acfa80f86df2becee8b55a328"`);
        await queryRunner.query(`ALTER TABLE "main"."audit_logs" DROP CONSTRAINT "FK_8532632c77cc7a1da52966cb37f"`);
        await queryRunner.query(`ALTER TABLE "main"."audit_logs" DROP CONSTRAINT "FK_bd2726fd31b35443f2245b93ba0"`);
        await queryRunner.query(`ALTER TABLE "notification"."notifications" DROP CONSTRAINT "FK_e0517903116b233d60423efa296"`);
        await queryRunner.query(`ALTER TABLE "notification"."notifications" DROP CONSTRAINT "FK_32a8c406c988d98e8548d4432d2"`);
        await queryRunner.query(`ALTER TABLE "main"."comments_likes" DROP CONSTRAINT "FK_29029678099aef7c8e4b00cd3ad"`);
        await queryRunner.query(`ALTER TABLE "main"."comments_likes" DROP CONSTRAINT "FK_f455aba8cf7b0a937c5cbc978d2"`);
        await queryRunner.query(`ALTER TABLE "main"."comments_likes" DROP CONSTRAINT "FK_1e3f43ccd0f517f3d248b952834"`);
        await queryRunner.query(`ALTER TABLE "main"."comments_likes" DROP CONSTRAINT "FK_fab744c7db7ccbe1ded65166d73"`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_to_profiles_cinfigurations" DROP CONSTRAINT "FK_537fc2b7375954c9ef0e14feb53"`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_to_profiles_cinfigurations" DROP CONSTRAINT "FK_d53f2c982704eb66fdb20ee865a"`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_to_profiles_cinfigurations" DROP CONSTRAINT "FK_419ea3c085b279e5a67331ef409"`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_to_profiles_cinfigurations" DROP CONSTRAINT "FK_a6335253c9c52c67b9cbab02e1f"`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_follows" DROP CONSTRAINT "FK_60ebef205b7d70c7103f8ec6e3f"`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_follows" DROP CONSTRAINT "FK_330baf114d57da74a8427429e00"`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_follows" DROP CONSTRAINT "FK_90bd341302feb51c5eaa57aab32"`);
        await queryRunner.query(`ALTER TABLE "main"."profiles_follows" DROP CONSTRAINT "FK_722f4fb48096271c96380c6278c"`);
        await queryRunner.query(`ALTER TABLE "main"."posts_likes" DROP CONSTRAINT "FK_1783d2bf6ceea78827c0c267463"`);
        await queryRunner.query(`ALTER TABLE "main"."posts_likes" DROP CONSTRAINT "FK_a621fd850f84f8d3480a302cfad"`);
        await queryRunner.query(`ALTER TABLE "main"."posts_likes" DROP CONSTRAINT "FK_87047bfd925f32570f16d9ceec0"`);
        await queryRunner.query(`ALTER TABLE "main"."posts_likes" DROP CONSTRAINT "FK_6faf9115f9ab73dd332d218e9ba"`);
        await queryRunner.query(`ALTER TABLE "main"."posts_assets" DROP CONSTRAINT "FK_fecb822cac17c2af443334ed48b"`);
        await queryRunner.query(`ALTER TABLE "main"."posts_assets" DROP CONSTRAINT "FK_487941f5f655edddc6874166ea6"`);
        await queryRunner.query(`ALTER TABLE "main"."posts_assets" DROP CONSTRAINT "FK_e14e8b24da991d85f9ba90465b8"`);
        await queryRunner.query(`ALTER TABLE "main"."posts_assets" DROP CONSTRAINT "FK_af7c44cddba02664bdd375707c4"`);
        await queryRunner.query(`ALTER TABLE "main"."messages_assets" DROP CONSTRAINT "FK_3cb385c17b260de104cc81398cd"`);
        await queryRunner.query(`ALTER TABLE "main"."messages_assets" DROP CONSTRAINT "FK_c383df6bb602c826fb63fba5e27"`);
        await queryRunner.query(`ALTER TABLE "main"."messages_assets" DROP CONSTRAINT "FK_27f4e06be67fbe5888840b5ab39"`);
        await queryRunner.query(`ALTER TABLE "main"."messages_assets" DROP CONSTRAINT "FK_d8d48ea4985e94a520b2159f3af"`);
        await queryRunner.query(`ALTER TABLE "main"."chats_participants" DROP CONSTRAINT "FK_0aab09d1a1d52910cbdf97c6d1c"`);
        await queryRunner.query(`ALTER TABLE "main"."chats_participants" DROP CONSTRAINT "FK_4195246bca5480d65886245b064"`);
        await queryRunner.query(`ALTER TABLE "main"."chats_participants" DROP CONSTRAINT "FK_1511c4daef0688dfba61bbc2021"`);
        await queryRunner.query(`ALTER TABLE "main"."chats_participants" DROP CONSTRAINT "FK_68021766bd3dd7f7fb71c3273bc"`);
        await queryRunner.query(`ALTER TABLE "main"."messages" ADD "description" text`);
        await queryRunner.query(`DROP TABLE "main"."audit_logs"`);
        await queryRunner.query(`DROP TABLE "notification"."notifications"`);
        await queryRunner.query(`DROP TYPE "notification"."notifications_type_enum"`);
        await queryRunner.query(`DROP TABLE "main"."comments_likes"`);
        await queryRunner.query(`DROP TABLE "main"."profiles_to_profiles_cinfigurations"`);
        await queryRunner.query(`DROP TABLE "main"."profiles_follows"`);
        await queryRunner.query(`DROP TABLE "main"."posts_likes"`);
        await queryRunner.query(`DROP TABLE "main"."posts_assets"`);
        await queryRunner.query(`DROP TABLE "main"."messages_assets"`);
        await queryRunner.query(`DROP TABLE "main"."chats_participants"`);
        await queryRunner.query(`DROP TYPE "main"."chats_participants_role_enum"`);
    }

}
