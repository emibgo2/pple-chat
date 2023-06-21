import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { log } from 'console';
import mongoose, { Types } from 'mongoose';
import { Message } from 'src/message/message.schema';
import { User } from 'src/user/user.schema';

export type RoomDocument = Room & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Room {
  constructor(users: User[], welcomeMsg: Message, title: string) {
    log(users);
    this.joinUser = users;
    this.messages = [welcomeMsg];
    this.roomTitle = title;
  }

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ required: true })
  roomTitle: string;

  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: 'User' }] })
  joinUser: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
  messages: Message[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
