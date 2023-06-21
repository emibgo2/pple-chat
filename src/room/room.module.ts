import { RoomController } from './room.controller';
import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import UserService from 'src/user/user.service';
import { MessageService } from 'src/message/message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './room.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { Message, MessageSchema } from 'src/message/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [RoomService, UserService, MessageService],
  controllers: [RoomController],
})
export class RoomModule {}
