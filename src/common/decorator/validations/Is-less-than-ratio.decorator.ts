import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsLessThanRatio(
  property: { comparand: string; ratio: number },
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsLessThanRatio',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property.comparand, property.ratio],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [comparand, ratio] = args.constraints;
          return value <= (args.object[comparand] * ratio) / 100;
        },
      },
    });
  };
}
