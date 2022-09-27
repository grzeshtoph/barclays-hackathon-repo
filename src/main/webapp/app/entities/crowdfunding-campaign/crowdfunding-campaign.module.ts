import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CrowdfundingCampaignComponent } from './list/crowdfunding-campaign.component';
import { CrowdfundingCampaignDetailComponent } from './detail/crowdfunding-campaign-detail.component';
import { CrowdfundingCampaignUpdateComponent } from './update/crowdfunding-campaign-update.component';
import { CrowdfundingCampaignDeleteDialogComponent } from './delete/crowdfunding-campaign-delete-dialog.component';
import { CrowdfundingCampaignRoutingModule } from './route/crowdfunding-campaign-routing.module';

@NgModule({
  imports: [SharedModule, CrowdfundingCampaignRoutingModule],
  declarations: [
    CrowdfundingCampaignComponent,
    CrowdfundingCampaignDetailComponent,
    CrowdfundingCampaignUpdateComponent,
    CrowdfundingCampaignDeleteDialogComponent,
  ],
})
export class CrowdfundingCampaignModule {}
