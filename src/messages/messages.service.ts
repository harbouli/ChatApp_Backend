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
  async getMessagesByConversationId(
    conversationId: number,
  ): Promise<Message[]> {
    return await this.messageRepository.find({
      where: {
        conversation: { id: conversationId },
      },
      relations: ['author'],
      // loadRelationIds:true
      order: { createdAt: 'DESC' },
    });
  }

  async createMessage({
    user,
    content,
    conversationId,
  }: CreateMessageParams): Promise<Message> {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
      relations: ['creator', 'recipient', 'lastMessage'],
    });
    const { creator, recipient } = conversation;
    if (!conversation)
      throw new HttpException('Conversation not found', HttpStatus.BAD_REQUEST);

    if (creator.id !== user.id && recipient.id !== user.id)
      throw new HttpException(
        'Can Not Connect to Conversation',
        HttpStatus.FORBIDDEN,
      );

    const createMessage = this.messageRepository.create({
      content,
      conversation,
      author: instanceToPlain(user),
    });
    const msg = await this.messageRepository.save(createMessage);
    conversation.lastMessage = msg;
    const svaeConversation = await this.conversationRepository.save(
      conversation,
    );
    return createMessage;
  }
}
