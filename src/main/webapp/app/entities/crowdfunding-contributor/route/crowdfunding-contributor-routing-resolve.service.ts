import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrowdfundingContributor } from '../crowdfunding-contributor.model';
import { CrowdfundingContributorService } from '../service/crowdfunding-contributor.service';

@Injectable({ providedIn: 'root' })
export class CrowdfundingContributorRoutingResolveService implements Resolve<ICrowdfundingContributor | null> {
  constructor(protected service: CrowdfundingContributorService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrowdfundingContributor | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crowdfundingContributor: HttpResponse<ICrowdfundingContributor>) => {
          if (crowdfundingContributor.body) {
            return of(crowdfundingContributor.body);
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
