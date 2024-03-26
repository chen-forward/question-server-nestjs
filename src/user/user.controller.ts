import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Redirect,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/auth/decorators/public.decorators';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    try {
      return await this.userService.create(userDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('info')
  @Redirect('/api/auth/profile', 302) // http状态码 GET 请求 - 301 永久 302 临时
  async info() {
    return;
  }

  @Public()
  @Post('login')
  @Redirect('/api/auth/login', 307) // http状态码 POST 请求 - 308 永久 307 临时
  async login() {
    return;
  }
}
