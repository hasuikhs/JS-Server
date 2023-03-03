import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'test',
      password: '$2b$10$5yHfYRyW9AQHp2ZwLyTAF.gRHw06T4VrhJsz1s6rAMRQ4MJaAbqnK' //test
    }
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
