import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CBDCAccountComponent } from '../list/cbdc-account.component';
import { CBDCAccountDetailComponent } from '../detail/cbdc-account-detail.component';
import { CBDCAccountUpdateComponent } from '../update/cbdc-account-update.component';
import { CBDCAccountRoutingResolveService } from './cbdc-account-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const cBDCAccountRoute: Routes = [
  {
    path: '',
    component: CBDCAccountComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CBDCAccountDetailComponent,
    resolve: {
      cBDCAccount: CBDCAccountRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CBDCAccountUpdateComponent,
    resolve: {
      cBDCAccount: CBDCAccountRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CBDCAccountUpdateComponent,
    resolve: {
      cBDCAccount: CBDCAccountRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cBDCAccountRoute)],
  exports: [RouterModule],
})
export class CBDCAccountRoutingModule {}
