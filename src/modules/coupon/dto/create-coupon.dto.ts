import { DiscountType } from "@common/types";
import { Types } from "mongoose";

export class CreateCouponDto {       
        code!: string;
        discountAmount!: number; 
        discountType?: DiscountType;  
        fromDate!: Date; 
        toDate!: Date;
        active!: boolean;
        usedBy?: Types.ObjectId[];
        assignedTo?: Types.ObjectId[];
}
