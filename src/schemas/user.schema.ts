import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<IUser>;

@Schema({ timestamps: true, versionKey: false })
export class IUser {
    @Prop()
    username: string;
    @Prop()
    email: string;
    @Prop()
    fullName: string;
    @Prop()
    password: string;
    @Prop()
    typeLogin: string;
    @Prop()
    imgUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(IUser);
