import { GetOfferByIdUseCase, GetOffersByServiceUseCase } from '~~/app/core/usecases/offer'
import { useOfferQueries } from "~/api/useOfferQueries";

export const useOffer = () => {

  const getOfferByIdUseCase = inject<GetOfferByIdUseCase>('getOfferByIdUseCase')!;
  const getOffersByServiceUseCase = inject<GetOffersByServiceUseCase>('getOffersByServiceUseCase')!;

  const queries = useOfferQueries(
    getOfferByIdUseCase,
    getOffersByServiceUseCase,
  );

  const mutations = {};

  return {
    // Direct access to TanStack Query hooks
    ...queries,
    ...mutations
  }
}
