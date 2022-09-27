import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrowdfundingContributor, NewCrowdfundingContributor } from '../crowdfunding-contributor.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrowdfundingContributor for edit and NewCrowdfundingContributorFormGroupInput for create.
 */
type CrowdfundingContributorFormGroupInput = ICrowdfundingContributor | PartialWithRequiredKeyOf<NewCrowdfundingContributor>;

type CrowdfundingContributorFormDefaults = Pick<NewCrowdfundingContributor, 'id'>;

type CrowdfundingContributorFormGroupContent = {
  id: FormControl<ICrowdfundingContributor['id'] | NewCrowdfundingContributor['id']>;
  campaignId: FormControl<ICrowdfundingContributor['campaignId']>;
  amountDonated: FormControl<ICrowdfundingContributor['amountDonated']>;
  partyId: FormControl<ICrowdfundingContributor['partyId']>;
  accountId: FormControl<ICrowdfundingContributor['accountId']>;
  pipId: FormControl<ICrowdfundingContributor['pipId']>;
  currencyId: FormControl<ICrowdfundingContributor['currencyId']>;
};

export type CrowdfundingContributorFormGroup = FormGroup<CrowdfundingContributorFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrowdfundingContributorFormService {
  createCrowdfundingContributorFormGroup(
    crowdfundingContributor: CrowdfundingContributorFormGroupInput = { id: null }
  ): CrowdfundingContributorFormGroup {
    const crowdfundingContributorRawValue = {
      ...this.getFormDefaults(),
      ...crowdfundingContributor,
    };
    return new FormGroup<CrowdfundingContributorFormGroupContent>({
      id: new FormControl(
        { value: crowdfundingContributorRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      campaignId: new FormControl(crowdfundingContributorRawValue.campaignId),
      amountDonated: new FormControl(crowdfundingContributorRawValue.amountDonated),
      partyId: new FormControl(crowdfundingContributorRawValue.partyId),
      accountId: new FormControl(crowdfundingContributorRawValue.accountId),
      pipId: new FormControl(crowdfundingContributorRawValue.pipId),
      currencyId: new FormControl(crowdfundingContributorRawValue.currencyId),
    });
  }

  getCrowdfundingContributor(form: CrowdfundingContributorFormGroup): ICrowdfundingContributor | NewCrowdfundingContributor {
    return form.getRawValue() as ICrowdfundingContributor | NewCrowdfundingContributor;
  }

  resetForm(form: CrowdfundingContributorFormGroup, crowdfundingContributor: CrowdfundingContributorFormGroupInput): void {
    const crowdfundingContributorRawValue = { ...this.getFormDefaults(), ...crowdfundingContributor };
    form.reset(
      {
        ...crowdfundingContributorRawValue,
        id: { value: crowdfundingContributorRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrowdfundingContributorFormDefaults {
    return {
      id: null,
    };
  }
}
