import {  Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from '@configs/test-controllers/container-health-check.controller';
import { RequestContextModule } from 'nestjs-request-context';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { GlobalCqrsModule } from '@configs/global-cqrs.module';
import mikroOrmConfig from '@configs/mikro-orm.config';
import { WinstonModule} from "nest-winston";
import { createWinstonConfig } from '@configs/custom-logger/custom-logger.config';
import {CreatePostNotificationController} from "@application/create-post-notification.controller";

@Module( {
  imports: [
    WinstonModule.forRoot( createWinstonConfig() ),
    ConfigModule.forRoot(),
    GlobalCqrsModule,
  ],
  controllers: [HealthController, CreatePostNotificationController], //TestController
  providers: [],
} )
export class AppModule {}
