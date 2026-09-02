import { PaymentMethod } from '@common/types';
import { Type } from 'class-transformer';
import { IsEnum, IsMongoId, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

class AddressDto {
    @IsString()
    street!: string;

    @IsString()
    city!: string;

    @IsString()
    country!: string;

    @IsString()
    code!: string;

    @IsString()
    phoneNumber!: string;
}


class CouponDetail {
    @IsMongoId()
    couponId!: string;

    @IsNumber()
    discount!: number;

    @IsString()
    code!: string;
}

export class CreateOrderDto {
    @ValidateNested()
    @Type(() => AddressDto)
    address!: AddressDto;

    @IsEnum(PaymentMethod)
    @IsOptional()
    paymentMethod?: PaymentMethod;

    @ValidateNested()
    @Type(() => CouponDetail)
    @IsOptional()
    couponDetails?: CouponDetail;

    // products?: {
    //     productId: string;
    //     quantity: number;
    // }[];
}