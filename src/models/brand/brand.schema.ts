import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Brand {
  readonly _id!: Types.ObjectId;

  @Prop({ type: String, trim: true, required: true, unique: true })
  name!: string;
  @Prop({ type: String, trim: true, required: true, unique: true })
  slug!: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true })
  createdBy!: mongoose.Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true })
  updatedBy!: mongoose.Types.ObjectId;
  //todo
  logo?: Object;
}

export const brandSchema = SchemaFactory.createForClass(Brand);
