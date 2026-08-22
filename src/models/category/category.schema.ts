import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaType, SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true })
export class Category{
    readonly _id!: Types.ObjectId;

    @Prop({ type:String, trim: true,required: true, unique: true })
    name!: string;
    @Prop({ type:String, trim: true,required: true, unique: true })
    slug!: string;
    @Prop({ type:SchemaTypes.ObjectId, ref: 'Admin', required: true })
    createdBy!: Types.ObjectId;
    //todo
    logo?: Object;
}

export const CategorySchema = SchemaFactory.createForClass(Category)