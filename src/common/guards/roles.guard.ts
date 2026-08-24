
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import { PUBLIC, ROLES } from '@common/decorators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.getAllAndOverride(ROLES, [
      context.getClass(),        
      context.getHandler(),
    ]);
    const publicVal = this.reflector.get(PUBLIC, context.getHandler());
    console.log('roles', roles)
    
    if(publicVal) return true;
    if (!roles.includes(request.user.role)) throw new UnauthorizedException('You do not have permission to access this resource')
    return true
  }
}
