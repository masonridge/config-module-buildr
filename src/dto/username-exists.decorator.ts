import { registerDecorator, ValidationOptions } from 'class-validator';
import { UsernameExistsConstraint } from './username-exists.constraint';

export function UsernameExists(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    console.log('validoptions', validationOptions);
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: UsernameExistsConstraint,
    });
  };
}
