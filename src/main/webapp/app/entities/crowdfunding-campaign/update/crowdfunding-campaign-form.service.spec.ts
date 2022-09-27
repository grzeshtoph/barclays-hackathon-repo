import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crowdfunding-campaign.test-samples';

import { CrowdfundingCampaignFormService } from './crowdfunding-campaign-form.service';

describe('CrowdfundingCampaign Form Service', () => {
  let service: CrowdfundingCampaignFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrowdfundingCampaignFormService);
  });

  describe('Service methods', () => {
    describe('createCrowdfundingCampaignFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrowdfundingCampaignFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fundingGoal: expect.any(Object),
            fundingGoalReached: expect.any(Object),
            finished: expect.any(Object),
            escrowPartyId: expect.any(Object),
            escrowAccountId: expect.any(Object),
            escrowPipId: expect.any(Object),
            currencyId: expect.any(Object),
            campaignPartyId: expect.any(Object),
            campaignAccountId: expect.any(Object),
            campaignBankId: expect.any(Object),
          })
        );
      });

      it('passing ICrowdfundingCampaign should create a new form with FormGroup', () => {
        const formGroup = service.createCrowdfundingCampaignFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fundingGoal: expect.any(Object),
            fundingGoalReached: expect.any(Object),
            finished: expect.any(Object),
            escrowPartyId: expect.any(Object),
            escrowAccountId: expect.any(Object),
            escrowPipId: expect.any(Object),
            currencyId: expect.any(Object),
            campaignPartyId: expect.any(Object),
            campaignAccountId: expect.any(Object),
            campaignBankId: expect.any(Object),
          })
        );
      });
    });

    describe('getCrowdfundingCampaign', () => {
      it('should return NewCrowdfundingCampaign for default CrowdfundingCampaign initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrowdfundingCampaignFormGroup(sampleWithNewData);

        const crowdfundingCampaign = service.getCrowdfundingCampaign(formGroup) as any;

        expect(crowdfundingCampaign).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrowdfundingCampaign for empty CrowdfundingCampaign initial value', () => {
        const formGroup = service.createCrowdfundingCampaignFormGroup();

        const crowdfundingCampaign = service.getCrowdfundingCampaign(formGroup) as any;

        expect(crowdfundingCampaign).toMatchObject({});
      });

      it('should return ICrowdfundingCampaign', () => {
        const formGroup = service.createCrowdfundingCampaignFormGroup(sampleWithRequiredData);

        const crowdfundingCampaign = service.getCrowdfundingCampaign(formGroup) as any;

        expect(crowdfundingCampaign).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrowdfundingCampaign should not enable id FormControl', () => {
        const formGroup = service.createCrowdfundingCampaignFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrowdfundingCampaign should disable id FormControl', () => {
        const formGroup = service.createCrowdfundingCampaignFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
