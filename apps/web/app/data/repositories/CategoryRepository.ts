import type {AxiosInstance} from "axios";
import type {ICategoryRepository} from "~~/app/core/interfaces";
import type {ApiResponse} from "~~/app/core/entities";
import type { Category } from "@/app/core/entities/Category";

export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly httpClient: AxiosInstance) {
  }

  async getCategories(): Promise<ApiResponse<Category[]>> {
    const response = await this.httpClient.get<ApiResponse<Category[]>>('/v1/categories');
    return response.data;
  }
}
