import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { ApiResponse, SwaggerApiResponse } from '../../common/decorators';
import { Category } from './entities/category.entity';
import { Public } from '../../auth/decorators/public.decorator';

@ApiTags('categories')
@ApiSecurity('api-key')
@Controller({ path: 'categories', version: '1' })
export class CategoriesController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @SwaggerApiResponse()
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Find all categories' })
  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }
}
