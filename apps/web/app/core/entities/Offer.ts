export interface MarketplaceOffer {
    id: string;
    title: string,
    reference: string;
    price: number,
    invoice_verified: boolean,
    service: {
        id: string,
        name: string,
        slug: string,
        description: string
    },
    owner: {
        first_name: string,
        avatar: string, // Replace with actual image
        score: number,
        created_at: "2025-02-15"
    }
}

export interface Offer { }
67