import { MessageService } from './../message/message.service';
import { Room } from './room.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { log } from 'console';
import { Model } from 'mongoose';
import { Message } from 'src/message/message.schema';
import { User } from 'src/user/user.schema';
import UserService from 'src/user/user.service';

@Injectable()
export class RoomService {
  constructor(
    private readonly userService: UserService,
    private readonly msgService: MessageService,
    @InjectModel(Room.name) private roomModel: Model<Room>,
  ) {}
  async findRoom(title: string): Promise<Room> {
    return await this.roomModel.findOne({ roomTitle: title });
  }
  async createRoom(usernameList: string[], title: string): Promise<Room> {
    const users: User[] = [];
    for (const username of usernameList) {
      const user = await this.userService.getUser(username);
      if (user) {
        users.push(user);
      }
    }
    log('before users', users);

    const welcomeMsg = this.msgService.createMessage(
      new Message('안녕하세요 채팅방이 개설되었습니다 축하드립니다.'),
    );
    const room: Room = await new this.roomModel(
      new Room(await users, await welcomeMsg, title),
    ).save();
    (await welcomeMsg).room = room;
    users.forEach((user) => {
      user.chatRooms = [room];
    });
    return room;
  }
}
