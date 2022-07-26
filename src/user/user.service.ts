import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import UserRepository from '../../repository/implements/userImp'
import { Model } from 'mongoose'
import UserInterface from '../../repository/interface/user'

@Injectable()
export default class UserService {

    constructor(@InjectModel('user') private readonly userModel: Model<UserInterface>) { }

    signIn = async (event: any) => {
        return event
    }

    createUser = async ({ username, email, name, age }) => {
        const newUser = new this.userModel({
            username,
            email,
            name,
            age
        })
        return await newUser.save()
    }

}
