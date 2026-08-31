import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from 'class-validator';

export function IsValidToDate(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidToDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const obj = args.object as any;
          const { fromDate } = obj;

          // If either date is missing, let other decorators (e.g. @IsNotEmpty, @IsDate) handle that
          if (!fromDate || !value) {
            return true;
          }

          const from = new Date(fromDate);
          const to = new Date(value);

          // Guard against invalid date strings
          if (isNaN(from.getTime()) || isNaN(to.getTime())) {
            return true; // let @IsDate handle malformed dates
          }

          // toDate must be on or after fromDate
          return to >= from;
        },

        defaultMessage(args: ValidationArguments) {
          return `${args.property} cannot be earlier than fromDate`;
        },
      },
    });
  };
}