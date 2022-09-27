import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CBDCAccountComponent } from './list/cbdc-account.component';
import { CBDCAccountDetailComponent } from './detail/cbdc-account-detail.component';
import { CBDCAccountUpdateComponent } from './update/cbdc-account-update.component';
import { CBDCAccountDeleteDialogComponent } from './delete/cbdc-account-delete-dialog.component';
import { CBDCAccountRoutingModule } from './route/cbdc-account-routing.module';

@NgModule({
  imports: [SharedModule, CBDCAccountRoutingModule],
  declarations: [CBDCAccountComponent, CBDCAccountDetailComponent, CBDCAccountUpdateComponent, CBDCAccountDeleteDialogComponent],
})
export class CBDCAccountModule {}
