import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AuthGuard, RolesGuard } from '@common/guards';
import { Roles } from '@common/decorators';

@Controller('customer')
@UseGuards(AuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @Roles(['Customer'])
  @UseGuards(RolesGuard)
  getProfile(@Request() req: any) {
    return {
      message: 'Customer profile retrieved successfully',
      success: true,
      data: {
        user: req.user,
      },
    };
  }
}
