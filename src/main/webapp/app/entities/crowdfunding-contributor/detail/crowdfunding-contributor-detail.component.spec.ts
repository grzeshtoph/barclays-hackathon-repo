import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrowdfundingContributorDetailComponent } from './crowdfunding-contributor-detail.component';

describe('CrowdfundingContributor Management Detail Component', () => {
  let comp: CrowdfundingContributorDetailComponent;
  let fixture: ComponentFixture<CrowdfundingContributorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrowdfundingContributorDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ crowdfundingContributor: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CrowdfundingContributorDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CrowdfundingContributorDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load crowdfundingContributor on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.crowdfundingContributor).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
