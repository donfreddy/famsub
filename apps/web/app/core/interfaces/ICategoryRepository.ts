import type {ApiResponse} from "~~/app/core/entities";
import type { Category } from "../entities/Category";

export interface ICategoryRepository {
  getCategories(): Promise<ApiResponse<Category[]>>;
}
