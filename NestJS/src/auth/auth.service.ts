import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, password: string):  Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && bcrypt.compareSync(password, user?.password)) {
      const { password, ...result } = user; // 비밀번호를 제외한 결과

      return result;
    }
  }
}
