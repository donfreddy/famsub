import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('app.env');
  }

  get fallbackLanguage(): string {
    return this.configService.get<string>('app.fallbackLanguage');
  }

  get host(): string {
    return this.configService.get<string>('app.http.host');
  }

  get port(): number {
    return Number(this.configService.get<number>('app.http.port'));
  }

  get debug(): boolean {
    return this.configService.get<boolean>('app.debug');
  }

  get name(): string {
    return this.configService.get<string>('app.name');
  }

  get url(): string {
    return this.configService.get<string>('app.url');
  }

  get logDirectory(): string {
    return this.configService.get<string>('app.logDirectory');
  }

  get timeZone(): string {
    return this.configService.get<string>('app.timeZone');
  }

  get sentryDsn(): string {
    return this.configService.get<string>('app.sentry.dsn');
  }
}
