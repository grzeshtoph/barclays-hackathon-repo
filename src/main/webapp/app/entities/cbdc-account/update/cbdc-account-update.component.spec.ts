import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CBDCAccountFormService } from './cbdc-account-form.service';
import { CBDCAccountService } from '../service/cbdc-account.service';
import { ICBDCAccount } from '../cbdc-account.model';

import { CBDCAccountUpdateComponent } from './cbdc-account-update.component';

describe('CBDCAccount Management Update Component', () => {
  let comp: CBDCAccountUpdateComponent;
  let fixture: ComponentFixture<CBDCAccountUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cBDCAccountFormService: CBDCAccountFormService;
  let cBDCAccountService: CBDCAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CBDCAccountUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CBDCAccountUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CBDCAccountUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cBDCAccountFormService = TestBed.inject(CBDCAccountFormService);
    cBDCAccountService = TestBed.inject(CBDCAccountService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cBDCAccount: ICBDCAccount = { id: 456 };

      activatedRoute.data = of({ cBDCAccount });
      comp.ngOnInit();

      expect(comp.cBDCAccount).toEqual(cBDCAccount);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICBDCAccount>>();
      const cBDCAccount = { id: 123 };
      jest.spyOn(cBDCAccountFormService, 'getCBDCAccount').mockReturnValue(cBDCAccount);
      jest.spyOn(cBDCAccountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cBDCAccount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cBDCAccount }));
      saveSubject.complete();

      // THEN
      expect(cBDCAccountFormService.getCBDCAccount).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cBDCAccountService.update).toHaveBeenCalledWith(expect.objectContaining(cBDCAccount));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICBDCAccount>>();
      const cBDCAccount = { id: 123 };
      jest.spyOn(cBDCAccountFormService, 'getCBDCAccount').mockReturnValue({ id: null });
      jest.spyOn(cBDCAccountService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cBDCAccount: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cBDCAccount }));
      saveSubject.complete();

      // THEN
      expect(cBDCAccountFormService.getCBDCAccount).toHaveBeenCalled();
      expect(cBDCAccountService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICBDCAccount>>();
      const cBDCAccount = { id: 123 };
      jest.spyOn(cBDCAccountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cBDCAccount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cBDCAccountService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
