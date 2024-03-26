import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(userData: CreateUserDto) {
    const createdUser = new this.userModel(userData);
    return await createdUser.save();
  }

  async findOne(username: string, password: string) {
    return await this.userModel.findOne({ username, password });
  }
}
