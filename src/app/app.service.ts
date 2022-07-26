import { Injectable } from '@nestjs/common';
import UserModel from '../../repository/models/user.model'

@Injectable()
export class AppService {
  async getUsers() {
    return [];
  }
}
