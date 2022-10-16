import { OnEvent } from '@nestjs/event-emitter';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
})
export class MessagingGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    client.emit('connected', { status: 'good' });
  }

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {}

  @OnEvent('message.create')
  handleMessageCreateEvent(payload: any) {
    this.server.emit('onMessage', payload);
  }
}
