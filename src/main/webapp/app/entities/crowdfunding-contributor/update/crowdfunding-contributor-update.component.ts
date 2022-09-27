import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrowdfundingContributorFormService, CrowdfundingContributorFormGroup } from './crowdfunding-contributor-form.service';
import { ICrowdfundingContributor } from '../crowdfunding-contributor.model';
import { CrowdfundingContributorService } from '../service/crowdfunding-contributor.service';

@Component({
  selector: 'jhi-crowdfunding-contributor-update',
  templateUrl: './crowdfunding-contributor-update.component.html',
})
export class CrowdfundingContributorUpdateComponent implements OnInit {
  isSaving = false;
  crowdfundingContributor: ICrowdfundingContributor | null = null;

  editForm: CrowdfundingContributorFormGroup = this.crowdfundingContributorFormService.createCrowdfundingContributorFormGroup();

  constructor(
    protected crowdfundingContributorService: CrowdfundingContributorService,
    protected crowdfundingContributorFormService: CrowdfundingContributorFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crowdfundingContributor }) => {
      this.crowdfundingContributor = crowdfundingContributor;
      if (crowdfundingContributor) {
        this.updateForm(crowdfundingContributor);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crowdfundingContributor = this.crowdfundingContributorFormService.getCrowdfundingContributor(this.editForm);
    if (crowdfundingContributor.id !== null) {
      this.subscribeToSaveResponse(this.crowdfundingContributorService.update(crowdfundingContributor));
    } else {
      this.subscribeToSaveResponse(this.crowdfundingContributorService.create(crowdfundingContributor));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrowdfundingContributor>>): void {
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

  protected updateForm(crowdfundingContributor: ICrowdfundingContributor): void {
    this.crowdfundingContributor = crowdfundingContributor;
    this.crowdfundingContributorFormService.resetForm(this.editForm, crowdfundingContributor);
  }
}
