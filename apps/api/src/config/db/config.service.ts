import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with db config based operations.
 *
 * @class
 */
@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('db.host');
  }
  get port(): number {
    return Number(this.configService.get<number>('db.port'));
  }

  get synchronize(): boolean {
    return this.configService.get<boolean>('db.synchronize');
  }

  get username(): string {
    return this.configService.get<string>('db.username');
  }
  get password(): string {
    return this.configService.get<string>('db.password');
  }
  get database(): string {
    return this.configService.get<string>('db.database');
  }

  get keepAlive(): boolean {
    return this.configService.get<boolean>('db.keepAlive');
  }

  get dropSchema(): boolean {
    return this.configService.get<boolean>('db.dropSchema');
  }

  get logging(): boolean {
    return this.configService.get<boolean>('db.logging');
  }
}
