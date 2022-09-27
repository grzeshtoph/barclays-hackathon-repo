import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrowdfundingContributor } from '../crowdfunding-contributor.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../crowdfunding-contributor.test-samples';

import { CrowdfundingContributorService } from './crowdfunding-contributor.service';

const requireRestSample: ICrowdfundingContributor = {
  ...sampleWithRequiredData,
};

describe('CrowdfundingContributor Service', () => {
  let service: CrowdfundingContributorService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrowdfundingContributor | ICrowdfundingContributor[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrowdfundingContributorService);
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

    it('should create a CrowdfundingContributor', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crowdfundingContributor = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crowdfundingContributor).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrowdfundingContributor', () => {
      const crowdfundingContributor = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crowdfundingContributor).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrowdfundingContributor', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrowdfundingContributor', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrowdfundingContributor', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrowdfundingContributorToCollectionIfMissing', () => {
      it('should add a CrowdfundingContributor to an empty array', () => {
        const crowdfundingContributor: ICrowdfundingContributor = sampleWithRequiredData;
        expectedResult = service.addCrowdfundingContributorToCollectionIfMissing([], crowdfundingContributor);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crowdfundingContributor);
      });

      it('should not add a CrowdfundingContributor to an array that contains it', () => {
        const crowdfundingContributor: ICrowdfundingContributor = sampleWithRequiredData;
        const crowdfundingContributorCollection: ICrowdfundingContributor[] = [
          {
            ...crowdfundingContributor,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrowdfundingContributorToCollectionIfMissing(
          crowdfundingContributorCollection,
          crowdfundingContributor
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrowdfundingContributor to an array that doesn't contain it", () => {
        const crowdfundingContributor: ICrowdfundingContributor = sampleWithRequiredData;
        const crowdfundingContributorCollection: ICrowdfundingContributor[] = [sampleWithPartialData];
        expectedResult = service.addCrowdfundingContributorToCollectionIfMissing(
          crowdfundingContributorCollection,
          crowdfundingContributor
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crowdfundingContributor);
      });

      it('should add only unique CrowdfundingContributor to an array', () => {
        const crowdfundingContributorArray: ICrowdfundingContributor[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const crowdfundingContributorCollection: ICrowdfundingContributor[] = [sampleWithRequiredData];
        expectedResult = service.addCrowdfundingContributorToCollectionIfMissing(
          crowdfundingContributorCollection,
          ...crowdfundingContributorArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crowdfundingContributor: ICrowdfundingContributor = sampleWithRequiredData;
        const crowdfundingContributor2: ICrowdfundingContributor = sampleWithPartialData;
        expectedResult = service.addCrowdfundingContributorToCollectionIfMissing([], crowdfundingContributor, crowdfundingContributor2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crowdfundingContributor);
        expect(expectedResult).toContain(crowdfundingContributor2);
      });

      it('should accept null and undefined values', () => {
        const crowdfundingContributor: ICrowdfundingContributor = sampleWithRequiredData;
        expectedResult = service.addCrowdfundingContributorToCollectionIfMissing([], null, crowdfundingContributor, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crowdfundingContributor);
      });

      it('should return initial array if no CrowdfundingContributor is added', () => {
        const crowdfundingContributorCollection: ICrowdfundingContributor[] = [sampleWithRequiredData];
        expectedResult = service.addCrowdfundingContributorToCollectionIfMissing(crowdfundingContributorCollection, undefined, null);
        expect(expectedResult).toEqual(crowdfundingContributorCollection);
      });
    });

    describe('compareCrowdfundingContributor', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrowdfundingContributor(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrowdfundingContributor(entity1, entity2);
        const compareResult2 = service.compareCrowdfundingContributor(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrowdfundingContributor(entity1, entity2);
        const compareResult2 = service.compareCrowdfundingContributor(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrowdfundingContributor(entity1, entity2);
        const compareResult2 = service.compareCrowdfundingContributor(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
