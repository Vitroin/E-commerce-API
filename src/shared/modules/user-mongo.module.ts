import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminRepository } from 'src/models/admin/admin.repository';
import { Admin, adminSchema } from 'src/models/admin/admin.schema';
import { User, userSchema } from 'src/models/common/user.schema';
import { CustomerRepository } from 'src/models/customer/customer.repository';
import { Customer, customerSchema } from 'src/models/customer/customer.schema';
import { SellerRepository } from 'src/models/seller/seller.repository';
import { Seller, sellerSchema } from 'src/models/seller/seller.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name , schema: userSchema, discriminators: [
            { name: Seller.name, schema: sellerSchema },
            { name: Admin.name, schema: adminSchema },
            { name: Customer.name, schema: customerSchema }
        ] }])
    ], 
    controllers:[],
    providers:[SellerRepository, AdminRepository, CustomerRepository],
    exports:[ SellerRepository, AdminRepository, CustomerRepository]
})

export class UserMongoModule{

}