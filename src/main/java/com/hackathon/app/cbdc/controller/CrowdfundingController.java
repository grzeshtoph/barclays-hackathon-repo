package com.hackathon.app.cbdc.controller;

import com.hackathon.app.cbdc.model.Campaign;
import com.hackathon.app.cbdc.model.CampaignDetails;
import com.hackathon.app.cbdc.model.StartCampaignDetails;
import com.hackathon.app.cbdc.service.CrowdfundingService;
import com.hackathon.app.domain.CrowdfundingCampaign;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
}
