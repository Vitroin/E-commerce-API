import { DiscountType } from '@common/types';
import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';


@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Product {
  readonly _id!: Types.ObjectId;

  // ========== string
  @Prop({ type: String, required: true, trim: true })
  name!: string;

  @Prop({ type: String, required: true, trim: true })
  slug!: string;

  @Prop({ type: String, required: true, trim: true })
  description!: string;

  // ========== ids
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category', required: true })
  categoryId!: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Brand', required: true })
  brandId!: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true }) // Customer - Hr - Sales - Seller - Admin
  createdBy!: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  updatedBy!: Types.ObjectId;

  // ========== numbers
  @Prop({ type: Number, required: true, min: 1 }) // negative
  price!: number;

  @Prop({ type: Number, default: 0, min: 0 }) // negative
  discountAmount?: number; // >> 20 fixedAmount - percentage >> 14000 - 50% = 7000

  @Prop({
    type: String,
    enum: DiscountType,
    default: DiscountType.fixed_amount,
  })
  discountType?: DiscountType;

  @Virtual({
    get: function (this: Product) {
      if (this.discountType === DiscountType.fixed_amount) {
        return this.price - (this.discountAmount || 0);
      }
      return this.price - (this.price * (this.discountAmount || 0)) / 100;
    },
  })
  finalPrice?: number; // virtual field

  @Prop({ type: Number, default: 1, min: 0 })
  stock?: number;

  @Prop({ type: Number, min: 0 })
  sold?: number;

  // ========== specifications

  @Prop({ type: [String] }) // 1 >> 1 >> 0
  colors?: string[]; // red - green

  @Prop({ type: [String] }) // 1 >> 1 >> 0
  size?: string[]; // 1x - 2x - "45"
}

export const productSchema = SchemaFactory.createForClass(Product);
