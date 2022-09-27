import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../cbdc-account.test-samples';

import { CBDCAccountFormService } from './cbdc-account-form.service';

describe('CBDCAccount Form Service', () => {
  let service: CBDCAccountFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CBDCAccountFormService);
  });

  describe('Service methods', () => {
    describe('createCBDCAccountFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCBDCAccountFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            partyId: expect.any(Object),
            accountId: expect.any(Object),
            pipId: expect.any(Object),
            currencyId: expect.any(Object),
            cbdcUserID: expect.any(Object),
          })
        );
      });

      it('passing ICBDCAccount should create a new form with FormGroup', () => {
        const formGroup = service.createCBDCAccountFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            partyId: expect.any(Object),
            accountId: expect.any(Object),
            pipId: expect.any(Object),
            currencyId: expect.any(Object),
            cbdcUserID: expect.any(Object),
          })
        );
      });
    });

    describe('getCBDCAccount', () => {
      it('should return NewCBDCAccount for default CBDCAccount initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCBDCAccountFormGroup(sampleWithNewData);

        const cBDCAccount = service.getCBDCAccount(formGroup) as any;

        expect(cBDCAccount).toMatchObject(sampleWithNewData);
      });

      it('should return NewCBDCAccount for empty CBDCAccount initial value', () => {
        const formGroup = service.createCBDCAccountFormGroup();

        const cBDCAccount = service.getCBDCAccount(formGroup) as any;

        expect(cBDCAccount).toMatchObject({});
      });

      it('should return ICBDCAccount', () => {
        const formGroup = service.createCBDCAccountFormGroup(sampleWithRequiredData);

        const cBDCAccount = service.getCBDCAccount(formGroup) as any;

        expect(cBDCAccount).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICBDCAccount should not enable id FormControl', () => {
        const formGroup = service.createCBDCAccountFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCBDCAccount should disable id FormControl', () => {
        const formGroup = service.createCBDCAccountFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
