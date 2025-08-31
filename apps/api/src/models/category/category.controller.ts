import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/create-category.dto';
import { ApiResponse, SwaggerApiResponse } from '../../common/decorators';
import { Category } from './entities/category.entity';

@ApiTags('categories')
@ApiSecurity('api-key')
@Controller({ path: 'category', version: '1' })
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiBody({ description: 'Create a new category', type: CreateCategoryDto })
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Create a new category' })
  @Post()
  async create(@Body() inputs: CreateCategoryDto): Promise<Category> {
    return await this.categoryService.create(inputs);
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Update a category' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiBody({ description: 'Update a category', type: UpdateCategoryDto })
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() inputs: UpdateCategoryDto): Promise<Category> {
    return await this.categoryService.update(id, inputs);
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Delete a category' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<object> {
    await this.categoryService.remove(id);
    return { deleted: true };
  }
}
