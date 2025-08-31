import { Global, Logger, Module } from '@nestjs/common';
import { DatabaseConfigService } from 'src/config/db/config.service';
import { DataSource } from 'typeorm';
import { DatabaseConfigModule } from '../config';
import { PostgresConfigService } from './postgres-config.service';

@Global()
@Module({
  imports: [DatabaseConfigModule],
  providers: [
    {
      provide: DataSource,
      inject: [DatabaseConfigService],
      useFactory: async (dbConfigService: DatabaseConfigService) => {
        const logger = new Logger('DatabaseModule');
        try {
          // Create an instance of the PostgresConfigService
          const postgresConfig = new PostgresConfigService(dbConfigService);

          // Generate the TypeORM options
          const dataSourceConfig = postgresConfig.createTypeOrmOptions();

          // Create and initialize the DataSource
          const dataSource = new DataSource(dataSourceConfig);
          await dataSource.initialize();

          logger.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          logger.error('Error connecting to database:', error.message);
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class DatabaseModule {}
