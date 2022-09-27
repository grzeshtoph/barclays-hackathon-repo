import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICBDCAccount } from '../cbdc-account.model';
import { CBDCAccountService } from '../service/cbdc-account.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './cbdc-account-delete-dialog.component.html',
})
export class CBDCAccountDeleteDialogComponent {
  cBDCAccount?: ICBDCAccount;

  constructor(protected cBDCAccountService: CBDCAccountService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cBDCAccountService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
