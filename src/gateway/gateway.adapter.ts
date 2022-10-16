import { IoAdapter } from '@nestjs/platform-socket.io';
import { AuthenticatedSocket } from 'src/utils/interface';
import { Session } from 'src/utils/typeorm';
import { getRepository } from 'typeorm';

export class WebSocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: any) {
    const sessionRepository = getRepository(Session);
    const server = super.createIOServer(port, options);
    server.use(async (socket: AuthenticatedSocket, next) => {
      console.log('inside websocket adapter');
      console.log(socket.handshake.headers.cookie);
      next();
    });
    return server;
  }
}
