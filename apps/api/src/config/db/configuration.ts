import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DATABASE || 'jointly_db',
  synchronize: process.env.POSTGRES_SYNC !== 'false',
  keepAlive: process.env.POSTGRES_KEEP_ALIVE === 'true',
  dropSchema: process.env.POSTGRES_DROP_SCHEMA === 'true',
  logging: process.env.NODE_ENV !== 'production',
}));
