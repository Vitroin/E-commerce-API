import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../common/user.schema';

@Schema({
  timestamps: true,
  discriminatorKey: 'role',
  toJSON: { virtuals: true },
})
export class Seller extends User {
  @Prop({ type: String, required: true })
  whatsappLink!: string;
}

export const sellerSchema = SchemaFactory.createForClass(Seller);
