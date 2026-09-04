import { IsValidToDate } from '@common/decorators';
import { IsValidDiscount } from '@common/decorators/discount.decorator';
import { DiscountType } from '@common/types';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Length,
  MinDate,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 5)
  code!: string;

  @IsValidDiscount()
  discountAmount!: number;

  @IsString()
  @IsEnum(DiscountType)
  discountType?: DiscountType;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date(Date.now()))
  fromDate!: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsValidToDate()
  toDate!: Date;

  @IsBoolean()
  active!: boolean;

  @IsArray()
  @IsMongoId({ each: true })
  assignedTo?: Types.ObjectId[];
}
