import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICBDCAccount, NewCBDCAccount } from '../cbdc-account.model';

export type PartialUpdateCBDCAccount = Partial<ICBDCAccount> & Pick<ICBDCAccount, 'id'>;

export type EntityResponseType = HttpResponse<ICBDCAccount>;
export type EntityArrayResponseType = HttpResponse<ICBDCAccount[]>;

@Injectable({ providedIn: 'root' })
export class CBDCAccountService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cbdc-accounts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cBDCAccount: NewCBDCAccount): Observable<EntityResponseType> {
    return this.http.post<ICBDCAccount>(this.resourceUrl, cBDCAccount, { observe: 'response' });
  }

  update(cBDCAccount: ICBDCAccount): Observable<EntityResponseType> {
    return this.http.put<ICBDCAccount>(`${this.resourceUrl}/${this.getCBDCAccountIdentifier(cBDCAccount)}`, cBDCAccount, {
      observe: 'response',
    });
  }

  partialUpdate(cBDCAccount: PartialUpdateCBDCAccount): Observable<EntityResponseType> {
    return this.http.patch<ICBDCAccount>(`${this.resourceUrl}/${this.getCBDCAccountIdentifier(cBDCAccount)}`, cBDCAccount, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICBDCAccount>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICBDCAccount[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCBDCAccountIdentifier(cBDCAccount: Pick<ICBDCAccount, 'id'>): number {
    return cBDCAccount.id;
  }

  compareCBDCAccount(o1: Pick<ICBDCAccount, 'id'> | null, o2: Pick<ICBDCAccount, 'id'> | null): boolean {
    return o1 && o2 ? this.getCBDCAccountIdentifier(o1) === this.getCBDCAccountIdentifier(o2) : o1 === o2;
  }

  addCBDCAccountToCollectionIfMissing<Type extends Pick<ICBDCAccount, 'id'>>(
    cBDCAccountCollection: Type[],
    ...cBDCAccountsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cBDCAccounts: Type[] = cBDCAccountsToCheck.filter(isPresent);
    if (cBDCAccounts.length > 0) {
      const cBDCAccountCollectionIdentifiers = cBDCAccountCollection.map(
        cBDCAccountItem => this.getCBDCAccountIdentifier(cBDCAccountItem)!
      );
      const cBDCAccountsToAdd = cBDCAccounts.filter(cBDCAccountItem => {
        const cBDCAccountIdentifier = this.getCBDCAccountIdentifier(cBDCAccountItem);
        if (cBDCAccountCollectionIdentifiers.includes(cBDCAccountIdentifier)) {
          return false;
        }
        cBDCAccountCollectionIdentifiers.push(cBDCAccountIdentifier);
        return true;
      });
      return [...cBDCAccountsToAdd, ...cBDCAccountCollection];
    }
    return cBDCAccountCollection;
  }
}
