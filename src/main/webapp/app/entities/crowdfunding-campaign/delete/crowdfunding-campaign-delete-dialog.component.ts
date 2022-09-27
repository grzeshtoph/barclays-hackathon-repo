import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrowdfundingCampaign } from '../crowdfunding-campaign.model';
import { CrowdfundingCampaignService } from '../service/crowdfunding-campaign.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crowdfunding-campaign-delete-dialog.component.html',
})
export class CrowdfundingCampaignDeleteDialogComponent {
  crowdfundingCampaign?: ICrowdfundingCampaign;

  constructor(protected crowdfundingCampaignService: CrowdfundingCampaignService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crowdfundingCampaignService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
