import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module';
import { seedUsers } from './seeds/user.seeder';
import { seedApiKeys } from './seeds/api-key.seeder';
import { seedCategories } from './seeds/category.seeder';

const runSeeds = async () => {
  const app = await NestFactory.create(AppModule);

  try {
    const dataSource = app.get(DataSource);
    console.log('Data Source has been initialized');

    // Run seeds
    await seedApiKeys(dataSource);
    await seedUsers(dataSource);
    await seedCategories(dataSource);
    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1); // Exit with error code
  } finally {
    // Ensure the application closes properly
    await app.close();
  }
};

void runSeeds();
