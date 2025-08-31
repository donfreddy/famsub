import type { ApiResponse, Category } from '@/app/core/entities'
import { useQuery } from '@tanstack/vue-query'
import type { UseQueryReturnType } from '@tanstack/vue-query'
import type { GetCategoriesUseCase } from '@/app/core/usecases/category'

export function useCategoryQueries(
  getCategoriesUseCase: GetCategoriesUseCase,
) {

  const useCategories = (): UseQueryReturnType<Category[], Error> => {
    return useQuery({
      queryKey: ['fetch-categories'],
      queryFn: async () => {
        const response = await getCategoriesUseCase.execute()
        return response.data
      },
    })
  }

  return {
    useCategories,
  }
}
