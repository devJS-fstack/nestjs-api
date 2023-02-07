import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUser } from "../../interfaces";

@Injectable()
export default class UserService {
    constructor(@InjectModel("user") private readonly userModel: Model<IUser>) {}

    signIn = async ({ username }: any = {}) => {
        return await this.userModel.findOne({ username });
    };

    createUser = async ({ username, email, name, age }) => {
        const newUser = new this.userModel({
            username,
            email,
            name,
            age,
        });
        return await newUser.save();
    };

    listUser = async () => {
        return await this.userModel.find({});
    };
}
