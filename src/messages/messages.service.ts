import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Conversation, Message, User } from 'src/utils/typeorm';
import { CreateMessageParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IMessageService } from './message';

@Injectable()
export class MessagesService implements IMessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async createMessage({
    user,
    content,
    conversationId,
  }: CreateMessageParams): Promise<Message> {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
      relations: ['creator', 'recipient'],
    });
    const { creator, recipient } = conversation;
    if (!conversation)
      throw new HttpException('Conversation not found', HttpStatus.BAD_REQUEST);

    if (creator.id !== user.id && recipient.id !== user.id)
      throw new HttpException(
        'Can Not Connect to Conversation',
        HttpStatus.FORBIDDEN,
      );

    conversation.recipient = instanceToPlain(conversation.recipient) as User;
    conversation.creator = instanceToPlain(conversation.creator) as User;
    const createMessage = this.messageRepository.create({
      content,
      conversation,
      author: instanceToPlain(user),
    });
    return await this.messageRepository.save(createMessage);
  }
}
