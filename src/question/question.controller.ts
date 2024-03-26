import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionDto } from './dto/question.dto';
import { Public } from 'src/auth/decorators/public.decorators';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Request() req) {
    const { username } = req.user;
    return this.questionService.create(username);
  }

  @Get()
  async findAll(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('isDeleted') isDeleted: boolean = false,
    @Query('isStar') isStar: boolean = false,
    @Request() req,
  ) {
    const { username } = req.user;
    const list = await this.questionService.findAllList({
      keyword,
      page,
      pageSize,
      isDeleted,
      isStar,
      author: username,
    });

    const count = await this.questionService.countAll({
      keyword,
      isDeleted,
      isStar,
      author: username,
    });

    return {
      list,
      count,
    };
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() questionDto: QuestionDto,
    @Request() req,
  ) {
    const { username } = req.user;
    return this.questionService.update(id, questionDto, username);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req) {
    const { username } = req.user;
    return this.questionService.delete(id, username);
  }

  @Delete()
  async deleteMany(@Body() body, @Request() req) {
    const { username } = req.user;
    const { ids = [] } = body;
    return await this.questionService.deleteMany(ids, username);
  }

  @Post('duplicate/:id')
  async duplicate(@Param('id') id: string, @Request() req) {
    const { username } = req.user;
    return await this.questionService.duplicate(id, username);
  }
}
