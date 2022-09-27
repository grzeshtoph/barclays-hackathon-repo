import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICBDCUser, NewCBDCUser } from '../cbdc-user.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICBDCUser for edit and NewCBDCUserFormGroupInput for create.
 */
type CBDCUserFormGroupInput = ICBDCUser | PartialWithRequiredKeyOf<NewCBDCUser>;

type CBDCUserFormDefaults = Pick<NewCBDCUser, 'id'>;

type CBDCUserFormGroupContent = {
  id: FormControl<ICBDCUser['id'] | NewCBDCUser['id']>;
  email: FormControl<ICBDCUser['email']>;
  password: FormControl<ICBDCUser['password']>;
  firstName: FormControl<ICBDCUser['firstName']>;
  lastName: FormControl<ICBDCUser['lastName']>;
};

export type CBDCUserFormGroup = FormGroup<CBDCUserFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CBDCUserFormService {
  createCBDCUserFormGroup(cBDCUser: CBDCUserFormGroupInput = { id: null }): CBDCUserFormGroup {
    const cBDCUserRawValue = {
      ...this.getFormDefaults(),
      ...cBDCUser,
    };
    return new FormGroup<CBDCUserFormGroupContent>({
      id: new FormControl(
        { value: cBDCUserRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      email: new FormControl(cBDCUserRawValue.email),
      password: new FormControl(cBDCUserRawValue.password),
      firstName: new FormControl(cBDCUserRawValue.firstName),
      lastName: new FormControl(cBDCUserRawValue.lastName),
    });
  }

  getCBDCUser(form: CBDCUserFormGroup): ICBDCUser | NewCBDCUser {
    return form.getRawValue() as ICBDCUser | NewCBDCUser;
  }

  resetForm(form: CBDCUserFormGroup, cBDCUser: CBDCUserFormGroupInput): void {
    const cBDCUserRawValue = { ...this.getFormDefaults(), ...cBDCUser };
    form.reset(
      {
        ...cBDCUserRawValue,
        id: { value: cBDCUserRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CBDCUserFormDefaults {
    return {
      id: null,
    };
  }
}
