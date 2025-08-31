import { GetServicesUseCase, GetServicesForMarketplaceUseCase } from '~~/app/core/usecases/service'
import { useServiceQueries } from "~/api/useServiceQueries";

export const useService = () => {

  const getServicesUseCase = inject<GetServicesUseCase>('getServicesUseCase')!;
  const getServicesForMarketplaceUseCase = inject<GetServicesForMarketplaceUseCase>('getServicesForMarketplaceUseCase')!;

  const queries = useServiceQueries(
    getServicesUseCase,
    getServicesForMarketplaceUseCase,
  );

  const mutations = {};

  return {
    // Direct access to TanStack Query hooks
    ...queries,
    ...mutations
  }
}
