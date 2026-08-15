import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { customerRepository } from 'src/models/customer/customer.repository';
import { Customer, customerSchema } from 'src/models/customer/customer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/models/common/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name,
        schema: userSchema, 
        discriminators: [{ name: Customer.name, schema: customerSchema }]
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, customerRepository],
})
export class AuthModule {}
