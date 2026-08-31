import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { CouponFactoryService } from './factory/coupon.factory';
import { UserMongoModule } from '@shared/modules';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponRepository, CouponSchema } from '@models/index';

@Module({
  imports: [ UserMongoModule, MongooseModule.forFeature([{ name: 'Coupon', schema: CouponSchema }]) ],
  controllers: [CouponController],
  providers: [CouponService, CouponFactoryService, CouponRepository],
})
export class CouponModule {}
