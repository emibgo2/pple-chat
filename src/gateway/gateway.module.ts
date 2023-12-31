import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { RoomService } from 'src/room/room.service';
import UserService from 'src/user/user.service';
import { MessageService } from 'src/message/message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/message/message.schema';
import { Room, RoomSchema } from 'src/room/room.schema';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [MyGateway, RoomService, UserService, MessageService],
})
export class GatewayModule {}
