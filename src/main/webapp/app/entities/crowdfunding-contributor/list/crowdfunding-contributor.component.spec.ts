import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CrowdfundingContributorService } from '../service/crowdfunding-contributor.service';

import { CrowdfundingContributorComponent } from './crowdfunding-contributor.component';

describe('CrowdfundingContributor Management Component', () => {
  let comp: CrowdfundingContributorComponent;
  let fixture: ComponentFixture<CrowdfundingContributorComponent>;
  let service: CrowdfundingContributorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'crowdfunding-contributor', component: CrowdfundingContributorComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [CrowdfundingContributorComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(CrowdfundingContributorComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrowdfundingContributorComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CrowdfundingContributorService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.crowdfundingContributors?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to crowdfundingContributorService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getCrowdfundingContributorIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getCrowdfundingContributorIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
