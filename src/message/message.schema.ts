import { Room } from './../room/room.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import mongoose, { Types } from 'mongoose';
import { User } from 'src/user/user.schema';

export type RoomDocument = Message & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Message {
  constructor(content: string) {
    this.content = content;
  }

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Exclude()
  @Prop({ type: Types.ObjectId, ref: 'Room' })
  room: Room;

  @Prop({ required: true })
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
