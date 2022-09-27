import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CBDCUserFormService } from './cbdc-user-form.service';
import { CBDCUserService } from '../service/cbdc-user.service';
import { ICBDCUser } from '../cbdc-user.model';

import { CBDCUserUpdateComponent } from './cbdc-user-update.component';

describe('CBDCUser Management Update Component', () => {
  let comp: CBDCUserUpdateComponent;
  let fixture: ComponentFixture<CBDCUserUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cBDCUserFormService: CBDCUserFormService;
  let cBDCUserService: CBDCUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CBDCUserUpdateComponent],
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
      .overrideTemplate(CBDCUserUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CBDCUserUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cBDCUserFormService = TestBed.inject(CBDCUserFormService);
    cBDCUserService = TestBed.inject(CBDCUserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cBDCUser: ICBDCUser = { id: 456 };

      activatedRoute.data = of({ cBDCUser });
      comp.ngOnInit();

      expect(comp.cBDCUser).toEqual(cBDCUser);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICBDCUser>>();
      const cBDCUser = { id: 123 };
      jest.spyOn(cBDCUserFormService, 'getCBDCUser').mockReturnValue(cBDCUser);
      jest.spyOn(cBDCUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cBDCUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cBDCUser }));
      saveSubject.complete();

      // THEN
      expect(cBDCUserFormService.getCBDCUser).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cBDCUserService.update).toHaveBeenCalledWith(expect.objectContaining(cBDCUser));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICBDCUser>>();
      const cBDCUser = { id: 123 };
      jest.spyOn(cBDCUserFormService, 'getCBDCUser').mockReturnValue({ id: null });
      jest.spyOn(cBDCUserService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cBDCUser: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cBDCUser }));
      saveSubject.complete();

      // THEN
      expect(cBDCUserFormService.getCBDCUser).toHaveBeenCalled();
      expect(cBDCUserService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICBDCUser>>();
      const cBDCUser = { id: 123 };
      jest.spyOn(cBDCUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cBDCUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cBDCUserService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
