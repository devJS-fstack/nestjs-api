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

    login = async ({ email, password, username, typeLogin, fullName }: Partial<IUser>) => {
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

        if (typeLogin !== TYPE_LOGIN.DEFAULT) {
            const newUser: IUser = {
                email,
                fullName,
                typeLogin,
                username: email,
                password: "",
            };
            const accessToken = new BaseAuthentication().generateToken(newUser);
            if (isExist) {
                return {
                    ...isExist,
                    accessToken,
                };
            }

            const resultUser = await new this.userModel(newUser).save();
            return {
                ...newUser,
                _id: resultUser._id,
                accessToken,
            };
        }

        if (!isExist) {
            throw new HttpException("User not found", 401);
        }
        if (isExist.password !== password) {
            throw new UnauthorizedException();
        }
        const accessToken = new BaseAuthentication().generateToken(isExist);

        return {
            ...isExist,
            accessToken,
        };
    };

    createUser = async (user: IUser) => {
        const isExistUser = await this.userModel
            .findOne({
                $or: [
                    {
                        email: user.email,
                    },
                    {
                        username: user.username,
                    },
                ],
            })
            .lean();
        let resultUser: UserDocument;
        const accessToken = new BaseAuthentication().generateToken(user);
        if (user.typeLogin !== TYPE_LOGIN.DEFAULT) {
            if (!isExistUser) {
                resultUser = await new this.userModel(user).save();
                return {
                    ...user,
                    _id: resultUser._id,
                    accessToken,
                };
            }

            return {
                ...isExistUser,
                accessToken,
            };
        }
        if (isExistUser) {
            let message = "<field> already existed";
            if (isExistUser.email === user.email) {
                message = message.replace("<field>", "Email");
            } else if (isExistUser.username === user.username) {
                message = message.replace("<field>", "User name");
            }
            throw new HttpException(message, 400);
        }
        const newUser = await new this.userModel(user).save();
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
