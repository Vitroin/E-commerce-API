import { Module } from '@nestjs/common';
import { UserRepository } from '@models/index';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/models/common/user.schema';
import { Admin, adminSchema } from 'src/models/admin/admin.schema';
import { AdminRepository } from 'src/models/admin/admin.repository';
import { SellerRepository } from 'src/models/seller/seller.repository';
import { Seller, sellerSchema } from 'src/models/seller/seller.schema';
import { CustomerRepository } from 'src/models/customer/customer.repository';
import { Customer, customerSchema } from 'src/models/customer/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
        discriminators: [
          { name: Seller.name, schema: sellerSchema },
          { name: Admin.name, schema: adminSchema },
          { name: Customer.name, schema: customerSchema },
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [
    SellerRepository,
    AdminRepository,
    CustomerRepository,
    UserRepository,
  ],
  exports: [
    SellerRepository,
    AdminRepository,
    CustomerRepository,
    UserRepository,
  ],
})
export class UserMongoModule {}
