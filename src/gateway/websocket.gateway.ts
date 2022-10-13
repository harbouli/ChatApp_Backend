import { OnEvent } from '@nestjs/event-emitter';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: [process.env.WEB_HOST],
  },
})
export class MessagingGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log(client);
  }

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {}

  @OnEvent('message.create')
  handleMessageCreateEvent(payload: any) {
    console.log(payload);
    this.server.emit('onMessage', payload);
  }
}
