import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CBDCAccountFormService, CBDCAccountFormGroup } from './cbdc-account-form.service';
import { ICBDCAccount } from '../cbdc-account.model';
import { CBDCAccountService } from '../service/cbdc-account.service';

@Component({
  selector: 'jhi-cbdc-account-update',
  templateUrl: './cbdc-account-update.component.html',
})
export class CBDCAccountUpdateComponent implements OnInit {
  isSaving = false;
  cBDCAccount: ICBDCAccount | null = null;

  editForm: CBDCAccountFormGroup = this.cBDCAccountFormService.createCBDCAccountFormGroup();

  constructor(
    protected cBDCAccountService: CBDCAccountService,
    protected cBDCAccountFormService: CBDCAccountFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cBDCAccount }) => {
      this.cBDCAccount = cBDCAccount;
      if (cBDCAccount) {
        this.updateForm(cBDCAccount);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cBDCAccount = this.cBDCAccountFormService.getCBDCAccount(this.editForm);
    if (cBDCAccount.id !== null) {
      this.subscribeToSaveResponse(this.cBDCAccountService.update(cBDCAccount));
    } else {
      this.subscribeToSaveResponse(this.cBDCAccountService.create(cBDCAccount));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICBDCAccount>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(cBDCAccount: ICBDCAccount): void {
    this.cBDCAccount = cBDCAccount;
    this.cBDCAccountFormService.resetForm(this.editForm, cBDCAccount);
  }
}
