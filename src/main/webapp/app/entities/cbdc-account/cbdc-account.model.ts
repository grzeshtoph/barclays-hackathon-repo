export interface ICBDCAccount {
  id: number;
  partyId?: number | null;
  accountId?: number | null;
  pipId?: number | null;
  currencyId?: number | null;
  cbdcUserID?: number | null;
}

export type NewCBDCAccount = Omit<ICBDCAccount, 'id'> & { id: null };
