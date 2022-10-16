import { Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Services } from 'src/utils/constants';
import { AuthenticatedSocket } from 'src/utils/interface';
import { Message } from 'src/utils/typeorm';
import { IGatewaySessionManager } from './gateway.session';
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
})
export class MessagingGateway implements OnGatewayConnection {
  constructor(
    @Inject(Services.GATEWAY_SESSION_MANAGER)
    private readonly sessions: IGatewaySessionManager,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
    socket.emit('connected', { status: 'good' });
    this.sessions.setUserSocket(socket.user.id, socket);
  }

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {}

  @OnEvent('message.create')
  async handleMessageCreateEvent(payload: Message) {
    const {
      author,
      conversation: { creator, recipient },
    } = payload;
    const authorUserSocket = this.sessions.getUserSocket(author.id);
    const recipientSocket =
      author.id === creator.id
        ? this.sessions.getUserSocket(recipient.id)
        : this.sessions.getUserSocket(4);
    // console.log(`Recipient Is ${recipientSocket.user.email}`);

    if (recipientSocket) yrecipientSocket.emit('onMessage', payload);
    // this.server.emit('onMessage', payload);
    authorUserSocket.emit('onMessage', payload);
  }
}
