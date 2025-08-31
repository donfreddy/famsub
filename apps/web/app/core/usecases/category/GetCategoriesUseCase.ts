import type {ICategoryRepository} from "~~/app/core/interfaces";
import type {ApiResponse, Category} from "~~/app/core/entities";


export class GetCategoriesUseCase {
  constructor(private readonly categoryRepo: ICategoryRepository) {}

 async execute(): Promise<ApiResponse<Category[]>> {
    return this.categoryRepo.getCategories();
  }
}
