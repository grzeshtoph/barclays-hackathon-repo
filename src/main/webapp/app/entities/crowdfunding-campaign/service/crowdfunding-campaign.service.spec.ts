import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrowdfundingCampaign } from '../crowdfunding-campaign.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../crowdfunding-campaign.test-samples';

import { CrowdfundingCampaignService } from './crowdfunding-campaign.service';

const requireRestSample: ICrowdfundingCampaign = {
  ...sampleWithRequiredData,
};

describe('CrowdfundingCampaign Service', () => {
  let service: CrowdfundingCampaignService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrowdfundingCampaign | ICrowdfundingCampaign[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrowdfundingCampaignService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a CrowdfundingCampaign', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crowdfundingCampaign = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crowdfundingCampaign).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrowdfundingCampaign', () => {
      const crowdfundingCampaign = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crowdfundingCampaign).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrowdfundingCampaign', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrowdfundingCampaign', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrowdfundingCampaign', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrowdfundingCampaignToCollectionIfMissing', () => {
      it('should add a CrowdfundingCampaign to an empty array', () => {
        const crowdfundingCampaign: ICrowdfundingCampaign = sampleWithRequiredData;
        expectedResult = service.addCrowdfundingCampaignToCollectionIfMissing([], crowdfundingCampaign);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crowdfundingCampaign);
      });

      it('should not add a CrowdfundingCampaign to an array that contains it', () => {
        const crowdfundingCampaign: ICrowdfundingCampaign = sampleWithRequiredData;
        const crowdfundingCampaignCollection: ICrowdfundingCampaign[] = [
          {
            ...crowdfundingCampaign,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrowdfundingCampaignToCollectionIfMissing(crowdfundingCampaignCollection, crowdfundingCampaign);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrowdfundingCampaign to an array that doesn't contain it", () => {
        const crowdfundingCampaign: ICrowdfundingCampaign = sampleWithRequiredData;
        const crowdfundingCampaignCollection: ICrowdfundingCampaign[] = [sampleWithPartialData];
        expectedResult = service.addCrowdfundingCampaignToCollectionIfMissing(crowdfundingCampaignCollection, crowdfundingCampaign);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crowdfundingCampaign);
      });

      it('should add only unique CrowdfundingCampaign to an array', () => {
        const crowdfundingCampaignArray: ICrowdfundingCampaign[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crowdfundingCampaignCollection: ICrowdfundingCampaign[] = [sampleWithRequiredData];
        expectedResult = service.addCrowdfundingCampaignToCollectionIfMissing(crowdfundingCampaignCollection, ...crowdfundingCampaignArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crowdfundingCampaign: ICrowdfundingCampaign = sampleWithRequiredData;
        const crowdfundingCampaign2: ICrowdfundingCampaign = sampleWithPartialData;
        expectedResult = service.addCrowdfundingCampaignToCollectionIfMissing([], crowdfundingCampaign, crowdfundingCampaign2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crowdfundingCampaign);
        expect(expectedResult).toContain(crowdfundingCampaign2);
      });

      it('should accept null and undefined values', () => {
        const crowdfundingCampaign: ICrowdfundingCampaign = sampleWithRequiredData;
        expectedResult = service.addCrowdfundingCampaignToCollectionIfMissing([], null, crowdfundingCampaign, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crowdfundingCampaign);
      });

      it('should return initial array if no CrowdfundingCampaign is added', () => {
        const crowdfundingCampaignCollection: ICrowdfundingCampaign[] = [sampleWithRequiredData];
        expectedResult = service.addCrowdfundingCampaignToCollectionIfMissing(crowdfundingCampaignCollection, undefined, null);
        expect(expectedResult).toEqual(crowdfundingCampaignCollection);
      });
    });

    describe('compareCrowdfundingCampaign', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrowdfundingCampaign(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrowdfundingCampaign(entity1, entity2);
        const compareResult2 = service.compareCrowdfundingCampaign(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrowdfundingCampaign(entity1, entity2);
        const compareResult2 = service.compareCrowdfundingCampaign(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrowdfundingCampaign(entity1, entity2);
        const compareResult2 = service.compareCrowdfundingCampaign(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
