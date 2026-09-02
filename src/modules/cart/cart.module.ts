import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductModule } from '@modules/product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartRepository, cartSchema } from '@models/index';
import { UserMongoModule } from '@shared/modules';

@Module({
  imports: [
    UserMongoModule,
    ProductModule,
    MongooseModule.forFeature([{ name: Cart.name, schema: cartSchema }])
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository],
})
export class CartModule {}
