import type { ApiPaginatedResponse, MarketplaceOffer, Offer } from '@/app/core/entities'
import { useQuery } from '@tanstack/vue-query'
import type { UseQueryReturnType } from '@tanstack/vue-query'
import { GetOfferByIdUseCase, GetOffersByServiceUseCase } from '@/app/core/usecases/offer'

export function useOfferQueries(
  getOfferByIdUseCase: GetOfferByIdUseCase,
  getOffersByServiceUseCase: GetOffersByServiceUseCase,
) {

  const useOfferById = (offerId: string): UseQueryReturnType<Offer, Error> => {
    return useQuery({
      queryKey: ['fetch-offer-by-id'],
      queryFn: async () => {
        const response = await getOfferByIdUseCase.execute(offerId)
        return response.data
      },
    })
  }

  const useOffersByService = (slug: string): UseQueryReturnType<ApiPaginatedResponse<MarketplaceOffer>, Error> => {
    return useQuery({
      queryKey: ['fetch-offers-by-service-slog'],
      queryFn: async () => {
        const response = await getOffersByServiceUseCase.execute(slug)
        return response.data
      },
    })
  }

  return {
    useOfferById,
    useOffersByService,
  }
}
