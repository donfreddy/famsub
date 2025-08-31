import { Injectable } from '@nestjs/common';
import { DatabaseConfigService } from 'src/config';
import { DatabaseType } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Injectable()
export class PostgresConfigService {
  constructor(private readonly dbConfig: DatabaseConfigService) {}

  createTypeOrmOptions(): PostgresConnectionOptions {
    return {
      type: 'postgres' as DatabaseType,
      host: this.dbConfig.host,
      port: this.dbConfig.port,
      username: this.dbConfig.username,
      password: this.dbConfig.password,
      database: this.dbConfig.database,
      synchronize: this.dbConfig.synchronize,
      dropSchema: this.dbConfig.dropSchema,
      keepConnectionAlive: this.dbConfig.keepAlive,
      logging: this.dbConfig.logging ? ['error'] : false,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      // migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
      // factories: [__dirname + '/factories/**/*{.ts,.js}'],
      cli: {
        entitiesDir: 'src',
        //migrationsDir: 'src/database/migrations',
        subscribersDir: 'subscriber',
      },
      extra: {
        // based on https://node-postgres.com/api/pool
        // max connection pool size
        max: 100,
        ssl: false,
      },
    } as PostgresConnectionOptions;
  }
}
