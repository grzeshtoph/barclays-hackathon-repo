import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CBDCUserComponent } from '../list/cbdc-user.component';
import { CBDCUserDetailComponent } from '../detail/cbdc-user-detail.component';
import { CBDCUserUpdateComponent } from '../update/cbdc-user-update.component';
import { CBDCUserRoutingResolveService } from './cbdc-user-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const cBDCUserRoute: Routes = [
  {
    path: '',
    component: CBDCUserComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CBDCUserDetailComponent,
    resolve: {
      cBDCUser: CBDCUserRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CBDCUserUpdateComponent,
    resolve: {
      cBDCUser: CBDCUserRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CBDCUserUpdateComponent,
    resolve: {
      cBDCUser: CBDCUserRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cBDCUserRoute)],
  exports: [RouterModule],
})
export class CBDCUserRoutingModule {}
