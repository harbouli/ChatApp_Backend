import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/utils/constants';
import { ChatParticipant } from 'src/utils/typeorm';
import { ParticipantService } from './participant.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatParticipant])],
  providers: [
    {
      provide: Services.PARTICIPANT,
      useClass: ParticipantService,
    },
  ],
  exports: [
    {
      provide: Services.PARTICIPANT,
      useClass: ParticipantService,
    },
  ],
})
export class ParticipantModule {}
