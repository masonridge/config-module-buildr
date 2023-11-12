import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  validate,
} from 'class-validator';
import { UsernameExists } from './username-exists.decorator';
import { UsernameExistsConstraint } from './username-exists.constraint';

export class CreateUserDto {
  // @IsString()
  // @MinLength(2)
  // @MaxLength(100)
  id: number;
  // @Validate(UsernameExistsConstraint)
  // @UsernameExists({ message: `Username is taken` })
  @UsernameExists()
  name: string;
  email: string;

  // @IsString()
  // @MinLength(8)
  // @MaxLength(100)
  // password: string;

  // @IsString()
  // @IsOptional()
  // fullName: string;

  // @IsString({ each: true })
  // @IsOptional()
  // groups: string[];
}
