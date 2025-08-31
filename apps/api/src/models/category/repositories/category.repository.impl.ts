import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/create-category.dto';
import { NullableType } from '../../../types/nullable.type';

@Injectable()
export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepo.save(this.categoryRepo.create(dto));
  }

  async findById(id: Category['id']): Promise<NullableType<Category>> {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepo.find();
  }

  async update(id: Category['id'], data: UpdateCategoryDto): Promise<Category> {
    const category = await this.findById(id);
    return this.categoryRepo.update(category.id, data).then(() => {
      return this.categoryRepo.findOne({ where: { id } });
    });
  }

  async remove(id: Category['id']): Promise<void> {
    const category = await this.findById(id);
    await this.categoryRepo.remove(category);
  }

  async countCategories(): Promise<number> {
    return this.categoryRepo.count();
  }
}
