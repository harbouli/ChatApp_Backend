import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IParticipantsService } from 'src/participant/participants';
import { IUserService } from 'src/users/user';
import { Services } from 'src/utils/constants';
import { Conversation, User } from 'src/utils/typeorm';
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
    const { authorId, recipientId } = params;
    const userDB = await this.userService.findUser({ id: user.id });
    if (!userDB.participant)
      await this.createParticipantAndSaveUser(userDB, params.authorId);

    const recipient = await this.userService.findUser({
      id: recipientId,
    });

    if (!recipient)
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);

    if (!recipient.participant)
      await this.createParticipantAndSaveUser(recipient, recipientId);
    this.conversationRepository.create();
  }

  public async createParticipantAndSaveUser(user: User, id: number) {
    const participant = await this.participantService.createParticipant({ id });
    user.participant = participant;
    await this.userService.saveUser(user);
    return participant;
  }
}
