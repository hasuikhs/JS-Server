import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      id: 1,
      userId: 'test',
      username: 'test',
      password: '$2b$10$5yHfYRyW9AQHp2ZwLyTAF.gRHw06T4VrhJsz1s6rAMRQ4MJaAbqnK' //test
    }
  ];

  async findOne(userId: string): Promise<User | undefined> {
    return this.users.find(user => user.userId === userId);
  }

  // async create()
}
