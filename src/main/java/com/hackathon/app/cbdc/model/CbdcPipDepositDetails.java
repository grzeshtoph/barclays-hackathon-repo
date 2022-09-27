package com.hackathon.app.cbdc.model;

import lombok.Data;

@Data
public class CbdcPipDepositDetails {

    private Long userId;
    private Long pipId;
    private Long amount;
}
