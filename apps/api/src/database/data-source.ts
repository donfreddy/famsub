import { DataSource } from 'typeorm';
import * as path from 'path';
import { config } from 'dotenv';
import * as process from 'process';

// Load environment variables synchronously
config({ path: path.resolve(__dirname, '../.env') });

// Check if required environment variables are available
if (!process.env.DB_NAME) {
  console.error('Database configuration missing. Check your .env file');
  process.exit(1);
}

// Create DataSource object with explicit configuration values
const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_USER_PWD || 'postgres',
  database: process.env.DB_NAME, // This is the key that was missing
  entities: [path.join(__dirname, '..', '..', '**', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, 'database', 'migrations', '**', '*.{ts,js}')],
  migrationsRun: false,
  synchronize: false,
});

export default dataSource;
