import { Module } from '@nestjs/common';
import { StatController } from './stat.controller';
import { StatService } from './stat.service';
import { QuestionModule } from 'src/question/question.module';
import { AnswerModule } from 'src/answer/answer.module';

@Module({
  imports: [QuestionModule, AnswerModule],
  controllers: [StatController],
  providers: [StatService],
})
export class StatModule {}
