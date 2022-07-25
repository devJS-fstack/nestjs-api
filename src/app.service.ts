import { Injectable } from '@nestjs/common';
import MongoDB from '../repository/connection/mongoDB'
import UserModel from '../repository/models/user.model'

@Injectable()
export class AppService {
  async getUsers() {
    const mongoDB = new MongoDB();
    await mongoDB.connect();
    const data = await UserModel.find({})
    mongoDB.close()
    
    return data;
  }
}
