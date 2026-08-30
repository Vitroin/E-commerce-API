import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from '../common/user.schema';

@Schema({
  timestamps: true,
  discriminatorKey: 'role',
  toJSON: { virtuals: true },
})
export class Admin extends User {}

export const adminSchema = SchemaFactory.createForClass(Admin);
