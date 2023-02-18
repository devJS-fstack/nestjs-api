import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ _id: false })
export class IBreeds {
    @Prop()
    primary: string;
    @Prop()
    secondary: string;
    @Prop()
    mixed: boolean;
    @Prop()
    unknown: boolean;
}

@Schema({ _id: false })
export class IColorAnimal {
    @Prop()
    primary: string;
    @Prop()
    secondary: string;
    @Prop()
    tertiary: string;
}

@Schema({ _id: false })
export class IPhotoAnimal {
    @Prop()
    small: string;
    @Prop()
    medium: string;
    @Prop()
    large: string;
    @Prop()
    full: string;
}

export enum Gender {
    MALE = "Male",
    FEMALE = "Female",
}

@Schema({ timestamps: true, versionKey: false })
export class IAnimal {
    @Prop()
    name: string;
    @Prop()
    type: string;
    @Prop()
    breeds: IBreeds;
    @Prop()
    colors: IColorAnimal;
    @Prop()
    age: string;
    @Prop({ enum: Gender })
    gender: string;
    @Prop()
    size: string;
    @Prop()
    description: string;
    @Prop()
    photos: IPhotoAnimal[];
    @Prop()
    videos: [];
}

export type AnimalDocument = HydratedDocument<IAnimal>;

export const AnimalSchema = SchemaFactory.createForClass(IAnimal);