import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../common/user.schema';

@Schema({
  timestamps: true,
  discriminatorKey: 'role',
  toJSON: { virtuals: true },
})
export class Customer extends User {
  @Prop({ type: Date })
  dob!: Date;
}

export const customerSchema = SchemaFactory.createForClass(Customer);
