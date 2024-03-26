import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer } from './schemas/answer.schema';
import { Model } from 'mongoose';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private readonly answerModel: Model<Answer>,
  ) {}

  async create(answerInfo) {
    if (answerInfo == null) {
      throw new HttpException('缺少问卷 id', HttpStatus.BAD_REQUEST);
    }

    const answer = new this.answerModel(answerInfo);
    return await answer.save();
  }

  async count(questionId: string) {
    if (!questionId) return 0;
    return await this.answerModel.countDocuments({ questionId });
  }

  async findAll(questionId: string, opt: { page: number; pageSize: number }) {
    if (!questionId) return [];

    const { page = 1, pageSize = 10 } = opt;
    const list = await this.answerModel
      .find({ questionId })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ createAt: -1 });

    return list;
  }
}
