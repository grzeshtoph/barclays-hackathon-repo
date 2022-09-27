import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICBDCUser } from '../cbdc-user.model';
import { CBDCUserService } from '../service/cbdc-user.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './cbdc-user-delete-dialog.component.html',
})
export class CBDCUserDeleteDialogComponent {
  cBDCUser?: ICBDCUser;

  constructor(protected cBDCUserService: CBDCUserService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cBDCUserService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
