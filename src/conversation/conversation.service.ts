import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IParticipantsService } from 'src/participant/participants';
import { IUserService } from 'src/users/user';
import { Services } from 'src/utils/constants';
import { ChatParticipant, Conversation, User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { CreateConversationDetails } from '../utils/types';
import { IConversationService } from './conversation';
@Injectable()
export class ConversationService implements IConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @Inject(Services.PARTICIPANT)
    private readonly participantService: IParticipantsService,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}
  async createConversation(user: User, params: CreateConversationDetails) {
    const userDB = await this.userService.findUser({ id: user.id });
    const { authorId, recipientId } = params;

    const participants: ChatParticipant[] = [];
    if (!userDB.participant) {
      const participant = await this.createParticipantAndSaveUser(
        userDB,
        authorId,
      );
      participants.push(participant);
    } else participants.push(userDB.participant);
    const recipient = await this.userService.findUser({
      id: recipientId,
    });

    if (!recipient)
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);

    if (!recipient.participant) {
      const participant = await this.createParticipantAndSaveUser(
        recipient,
        recipientId,
      );
      participants.push(participant);
    } else participants.push(recipient.participant);

    const newConversation = this.conversationRepository.create({
      participants,
    });
    return await this.conversationRepository.save(newConversation);
  }

  async findConversation(userId: number) {
    return this.participantService.findParticipantConversations(userId);
    // return await this.conversationRepository
    //   .createQueryBuilder('conversations')

    //   .leftJoinAndSelect('conversations.participants', 'participants')
    //   .getMany();
  }
  public async createParticipantAndSaveUser(user: User, id: number) {
    const participant = await this.participantService.createParticipant({ id });
    user.participant = participant;
    await this.userService.saveUser(user);
    return participant;
  }
  async findConversationById(id: number) {
    return this.conversationRepository.findOne(id, {
      relations: ['participants', 'participants.user'],
    });
  }
}
