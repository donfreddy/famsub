import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TokenFactory } from './token/token.factory';
import { UserModule } from '../models/user/user.module';
import { AuthConfigModule, AuthConfigService } from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKey } from './entities/api-key.entity';
import { Keystore } from './entities/keystore.entity';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { RolesGuard } from './guards/roles.guard';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    UserModule,
    AuthConfigModule,
    TypeOrmModule.forFeature([ApiKey, Keystore]),
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      useClass: TokenFactory,
    }),
  ],
  providers: [
    { provide: APP_GUARD, useClass: ApiKeyGuard },
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    AuthService,
    AuthConfigService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
