import { DataSource } from 'typeorm';
import { Category } from '../../models/category/entities/category.entity';

export const seedCategories = async (dataSource: DataSource) => {
  const categoryRepo = dataSource.getRepository(Category);

  const categories = [
    {
      name: {
        en: 'SVOD',
        fr: 'SVOD',
      },
      mkp_name: {
        en: '\ud83c\udf7f SVOD',
        fr: '\ud83c\udf7f SVOD',
      },
    },
    {
      name: {
        en: 'Music',
        fr: 'Musique',
      },
      mkp_name: {
        en: '\ud83c\udfa7 Music',
        fr: '\ud83c\udfa7 Musique',
      },
    },
  ];

  for (const category of categories) {
    const existingCategory = await categoryRepo
      .createQueryBuilder('category')
      .where(`category.mkp_name ->> 'en' = :mkpEn`, { mkpEn: category.mkp_name.en })
      .getOne();

    if (!existingCategory) {
      await categoryRepo.save(categoryRepo.create(category));
      console.log(`Category ${category.name.en} seeded`);
    }
  }
};
