import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICBDCAccount, NewCBDCAccount } from '../cbdc-account.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICBDCAccount for edit and NewCBDCAccountFormGroupInput for create.
 */
type CBDCAccountFormGroupInput = ICBDCAccount | PartialWithRequiredKeyOf<NewCBDCAccount>;

type CBDCAccountFormDefaults = Pick<NewCBDCAccount, 'id'>;

type CBDCAccountFormGroupContent = {
  id: FormControl<ICBDCAccount['id'] | NewCBDCAccount['id']>;
  partyId: FormControl<ICBDCAccount['partyId']>;
  accountId: FormControl<ICBDCAccount['accountId']>;
  pipId: FormControl<ICBDCAccount['pipId']>;
  currencyId: FormControl<ICBDCAccount['currencyId']>;
  cbdcUserID: FormControl<ICBDCAccount['cbdcUserID']>;
};

export type CBDCAccountFormGroup = FormGroup<CBDCAccountFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CBDCAccountFormService {
  createCBDCAccountFormGroup(cBDCAccount: CBDCAccountFormGroupInput = { id: null }): CBDCAccountFormGroup {
    const cBDCAccountRawValue = {
      ...this.getFormDefaults(),
      ...cBDCAccount,
    };
    return new FormGroup<CBDCAccountFormGroupContent>({
      id: new FormControl(
        { value: cBDCAccountRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      partyId: new FormControl(cBDCAccountRawValue.partyId),
      accountId: new FormControl(cBDCAccountRawValue.accountId),
      pipId: new FormControl(cBDCAccountRawValue.pipId),
      currencyId: new FormControl(cBDCAccountRawValue.currencyId),
      cbdcUserID: new FormControl(cBDCAccountRawValue.cbdcUserID),
    });
  }

  getCBDCAccount(form: CBDCAccountFormGroup): ICBDCAccount | NewCBDCAccount {
    return form.getRawValue() as ICBDCAccount | NewCBDCAccount;
  }

  resetForm(form: CBDCAccountFormGroup, cBDCAccount: CBDCAccountFormGroupInput): void {
    const cBDCAccountRawValue = { ...this.getFormDefaults(), ...cBDCAccount };
    form.reset(
      {
        ...cBDCAccountRawValue,
        id: { value: cBDCAccountRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CBDCAccountFormDefaults {
    return {
      id: null,
    };
  }
}
