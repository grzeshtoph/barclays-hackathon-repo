import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ICrowdfundingContributor } from '../crowdfunding-contributor.model';
import { CrowdfundingContributorService } from '../service/crowdfunding-contributor.service';

import { CrowdfundingContributorRoutingResolveService } from './crowdfunding-contributor-routing-resolve.service';

describe('CrowdfundingContributor routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: CrowdfundingContributorRoutingResolveService;
  let service: CrowdfundingContributorService;
  let resultCrowdfundingContributor: ICrowdfundingContributor | null | undefined;

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
    routingResolveService = TestBed.inject(CrowdfundingContributorRoutingResolveService);
    service = TestBed.inject(CrowdfundingContributorService);
    resultCrowdfundingContributor = undefined;
  });

  describe('resolve', () => {
    it('should return ICrowdfundingContributor returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCrowdfundingContributor = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCrowdfundingContributor).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCrowdfundingContributor = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCrowdfundingContributor).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ICrowdfundingContributor>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCrowdfundingContributor = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCrowdfundingContributor).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
