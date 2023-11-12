import {
  Inject,
  Injectable,
  forwardRef,
  UnprocessableEntityException,
} from '@nestjs/common';

import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from './users.service';

@ValidatorConstraint({ name: 'UsernameIsAvailable', async: true })
@Injectable()
export class UsernameExistsConstraint implements ValidatorConstraintInterface {
  constructor(
    // @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async validate(value: any, args: ValidationArguments) {
    // const found = await this.usersService.findOneUser(value);
    console.log(this.usersService, value, args);
    // throw new UnprocessableEntityException(`Already exists ${value}`);
    // return found ? true : false;
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    console.log(args);

    return `Username '${args.value}' is not available.`;
  }
}
