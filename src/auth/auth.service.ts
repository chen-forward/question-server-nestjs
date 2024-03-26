import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userService.findOne(username, password);

    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    const { password: p, ...userInfo } = user.toObject(); // eslint-disable-line

    return {
      token: this.jwtService.sign(userInfo),
    };
  }
}
