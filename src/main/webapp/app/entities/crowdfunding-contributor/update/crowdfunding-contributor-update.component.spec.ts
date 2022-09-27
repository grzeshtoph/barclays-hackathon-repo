import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrowdfundingContributorFormService } from './crowdfunding-contributor-form.service';
import { CrowdfundingContributorService } from '../service/crowdfunding-contributor.service';
import { ICrowdfundingContributor } from '../crowdfunding-contributor.model';

import { CrowdfundingContributorUpdateComponent } from './crowdfunding-contributor-update.component';

describe('CrowdfundingContributor Management Update Component', () => {
  let comp: CrowdfundingContributorUpdateComponent;
  let fixture: ComponentFixture<CrowdfundingContributorUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crowdfundingContributorFormService: CrowdfundingContributorFormService;
  let crowdfundingContributorService: CrowdfundingContributorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrowdfundingContributorUpdateComponent],
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
      .overrideTemplate(CrowdfundingContributorUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrowdfundingContributorUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crowdfundingContributorFormService = TestBed.inject(CrowdfundingContributorFormService);
    crowdfundingContributorService = TestBed.inject(CrowdfundingContributorService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crowdfundingContributor: ICrowdfundingContributor = { id: 456 };

      activatedRoute.data = of({ crowdfundingContributor });
      comp.ngOnInit();

      expect(comp.crowdfundingContributor).toEqual(crowdfundingContributor);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrowdfundingContributor>>();
      const crowdfundingContributor = { id: 123 };
      jest.spyOn(crowdfundingContributorFormService, 'getCrowdfundingContributor').mockReturnValue(crowdfundingContributor);
      jest.spyOn(crowdfundingContributorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crowdfundingContributor });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crowdfundingContributor }));
      saveSubject.complete();

      // THEN
      expect(crowdfundingContributorFormService.getCrowdfundingContributor).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crowdfundingContributorService.update).toHaveBeenCalledWith(expect.objectContaining(crowdfundingContributor));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrowdfundingContributor>>();
      const crowdfundingContributor = { id: 123 };
      jest.spyOn(crowdfundingContributorFormService, 'getCrowdfundingContributor').mockReturnValue({ id: null });
      jest.spyOn(crowdfundingContributorService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crowdfundingContributor: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crowdfundingContributor }));
      saveSubject.complete();

      // THEN
      expect(crowdfundingContributorFormService.getCrowdfundingContributor).toHaveBeenCalled();
      expect(crowdfundingContributorService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrowdfundingContributor>>();
      const crowdfundingContributor = { id: 123 };
      jest.spyOn(crowdfundingContributorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crowdfundingContributor });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crowdfundingContributorService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
