import { MESSAGE } from '@common/constant';
import { Auth, User } from '@common/decorators';
import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('cart')
@Auth(["Customer","Admin"])
export class CartController {
  constructor(private readonly cartService: CartService,
  ) {}

  @Post()
  async addToCart(@Body() addToCartDto: AddToCartDto, @User() user:any) {
    const cart = await this.cartService.addToCart(addToCartDto, user);
    return {
      success: true,
      message: MESSAGE.Cart.updated,
      data: cart,
    }
  }

}
