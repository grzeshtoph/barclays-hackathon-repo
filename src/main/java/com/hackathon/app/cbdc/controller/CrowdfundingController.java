package com.hackathon.app.cbdc.controller;

import com.hackathon.app.cbdc.model.Campaign;
import com.hackathon.app.cbdc.model.StartCampaignDetails;
import com.hackathon.app.cbdc.service.CrowdfundingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
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
}
