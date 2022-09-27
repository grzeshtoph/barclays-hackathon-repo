import { ICrowdfundingCampaign, NewCrowdfundingCampaign } from './crowdfunding-campaign.model';

export const sampleWithRequiredData: ICrowdfundingCampaign = {
  id: 3477,
};

export const sampleWithPartialData: ICrowdfundingCampaign = {
  id: 67308,
  fundingGoalReached: false,
  escrowPipId: 49817,
  campaignPartyId: 51145,
};

export const sampleWithFullData: ICrowdfundingCampaign = {
  id: 95414,
  fundingGoal: 88923,
  fundingGoalReached: false,
  finished: true,
  escrowPartyId: 47595,
  escrowAccountId: 7415,
  escrowPipId: 11146,
  currencyId: 23565,
  campaignPartyId: 73495,
  campaignAccountId: 39564,
  campaignBankId: 53251,
};

export const sampleWithNewData: NewCrowdfundingCampaign = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
