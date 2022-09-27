import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICBDCAccount } from '../cbdc-account.model';

@Component({
  selector: 'jhi-cbdc-account-detail',
  templateUrl: './cbdc-account-detail.component.html',
})
export class CBDCAccountDetailComponent implements OnInit {
  cBDCAccount: ICBDCAccount | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cBDCAccount }) => {
      this.cBDCAccount = cBDCAccount;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
