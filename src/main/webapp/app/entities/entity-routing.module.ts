import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'cbdc-user',
        data: { pageTitle: 'CBDCUsers' },
        loadChildren: () => import('./cbdc-user/cbdc-user.module').then(m => m.CBDCUserModule),
      },
      {
        path: 'cbdc-account',
        data: { pageTitle: 'CBDCAccounts' },
        loadChildren: () => import('./cbdc-account/cbdc-account.module').then(m => m.CBDCAccountModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
