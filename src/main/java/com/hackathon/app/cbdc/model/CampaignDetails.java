package com.hackathon.app.cbdc.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CampaignDetails {

    private Long id;
    private Long goal;
    private String name;
    private Long currentAmount;
}
