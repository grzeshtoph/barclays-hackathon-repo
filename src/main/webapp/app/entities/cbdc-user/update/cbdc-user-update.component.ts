import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CBDCUserFormService, CBDCUserFormGroup } from './cbdc-user-form.service';
import { ICBDCUser } from '../cbdc-user.model';
import { CBDCUserService } from '../service/cbdc-user.service';

@Component({
  selector: 'jhi-cbdc-user-update',
  templateUrl: './cbdc-user-update.component.html',
})
export class CBDCUserUpdateComponent implements OnInit {
  isSaving = false;
  cBDCUser: ICBDCUser | null = null;

  editForm: CBDCUserFormGroup = this.cBDCUserFormService.createCBDCUserFormGroup();

  constructor(
    protected cBDCUserService: CBDCUserService,
    protected cBDCUserFormService: CBDCUserFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cBDCUser }) => {
      this.cBDCUser = cBDCUser;
      if (cBDCUser) {
        this.updateForm(cBDCUser);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cBDCUser = this.cBDCUserFormService.getCBDCUser(this.editForm);
    if (cBDCUser.id !== null) {
      this.subscribeToSaveResponse(this.cBDCUserService.update(cBDCUser));
    } else {
      this.subscribeToSaveResponse(this.cBDCUserService.create(cBDCUser));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICBDCUser>>): void {
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

  protected updateForm(cBDCUser: ICBDCUser): void {
    this.cBDCUser = cBDCUser;
    this.cBDCUserFormService.resetForm(this.editForm, cBDCUser);
  }
}
