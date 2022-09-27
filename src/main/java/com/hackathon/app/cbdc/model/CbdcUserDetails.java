package com.hackathon.app.cbdc.model;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CbdcUserDetails {

    private Long id;
    private String fullName;
    private List<CbdcAccountDetails> accounts;
}
