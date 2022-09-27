package com.hackathon.app.cbdc.controller;

import com.hackathon.app.cbdc.model.CbdcPipDepositDetails;
import com.hackathon.app.cbdc.service.DepositService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cbdc-api")
@RequiredArgsConstructor
public class DepositController {

    private final DepositService depositService;

    @PostMapping("/pip-deposit")
    public void depositToPIP(@RequestBody CbdcPipDepositDetails cbdcPipDepositDetails) {
        depositService.depositToPIP(cbdcPipDepositDetails.getUserId(), cbdcPipDepositDetails.getPipId(), cbdcPipDepositDetails.getAmount());
    }
}
