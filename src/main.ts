import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeormStore } from 'connect-typeorm/out';
import { Session } from './utils/typeorm';
import * as session from 'express-session';
import * as passport from 'passport';
import { getRepository } from 'typeorm';
import { WebSocketAdapter } from './gateway/gateway.adapter';

async function bootstrap() {
  const { PORT, COOKIE_SECRET } = process.env;
  const app = await NestFactory.create(AppModule);
  const sessionRepository = getRepository(Session);
  // Set UP WebSocket Adapter
  const adapter = new WebSocketAdapter(app);
  app.useWebSocketAdapter(adapter);
  // Globsl Prifix
  app.setGlobalPrefix('api');
  // Use Golobal ValidationPipe
  app.useGlobalPipes(new ValidationPipe());
  // enable Cors Origin With Credentials
  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  // Set Up Session Cookie
  app.use(
    session({
      name: 'CHAT_APP_SESSION_ID',
      secret: COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 86400000, // cookie expires 1 day later
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  // Allowing Passport and Session Middleware
  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
