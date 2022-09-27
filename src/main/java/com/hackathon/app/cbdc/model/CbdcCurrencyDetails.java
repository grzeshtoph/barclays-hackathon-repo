package com.hackathon.app.cbdc.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CbdcCurrencyDetails {

    private Long id;
    private String code;
    private Integer numDecimalDigits;
}
