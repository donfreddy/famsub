import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './repositories/category.repository';
import { NullableType } from '../../types/nullable.type';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepo.create(dto);
  }

  async findById(id: Category['id']): Promise<NullableType<Category>> {
    return this.categoryRepo.findById(id);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepo.findAll();
  }

  async update(id: Category['id'], data: UpdateCategoryDto): Promise<Category> {
    return this.categoryRepo.update(id, data);
  }

  async remove(id: Category['id']): Promise<void> {
    return this.categoryRepo.remove(id);
  }

  async countCategories(): Promise<number> {
    return this.categoryRepo.countCategories();
  }
}
