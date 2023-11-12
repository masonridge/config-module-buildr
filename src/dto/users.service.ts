import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  findOneUser(id: number): User {
    return { id: 1, name: 'mano', email: 'manoaunni@gmail.com' };
  }
}
