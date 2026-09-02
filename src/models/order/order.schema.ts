import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { PaymentMethod, OrderStatus } from '@common/types';

@Schema()
export class CouponDetail {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Coupon', required: true })
  couponId!: Types.ObjectId
  @Prop({ type: Number, required: true })
  discount!: number;
  @Prop({ type: String, required: true })
  code!: string;
}

@Schema()
export class OrderProduct {
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Product', required: true })
    productId!: Types.ObjectId;

    @Prop({ type: Number, required: true })
    quantity!: number;

    @Prop({ type: Number, required: true })
    price!: number;

    @Prop({ type: Number, required: true })
    discount!: number;

    @Prop({ type: Number, required: true })
    totalAmount!: number;
}

@Schema()
export class Address {
    @Prop({ type: String, required: true })
    street!: string;

    @Prop({ type: String, required: true })
    city!: string;

    @Prop({ type: String, required: true })
    country!: string;

    @Prop({ type: String, required: true })
    code!: string;

    @Prop({ type: String, required: true })
    phoneNumber!: string;
}

@Schema({ timestamps: true })
export class Order {
    readonly _id!: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Customer', required: true })
    userId!: Types.ObjectId;

    @Prop({ type: Address, required: true })
    address!: Address;

    @Prop({ type: [OrderProduct], required: true })
    products!: OrderProduct[];

    @Prop({ type: String, enum: PaymentMethod, default: PaymentMethod.COD })
    paymentMethod?: PaymentMethod;

    @Prop({ type: String, enum: OrderStatus, default: function(this:Order) {
      if ( this.paymentMethod === PaymentMethod.COD) {
        return OrderStatus.PLACED
      }return OrderStatus.PENDING
    } })
    status?: OrderStatus;

    @Prop({ type: CouponDetail })
    couponDetails?: CouponDetail;

    @Prop({ type: Number, required: true })
    totalAmount!: number;
}

export const orderSchema = SchemaFactory.createForClass(Order);
