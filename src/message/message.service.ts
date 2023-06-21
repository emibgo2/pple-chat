import { Model } from 'mongoose';
import { Message } from './message.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async createMessage(msg: Message): Promise<Message> {
    return new this.messageModel(msg).save();
  }
}
