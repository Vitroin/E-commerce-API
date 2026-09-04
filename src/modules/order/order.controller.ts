import { Auth, User } from '@common/decorators';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
@Auth(['Admin', 'Customer'])
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @User() user: any) {
    const result = await this.orderService.create(createOrderDto, user);

    if (!result.success) {
      return {
        success: false,
        message: 'Some products failed to create order',
        data: result.failedProducts,
      };
    }

    return {
      success: true,
      message: 'Order created successfully',
      data: result.order,
    };
  }
}
