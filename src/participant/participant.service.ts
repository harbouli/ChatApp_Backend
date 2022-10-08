import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatParticipant } from 'src/utils/typeorm';
import {
  CreateParticipationDetails,
  FindParticipationById,
} from 'src/utils/types';
import { Repository } from 'typeorm';
import { IParticipantsService } from './participants';

@Injectable()
export class ParticipantService implements IParticipantsService {
  constructor(
    @InjectRepository(ChatParticipant)
    private readonly participantRepository: Repository<ChatParticipant>,
  ) {}
  findParticipant(
    params: FindParticipationById,
  ): Promise<ChatParticipant | null> {
    return this.participantRepository.findOne(params);
  }
  createParticipant(
    params: CreateParticipationDetails,
  ): Promise<ChatParticipant> {
    const participant = this.participantRepository.create(params);
    return this.participantRepository.save(participant);
  }
}
