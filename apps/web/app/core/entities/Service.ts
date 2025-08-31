import type { Category } from "./Category";
import type { Plan } from "./Plan";

export interface MarketplaceService {
    id: string;
    name: string;
    slug: string;
    service_url?: string | null;
    background_color?: string | null;
    total_count?: number
    category?: Category;
    offers: {
        total: number,
        starting_price: number,
        max_price: number,
        currency: string
    },
}


export interface Service {
    id: string;
    name: string;
    slug: string;
    description: string;
    shared_credentials: boolean;
    blog_url?: string | null;
    terms_url?: string | null;
    share_type?: string | null;
    logo_messenger_url?: string | null;
    logo_url?: string | null;
    max_slots?: number | null;
    max_price: number;
    money_recovered: number;
    background_color?: string | null;
    warning_owner?: string | null;
    warning_subscriber?: string | null;
    has_pending_requests: boolean;
    user_has_service: boolean;
    already_shared: boolean;
    high_demand: boolean;
    created_at: string;
    updated_at: string;
    plans?: Plan[];
    category?: Category;
}
