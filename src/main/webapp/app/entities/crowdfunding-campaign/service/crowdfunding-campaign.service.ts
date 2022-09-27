import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICrowdfundingCampaign, NewCrowdfundingCampaign } from '../crowdfunding-campaign.model';

export type PartialUpdateCrowdfundingCampaign = Partial<ICrowdfundingCampaign> & Pick<ICrowdfundingCampaign, 'id'>;

export type EntityResponseType = HttpResponse<ICrowdfundingCampaign>;
export type EntityArrayResponseType = HttpResponse<ICrowdfundingCampaign[]>;

@Injectable({ providedIn: 'root' })
export class CrowdfundingCampaignService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crowdfunding-campaigns');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crowdfundingCampaign: NewCrowdfundingCampaign): Observable<EntityResponseType> {
    return this.http.post<ICrowdfundingCampaign>(this.resourceUrl, crowdfundingCampaign, { observe: 'response' });
  }

  update(crowdfundingCampaign: ICrowdfundingCampaign): Observable<EntityResponseType> {
    return this.http.put<ICrowdfundingCampaign>(
      `${this.resourceUrl}/${this.getCrowdfundingCampaignIdentifier(crowdfundingCampaign)}`,
      crowdfundingCampaign,
      { observe: 'response' }
    );
  }

  partialUpdate(crowdfundingCampaign: PartialUpdateCrowdfundingCampaign): Observable<EntityResponseType> {
    return this.http.patch<ICrowdfundingCampaign>(
      `${this.resourceUrl}/${this.getCrowdfundingCampaignIdentifier(crowdfundingCampaign)}`,
      crowdfundingCampaign,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrowdfundingCampaign>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrowdfundingCampaign[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCrowdfundingCampaignIdentifier(crowdfundingCampaign: Pick<ICrowdfundingCampaign, 'id'>): number {
    return crowdfundingCampaign.id;
  }

  compareCrowdfundingCampaign(o1: Pick<ICrowdfundingCampaign, 'id'> | null, o2: Pick<ICrowdfundingCampaign, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrowdfundingCampaignIdentifier(o1) === this.getCrowdfundingCampaignIdentifier(o2) : o1 === o2;
  }

  addCrowdfundingCampaignToCollectionIfMissing<Type extends Pick<ICrowdfundingCampaign, 'id'>>(
    crowdfundingCampaignCollection: Type[],
    ...crowdfundingCampaignsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crowdfundingCampaigns: Type[] = crowdfundingCampaignsToCheck.filter(isPresent);
    if (crowdfundingCampaigns.length > 0) {
      const crowdfundingCampaignCollectionIdentifiers = crowdfundingCampaignCollection.map(
        crowdfundingCampaignItem => this.getCrowdfundingCampaignIdentifier(crowdfundingCampaignItem)!
      );
      const crowdfundingCampaignsToAdd = crowdfundingCampaigns.filter(crowdfundingCampaignItem => {
        const crowdfundingCampaignIdentifier = this.getCrowdfundingCampaignIdentifier(crowdfundingCampaignItem);
        if (crowdfundingCampaignCollectionIdentifiers.includes(crowdfundingCampaignIdentifier)) {
          return false;
        }
        crowdfundingCampaignCollectionIdentifiers.push(crowdfundingCampaignIdentifier);
        return true;
      });
      return [...crowdfundingCampaignsToAdd, ...crowdfundingCampaignCollection];
    }
    return crowdfundingCampaignCollection;
  }
}
