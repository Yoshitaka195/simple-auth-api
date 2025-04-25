import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function CompareDate(
  property: {
    comparand: string;
    comparisonType: 'BEFORE' | 'AFTER' | 'EQUAL';
  },
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'CompareDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property.comparand],
      options: validationOptions,
      validator: {
        validate(value: Date, args: ValidationArguments) {
          const comparand = args.constraints[0];
          switch (property.comparisonType) {
            case 'BEFORE':
              return value < args.object[comparand];
            case 'AFTER':
              return value > args.object[comparand];
            case 'EQUAL':
              return value === args.object[comparand];
            default:
              return false;
          }
        },
      },
    });
  };
}
