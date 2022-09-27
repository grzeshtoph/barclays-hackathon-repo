import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CrowdfundingCampaignComponent } from '../list/crowdfunding-campaign.component';
import { CrowdfundingCampaignDetailComponent } from '../detail/crowdfunding-campaign-detail.component';
import { CrowdfundingCampaignUpdateComponent } from '../update/crowdfunding-campaign-update.component';
import { CrowdfundingCampaignRoutingResolveService } from './crowdfunding-campaign-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const crowdfundingCampaignRoute: Routes = [
  {
    path: '',
    component: CrowdfundingCampaignComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CrowdfundingCampaignDetailComponent,
    resolve: {
      crowdfundingCampaign: CrowdfundingCampaignRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CrowdfundingCampaignUpdateComponent,
    resolve: {
      crowdfundingCampaign: CrowdfundingCampaignRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CrowdfundingCampaignUpdateComponent,
    resolve: {
      crowdfundingCampaign: CrowdfundingCampaignRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crowdfundingCampaignRoute)],
  exports: [RouterModule],
})
export class CrowdfundingCampaignRoutingModule {}
