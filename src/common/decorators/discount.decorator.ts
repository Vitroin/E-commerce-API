import { DiscountType } from '@common/types';

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

//todo
export function IsValidDiscount(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidDiscount',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const obj = args.object as any;
          const { discountType } = obj;

          if (discountType === DiscountType.percentage) {
            return typeof value === 'number' && value >= 0 && value <= 100;
          }

          if (discountType === DiscountType.fixed_amount) {
            return typeof value === 'number' && value >= 0;
          }

          return true; // allow if no discountType is specified
        },

        defaultMessage(args: ValidationArguments) {
          const obj = args.object as any;
          const { discountType } = obj;

          if (discountType === DiscountType.percentage) {
            return 'Discount amount cannot exceed 100 when type is percentage';
          }

          if (discountType === DiscountType.fixed_amount) {
            return 'Discount amount cannot be negative when type is fixed amount';
          }

          return 'Invalid discount amount';
        },
      },
    });
  };
}
