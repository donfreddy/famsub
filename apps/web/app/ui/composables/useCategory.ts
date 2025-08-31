import { GetCategoriesUseCase } from '~~/app/core/usecases/category'
import { useCategoryQueries } from "~/api/useCategoryQueries";

export const useCategory = () => {

  const getCategoriesUseCase = inject<GetCategoriesUseCase>('getCategoriesUseCase')!;

  const queries = useCategoryQueries(
    getCategoriesUseCase,
  );

  return {
    // Direct access to TanStack Query hooks
    ...queries,
  }
}
