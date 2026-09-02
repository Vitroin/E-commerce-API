import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CartModule } from '@modules/cart/cart.module';
import { ProductModule } from '@modules/product/product.module';
import { UserMongoModule } from '@shared/modules';
import { Order, OrderRepository, orderSchema } from '@models/index';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CartModule, 
    ProductModule,UserMongoModule ,   
    MongooseModule.forFeature([{ name: Order.name, schema: orderSchema }])],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
