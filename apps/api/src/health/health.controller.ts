import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { HealthService } from './health.service';
import { Public } from '../auth/decorators/public.decorator';
import { ApiSecurity } from '@nestjs/swagger';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private healthService: HealthService,
  ) {}

  @Public()
  @ApiSecurity('api-key')
  @HealthCheck()
  @Get()
  check() {
    return this.health.check([
      // Basic health indicators
      () => this.healthService.checkDisk(),
      () => this.healthService.checkMemory(),
      () => this.healthService.checkDatabase(),
      // Additional custom checks
      () => this.healthService.checkCustom(),
    ]);
  }
}
