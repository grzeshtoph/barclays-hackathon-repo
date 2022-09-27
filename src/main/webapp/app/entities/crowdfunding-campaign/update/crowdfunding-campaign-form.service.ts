import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrowdfundingCampaign, NewCrowdfundingCampaign } from '../crowdfunding-campaign.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrowdfundingCampaign for edit and NewCrowdfundingCampaignFormGroupInput for create.
 */
type CrowdfundingCampaignFormGroupInput = ICrowdfundingCampaign | PartialWithRequiredKeyOf<NewCrowdfundingCampaign>;

type CrowdfundingCampaignFormDefaults = Pick<NewCrowdfundingCampaign, 'id' | 'fundingGoalReached' | 'finished'>;

type CrowdfundingCampaignFormGroupContent = {
  id: FormControl<ICrowdfundingCampaign['id'] | NewCrowdfundingCampaign['id']>;
  fundingGoal: FormControl<ICrowdfundingCampaign['fundingGoal']>;
  fundingGoalReached: FormControl<ICrowdfundingCampaign['fundingGoalReached']>;
  finished: FormControl<ICrowdfundingCampaign['finished']>;
  escrowPartyId: FormControl<ICrowdfundingCampaign['escrowPartyId']>;
  escrowAccountId: FormControl<ICrowdfundingCampaign['escrowAccountId']>;
  escrowPipId: FormControl<ICrowdfundingCampaign['escrowPipId']>;
  currencyId: FormControl<ICrowdfundingCampaign['currencyId']>;
  campaignPartyId: FormControl<ICrowdfundingCampaign['campaignPartyId']>;
  campaignAccountId: FormControl<ICrowdfundingCampaign['campaignAccountId']>;
  campaignBankId: FormControl<ICrowdfundingCampaign['campaignBankId']>;
};

export type CrowdfundingCampaignFormGroup = FormGroup<CrowdfundingCampaignFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrowdfundingCampaignFormService {
  createCrowdfundingCampaignFormGroup(
    crowdfundingCampaign: CrowdfundingCampaignFormGroupInput = { id: null }
  ): CrowdfundingCampaignFormGroup {
    const crowdfundingCampaignRawValue = {
      ...this.getFormDefaults(),
      ...crowdfundingCampaign,
    };
    return new FormGroup<CrowdfundingCampaignFormGroupContent>({
      id: new FormControl(
        { value: crowdfundingCampaignRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      fundingGoal: new FormControl(crowdfundingCampaignRawValue.fundingGoal),
      fundingGoalReached: new FormControl(crowdfundingCampaignRawValue.fundingGoalReached),
      finished: new FormControl(crowdfundingCampaignRawValue.finished),
      escrowPartyId: new FormControl(crowdfundingCampaignRawValue.escrowPartyId),
      escrowAccountId: new FormControl(crowdfundingCampaignRawValue.escrowAccountId),
      escrowPipId: new FormControl(crowdfundingCampaignRawValue.escrowPipId),
      currencyId: new FormControl(crowdfundingCampaignRawValue.currencyId),
      campaignPartyId: new FormControl(crowdfundingCampaignRawValue.campaignPartyId),
      campaignAccountId: new FormControl(crowdfundingCampaignRawValue.campaignAccountId),
      campaignBankId: new FormControl(crowdfundingCampaignRawValue.campaignBankId),
    });
  }

  getCrowdfundingCampaign(form: CrowdfundingCampaignFormGroup): ICrowdfundingCampaign | NewCrowdfundingCampaign {
    return form.getRawValue() as ICrowdfundingCampaign | NewCrowdfundingCampaign;
  }

  resetForm(form: CrowdfundingCampaignFormGroup, crowdfundingCampaign: CrowdfundingCampaignFormGroupInput): void {
    const crowdfundingCampaignRawValue = { ...this.getFormDefaults(), ...crowdfundingCampaign };
    form.reset(
      {
        ...crowdfundingCampaignRawValue,
        id: { value: crowdfundingCampaignRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrowdfundingCampaignFormDefaults {
    return {
      id: null,
      fundingGoalReached: false,
      finished: false,
    };
  }
}
