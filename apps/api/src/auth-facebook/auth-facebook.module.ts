import { Module } from '@nestjs/common';
import { AuthFacebookService } from './auth-facebook.service';
import { AuthFacebookController } from './auth-facebook.controller';
import { AuthModule } from '../auth/auth.module';
import { AuthConfigModule } from '../config';

@Module({
  imports: [AuthConfigModule, AuthModule],
  controllers: [AuthFacebookController],
  providers: [AuthFacebookService],
  exports: [AuthFacebookService],
})
export class AuthFacebookModule {}
