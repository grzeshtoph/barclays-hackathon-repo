export interface ICrowdfundingCampaign {
  id: number;
  fundingGoal?: number | null;
  fundingGoalReached?: boolean | null;
  finished?: boolean | null;
  escrowPartyId?: number | null;
  escrowAccountId?: number | null;
  escrowPipId?: number | null;
  currencyId?: number | null;
  campaignPartyId?: number | null;
  campaignAccountId?: number | null;
  campaignBankId?: number | null;
}

export type NewCrowdfundingCampaign = Omit<ICrowdfundingCampaign, 'id'> & { id: null };
