import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crowdfunding-contributor.test-samples';

import { CrowdfundingContributorFormService } from './crowdfunding-contributor-form.service';

describe('CrowdfundingContributor Form Service', () => {
  let service: CrowdfundingContributorFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrowdfundingContributorFormService);
  });

  describe('Service methods', () => {
    describe('createCrowdfundingContributorFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrowdfundingContributorFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            campaignId: expect.any(Object),
            amountDonated: expect.any(Object),
            partyId: expect.any(Object),
            accountId: expect.any(Object),
            pipId: expect.any(Object),
            currencyId: expect.any(Object),
          })
        );
      });

      it('passing ICrowdfundingContributor should create a new form with FormGroup', () => {
        const formGroup = service.createCrowdfundingContributorFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            campaignId: expect.any(Object),
            amountDonated: expect.any(Object),
            partyId: expect.any(Object),
            accountId: expect.any(Object),
            pipId: expect.any(Object),
            currencyId: expect.any(Object),
          })
        );
      });
    });

    describe('getCrowdfundingContributor', () => {
      it('should return NewCrowdfundingContributor for default CrowdfundingContributor initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrowdfundingContributorFormGroup(sampleWithNewData);

        const crowdfundingContributor = service.getCrowdfundingContributor(formGroup) as any;

        expect(crowdfundingContributor).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrowdfundingContributor for empty CrowdfundingContributor initial value', () => {
        const formGroup = service.createCrowdfundingContributorFormGroup();

        const crowdfundingContributor = service.getCrowdfundingContributor(formGroup) as any;

        expect(crowdfundingContributor).toMatchObject({});
      });

      it('should return ICrowdfundingContributor', () => {
        const formGroup = service.createCrowdfundingContributorFormGroup(sampleWithRequiredData);

        const crowdfundingContributor = service.getCrowdfundingContributor(formGroup) as any;

        expect(crowdfundingContributor).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrowdfundingContributor should not enable id FormControl', () => {
        const formGroup = service.createCrowdfundingContributorFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrowdfundingContributor should disable id FormControl', () => {
        const formGroup = service.createCrowdfundingContributorFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
