package com.hackathon.app.cbdc.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PipDetails {

    Long id;
    String name;
    Long partyId;
    Long accountId;
    CbdcCurrencyDetails cbdcCurrencyDetails;
}
