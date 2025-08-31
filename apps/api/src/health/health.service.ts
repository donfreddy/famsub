import { Injectable } from '@nestjs/common';
import {
  DiskHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
    private typeorm: TypeOrmHealthIndicator, // Uncomment if using TypeORM
  ) {}

  async checkDisk(): Promise<HealthIndicatorResult> {
    return this.disk.checkStorage('storage', {
      thresholdPercent: 0.9,
      path: '/',
    });
  }

  async checkMemory(): Promise<HealthIndicatorResult> {
    return this.memory.checkHeap('memory_heap', 150 * 1024 * 1024); // 150MB
  }

  async checkDatabase(): Promise<HealthIndicatorResult> {
    return this.typeorm.pingCheck('database');
  }

  async checkCustom(): Promise<HealthIndicatorResult> {
    const isHealthy = true; // Add your custom health check logic here

    return {
      customCheck: {
        status: isHealthy ? 'up' : 'down',
        message: isHealthy ? 'Service is running' : 'Service is down',
      },
    };
  }
}
