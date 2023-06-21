import { Controller, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.schema';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get(':roomTitle')
  async getRoom(@Param('roomTitle') roomTitle: string): Promise<Room> {
    return await this.roomService.findRoom(roomTitle);
  }
}
