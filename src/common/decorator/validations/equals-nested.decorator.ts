import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function EqualsNested(
  property: { comparandsArray: string[][] },
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'EqualsNested',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property.comparandsArray],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [comparandsArray] = args.constraints;
          const comparands = comparandsArray.map((comparandArray) => {
            let comparand = args.object;
            comparandArray.forEach((key) => {
              comparand = comparand?.[key];
            });
            return comparand;
          });

          return comparands.every((comparand) => comparand === value);
        },
      },
    });
  };
}
