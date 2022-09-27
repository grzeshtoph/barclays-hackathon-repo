import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrowdfundingContributor } from '../crowdfunding-contributor.model';
import { CrowdfundingContributorService } from '../service/crowdfunding-contributor.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crowdfunding-contributor-delete-dialog.component.html',
})
export class CrowdfundingContributorDeleteDialogComponent {
  crowdfundingContributor?: ICrowdfundingContributor;

  constructor(protected crowdfundingContributorService: CrowdfundingContributorService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crowdfundingContributorService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
