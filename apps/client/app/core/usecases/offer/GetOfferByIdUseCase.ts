import type { IOfferRepository } from "~~/app/core/interfaces";
import type { ApiResponse, Offer } from "~~/app/core/entities";


export class GetOfferByIdUseCase {
  constructor(private readonly offerRepo: IOfferRepository) { }

  async execute(offerId: string): Promise<ApiResponse<Offer>> {
    return this.offerRepo.getOfferById(offerId);
  }
}
