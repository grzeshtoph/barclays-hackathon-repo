import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CrowdfundingContributorComponent } from './list/crowdfunding-contributor.component';
import { CrowdfundingContributorDetailComponent } from './detail/crowdfunding-contributor-detail.component';
import { CrowdfundingContributorUpdateComponent } from './update/crowdfunding-contributor-update.component';
import { CrowdfundingContributorDeleteDialogComponent } from './delete/crowdfunding-contributor-delete-dialog.component';
import { CrowdfundingContributorRoutingModule } from './route/crowdfunding-contributor-routing.module';

@NgModule({
  imports: [SharedModule, CrowdfundingContributorRoutingModule],
  declarations: [
    CrowdfundingContributorComponent,
    CrowdfundingContributorDetailComponent,
    CrowdfundingContributorUpdateComponent,
    CrowdfundingContributorDeleteDialogComponent,
  ],
})
export class CrowdfundingContributorModule {}
