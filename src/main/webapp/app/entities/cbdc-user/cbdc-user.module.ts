import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CBDCUserComponent } from './list/cbdc-user.component';
import { CBDCUserDetailComponent } from './detail/cbdc-user-detail.component';
import { CBDCUserUpdateComponent } from './update/cbdc-user-update.component';
import { CBDCUserDeleteDialogComponent } from './delete/cbdc-user-delete-dialog.component';
import { CBDCUserRoutingModule } from './route/cbdc-user-routing.module';

@NgModule({
  imports: [SharedModule, CBDCUserRoutingModule],
  declarations: [CBDCUserComponent, CBDCUserDetailComponent, CBDCUserUpdateComponent, CBDCUserDeleteDialogComponent],
})
export class CBDCUserModule {}
