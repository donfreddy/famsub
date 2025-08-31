import { NullableType } from '../../../types/nullable.type';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entities/category.entity';

export abstract class CategoryRepository {
  abstract create(dto: CreateCategoryDto): Promise<Category>;

  abstract findById(id: Category['id']): Promise<NullableType<Category>>;

  abstract findAll(): Promise<Category[]>;

  abstract update(id: Category['id'], data: UpdateCategoryDto): Promise<Category>;

  abstract remove(id: Category['id']): Promise<void>;

  abstract countCategories(): Promise<number>;
}
