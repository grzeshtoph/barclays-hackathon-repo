import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICrowdfundingContributor, NewCrowdfundingContributor } from '../crowdfunding-contributor.model';

export type PartialUpdateCrowdfundingContributor = Partial<ICrowdfundingContributor> & Pick<ICrowdfundingContributor, 'id'>;

export type EntityResponseType = HttpResponse<ICrowdfundingContributor>;
export type EntityArrayResponseType = HttpResponse<ICrowdfundingContributor[]>;

@Injectable({ providedIn: 'root' })
export class CrowdfundingContributorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crowdfunding-contributors');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crowdfundingContributor: NewCrowdfundingContributor): Observable<EntityResponseType> {
    return this.http.post<ICrowdfundingContributor>(this.resourceUrl, crowdfundingContributor, { observe: 'response' });
  }

  update(crowdfundingContributor: ICrowdfundingContributor): Observable<EntityResponseType> {
    return this.http.put<ICrowdfundingContributor>(
      `${this.resourceUrl}/${this.getCrowdfundingContributorIdentifier(crowdfundingContributor)}`,
      crowdfundingContributor,
      { observe: 'response' }
    );
  }

  partialUpdate(crowdfundingContributor: PartialUpdateCrowdfundingContributor): Observable<EntityResponseType> {
    return this.http.patch<ICrowdfundingContributor>(
      `${this.resourceUrl}/${this.getCrowdfundingContributorIdentifier(crowdfundingContributor)}`,
      crowdfundingContributor,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrowdfundingContributor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrowdfundingContributor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCrowdfundingContributorIdentifier(crowdfundingContributor: Pick<ICrowdfundingContributor, 'id'>): number {
    return crowdfundingContributor.id;
  }

  compareCrowdfundingContributor(
    o1: Pick<ICrowdfundingContributor, 'id'> | null,
    o2: Pick<ICrowdfundingContributor, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getCrowdfundingContributorIdentifier(o1) === this.getCrowdfundingContributorIdentifier(o2) : o1 === o2;
  }

  addCrowdfundingContributorToCollectionIfMissing<Type extends Pick<ICrowdfundingContributor, 'id'>>(
    crowdfundingContributorCollection: Type[],
    ...crowdfundingContributorsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crowdfundingContributors: Type[] = crowdfundingContributorsToCheck.filter(isPresent);
    if (crowdfundingContributors.length > 0) {
      const crowdfundingContributorCollectionIdentifiers = crowdfundingContributorCollection.map(
        crowdfundingContributorItem => this.getCrowdfundingContributorIdentifier(crowdfundingContributorItem)!
      );
      const crowdfundingContributorsToAdd = crowdfundingContributors.filter(crowdfundingContributorItem => {
        const crowdfundingContributorIdentifier = this.getCrowdfundingContributorIdentifier(crowdfundingContributorItem);
        if (crowdfundingContributorCollectionIdentifiers.includes(crowdfundingContributorIdentifier)) {
          return false;
        }
        crowdfundingContributorCollectionIdentifiers.push(crowdfundingContributorIdentifier);
        return true;
      });
      return [...crowdfundingContributorsToAdd, ...crowdfundingContributorCollection];
    }
    return crowdfundingContributorCollection;
  }
}
