package com.hackathon.app.cbdc.service;

import com.hackathon.app.cbdc.exception.CampaignCreationException;
import com.hackathon.app.cbdc.model.Campaign;
import com.hackathon.app.client.api.CommercialBanksApi;
import com.hackathon.app.client.api.CurrencyApi;
import com.hackathon.app.client.api.PaymentInterfaceProvidersPipsApi;
import com.hackathon.app.client.model.Currency;
import com.hackathon.app.client.model.OpenAccountRequestBody;
import com.hackathon.app.client.model.RegisterPartyRequestBody;
import com.hackathon.app.config.ApplicationProperties;
import com.hackathon.app.domain.CrowdfundingCampaign;
import com.hackathon.app.repository.CrowdfundingCampaignRepository;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CrowdfundingService {

    private final ApplicationProperties applicationProperties;
    private final CurrencyApi currencyApi;
    private final PaymentInterfaceProvidersPipsApi paymentInterfaceProvidersPipsApi;
    private final CommercialBanksApi commercialBanksApi;
    private final CrowdfundingCampaignRepository crowdfundingCampaignRepository;

    private final AccountsService accountsService;

    @PostConstruct
    public void initApi() {
        this.currencyApi.getApiClient().setApiKey(applicationProperties.getApiKey());
        this.paymentInterfaceProvidersPipsApi.getApiClient().setApiKey(applicationProperties.getApiKey());
        this.commercialBanksApi.getApiClient().setApiKey(applicationProperties.getApiKey());
    }

    public Campaign startCampaign(String campaignName, Long goal, Long escrowPipId, Long campaignBankId) {
        final var envId = applicationProperties.getEnvironmentId();
        final var currency =
            this.currencyApi.getCurrenciesPage(envId, 0, 50)
                .getData()
                .stream()
                .filter(currencyView -> Currency.CodeEnum.GBP.equals(currencyView.getCurrencyDetails().getCode()))
                .findAny()
                .orElseThrow(() -> new CampaignCreationException("No GBP currency configured"));

        final var currencyId = currency.getId();
        Long escrowPartyId;
        Long escrowAccountId = null;
        // create escrow party and account for campaign
        if (accountsService.isPIP(escrowPipId, currencyId)) {
            escrowPartyId =
                paymentInterfaceProvidersPipsApi
                    .createNewPipParty(
                        envId,
                        currencyId,
                        escrowPipId,
                        new RegisterPartyRequestBody()
                            .partyType(RegisterPartyRequestBody.PartyTypeEnum.INDIVIDUAL)
                            .partyPostalAddress("undefined")
                            .partyFullLegalName(campaignName + " - ESCROW")
                    )
                    .getData()
                    .getId();
            escrowAccountId =
                paymentInterfaceProvidersPipsApi
                    .openPipAccount(envId, currencyId, escrowPipId, new OpenAccountRequestBody().partyId(escrowPartyId))
                    .getData()
                    .getId();
        } else if (accountsService.isBank(escrowPipId, currency.getId())) {
            escrowPartyId =
                commercialBanksApi
                    .registerCommercialBankParty(
                        envId,
                        currencyId,
                        escrowPipId,
                        new RegisterPartyRequestBody()
                            .partyType(RegisterPartyRequestBody.PartyTypeEnum.INDIVIDUAL)
                            .partyPostalAddress("undefined")
                            .partyFullLegalName(campaignName + " - ESCROW")
                    )
                    .getData()
                    .getId();
            escrowAccountId =
                commercialBanksApi
                    .openCommercialBankAccount(envId, currencyId, escrowPipId, new OpenAccountRequestBody().partyId(escrowPartyId))
                    .getData()
                    .getId();
        } else {
            throw new CampaignCreationException("The Escrow ID is not known PIP or Commercial Bank for GBP");
        }

        Long campaignPartyId;
        Long campaignAccountId = null;
        // create bank party/account for campaign
        if (accountsService.isBank(campaignBankId, currencyId)) {
            campaignPartyId =
                commercialBanksApi
                    .registerCommercialBankParty(
                        envId,
                        currencyId,
                        campaignBankId,
                        new RegisterPartyRequestBody()
                            .partyType(RegisterPartyRequestBody.PartyTypeEnum.INDIVIDUAL)
                            .partyFullLegalName(campaignName)
                            .partyPostalAddress("undefined")
                    )
                    .getData()
                    .getId();
            campaignAccountId =
                commercialBanksApi
                    .openCommercialBankAccount(envId, currencyId, campaignBankId, new OpenAccountRequestBody().partyId(campaignPartyId))
                    .getData()
                    .getId();
        } else {
            throw new CampaignCreationException("The campaign bank ID is not known Commercial Bank for GBP");
        }

        // store the details in the DB
        return Campaign
            .builder()
            .id(
                crowdfundingCampaignRepository
                    .save(
                        new CrowdfundingCampaign()
                            .campaignBankId(campaignBankId)
                            .campaignPartyId(campaignPartyId)
                            .campaignAccountId(campaignAccountId)
                            .escrowPipId(escrowPipId)
                            .escrowPartyId(escrowPartyId)
                            .escrowAccountId(escrowAccountId)
                            .currencyId(currencyId)
                            .finished(false)
                            .fundingGoal(goal)
                            .fundingGoalReached(false)
                    )
                    .getId()
            )
            .build();
    }
}
