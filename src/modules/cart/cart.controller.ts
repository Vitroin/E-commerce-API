import { MESSAGE } from '@common/constant';
import { Auth, User } from '@common/decorators';
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('cart')
@Auth(["Customer","Admin"])
export class CartController {
  constructor(private readonly cartService: CartService,
  ) {}

  // Add a product to the cart or update its quantity
  @Post()
  async addToCart(@Body() addToCartDto: AddToCartDto, @User() user:any) {
    const cart = await this.cartService.addToCart(addToCartDto, user);
    return {
      success: true,
      message: MESSAGE.Cart.updated,
      data: cart,
    }
  }

  // Remove a product as a whole from the cart
  @Put("/remove/:productId")
  async removeFromCart(@Param('productId') productId: string, @User() user:any) {
    const cart = await this.cartService.removeFromCart(productId, user);
    return {
      success: true,
      message: MESSAGE.Cart.updated,
      data: cart,
    }
  }

  // Clear the entire cart
  @Put("/clear")
  async clearCart(@User() user:any) {
    const cart = await this.cartService.clearCart(user);
    return {
      success: true,
      message: MESSAGE.Cart.deleted,
      data: cart,
    }
  }

  //TODO: not sure if we should allow this, as it can be done via addToCart with quantity 0
  // // Update the quantity of a product in the cart
  // @Put("/update-quantity")
  // async updateQuantity(@Body() dto: AddToCartDto, @User() user:any) {
  //   const cart = await this.cartService.updateQuantity(dto.productId, dto.quantity, user);
  //   return {
  //     success: true,
  //     message: MESSAGE.Cart.updated,
  //     data: cart,
  //   }
  // }

}
