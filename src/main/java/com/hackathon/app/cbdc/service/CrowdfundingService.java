package com.hackathon.app.cbdc.service;

import com.hackathon.app.cbdc.exception.CampaignCreationException;
import com.hackathon.app.cbdc.exception.CampaignDonationException;
import com.hackathon.app.cbdc.exception.NotFoundException;
import com.hackathon.app.cbdc.model.Campaign;
import com.hackathon.app.cbdc.model.CampaignContributor;
import com.hackathon.app.cbdc.model.CampaignDetails;
import com.hackathon.app.client.api.CommercialBanksApi;
import com.hackathon.app.client.api.CurrencyApi;
import com.hackathon.app.client.api.ObPispApi;
import com.hackathon.app.client.api.PaymentInterfaceProvidersPipsApi;
import com.hackathon.app.client.model.Currency;
import com.hackathon.app.client.model.MakeDomesticPaymentRequestBody;
import com.hackathon.app.client.model.OpenAccountRequestBody;
import com.hackathon.app.client.model.PaymentConsentView;
import com.hackathon.app.client.model.RegisterPartyRequestBody;
import com.hackathon.app.config.ApplicationProperties;
import com.hackathon.app.domain.CrowdfundingCampaign;
import com.hackathon.app.domain.CrowdfundingContributor;
import com.hackathon.app.repository.CrowdfundingCampaignRepository;
import com.hackathon.app.repository.CrowdfundingContributorRepository;
import java.util.List;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CrowdfundingService {

    private final ApplicationProperties applicationProperties;
    private final CurrencyApi currencyApi;
    private final PaymentInterfaceProvidersPipsApi paymentInterfaceProvidersPipsApi;
    private final CommercialBanksApi commercialBanksApi;
    private final CrowdfundingCampaignRepository crowdfundingCampaignRepository;
    private final ObPispApi obPispApi;
    private final AccountsService accountsService;
    private final CrowdfundingContributorRepository crowdfundingContributorRepository;

    @PostConstruct
    public void initApi() {
        this.currencyApi.getApiClient().setApiKey(applicationProperties.getApiKey());
        this.paymentInterfaceProvidersPipsApi.getApiClient().setApiKey(applicationProperties.getApiKey());
        this.commercialBanksApi.getApiClient().setApiKey(applicationProperties.getApiKey());
        this.obPispApi.getApiClient().setApiKey(applicationProperties.getApiKey());
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

    public CampaignDetails getCampaign(Long campaignId) {
        return crowdfundingCampaignRepository
            .findById(campaignId)
            .map(crowdfundingCampaign -> {
                CampaignDetails campaignDetails = new CampaignDetails();
                campaignDetails.setId(crowdfundingCampaign.getId());
                campaignDetails.setGoal(crowdfundingCampaign.getFundingGoal());
                campaignDetails.setCurrentAmount(
                    this.paymentInterfaceProvidersPipsApi.getPipAccount(
                            applicationProperties.getEnvironmentId(),
                            crowdfundingCampaign.getCurrencyId(),
                            crowdfundingCampaign.getEscrowPipId(),
                            crowdfundingCampaign.getEscrowAccountId()
                        )
                        .getData()
                        .getBalance()
                );
                campaignDetails.setName(
                    this.commercialBanksApi.getCommercialBankPartyDetails(
                            applicationProperties.getEnvironmentId(),
                            crowdfundingCampaign.getCurrencyId(),
                            crowdfundingCampaign.getCampaignBankId(),
                            crowdfundingCampaign.getCampaignPartyId()
                        )
                        .getData()
                        .getFullLegalName()
                );
                return campaignDetails;
            })
            .orElseThrow(() -> new NotFoundException("Campaign not found"));
    }

    public List<CrowdfundingCampaign> getCampaignList() {
        return crowdfundingCampaignRepository.findAll();
    }

    public CampaignContributor contribute(Long campaignId, Long consentId) {
        // get campaign
        // check, if it's open
        final var campaign =
            this.crowdfundingCampaignRepository.findById(campaignId).orElseThrow(() -> new CampaignDonationException("No campaign found"));
        if (campaign.getFinished()) {
            throw new CampaignDonationException("Campaign already finished");
        }
        final var currencyId = campaign.getCurrencyId();
        final var envId = applicationProperties.getEnvironmentId();

        final var consentData = obPispApi.obGetPaymentConsent(envId, currencyId, campaign.getEscrowPipId(), consentId).getData();

        if (!PaymentConsentView.StatusEnum.AUTHORISED.equals(consentData.getStatus())) {
            throw new CampaignDonationException("Payment is not authorised");
        }

        final var paymentResponse = obPispApi.obMakePaymentWithHttpInfo(
            envId,
            currencyId,
            campaign.getEscrowPipId(),
            consentId,
            new MakeDomesticPaymentRequestBody()
                .paymentAmountInCurrencyUnits(consentData.getPaymentDetails().getPaymentAmountInCurrencyUnits())
                .sourceAccountId(consentData.getPaymentDetails().getSourceAccountId())
                .destinationAccountId(consentData.getPaymentDetails().getDestinationAccountId())
        );

        if (!paymentResponse.getStatusCode().is2xxSuccessful()) {
            throw new CampaignDonationException("Error executing payment");
        }

        return CampaignContributor
            .builder()
            .id(
                this.crowdfundingContributorRepository.save(
                        new CrowdfundingContributor()
                            .accountId(consentData.getPaymentDetails().getSourceAccountId())
                            .amountDonated(consentData.getPaymentDetails().getPaymentAmountInCurrencyUnits())
                            .pipId(consentData.getBankingEntityWhereConsentGrantingPartyIsRegisteredRef().getBankingEntityId())
                            .partyId(consentData.getConsentConsentGrantingPartyId().getPartyId())
                            .campaignId(campaignId)
                            .currencyId(currencyId)
                    )
                    .getId()
            )
            .build();
    }
}
