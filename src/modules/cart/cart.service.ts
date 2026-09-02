import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ProductService } from '@modules/product/product.service';
import { Cart, CartRepository } from '@models/index';

@Injectable()
export class CartService {
  constructor(
    private readonly productService: ProductService,
    private readonly cartRepository: CartRepository,
  ) {}

  async createCart(dto: AddToCartDto, user: any) {
    console.log('dto', dto);
    console.log('user', user);
    return await this.cartRepository.create({
      userId: user._id,
      products: [{ productId: new Types.ObjectId(dto.productId), quantity: dto.quantity }],
    });
  }

  async addToCart(dto: AddToCartDto, user: any) {
    await this.productService.findOne(dto.productId);
    const productId = new Types.ObjectId(dto.productId);
    const cart = await this.cartRepository.getOne({ userId: user._id });


    if (!cart) {
      return await this.createCart(dto, user);
    }

    const index = cart.products!.findIndex(
      (p) => p.productId && p.productId.equals(productId),
    );

    if (index === -1) {
      cart.products!.push({ productId, quantity: dto.quantity });
    } else {
      cart.products![index].quantity += dto.quantity; // increment, not overwrite
    }

    await cart.save();
    return cart; // was missing — caller now gets the updated cart back
  }
}