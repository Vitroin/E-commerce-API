import { Coupon } from "@models/index";
import { CreateCouponDto } from "../dto/create-coupon.dto";

export class CouponFactoryService{
    createCoupon(createCouponDto: CreateCouponDto, user:any ) {
        const coupon = new Coupon();

        coupon.code = createCouponDto.code;
        coupon.discountAmount = createCouponDto.discountAmount;
        coupon.discountType = createCouponDto.discountType;
        coupon.fromDate = createCouponDto.fromDate;
        coupon.toDate = createCouponDto.toDate;
        coupon.createdBy = user._id;
        coupon.updatedBy = user._id;
        coupon.active = createCouponDto.active;
        coupon.usedBy = [];
        coupon.assignedTo = createCouponDto.assignedTo?.map( (id)=> ({
            customerId: id, 
            count: 0}))
        
        return coupon;
    }
}