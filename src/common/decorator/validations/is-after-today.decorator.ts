import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsAfterTodayConstraint implements ValidatorConstraintInterface {
  validate(date: any, args: ValidationArguments) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate > today;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property}は本日以降の日付を指定してください`;
  }
}

export function IsAfterToday(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAfterTodayConstraint,
    });
  };
}
