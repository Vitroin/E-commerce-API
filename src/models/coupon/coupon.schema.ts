import { SchemaType, SchemaTypes, Types } from 'mongoose';
import { DiscountType } from '@common/types';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class UserCoupon {
    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    customerId!: Types.ObjectId;

    @Prop({ type: Number, required: true, default: 0 })
    count!: number;
}

@Schema({ timestamps: true })
export class Coupon {
    @Prop({ type: String, required: true, unique: true })
    code!: string;

    @Prop({ type: Number, required: true })
    discountAmount!: number;

    @Prop({ type: String, enum: DiscountType, default: DiscountType.fixed_amount })
    discountType?: DiscountType;

    @Prop({ type: Date, required: true })
    fromDate!: Date;

    @Prop({ type: Date, required: true })
    toDate!: Date;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    createdBy!: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    updatedBy!: Types.ObjectId;

    @Prop({ type: Boolean, default: true })
    active!: boolean;

    @Prop({ type: [UserCoupon], default: [] })
    usedBy?: UserCoupon[];

    @Prop({ type: [UserCoupon] })
    assignedTo?: UserCoupon[];
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);