import { CreatePayDTO } from './create-pay.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePatchPayDTO extends PartialType(CreatePayDTO) {}
