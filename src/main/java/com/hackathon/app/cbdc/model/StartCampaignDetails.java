package com.hackathon.app.cbdc.model;

import lombok.Data;

@Data
public class StartCampaignDetails {

    private String campaignName;
    private Long goal;
    private Long escrowPipId;
    private Long campaignBankId;
}
