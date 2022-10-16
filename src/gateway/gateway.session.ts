import { Injectable } from '@nestjs/common';
import { AuthenticatedSocket } from 'src/utils/interface';

export interface IGatewaySession {
  getSocketId(id: number);
}
@Injectable()
export class GatewaySessionManager implements IGatewaySession {
  private readonly session: Map<number, AuthenticatedSocket> = new Map();

  getSocketId(id: number) {
    return this.session.get(id);
  }
  setUserSocket(userId: number, socket: AuthenticatedSocket) {
    this.session.set(userId, socket);
  }
  removeUserSocket(userId: number) {
    this.session.delete(userId);
  }
  getSockets(): Map<number, AuthenticatedSocket> {
    return this.session;
  }
}
