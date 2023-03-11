import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
    ) {}

  async validateUser(userId: string, reqPassword: string):  Promise<any> {
    const user = await this.userService.findOne(userId);
    if (!user) throw new BadRequestException('Not exist user ID');

    const matchPassword = bcrypt.compareSync(reqPassword, user?.password);
    if (!matchPassword) throw new BadRequestException('Incorrect password');

    // const { password, ...result } = user;

    const tokens = await this.getTokens(userId, user?.username);

    return tokens;
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username
        },
        {
          secret: `this.configService.get<string>('JWT_ACCESS_SECRET')`,
          expiresIn: '5m'
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username
        },
        {
          secret: `this.configService.get<string>('JWT_REFRESH_SECRET')`,
          expiresIn: '1d'
        }
      )
    ]);

    return { accessToken, refreshToken };
  }
}
