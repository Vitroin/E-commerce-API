import { SetMetadata } from '@nestjs/common';

// export const Roles = Reflector.createDecorator<string[]>();
export const ROLES = 'roles';
export const Roles = (value: string[]) => SetMetadata(ROLES, value);
