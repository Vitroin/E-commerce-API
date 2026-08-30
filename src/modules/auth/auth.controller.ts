import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthFactoryService } from './factory';
import { LoginDTO, RegisterDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authFactoryService: AuthFactoryService,
  ) {}

  @Post('/register')
  async register(@Body() registerDTO: RegisterDTO) {
    const customer = await this.authFactoryService.createCustomer(registerDTO);
    const createdCustomer = await this.authService.register(customer);
    return {
      message: 'Customer registered successfully',
      success: true,
      data: createdCustomer,
    };
  }

  @Post('/login')
  async login(@Body() loginDTO: LoginDTO) {
    const token = await this.authService.login(loginDTO);
    return {
      message: 'logged in successfully',
      success: true,
      data: {
        token,
      },
    };
  }
}
