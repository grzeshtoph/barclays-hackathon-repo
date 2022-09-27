package com.hackathon.app.cbdc.service;

import com.hackathon.app.cbdc.exception.AccountException;
import com.hackathon.app.client.api.PaymentInterfaceProvidersPipsApi;
import com.hackathon.app.client.model.MakeDepositRequestBody;
import com.hackathon.app.config.ApplicationProperties;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DepositService {

    private final ApplicationProperties applicationProperties;
    private final UsersService usersService;
    private final PaymentInterfaceProvidersPipsApi paymentInterfaceProvidersPipsApi;

    @PostConstruct
    public void init() {
        paymentInterfaceProvidersPipsApi.getApiClient().setApiKey(applicationProperties.getApiKey());
    }

    public void depositToPIP(Long userId, Long pipId, Long amount) {
        final var userDetails = usersService.getUserDetails(userId);
        userDetails
            .getAccounts()
            .stream()
            .filter(account -> pipId.equals(account.getPipId()))
            .findAny()
            .ifPresentOrElse(
                account -> {
                    paymentInterfaceProvidersPipsApi.depositIntoPipAccount(
                        applicationProperties.getEnvironmentId(),
                        account.getCbdcCurrencyDetails().getId(),
                        pipId,
                        account.getAccountId(),
                        new MakeDepositRequestBody().depositAmountInCurrencyUnits(amount)
                    );
                },
                () -> {
                    throw new AccountException("Error depositing to the PIP account");
                }
            );
    }
}
