import {  Module } from '@nestjs/common';
import { UnifiedLoginModule } from '@application/unified-login/unified-login.module';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from '@configs/test-controllers/container-health-check.controller';
import { RequestContextModule } from 'nestjs-request-context';
//import { RabbitMQModule } from '@infrastructure/rabbitmq/rabbitmq-module';
import { ContextInterceptor } from '@application/context/ContextInterceptor';
//import { TestController } from '@configs/test-controllers/rabbitmq-test.controller';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLHealthCheckResolver } from '@configs/test-controllers/graphql-test-resolver';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProfileModule } from '@application/profile/profile.module';
import { AccountModule } from '@application/account/account.module';
import { GlobalCqrsModule } from '@configs/global-cqrs.module';
import mikroOrmConfig from '@configs/mikro-orm.config';
import { join } from 'node:path';
import { WinstonModule } from 'nest-winston';
import { createWinstonConfig } from '@configs/custom-logger/custom-logger.config';

@Module( {
  imports: [
    WinstonModule.forRoot( createWinstonConfig() ),
    ConfigModule.forRoot(),
    GlobalCqrsModule,
    RequestContextModule,
    GraphQLModule.forRoot<ApolloDriverConfig>( {
      driver: ApolloDriver,
      autoSchemaFile: join( process.cwd(), 'src/schema.gql' ), // Automatically generates and saves the schema file
      sortSchema: true,
    } ),
    MikroOrmModule.forRoot( mikroOrmConfig ),
    //RabbitMQModule,
    UnifiedLoginModule,
    ProfileModule,
    AccountModule
  ],
  controllers: [HealthController], //TestController
  providers: [ContextInterceptor, GraphQLHealthCheckResolver],
} )
export class AppModule {}
