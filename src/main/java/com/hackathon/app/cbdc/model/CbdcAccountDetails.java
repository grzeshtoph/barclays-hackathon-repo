package com.hackathon.app.cbdc.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CbdcAccountDetails {

    private Long partyId;
    private Long accountId;
    private Long pipId;
    private String pipName;
    private Long commercialBankId;
    private String commercialBankName;
    private Long accountBalance;
    private CbdcCurrencyDetails cbdcCurrencyDetails;
}
