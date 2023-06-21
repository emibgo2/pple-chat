import { IsNotEmpty, MinLength } from 'class-validator';

export class RoomDto {
  @MinLength(2)
  usernames: string[];
  @IsNotEmpty()
  roomName: string;
}
