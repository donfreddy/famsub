interface FeesAmounts {
  monthly?: {
    unit_amount_com: number;
    unit_amount_with_fees: number;
  };
  unit_amount_com: number;
  unit_amount_with_fees: number;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  total_amount: number;
  fees_amounts: FeesAmounts;
  can_be_public: boolean;
  billing_frequency: Frequency;
  max_members: number;
}

enum Frequency {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}