import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { IUserService } from 'src/users/user';
import { Services } from 'src/utils/constants';
import { Conversation, User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { CreateConversationDetails } from '../utils/types';
import { IConversationsService } from './conversation';
@Injectable()
export class ConversationService implements IConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}
  // Get Conversations Method
  async getConversations(id: number): Promise<Conversation[]> {
    // Query Conversation By User Id
    return this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.lastMessage', 'lastMessage')
      .leftJoin('conversation.creator', 'creator')
      .addSelect([
        'creator.id',
        'creator.firstName',
        'creator.lastName',
        'creator.email',
      ])
      .leftJoin('conversation.recipient', 'recipient')
      .addSelect([
        'recipient.id',
        'recipient.firstName',
        'recipient.lastName',
        'recipient.email',
      ])
      .where('creator.id = :id', { id })
      .orWhere('recipient.id = :id', { id })
      .orderBy('conversation.lastMessageSentAt', 'DESC')
      .getMany();
  }

  async findConversationById(id: number): Promise<Conversation> {
    return this.conversationRepository.findOne(id);
  }

  async createConversation(user: User, params: CreateConversationDetails) {
    const { recipientId } = params;
    // Validate If The Same Uesr
    if (user.id === params.recipientId)
      throw new HttpException(
        'Cannot Create Conversation',
        HttpStatus.BAD_REQUEST,
      );
    // Checking Existing If Conversation
    const existingConversation = await this.conversationRepository.findOne({
      where: [
        {
          creator: { id: user.id },
          recipient: { id: recipientId },
        },
        {
          creator: { id: recipientId },
          recipient: { id: user.id },
        },
      ],
    });

    if (existingConversation)
      throw new HttpException(
        'Conversation Is Already Exists',
        HttpStatus.CONFLICT,
      );
    // if Recipient is Exist
    const recipient = await this.userService.findUser({ id: recipientId });

    if (!recipient)
      throw new HttpException('Recipient not found', HttpStatus.BAD_REQUEST);
    // Create new Conversation
    const conversation = this.conversationRepository.create({
      creator: instanceToPlain(user),
      recipient: instanceToPlain(recipient),
    });
    // Save Conversation
    await this.conversationRepository.save(conversation);
    return new HttpException('Create Conversation', HttpStatus.CREATED);
  }
}
