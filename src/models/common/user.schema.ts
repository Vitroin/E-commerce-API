import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true, discriminatorKey:"role" ,toJSON: {virtuals: true} })
export class User {
    readonly _id!: Types.ObjectId;

    @Prop({type: String, required: true})
    userName!: string;
    
    @Prop({type: String, required: true, unique: true})
    email!: string;

    @Prop({type: String, required: true})
    password!: string 

    @Prop({type: String, required: false})
    otp?:string

    @Prop({type: Date, required: false})
    otpExpiry?:Date

    @Prop({type: Boolean, default: false})
    isVerified?:Boolean
}

export const userSchema = SchemaFactory.createForClass(User);