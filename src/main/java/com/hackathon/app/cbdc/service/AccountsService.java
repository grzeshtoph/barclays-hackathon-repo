package com.hackathon.app.cbdc.service;

import com.hackathon.app.cbdc.model.CbdcAccountDetails;
import com.hackathon.app.cbdc.model.CbdcCurrencyDetails;
import com.hackathon.app.client.api.CommercialBanksApi;
import com.hackathon.app.client.api.CurrencyApi;
import com.hackathon.app.client.api.PaymentInterfaceProvidersPipsApi;
import com.hackathon.app.client.model.CommercialBankView;
import com.hackathon.app.client.model.GetCommercialBankDetailsResponseBody;
import com.hackathon.app.client.model.GetPIPDetailsResponseBody;
import com.hackathon.app.client.model.PIPView;
import com.hackathon.app.config.ApplicationProperties;
import com.hackathon.app.repository.CBDCAccountRepository;
import java.util.List;
import java.util.stream.Collectors;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountsService {

    private final ApplicationProperties applicationProperties;
    private final PaymentInterfaceProvidersPipsApi paymentInterfaceProvidersPipsApi;
    private final CommercialBanksApi commercialBanksApi;
    private final CurrencyApi currencyApi;
    private final CBDCAccountRepository cbdcAccountRepository;

    @PostConstruct
    public void initApi() {
        paymentInterfaceProvidersPipsApi.getApiClient().setApiKey(applicationProperties.getApiKey());
        commercialBanksApi.getApiClient().setApiKey(applicationProperties.getApiKey());
        currencyApi.getApiClient().setApiKey(applicationProperties.getApiKey());
    }

    public List<CbdcAccountDetails> getAccounts(Long userId) {
        return cbdcAccountRepository
            .findCBDCAccountsByCbdcUserIDOrderByAccountId(userId)
            .stream()
            .map(cbdcAccount -> {
                final var currencyId = cbdcAccount.getCurrencyId();
                final var pipId = cbdcAccount.getPipId();
                final var accountId = cbdcAccount.getAccountId();

                final var accDetailsBuilder = CbdcAccountDetails
                    .builder()
                    .partyId(cbdcAccount.getPartyId())
                    .accountId(accountId)
                    .cbdcCurrencyDetails(getCurrencyDetails(currencyId));

                if (isPIP(pipId, currencyId)) {
                    accDetailsBuilder.pipId(pipId).pipName(getPIPDetails(currencyId, pipId).getData().getPipName());
                    accDetailsBuilder.accountBalance(getPIPAccountBalance(pipId, currencyId, accountId));
                } else if (isBank(pipId, currencyId)) {
                    accDetailsBuilder
                        .commercialBankId(pipId)
                        .commercialBankName(getBankDetails(currencyId, pipId).getData().getCommercialBankName());
                    accDetailsBuilder.accountBalance(getBankAccountBalance(pipId, currencyId, accountId));
                }

                return accDetailsBuilder.build();
            })
            .collect(Collectors.toList());
    }

    public boolean isPIP(Long providerId, Long currencyId) {
        try {
            final var resp = paymentInterfaceProvidersPipsApi.getPipDetailsWithHttpInfo(
                applicationProperties.getEnvironmentId(),
                currencyId,
                providerId
            );

            return resp.getStatusCode().is2xxSuccessful() && PIPView.StatusEnum.ACTIVE.equals(resp.getBody().getData().getStatus());
        } catch (Exception e) {
            return false;
        }
    }

    private boolean isBank(Long providerId, Long currencyId) {
        try {
            final var resp = commercialBanksApi.getCommercialBankDetailsWithHttpInfo(
                applicationProperties.getEnvironmentId(),
                currencyId,
                providerId
            );

            return (
                resp.getStatusCode().is2xxSuccessful() && CommercialBankView.StatusEnum.ACTIVE.equals(resp.getBody().getData().getStatus())
            );
        } catch (Exception e) {
            return false;
        }
    }

    private GetPIPDetailsResponseBody getPIPDetails(Long currencyId, Long pipId) {
        return paymentInterfaceProvidersPipsApi.getPipDetails(applicationProperties.getEnvironmentId(), currencyId, pipId);
    }

    private Long getPIPAccountBalance(Long pipId, Long currencyId, Long accountId) {
        return paymentInterfaceProvidersPipsApi
            .getPipAccount(applicationProperties.getEnvironmentId(), currencyId, pipId, accountId)
            .getData()
            .getBalance();
    }

    private Long getBankAccountBalance(Long bankId, Long currencyId, Long accountId) {
        return commercialBanksApi
            .getCommercialBankAccount(applicationProperties.getEnvironmentId(), currencyId, bankId, accountId)
            .getData()
            .getBalance();
    }

    private GetCommercialBankDetailsResponseBody getBankDetails(Long currencyId, Long bankId) {
        return commercialBanksApi.getCommercialBankDetails(applicationProperties.getEnvironmentId(), currencyId, bankId);
    }

    private CbdcCurrencyDetails getCurrencyDetails(Long currencyId) {
        final var details = currencyApi.getCurrency(applicationProperties.getEnvironmentId(), currencyId).getData().getCurrencyDetails();

        return CbdcCurrencyDetails
            .builder()
            .id(currencyId)
            .code(details.getCode().getValue())
            .numDecimalDigits(details.getNumDecimalDigits())
            .build();
    }
}
