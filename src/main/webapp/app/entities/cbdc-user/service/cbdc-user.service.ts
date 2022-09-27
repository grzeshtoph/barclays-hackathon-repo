import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICBDCUser, NewCBDCUser } from '../cbdc-user.model';

export type PartialUpdateCBDCUser = Partial<ICBDCUser> & Pick<ICBDCUser, 'id'>;

export type EntityResponseType = HttpResponse<ICBDCUser>;
export type EntityArrayResponseType = HttpResponse<ICBDCUser[]>;

@Injectable({ providedIn: 'root' })
export class CBDCUserService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cbdc-users');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cBDCUser: NewCBDCUser): Observable<EntityResponseType> {
    return this.http.post<ICBDCUser>(this.resourceUrl, cBDCUser, { observe: 'response' });
  }

  update(cBDCUser: ICBDCUser): Observable<EntityResponseType> {
    return this.http.put<ICBDCUser>(`${this.resourceUrl}/${this.getCBDCUserIdentifier(cBDCUser)}`, cBDCUser, { observe: 'response' });
  }

  partialUpdate(cBDCUser: PartialUpdateCBDCUser): Observable<EntityResponseType> {
    return this.http.patch<ICBDCUser>(`${this.resourceUrl}/${this.getCBDCUserIdentifier(cBDCUser)}`, cBDCUser, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICBDCUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICBDCUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCBDCUserIdentifier(cBDCUser: Pick<ICBDCUser, 'id'>): number {
    return cBDCUser.id;
  }

  compareCBDCUser(o1: Pick<ICBDCUser, 'id'> | null, o2: Pick<ICBDCUser, 'id'> | null): boolean {
    return o1 && o2 ? this.getCBDCUserIdentifier(o1) === this.getCBDCUserIdentifier(o2) : o1 === o2;
  }

  addCBDCUserToCollectionIfMissing<Type extends Pick<ICBDCUser, 'id'>>(
    cBDCUserCollection: Type[],
    ...cBDCUsersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cBDCUsers: Type[] = cBDCUsersToCheck.filter(isPresent);
    if (cBDCUsers.length > 0) {
      const cBDCUserCollectionIdentifiers = cBDCUserCollection.map(cBDCUserItem => this.getCBDCUserIdentifier(cBDCUserItem)!);
      const cBDCUsersToAdd = cBDCUsers.filter(cBDCUserItem => {
        const cBDCUserIdentifier = this.getCBDCUserIdentifier(cBDCUserItem);
        if (cBDCUserCollectionIdentifiers.includes(cBDCUserIdentifier)) {
          return false;
        }
        cBDCUserCollectionIdentifiers.push(cBDCUserIdentifier);
        return true;
      });
      return [...cBDCUsersToAdd, ...cBDCUserCollection];
    }
    return cBDCUserCollection;
  }
}
