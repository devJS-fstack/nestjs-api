import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "../../schemas/user.schema"

@Injectable()
export default class UserService {
    constructor(@InjectModel("user") private readonly userModel: Model<UserDocument>) {}

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
