import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CrowdfundingContributorComponent } from '../list/crowdfunding-contributor.component';
import { CrowdfundingContributorDetailComponent } from '../detail/crowdfunding-contributor-detail.component';
import { CrowdfundingContributorUpdateComponent } from '../update/crowdfunding-contributor-update.component';
import { CrowdfundingContributorRoutingResolveService } from './crowdfunding-contributor-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const crowdfundingContributorRoute: Routes = [
  {
    path: '',
    component: CrowdfundingContributorComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CrowdfundingContributorDetailComponent,
    resolve: {
      crowdfundingContributor: CrowdfundingContributorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CrowdfundingContributorUpdateComponent,
    resolve: {
      crowdfundingContributor: CrowdfundingContributorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CrowdfundingContributorUpdateComponent,
    resolve: {
      crowdfundingContributor: CrowdfundingContributorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crowdfundingContributorRoute)],
  exports: [RouterModule],
})
export class CrowdfundingContributorRoutingModule {}
