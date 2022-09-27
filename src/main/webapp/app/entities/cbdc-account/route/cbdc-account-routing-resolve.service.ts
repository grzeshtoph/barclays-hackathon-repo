import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICBDCAccount } from '../cbdc-account.model';
import { CBDCAccountService } from '../service/cbdc-account.service';

@Injectable({ providedIn: 'root' })
export class CBDCAccountRoutingResolveService implements Resolve<ICBDCAccount | null> {
  constructor(protected service: CBDCAccountService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICBDCAccount | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cBDCAccount: HttpResponse<ICBDCAccount>) => {
          if (cBDCAccount.body) {
            return of(cBDCAccount.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
