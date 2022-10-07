import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  @IsNumber()
  authId: number;
  @IsNotEmpty()
  @IsNumber()
  recipientId: number;

  @IsNotEmpty()
  @IsString()
  message: string;
}
