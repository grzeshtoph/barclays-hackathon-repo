import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../cbdc-user.test-samples';

import { CBDCUserFormService } from './cbdc-user-form.service';

describe('CBDCUser Form Service', () => {
  let service: CBDCUserFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CBDCUserFormService);
  });

  describe('Service methods', () => {
    describe('createCBDCUserFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCBDCUserFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            email: expect.any(Object),
            password: expect.any(Object),
            firstName: expect.any(Object),
            lastName: expect.any(Object),
          })
        );
      });

      it('passing ICBDCUser should create a new form with FormGroup', () => {
        const formGroup = service.createCBDCUserFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            email: expect.any(Object),
            password: expect.any(Object),
            firstName: expect.any(Object),
            lastName: expect.any(Object),
          })
        );
      });
    });

    describe('getCBDCUser', () => {
      it('should return NewCBDCUser for default CBDCUser initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCBDCUserFormGroup(sampleWithNewData);

        const cBDCUser = service.getCBDCUser(formGroup) as any;

        expect(cBDCUser).toMatchObject(sampleWithNewData);
      });

      it('should return NewCBDCUser for empty CBDCUser initial value', () => {
        const formGroup = service.createCBDCUserFormGroup();

        const cBDCUser = service.getCBDCUser(formGroup) as any;

        expect(cBDCUser).toMatchObject({});
      });

      it('should return ICBDCUser', () => {
        const formGroup = service.createCBDCUserFormGroup(sampleWithRequiredData);

        const cBDCUser = service.getCBDCUser(formGroup) as any;

        expect(cBDCUser).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICBDCUser should not enable id FormControl', () => {
        const formGroup = service.createCBDCUserFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCBDCUser should disable id FormControl', () => {
        const formGroup = service.createCBDCUserFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
