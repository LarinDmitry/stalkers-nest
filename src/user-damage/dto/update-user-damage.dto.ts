import { PartialType } from '@nestjs/swagger';
import { CreateUserDamageDto } from './create-user-damage.dto';

export class UpdateUserDamageDto extends PartialType(CreateUserDamageDto) {}