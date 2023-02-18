import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<IUser>;

@Schema({ timestamps: { createdAt: "created", updatedAt: "updated" } })
export class IUser {
    @Prop()
    username: string;
    @Prop()
    email: string;
    @Prop()
    name: string;
    @Prop()
    age: string;
}

export const UserSchema = SchemaFactory.createForClass(IUser);