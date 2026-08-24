import { sendMail } from '@common/helpers';
import { CustomerRepository } from '@models/index';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto';
import { Customer } from './entities/auth.entity';

@Injectable()
export class AuthService {

  constructor (
    private readonly configService: ConfigService,
    private readonly customerRepository : CustomerRepository,
    private readonly jwtService: JwtService
  ){}

    async register(customer: Customer) {
      const customerExist = await this.customerRepository.getOne({ email: customer.email });


      if(customerExist) {
        throw new ConflictException('User already exists');
      }
      const createdCustomer = await this.customerRepository.create(customer);

      await sendMail({
        to: customer.email,
        subject: 'Verify your email',
        text: `Your OTP is ${customer.otp}. It will expire in 5 minutes.`,
      });
      const {password, otp, otpExpiry, ...customerObj}  = JSON.parse(JSON.stringify(createdCustomer));

      return customerObj as Customer;
    } 

    async login(loginDTO: LoginDTO) {
      const customerExist = await this.customerRepository.getOne({ email: loginDTO.email });
      const match = await bcrypt.compare(loginDTO.password, customerExist?.password || '?');
          
      if (!customerExist) throw new UnauthorizedException('Invalid credentials');
      if (!match) throw new UnauthorizedException('Invalid credentials');
      
      //generate token
      const token = this.jwtService.sign({
        _id: customerExist._id,
        email: customerExist.email,
        role: 'Customer'
      },
      {secret: this.configService.get('access').jwt_secret, expiresIn: '1d'})
    
      return token
    }

}


