import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrowdfundingCampaignFormService } from './crowdfunding-campaign-form.service';
import { CrowdfundingCampaignService } from '../service/crowdfunding-campaign.service';
import { ICrowdfundingCampaign } from '../crowdfunding-campaign.model';

import { CrowdfundingCampaignUpdateComponent } from './crowdfunding-campaign-update.component';

describe('CrowdfundingCampaign Management Update Component', () => {
  let comp: CrowdfundingCampaignUpdateComponent;
  let fixture: ComponentFixture<CrowdfundingCampaignUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crowdfundingCampaignFormService: CrowdfundingCampaignFormService;
  let crowdfundingCampaignService: CrowdfundingCampaignService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrowdfundingCampaignUpdateComponent],
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
      .overrideTemplate(CrowdfundingCampaignUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrowdfundingCampaignUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crowdfundingCampaignFormService = TestBed.inject(CrowdfundingCampaignFormService);
    crowdfundingCampaignService = TestBed.inject(CrowdfundingCampaignService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crowdfundingCampaign: ICrowdfundingCampaign = { id: 456 };

      activatedRoute.data = of({ crowdfundingCampaign });
      comp.ngOnInit();

      expect(comp.crowdfundingCampaign).toEqual(crowdfundingCampaign);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrowdfundingCampaign>>();
      const crowdfundingCampaign = { id: 123 };
      jest.spyOn(crowdfundingCampaignFormService, 'getCrowdfundingCampaign').mockReturnValue(crowdfundingCampaign);
      jest.spyOn(crowdfundingCampaignService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crowdfundingCampaign });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crowdfundingCampaign }));
      saveSubject.complete();

      // THEN
      expect(crowdfundingCampaignFormService.getCrowdfundingCampaign).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crowdfundingCampaignService.update).toHaveBeenCalledWith(expect.objectContaining(crowdfundingCampaign));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrowdfundingCampaign>>();
      const crowdfundingCampaign = { id: 123 };
      jest.spyOn(crowdfundingCampaignFormService, 'getCrowdfundingCampaign').mockReturnValue({ id: null });
      jest.spyOn(crowdfundingCampaignService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crowdfundingCampaign: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crowdfundingCampaign }));
      saveSubject.complete();

      // THEN
      expect(crowdfundingCampaignFormService.getCrowdfundingCampaign).toHaveBeenCalled();
      expect(crowdfundingCampaignService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrowdfundingCampaign>>();
      const crowdfundingCampaign = { id: 123 };
      jest.spyOn(crowdfundingCampaignService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crowdfundingCampaign });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crowdfundingCampaignService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
