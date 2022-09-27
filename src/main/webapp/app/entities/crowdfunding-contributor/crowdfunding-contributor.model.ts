export interface ICrowdfundingContributor {
  id: number;
  campaignId?: number | null;
  amountDonated?: number | null;
  partyId?: number | null;
  accountId?: number | null;
  pipId?: number | null;
  currencyId?: number | null;
}

export type NewCrowdfundingContributor = Omit<ICrowdfundingContributor, 'id'> & { id: null };
