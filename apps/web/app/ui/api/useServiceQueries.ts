import type { ApiResponse, MarketplaceService, Service } from '@/app/core/entities'
import { useQuery } from '@tanstack/vue-query'
import type { UseQueryReturnType } from '@tanstack/vue-query'
import { GetServicesUseCase, GetServicesForMarketplaceUseCase } from '@/app/core/usecases/service'

export function useServiceQueries(
  getServicesUseCase: GetServicesUseCase,
  getServicesForMarketplaceUseCase: GetServicesForMarketplaceUseCase,
) {

  const useServices = (): UseQueryReturnType<Service[], Error> => {
    return useQuery({
      queryKey: ['fetch-services'],
      queryFn: async () => {
        const response = await getServicesUseCase.execute()
        return response.data
      },
    })
  }

  const useServicesForMarketplace = (): UseQueryReturnType<MarketplaceService[], Error> => {
    return useQuery({
      queryKey: ['fetch-services-for-marketplace'],
      queryFn: async () => {
        const response = await getServicesForMarketplaceUseCase.execute()
        return response.data
      },
    })
  }

  return {
    useServices,
    useServicesForMarketplace,
  }
}
