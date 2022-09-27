import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICrowdfundingContributor } from '../crowdfunding-contributor.model';

@Component({
  selector: 'jhi-crowdfunding-contributor-detail',
  templateUrl: './crowdfunding-contributor-detail.component.html',
})
export class CrowdfundingContributorDetailComponent implements OnInit {
  crowdfundingContributor: ICrowdfundingContributor | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crowdfundingContributor }) => {
      this.crowdfundingContributor = crowdfundingContributor;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
