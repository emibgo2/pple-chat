import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { log } from 'console';
import { User } from './user.schema';

@Injectable()
export default class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUser(username: string): Promise<User> {
    try {
      const result = await this.userModel
        .findOne({ username: username })
        .lean();
      return result;
    } catch (e) {
      console.log('error', e);
    }
  }
  async createUser(user: User) {
    return await this.userModel
      .findOne({ username: user.username })
      .lean()
      .then((findUser) => {
        if (!findUser) {
          log('new user! ', user);
          return new this.userModel(user).save();
        }
        return findUser;
      });
  }
}
