import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICrowdfundingCampaign } from '../crowdfunding-campaign.model';

@Component({
  selector: 'jhi-crowdfunding-campaign-detail',
  templateUrl: './crowdfunding-campaign-detail.component.html',
})
export class CrowdfundingCampaignDetailComponent implements OnInit {
  crowdfundingCampaign: ICrowdfundingCampaign | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crowdfundingCampaign }) => {
      this.crowdfundingCampaign = crowdfundingCampaign;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
