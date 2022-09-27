import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICBDCUser } from '../cbdc-user.model';

@Component({
  selector: 'jhi-cbdc-user-detail',
  templateUrl: './cbdc-user-detail.component.html',
})
export class CBDCUserDetailComponent implements OnInit {
  cBDCUser: ICBDCUser | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cBDCUser }) => {
      this.cBDCUser = cBDCUser;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
