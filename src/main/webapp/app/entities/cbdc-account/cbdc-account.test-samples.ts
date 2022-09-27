import { ICBDCAccount, NewCBDCAccount } from './cbdc-account.model';

export const sampleWithRequiredData: ICBDCAccount = {
  id: 31299,
};

export const sampleWithPartialData: ICBDCAccount = {
  id: 92308,
  pipId: 77762,
  currencyId: 55879,
  cbdcUserID: 7012,
};

export const sampleWithFullData: ICBDCAccount = {
  id: 75524,
  partyId: 38159,
  accountId: 82684,
  pipId: 51236,
  currencyId: 20973,
  cbdcUserID: 76727,
};

export const sampleWithNewData: NewCBDCAccount = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
