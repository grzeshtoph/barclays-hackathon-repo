import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICBDCAccount } from '../cbdc-account.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../cbdc-account.test-samples';

import { CBDCAccountService } from './cbdc-account.service';

const requireRestSample: ICBDCAccount = {
  ...sampleWithRequiredData,
};

describe('CBDCAccount Service', () => {
  let service: CBDCAccountService;
  let httpMock: HttpTestingController;
  let expectedResult: ICBDCAccount | ICBDCAccount[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CBDCAccountService);
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

    it('should create a CBDCAccount', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cBDCAccount = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cBDCAccount).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CBDCAccount', () => {
      const cBDCAccount = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cBDCAccount).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CBDCAccount', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CBDCAccount', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CBDCAccount', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCBDCAccountToCollectionIfMissing', () => {
      it('should add a CBDCAccount to an empty array', () => {
        const cBDCAccount: ICBDCAccount = sampleWithRequiredData;
        expectedResult = service.addCBDCAccountToCollectionIfMissing([], cBDCAccount);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cBDCAccount);
      });

      it('should not add a CBDCAccount to an array that contains it', () => {
        const cBDCAccount: ICBDCAccount = sampleWithRequiredData;
        const cBDCAccountCollection: ICBDCAccount[] = [
          {
            ...cBDCAccount,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCBDCAccountToCollectionIfMissing(cBDCAccountCollection, cBDCAccount);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CBDCAccount to an array that doesn't contain it", () => {
        const cBDCAccount: ICBDCAccount = sampleWithRequiredData;
        const cBDCAccountCollection: ICBDCAccount[] = [sampleWithPartialData];
        expectedResult = service.addCBDCAccountToCollectionIfMissing(cBDCAccountCollection, cBDCAccount);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cBDCAccount);
      });

      it('should add only unique CBDCAccount to an array', () => {
        const cBDCAccountArray: ICBDCAccount[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cBDCAccountCollection: ICBDCAccount[] = [sampleWithRequiredData];
        expectedResult = service.addCBDCAccountToCollectionIfMissing(cBDCAccountCollection, ...cBDCAccountArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cBDCAccount: ICBDCAccount = sampleWithRequiredData;
        const cBDCAccount2: ICBDCAccount = sampleWithPartialData;
        expectedResult = service.addCBDCAccountToCollectionIfMissing([], cBDCAccount, cBDCAccount2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cBDCAccount);
        expect(expectedResult).toContain(cBDCAccount2);
      });

      it('should accept null and undefined values', () => {
        const cBDCAccount: ICBDCAccount = sampleWithRequiredData;
        expectedResult = service.addCBDCAccountToCollectionIfMissing([], null, cBDCAccount, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cBDCAccount);
      });

      it('should return initial array if no CBDCAccount is added', () => {
        const cBDCAccountCollection: ICBDCAccount[] = [sampleWithRequiredData];
        expectedResult = service.addCBDCAccountToCollectionIfMissing(cBDCAccountCollection, undefined, null);
        expect(expectedResult).toEqual(cBDCAccountCollection);
      });
    });

    describe('compareCBDCAccount', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCBDCAccount(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCBDCAccount(entity1, entity2);
        const compareResult2 = service.compareCBDCAccount(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCBDCAccount(entity1, entity2);
        const compareResult2 = service.compareCBDCAccount(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCBDCAccount(entity1, entity2);
        const compareResult2 = service.compareCBDCAccount(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
