export interface ICBDCUser {
  id: number;
  email?: string | null;
  password?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

export type NewCBDCUser = Omit<ICBDCUser, 'id'> & { id: null };
