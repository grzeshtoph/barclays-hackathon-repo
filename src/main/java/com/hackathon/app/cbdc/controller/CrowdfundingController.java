package com.hackathon.app.cbdc.controller;

import com.hackathon.app.cbdc.model.Campaign;
import com.hackathon.app.cbdc.model.CampaignContributor;
import com.hackathon.app.cbdc.model.CampaignDetails;
import com.hackathon.app.cbdc.model.ContributeToCampaignDetails;
import com.hackathon.app.cbdc.model.StartCampaignDetails;
import com.hackathon.app.cbdc.service.CrowdfundingService;
import com.hackathon.app.domain.CrowdfundingCampaign;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cbdc-api")
@RequiredArgsConstructor
public class CrowdfundingController {

    private final CrowdfundingService crowdfundingService;

    @PostMapping("/campaigns")
    public Campaign startCampaign(@RequestBody StartCampaignDetails startCampaignDetails) {
        return crowdfundingService.startCampaign(
            startCampaignDetails.getCampaignName(),
            startCampaignDetails.getGoal(),
            startCampaignDetails.getEscrowPipId(),
            startCampaignDetails.getCampaignBankId()
        );
    }

    @GetMapping("/campaigns/{campaignId}")
    public CampaignDetails getCampaign(@PathVariable Long campaignId) {
        return crowdfundingService.getCampaign(campaignId);
    }

    @GetMapping("/campaigns")
    public List<CrowdfundingCampaign> getCampaign() {
        return crowdfundingService.getCampaignList();
    }

    @PutMapping("/campaigns/{campaignId}")
    public CampaignContributor contribute(@PathVariable Long campaignId, @RequestBody ContributeToCampaignDetails contributionDetails) {
        return crowdfundingService.contribute(campaignId, contributionDetails.getConsentId());
    }

    @DeleteMapping("/campaigns/{campaignId}")
    public void finishCampaign(@PathVariable Long campaignId) {
        crowdfundingService.finishCampaign(campaignId);
    }
}
