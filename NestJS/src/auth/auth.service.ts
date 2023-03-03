import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string):  Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && bcrypt.compareSync(password, user?.password)) {
      const { password, ...result } = user;

      return result;
    }
  }
}
