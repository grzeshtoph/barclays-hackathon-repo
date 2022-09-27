import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrowdfundingCampaign } from '../crowdfunding-campaign.model';
import { CrowdfundingCampaignService } from '../service/crowdfunding-campaign.service';

@Injectable({ providedIn: 'root' })
export class CrowdfundingCampaignRoutingResolveService implements Resolve<ICrowdfundingCampaign | null> {
  constructor(protected service: CrowdfundingCampaignService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrowdfundingCampaign | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crowdfundingCampaign: HttpResponse<ICrowdfundingCampaign>) => {
          if (crowdfundingCampaign.body) {
            return of(crowdfundingCampaign.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
