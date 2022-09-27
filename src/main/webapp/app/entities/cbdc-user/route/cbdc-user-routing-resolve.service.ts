import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICBDCUser } from '../cbdc-user.model';
import { CBDCUserService } from '../service/cbdc-user.service';

@Injectable({ providedIn: 'root' })
export class CBDCUserRoutingResolveService implements Resolve<ICBDCUser | null> {
  constructor(protected service: CBDCUserService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICBDCUser | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cBDCUser: HttpResponse<ICBDCUser>) => {
          if (cBDCUser.body) {
            return of(cBDCUser.body);
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
