import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ICrowdfundingCampaign } from '../crowdfunding-campaign.model';
import { CrowdfundingCampaignService } from '../service/crowdfunding-campaign.service';

import { CrowdfundingCampaignRoutingResolveService } from './crowdfunding-campaign-routing-resolve.service';

describe('CrowdfundingCampaign routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: CrowdfundingCampaignRoutingResolveService;
  let service: CrowdfundingCampaignService;
  let resultCrowdfundingCampaign: ICrowdfundingCampaign | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(CrowdfundingCampaignRoutingResolveService);
    service = TestBed.inject(CrowdfundingCampaignService);
    resultCrowdfundingCampaign = undefined;
  });

  describe('resolve', () => {
    it('should return ICrowdfundingCampaign returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCrowdfundingCampaign = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCrowdfundingCampaign).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCrowdfundingCampaign = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCrowdfundingCampaign).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ICrowdfundingCampaign>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCrowdfundingCampaign = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCrowdfundingCampaign).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
