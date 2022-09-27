package com.hackathon.app.cbdc.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackathon.app.cbdc.model.*;
import com.hackathon.app.config.ApplicationProperties;
import com.hackathon.app.domain.CBDCAccount;
import com.hackathon.app.repository.CBDCAccountRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
public class PipService {

    private final AccountsService accountsService;

    public List<PipDetails> getPipsByUser(Long userId) {
        List<PipDetails> pips = new ArrayList<>();
        List<CbdcAccountDetails> cbdcAccounts = accountsService.getAccounts(userId);

        for (CbdcAccountDetails cbdcAccount : cbdcAccounts) {
            if (cbdcAccount.getPipId() != null) {
                pips.add(createPip(cbdcAccount));
            }
        }
        return pips;
    }

    private PipDetails createPip(CbdcAccountDetails cbdcAccount) {
        PipDetails pipDetails = new PipDetails();
        pipDetails.setId(cbdcAccount.getPipId());
        pipDetails.setPartyId(cbdcAccount.getPartyId());
        pipDetails.setAccountId(cbdcAccount.getAccountId());
        pipDetails.setCbdcCurrencyDetails(cbdcAccount.getCbdcCurrencyDetails());
        return pipDetails;
    }
}
