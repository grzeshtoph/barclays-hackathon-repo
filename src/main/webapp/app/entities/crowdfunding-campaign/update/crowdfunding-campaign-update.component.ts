import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrowdfundingCampaignFormService, CrowdfundingCampaignFormGroup } from './crowdfunding-campaign-form.service';
import { ICrowdfundingCampaign } from '../crowdfunding-campaign.model';
import { CrowdfundingCampaignService } from '../service/crowdfunding-campaign.service';

@Component({
  selector: 'jhi-crowdfunding-campaign-update',
  templateUrl: './crowdfunding-campaign-update.component.html',
})
export class CrowdfundingCampaignUpdateComponent implements OnInit {
  isSaving = false;
  crowdfundingCampaign: ICrowdfundingCampaign | null = null;

  editForm: CrowdfundingCampaignFormGroup = this.crowdfundingCampaignFormService.createCrowdfundingCampaignFormGroup();

  constructor(
    protected crowdfundingCampaignService: CrowdfundingCampaignService,
    protected crowdfundingCampaignFormService: CrowdfundingCampaignFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crowdfundingCampaign }) => {
      this.crowdfundingCampaign = crowdfundingCampaign;
      if (crowdfundingCampaign) {
        this.updateForm(crowdfundingCampaign);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crowdfundingCampaign = this.crowdfundingCampaignFormService.getCrowdfundingCampaign(this.editForm);
    if (crowdfundingCampaign.id !== null) {
      this.subscribeToSaveResponse(this.crowdfundingCampaignService.update(crowdfundingCampaign));
    } else {
      this.subscribeToSaveResponse(this.crowdfundingCampaignService.create(crowdfundingCampaign));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrowdfundingCampaign>>): void {
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

  protected updateForm(crowdfundingCampaign: ICrowdfundingCampaign): void {
    this.crowdfundingCampaign = crowdfundingCampaign;
    this.crowdfundingCampaignFormService.resetForm(this.editForm, crowdfundingCampaign);
  }
}
