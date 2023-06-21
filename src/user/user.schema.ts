import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsUrl } from 'class-validator';
import mongoose, { Types } from 'mongoose';
import { Document } from 'mongoose';
import { Room } from 'src/room/room.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class User {
  @Prop({
    required: true,
    default: new Date(),
    type: mongoose.Schema.Types.Date,
  })
  createdAt: Date;

  @Prop({
    required: true,
    default: new Date(),
    type: mongoose.Schema.Types.Date,
  })
  updatedAt: Date;

  @Prop({ required: true, unique: true })
  @IsNotEmpty({ message: '닉네임은 비어있으면 안됩니다.' })
  username: string;

  @Prop({ required: true })
  @IsUrl()
  profileImgUrl: string;

  @Exclude()
  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: 'Room' }] })
  chatRooms: Room[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ username: 1 }, { unique: true });
