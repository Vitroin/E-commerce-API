import { OrderStatus, PaymentMethod } from '@common/types';
import { Types } from 'mongoose';

export class CouponDetail {
    couponId!: Types.ObjectId
    discount!: number;
    code!: string;
}

export class OrderProduct {
    productId!: Types.ObjectId;
    quantity!: number;
    price!: number;
    discount!: number;
    totalPrice!: number;
}

export class Address {
    street!: string;
    city!: string;
    country!: string;
    code!: string;    
    phoneNumber!: string;
}

export class Order {
    readonly _id!: Types.ObjectId;  
    userId!: Types.ObjectId;    
    address!: Address; 
    products!: OrderProduct[]; 
    paymentMethod?: PaymentMethod;
    status?: OrderStatus;
    coupon?: CouponDetail; 
    totalAmount!: number;
}
