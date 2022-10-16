import { IoAdapter } from '@nestjs/platform-socket.io';
import { AuthenticatedSocket } from 'src/utils/interface';
import { Session, User } from 'src/utils/typeorm';
import { getRepository } from 'typeorm';
import * as cookieParser from 'cookie-parser';
import * as cookie from 'cookie';
import { plainToInstance } from 'class-transformer';

export class WebSocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: any) {
    const sessionRepository = getRepository(Session);
    const server = super.createIOServer(port, options);
    server.use(async (socket: AuthenticatedSocket, next) => {
      const { cookie: clientCookie } = socket.handshake.headers;
      if (!clientCookie) {
        return next(new Error('No Cookies Were Sent'));
      }
      const { CHAT_APP_SESSION_ID } = cookie.parse(clientCookie);
      if (!CHAT_APP_SESSION_ID) {
        return next(new Error('The Cookie Is Not Valid'));
      }
      const singedCookie = cookieParser.signedCookie(
        CHAT_APP_SESSION_ID,
        process.env.COOKIE_SECRET,
      );
      console.log(singedCookie);
      if (!singedCookie) {
        return next(new Error('Use Not Authenticated! Session Expired'));
      }
      const sessionDB = await sessionRepository.findOne({ id: singedCookie });
      const userDB = plainToInstance(
        User,
        JSON.parse(sessionDB.json).passport.user,
      );
      socket.user = userDB;
      next();
    });
    return server;
  }
}
