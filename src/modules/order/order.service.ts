import { OrderRepository, ProductRepository } from '@models/index';
import { CartService } from '@modules/cart/cart.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';

type FailedProduct = { productId: Types.ObjectId; reason: string };

type CreateOrderResult =
  | { success: true; order: any }
  | { success: false; failedProducts: FailedProduct[] };

@Injectable()
export class OrderService {
  constructor(
    private readonly cartService: CartService,
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
    user: any,
  ): Promise<CreateOrderResult> {
    const cart = await this.cartService.findOne(user);

    if ((cart.products ?? []).length === 0) {
      throw new NotFoundException('Cart is empty. Cannot create order.');
    }

    const failProducts: FailedProduct[] = [];
    const successProducts: {
      productId: Types.ObjectId;
      quantity: number;
      price: number;
      discount: number;
      totalAmount: number;
    }[] = [];

    for (const product of cart.products ?? []) {
      const productExist = await this.productRepository.getOne({
        _id: product.productId,
      });

      if (!productExist) {
        failProducts.push({
          productId: product.productId,
          reason: 'Product not found',
        });
        continue;
      }

      if (productExist.stock < product.quantity) {
        failProducts.push({
          productId: product.productId,
          reason: 'Insufficient stock',
        });
        continue;
      }

      const discount = productExist.discountAmount || 0;
      const totalAmount =
        productExist.finalPrice * product.quantity * (1 - discount / 100);

      successProducts.push({
        productId: product.productId,
        quantity: product.quantity,
        price: productExist.finalPrice,
        discount,
        totalAmount,
      });
    }

    if (failProducts.length > 0) {
      return { success: false, failedProducts: failProducts };
    }

    const productsSubtotal = successProducts.reduce(
      (acc, cur) => acc + cur.totalAmount,
      0,
    );

    // Apply the order-level coupon discount, if one was provided
    const couponDiscount = createOrderDto.couponDetails?.discount ?? 0;
    const totalAmount = productsSubtotal * (1 - couponDiscount / 100);

    const order = await this.orderRepository.create({
      userId: user._id,
      products: successProducts,
      address: createOrderDto.address,
      paymentMethod: createOrderDto.paymentMethod,
      couponDetails: createOrderDto.couponDetails,
      totalAmount,
    });

    // Reduce stock for each ordered product
    await Promise.all(
      successProducts.map((p) =>
        this.productRepository.updateOne(
          { _id: p.productId },
          { $inc: { stock: -p.quantity } },
        ),
      ),
    );

    await this.cartService.clearCart(user);

    return { success: true, order };
  }
}
