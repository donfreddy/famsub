import { OmitType } from '@nestjs/swagger';
import { EmailRegisterDto } from '../../../auth/dto/email-register.dto';

export class UserProfileDto extends OmitType(EmailRegisterDto, ['password', 'email', 'username'] as const) {}
