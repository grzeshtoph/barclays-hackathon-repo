import { ICBDCUser, NewCBDCUser } from './cbdc-user.model';

export const sampleWithRequiredData: ICBDCUser = {
  id: 73864,
};

export const sampleWithPartialData: ICBDCUser = {
  id: 29097,
  password: 'cutting-edge',
};

export const sampleWithFullData: ICBDCUser = {
  id: 14577,
  email: 'Arlene.Hammes@hotmail.com',
  password: 'Orchestrator',
  firstName: 'Brad',
  lastName: 'Balistreri',
};

export const sampleWithNewData: NewCBDCUser = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
