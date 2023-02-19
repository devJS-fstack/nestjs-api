import { Injectable, HttpException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IUser } from "../../schemas/user.schema";
import { Model } from "mongoose";
import { UserDocument } from "../../schemas/user.schema";
import { BaseAuthentication } from "../../core/authentication";
import { TYPE_LOGIN } from "../../utils/constants";

@Injectable()
export default class UserService {
    constructor(@InjectModel("user") private readonly userModel: Model<UserDocument>) {}

    login = async ({ email, password, username }: Partial<IUser>) => {
        const isExist = await this.userModel
            .findOne({
                $or: [
                    {
                        email,
                    },
                    {
                        username,
                    },
                ],
            })
            .lean();
        if (!isExist) {
            throw new HttpException("User not found", 401);
        }
        if (isExist.password !== password && isExist.typeLogin === TYPE_LOGIN.DEFAULT) {
            throw new UnauthorizedException();
        }
        const accessToken = new BaseAuthentication().generateToken(isExist);

        return {
            ...isExist,
            accessToken,
        };
    };

    createUser = async (user: IUser) => {
        const isExistEmail = await this.userModel.findOne({ email: user.email });
        if (isExistEmail) {
            throw new HttpException("Email already existed", 400);
        }
        const isExistUsername = await this.userModel.findOne({ username: user.username });
        if (isExistUsername) {
            throw new HttpException("Username already existed", 400);
        }
        const newUser = await new this.userModel(user).save();
        const accessToken = new BaseAuthentication().generateToken(user);
        return {
            ...user,
            _id: newUser._id,
            accessToken,
        };
    };

    listUser = async () => {
        return await this.userModel.find({});
    };
}
