import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Services } from 'src/utils/constants';

@Module({
  controllers: [MessagesController],
  providers: [
    {
      provide: Services.MESSAGE,
      useClass: MessagesService,
    },
  ],
})
export class MessagesModule {}
