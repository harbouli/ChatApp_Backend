import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessagesModule } from './messages/messages.module';
import { GatewayModule } from './gateway/gateway.module';
import entities from './utils/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter/dist/event-emitter.module';
import { DependenciesScanner } from '@nestjs/core/scanner';
// Main Module
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    //  Moduls Dependencies
    AuthModule,
    UsersModule,
    ConversationModule,
    MessagesModule,
    GatewayModule,
    //  Config .env File
    ConfigModule.forRoot({ envFilePath: '.env.development' }),

    PassportModule.register({ session: true }),
    //  Config DB
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: parseInt(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      synchronize: true,
      entities,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
