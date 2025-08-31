import { DataSource } from 'typeorm';
import { ApiKey } from '../../auth/entities/api-key.entity';
import { Permission } from '../../common/helpers';

export const seedApiKeys = async (dataSource: DataSource) => {
  const apiKeyRepository = dataSource.getRepository(ApiKey);

  const apiKeys = [
    {
      key: 'GAMMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
      permissions: [Permission.GENERAL],
      comments: ['To be used by the frontend'],
      version: 1,
    },
  ];

  for (const apiKey of apiKeys) {
    const existingApiKey = await apiKeyRepository.findOne({ where: { key: apiKey.key } });
    if (!existingApiKey) {
      await apiKeyRepository.save(apiKeyRepository.create(apiKey));
      console.log(`API Key ${apiKey.key} seeded`);
    }
  }
};
