import { ICrowdfundingContributor, NewCrowdfundingContributor } from './crowdfunding-contributor.model';

export const sampleWithRequiredData: ICrowdfundingContributor = {
  id: 70719,
};

export const sampleWithPartialData: ICrowdfundingContributor = {
  id: 96303,
  campaignId: 64398,
  accountId: 84468,
  currencyId: 12612,
};

export const sampleWithFullData: ICrowdfundingContributor = {
  id: 44572,
  campaignId: 19787,
  amountDonated: 92356,
  partyId: 53277,
  accountId: 95871,
  pipId: 91589,
  currencyId: 55707,
};

export const sampleWithNewData: NewCrowdfundingContributor = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
