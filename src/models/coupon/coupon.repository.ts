import { AbstractRepository } from '../abstract.repository';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon } from './coupon.schema';

@Injectable()
export class CouponRepository extends AbstractRepository<Coupon> {
  constructor(@InjectModel(Coupon.name) couponModel: Model<Coupon>) {
    super(couponModel);
  }
}
