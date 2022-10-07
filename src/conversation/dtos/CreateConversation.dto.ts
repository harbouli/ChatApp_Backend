import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  @IsNumber()
  authorId: number;
  @IsNotEmpty()
  @IsNumber()
  recipientId: number;

  @IsNotEmpty()
  @IsString()
  message: string;
}
