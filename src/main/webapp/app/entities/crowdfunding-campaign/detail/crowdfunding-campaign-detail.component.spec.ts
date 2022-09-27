import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrowdfundingCampaignDetailComponent } from './crowdfunding-campaign-detail.component';

describe('CrowdfundingCampaign Management Detail Component', () => {
  let comp: CrowdfundingCampaignDetailComponent;
  let fixture: ComponentFixture<CrowdfundingCampaignDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrowdfundingCampaignDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ crowdfundingCampaign: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CrowdfundingCampaignDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CrowdfundingCampaignDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load crowdfundingCampaign on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.crowdfundingCampaign).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
