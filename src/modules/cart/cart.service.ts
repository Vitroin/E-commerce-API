import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ProductService } from '@modules/product/product.service';
import { Cart, CartRepository } from '@models/index';
import { MESSAGE } from '@common/constant';

@Injectable()
export class CartService {
  constructor(
    private readonly productService: ProductService,
    private readonly cartRepository: CartRepository,
  ) {}

  async createCart(dto: AddToCartDto, user: any) {
    return await this.cartRepository.create({
      userId: user._id,
      products: [
        {
          productId: new Types.ObjectId(dto.productId),
          quantity: dto.quantity,
        },
      ],
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
      if (dto.quantity == 0)
        return await this.removeFromCart(dto.productId, user); // remove product if quantity is 0
      cart.products![index].quantity += dto.quantity; // increment, not overwrite
    }

    await cart.save();
    return cart; // was missing — caller now gets the updated cart back
  }

  async removeFromCart(productId: string, user: any) {
    const product = await this.cartRepository.updateOne(
      { userId: user._id, 'products.productId': new Types.ObjectId(productId) },
      { $pull: { products: { productId: new Types.ObjectId(productId) } } },
      { new: true }, // return the document *after* the update, not before
    );

    if (!product) throw new NotFoundException(MESSAGE.Product.notFound);

    return true;
  }

  async clearCart(user: any) {
    return await this.cartRepository.updateOne(
      { userId: user._id },
      { $set: { products: [] } },
      { new: true },
    );
  }

  async findOne(user: any) {
    const cart = await this.cartRepository.getOne({ userId: user._id });
    if (!cart) throw new NotFoundException(MESSAGE.Cart.notFound);
    return cart;
  }
  // async updateQuantity(productId: string, quantity: number, user: any) {
  //   if (quantity < 1) {
  //     // treat "set quantity to 0 or less" as an implicit removal
  //     return this.removeFromCart(productId, user);
  //   }

  //   const cart = await this.cartRepository.updateOne(
  //     { userId: user._id, 'products.productId': productId },
  //     { $set: { 'products.$.quantity': quantity } },
  //     { new: true },
  //   );

  //   if (!cart) throw new NotFoundException(MESSAGE.Product.notFound);
  //   return cart;
  // }
}
