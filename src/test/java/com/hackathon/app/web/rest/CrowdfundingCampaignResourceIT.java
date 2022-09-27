package com.hackathon.app.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.hackathon.app.IntegrationTest;
import com.hackathon.app.domain.CrowdfundingCampaign;
import com.hackathon.app.repository.CrowdfundingCampaignRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link CrowdfundingCampaignResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CrowdfundingCampaignResourceIT {

    private static final Long DEFAULT_FUNDING_GOAL = 1L;
    private static final Long UPDATED_FUNDING_GOAL = 2L;

    private static final Boolean DEFAULT_FUNDING_GOAL_REACHED = false;
    private static final Boolean UPDATED_FUNDING_GOAL_REACHED = true;

    private static final Boolean DEFAULT_FINISHED = false;
    private static final Boolean UPDATED_FINISHED = true;

    private static final Long DEFAULT_ESCROW_PARTY_ID = 1L;
    private static final Long UPDATED_ESCROW_PARTY_ID = 2L;

    private static final Long DEFAULT_ESCROW_ACCOUNT_ID = 1L;
    private static final Long UPDATED_ESCROW_ACCOUNT_ID = 2L;

    private static final Long DEFAULT_ESCROW_PIP_ID = 1L;
    private static final Long UPDATED_ESCROW_PIP_ID = 2L;

    private static final Long DEFAULT_CURRENCY_ID = 1L;
    private static final Long UPDATED_CURRENCY_ID = 2L;

    private static final Long DEFAULT_CAMPAIGN_PARTY_ID = 1L;
    private static final Long UPDATED_CAMPAIGN_PARTY_ID = 2L;

    private static final Long DEFAULT_CAMPAIGN_ACCOUNT_ID = 1L;
    private static final Long UPDATED_CAMPAIGN_ACCOUNT_ID = 2L;

    private static final Long DEFAULT_CAMPAIGN_BANK_ID = 1L;
    private static final Long UPDATED_CAMPAIGN_BANK_ID = 2L;

    private static final String ENTITY_API_URL = "/api/crowdfunding-campaigns";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CrowdfundingCampaignRepository crowdfundingCampaignRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCrowdfundingCampaignMockMvc;

    private CrowdfundingCampaign crowdfundingCampaign;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CrowdfundingCampaign createEntity(EntityManager em) {
        CrowdfundingCampaign crowdfundingCampaign = new CrowdfundingCampaign()
            .fundingGoal(DEFAULT_FUNDING_GOAL)
            .fundingGoalReached(DEFAULT_FUNDING_GOAL_REACHED)
            .finished(DEFAULT_FINISHED)
            .escrowPartyId(DEFAULT_ESCROW_PARTY_ID)
            .escrowAccountId(DEFAULT_ESCROW_ACCOUNT_ID)
            .escrowPipId(DEFAULT_ESCROW_PIP_ID)
            .currencyId(DEFAULT_CURRENCY_ID)
            .campaignPartyId(DEFAULT_CAMPAIGN_PARTY_ID)
            .campaignAccountId(DEFAULT_CAMPAIGN_ACCOUNT_ID)
            .campaignBankId(DEFAULT_CAMPAIGN_BANK_ID);
        return crowdfundingCampaign;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CrowdfundingCampaign createUpdatedEntity(EntityManager em) {
        CrowdfundingCampaign crowdfundingCampaign = new CrowdfundingCampaign()
            .fundingGoal(UPDATED_FUNDING_GOAL)
            .fundingGoalReached(UPDATED_FUNDING_GOAL_REACHED)
            .finished(UPDATED_FINISHED)
            .escrowPartyId(UPDATED_ESCROW_PARTY_ID)
            .escrowAccountId(UPDATED_ESCROW_ACCOUNT_ID)
            .escrowPipId(UPDATED_ESCROW_PIP_ID)
            .currencyId(UPDATED_CURRENCY_ID)
            .campaignPartyId(UPDATED_CAMPAIGN_PARTY_ID)
            .campaignAccountId(UPDATED_CAMPAIGN_ACCOUNT_ID)
            .campaignBankId(UPDATED_CAMPAIGN_BANK_ID);
        return crowdfundingCampaign;
    }

    @BeforeEach
    public void initTest() {
        crowdfundingCampaign = createEntity(em);
    }

    @Test
    @Transactional
    void createCrowdfundingCampaign() throws Exception {
        int databaseSizeBeforeCreate = crowdfundingCampaignRepository.findAll().size();
        // Create the CrowdfundingCampaign
        restCrowdfundingCampaignMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(crowdfundingCampaign))
            )
            .andExpect(status().isCreated());

        // Validate the CrowdfundingCampaign in the database
        List<CrowdfundingCampaign> crowdfundingCampaignList = crowdfundingCampaignRepository.findAll();
        assertThat(crowdfundingCampaignList).hasSize(databaseSizeBeforeCreate + 1);
        CrowdfundingCampaign testCrowdfundingCampaign = crowdfundingCampaignList.get(crowdfundingCampaignList.size() - 1);
        assertThat(testCrowdfundingCampaign.getFundingGoal()).isEqualTo(DEFAULT_FUNDING_GOAL);
        assertThat(testCrowdfundingCampaign.getFundingGoalReached()).isEqualTo(DEFAULT_FUNDING_GOAL_REACHED);
        assertThat(testCrowdfundingCampaign.getFinished()).isEqualTo(DEFAULT_FINISHED);
        assertThat(testCrowdfundingCampaign.getEscrowPartyId()).isEqualTo(DEFAULT_ESCROW_PARTY_ID);
        assertThat(testCrowdfundingCampaign.getEscrowAccountId()).isEqualTo(DEFAULT_ESCROW_ACCOUNT_ID);
        assertThat(testCrowdfundingCampaign.getEscrowPipId()).isEqualTo(DEFAULT_ESCROW_PIP_ID);
        assertThat(testCrowdfundingCampaign.getCurrencyId()).isEqualTo(DEFAULT_CURRENCY_ID);
        assertThat(testCrowdfundingCampaign.getCampaignPartyId()).isEqualTo(DEFAULT_CAMPAIGN_PARTY_ID);
        assertThat(testCrowdfundingCampaign.getCampaignAccountId()).isEqualTo(DEFAULT_CAMPAIGN_ACCOUNT_ID);
        assertThat(testCrowdfundingCampaign.getCampaignBankId()).isEqualTo(DEFAULT_CAMPAIGN_BANK_ID);
    }

    @Test
    @Transactional
    void createCrowdfundingCampaignWithExistingId() throws Exception {
        // Create the CrowdfundingCampaign with an existing ID
        crowdfundingCampaign.setId(1L);

        int databaseSizeBeforeCreate = crowdfundingCampaignRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCrowdfundingCampaignMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(crowdfundingCampaign))
            )
            .andExpect(status().isBadRequest());

        // Validate the CrowdfundingCampaign in the database
        List<CrowdfundingCampaign> crowdfundingCampaignList = crowdfundingCampaignRepository.findAll();
        assertThat(crowdfundingCampaignList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCrowdfundingCampaigns() throws Exception {
        // Initialize the database
        crowdfundingCampaignRepository.saveAndFlush(crowdfundingCampaign);

        // Get all the crowdfundingCampaignList
        restCrowdfundingCampaignMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(crowdfundingCampaign.getId().intValue())))
            .andExpect(jsonPath("$.[*].fundingGoal").value(hasItem(DEFAULT_FUNDING_GOAL.intValue())))
            .andExpect(jsonPath("$.[*].fundingGoalReached").value(hasItem(DEFAULT_FUNDING_GOAL_REACHED.booleanValue())))
            .andExpect(jsonPath("$.[*].finished").value(hasItem(DEFAULT_FINISHED.booleanValue())))
            .andExpect(jsonPath("$.[*].escrowPartyId").value(hasItem(DEFAULT_ESCROW_PARTY_ID.intValue())))
            .andExpect(jsonPath("$.[*].escrowAccountId").value(hasItem(DEFAULT_ESCROW_ACCOUNT_ID.intValue())))
            .andExpect(jsonPath("$.[*].escrowPipId").value(hasItem(DEFAULT_ESCROW_PIP_ID.intValue())))
            .andExpect(jsonPath("$.[*].currencyId").value(hasItem(DEFAULT_CURRENCY_ID.intValue())))
            .andExpect(jsonPath("$.[*].campaignPartyId").value(hasItem(DEFAULT_CAMPAIGN_PARTY_ID.intValue())))
            .andExpect(jsonPath("$.[*].campaignAccountId").value(hasItem(DEFAULT_CAMPAIGN_ACCOUNT_ID.intValue())))
            .andExpect(jsonPath("$.[*].campaignBankId").value(hasItem(DEFAULT_CAMPAIGN_BANK_ID.intValue())));
    }

    @Test
    @Transactional
    void getCrowdfundingCampaign() throws Exception {
        // Initialize the database
        crowdfundingCampaignRepository.saveAndFlush(crowdfundingCampaign);

        // Get the crowdfundingCampaign
        restCrowdfundingCampaignMockMvc
            .perform(get(ENTITY_API_URL_ID, crowdfundingCampaign.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(crowdfundingCampaign.getId().intValue()))
            .andExpect(jsonPath("$.fundingGoal").value(DEFAULT_FUNDING_GOAL.intValue()))
            .andExpect(jsonPath("$.fundingGoalReached").value(DEFAULT_FUNDING_GOAL_REACHED.booleanValue()))
            .andExpect(jsonPath("$.finished").value(DEFAULT_FINISHED.booleanValue()))
            .andExpect(jsonPath("$.escrowPartyId").value(DEFAULT_ESCROW_PARTY_ID.intValue()))
            .andExpect(jsonPath("$.escrowAccountId").value(DEFAULT_ESCROW_ACCOUNT_ID.intValue()))
            .andExpect(jsonPath("$.escrowPipId").value(DEFAULT_ESCROW_PIP_ID.intValue()))
            .andExpect(jsonPath("$.currencyId").value(DEFAULT_CURRENCY_ID.intValue()))
            .andExpect(jsonPath("$.campaignPartyId").value(DEFAULT_CAMPAIGN_PARTY_ID.intValue()))
            .andExpect(jsonPath("$.campaignAccountId").value(DEFAULT_CAMPAIGN_ACCOUNT_ID.intValue()))
            .andExpect(jsonPath("$.campaignBankId").value(DEFAULT_CAMPAIGN_BANK_ID.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingCrowdfundingCampaign() throws Exception {
        // Get the crowdfundingCampaign
        restCrowdfundingCampaignMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCrowdfundingCampaign() throws Exception {
        // Initialize the database
        crowdfundingCampaignRepository.saveAndFlush(crowdfundingCampaign);

        int databaseSizeBeforeUpdate = crowdfundingCampaignRepository.findAll().size();

        // Update the crowdfundingCampaign
        CrowdfundingCampaign updatedCrowdfundingCampaign = crowdfundingCampaignRepository.findById(crowdfundingCampaign.getId()).get();
        // Disconnect from session so that the updates on updatedCrowdfundingCampaign are not directly saved in db
        em.detach(updatedCrowdfundingCampaign);
        updatedCrowdfundingCampaign
            .fundingGoal(UPDATED_FUNDING_GOAL)
            .fundingGoalReached(UPDATED_FUNDING_GOAL_REACHED)
            .finished(UPDATED_FINISHED)
            .escrowPartyId(UPDATED_ESCROW_PARTY_ID)
            .escrowAccountId(UPDATED_ESCROW_ACCOUNT_ID)
            .escrowPipId(UPDATED_ESCROW_PIP_ID)
            .currencyId(UPDATED_CURRENCY_ID)
            .campaignPartyId(UPDATED_CAMPAIGN_PARTY_ID)
            .campaignAccountId(UPDATED_CAMPAIGN_ACCOUNT_ID)
            .campaignBankId(UPDATED_CAMPAIGN_BANK_ID);

        restCrowdfundingCampaignMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCrowdfundingCampaign.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCrowdfundingCampaign))
            )
            .andExpect(status().isOk());

        // Validate the CrowdfundingCampaign in the database
        List<CrowdfundingCampaign> crowdfundingCampaignList = crowdfundingCampaignRepository.findAll();
        assertThat(crowdfundingCampaignList).hasSize(databaseSizeBeforeUpdate);
        CrowdfundingCampaign testCrowdfundingCampaign = crowdfundingCampaignList.get(crowdfundingCampaignList.size() - 1);
        assertThat(testCrowdfundingCampaign.getFundingGoal()).isEqualTo(UPDATED_FUNDING_GOAL);
        assertThat(testCrowdfundingCampaign.getFundingGoalReached()).isEqualTo(UPDATED_FUNDING_GOAL_REACHED);
        assertThat(testCrowdfundingCampaign.getFinished()).isEqualTo(UPDATED_FINISHED);
        assertThat(testCrowdfundingCampaign.getEscrowPartyId()).isEqualTo(UPDATED_ESCROW_PARTY_ID);
        assertThat(testCrowdfundingCampaign.getEscrowAccountId()).isEqualTo(UPDATED_ESCROW_ACCOUNT_ID);
        assertThat(testCrowdfundingCampaign.getEscrowPipId()).isEqualTo(UPDATED_ESCROW_PIP_ID);
        assertThat(testCrowdfundingCampaign.getCurrencyId()).isEqualTo(UPDATED_CURRENCY_ID);
        assertThat(testCrowdfundingCampaign.getCampaignPartyId()).isEqualTo(UPDATED_CAMPAIGN_PARTY_ID);
        assertThat(testCrowdfundingCampaign.getCampaignAccountId()).isEqualTo(UPDATED_CAMPAIGN_ACCOUNT_ID);
        assertThat(testCrowdfundingCampaign.getCampaignBankId()).isEqualTo(UPDATED_CAMPAIGN_BANK_ID);
    }

    @Test
    @Transactional
    void putNonExistingCrowdfundingCampaign() throws Exception {
        int databaseSizeBeforeUpdate = crowdfundingCampaignRepository.findAll().size();
        crowdfundingCampaign.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCrowdfundingCampaignMockMvc
            .perform(
                put(ENTITY_API_URL_ID, crowdfundingCampaign.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(crowdfundingCampaign))
            )
            .andExpect(status().isBadRequest());

        // Validate the CrowdfundingCampaign in the database
        List<CrowdfundingCampaign> crowdfundingCampaignList = crowdfundingCampaignRepository.findAll();
        assertThat(crowdfundingCampaignList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCrowdfundingCampaign() throws Exception {
        int databaseSizeBeforeUpdate = crowdfundingCampaignRepository.findAll().size();
        crowdfundingCampaign.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCrowdfundingCampaignMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(crowdfundingCampaign))
            )
            .andExpect(status().isBadRequest());

        // Validate the CrowdfundingCampaign in the database
        List<CrowdfundingCampaign> crowdfundingCampaignList = crowdfundingCampaignRepository.findAll();
        assertThat(crowdfundingCampaignList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCrowdfundingCampaign() throws Exception {
        int databaseSizeBeforeUpdate = crowdfundingCampaignRepository.findAll().size();
        crowdfundingCampaign.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCrowdfundingCampaignMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(crowdfundingCampaign))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CrowdfundingCampaign in the database
        List<CrowdfundingCampaign> crowdfundingCampaignList = crowdfundingCampaignRepository.findAll();
        assertThat(crowdfundingCampaignList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCrowdfundingCampaignWithPatch() throws Exception {
        // Initialize the database
        crowdfundingCampaignRepository.saveAndFlush(crowdfundingCampaign);

        int databaseSizeBeforeUpdate = crowdfundingCampaignRepository.findAll().size();

        // Update the crowdfundingCampaign using partial update
        CrowdfundingCampaign partialUpdatedCrowdfundingCampaign = new CrowdfundingCampaign();
        partialUpdatedCrowdfundingCampaign.setId(crowdfundingCampaign.getId());

        partialUpdatedCrowdfundingCampaign
            .escrowAccountId(UPDATED_ESCROW_ACCOUNT_ID)
            .escrowPipId(UPDATED_ESCROW_PIP_ID)
            .campaignPartyId(UPDATED_CAMPAIGN_PARTY_ID)
            .campaignBankId(UPDATED_CAMPAIGN_BANK_ID);

        restCrowdfundingCampaignMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCrowdfundingCampaign.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCrowdfundingCampaign))
            )
            .andExpect(status().isOk());

        // Validate the CrowdfundingCampaign in the database
        List<CrowdfundingCampaign> crowdfundingCampaignList = crowdfundingCampaignRepository.findAll();
        assertThat(crowdfundingCampaignList).hasSize(databaseSizeBeforeUpdate);
        CrowdfundingCampaign testCrowdfundingCampaign = crowdfundingCampaignList.get(crowdfundingCampaignList.size() - 1);
        assertThat(testCrowdfundingCampaign.getFundingGoal()).isEqualTo(DEFAULT_FUNDING_GOAL);
        assertThat(testCrowdfundingCampaign.getFundingGoalReached()).isEqualTo(DEFAULT_FUNDING_GOAL_REACHED);
        assertThat(testCrowdfundingCampaign.getFinished()).isEqualTo(DEFAULT_FINISHED);
        assertThat(testCrowdfundingCampaign.getEscrowPartyId()).isEqualTo(DEFAULT_ESCROW_PARTY_ID);
        assertThat(testCrowdfundingCampaign.getEscrowAccountId()).isEqualTo(UPDATED_ESCROW_ACCOUNT_ID);
        assertThat(testCrowdfundingCampaign.getEscrowPipId()).isEqualTo(UPDATED_ESCROW_PIP_ID);
        assertThat(testCrowdfundingCampaign.getCurrencyId()).isEqualTo(DEFAULT_CURRENCY_ID);
        assertThat(testCrowdfundingCampaign.getCampaignPartyId()).isEqualTo(UPDATED_CAMPAIGN_PARTY_ID);
        assertThat(testCrowdfundingCampaign.getCampaignAccountId()).isEqualTo(DEFAULT_CAMPAIGN_ACCOUNT_ID);
        assertThat(testCrowdfundingCampaign.getCampaignBankId()).isEqualTo(UPDATED_CAMPAIGN_BANK_ID);
    }

    @Test
    @Transactional
    void fullUpdateCrowdfundingCampaignWithPatch() throws Exception {
        // Initialize the database
        crowdfundingCampaignRepository.saveAndFlush(crowdfundingCampaign);

        int databaseSizeBeforeUpdate = crowdfundingCampaignRepository.findAll().size();

        // Update the crowdfundingCampaign using partial update
        CrowdfundingCampaign partialUpdatedCrowdfundingCampaign = new CrowdfundingCampaign();
        partialUpdatedCrowdfundingCampaign.setId(crowdfundingCampaign.getId());

        partialUpdatedCrowdfundingCampaign
            .fundingGoal(UPDATED_FUNDING_GOAL)
            .fundingGoalReached(UPDATED_FUNDING_GOAL_REACHED)
            .finished(UPDATED_FINISHED)
            .escrowPartyId(UPDATED_ESCROW_PARTY_ID)
            .escrowAccountId(UPDATED_ESCROW_ACCOUNT_ID)
            .escrowPipId(UPDATED_ESCROW_PIP_ID)
            .currencyId(UPDATED_CURRENCY_ID)
            .campaignPartyId(UPDATED_CAMPAIGN_PARTY_ID)
            .campaignAccountId(UPDATED_CAMPAIGN_ACCOUNT_ID)
            .campaignBankId(UPDATED_CAMPAIGN_BANK_ID);

        restCrowdfundingCampaignMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCrowdfundingCampaign.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCrowdfundingCampaign))
            )
            .andExpect(status().isOk());

        // Validate the CrowdfundingCampaign in the database
        List<CrowdfundingCampaign> crowdfundingCampaignList = crowdfundingCampaignRepository.findAll();
        assertThat(crowdfundingCampaignList).hasSize(databaseSizeBeforeUpdate);
        CrowdfundingCampaign testCrowdfundingCampaign = crowdfundingCampaignList.get(crowdfundingCampaignList.size() - 1);
        assertThat(testCrowdfundingCampaign.getFundingGoal()).isEqualTo(UPDATED_FUNDING_GOAL);
        assertThat(testCrowdfundingCampaign.getFundingGoalReached()).isEqualTo(UPDATED_FUNDING_GOAL_REACHED);
        assertThat(testCrowdfundingCampaign.getFinished()).isEqualTo(UPDATED_FINISHED);
        assertThat(testCrowdfundingCampaign.getEscrowPartyId()).isEqualTo(UPDATED_ESCROW_PARTY_ID);
        assertThat(testCrowdfundingCampaign.getEscrowAccountId()).isEqualTo(UPDATED_ESCROW_ACCOUNT_ID);
        assertThat(testCrowdfundingCampaign.getEscrowPipId()).isEqualTo(UPDATED_ESCROW_PIP_ID);
        assertThat(testCrowdfundingCampaign.getCurrencyId()).isEqualTo(UPDATED_CURRENCY_ID);
        assertThat(testCrowdfundingCampaign.getCampaignPartyId()).isEqualTo(UPDATED_CAMPAIGN_PARTY_ID);
        assertThat(testCrowdfundingCampaign.getCampaignAccountId()).isEqualTo(UPDATED_CAMPAIGN_ACCOUNT_ID);
        assertThat(testCrowdfundingCampaign.getCampaignBankId()).isEqualTo(UPDATED_CAMPAIGN_BANK_ID);
    }

    @Test
    @Transactional
    void patchNonExistingCrowdfundingCampaign() throws Exception {
        int databaseSizeBeforeUpdate = crowdfundingCampaignRepository.findAll().size();
        crowdfundingCampaign.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCrowdfundingCampaignMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, crowdfundingCampaign.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(crowdfundingCampaign))
            )
            .andExpect(status().isBadRequest());

        // Validate the CrowdfundingCampaign in the database
        List<CrowdfundingCampaign> crowdfundingCampaignList = crowdfundingCampaignRepository.findAll();
        assertThat(crowdfundingCampaignList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCrowdfundingCampaign() throws Exception {
        int databaseSizeBeforeUpdate = crowdfundingCampaignRepository.findAll().size();
        crowdfundingCampaign.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCrowdfundingCampaignMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(crowdfundingCampaign))
            )
            .andExpect(status().isBadRequest());

        // Validate the CrowdfundingCampaign in the database
        List<CrowdfundingCampaign> crowdfundingCampaignList = crowdfundingCampaignRepository.findAll();
        assertThat(crowdfundingCampaignList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCrowdfundingCampaign() throws Exception {
        int databaseSizeBeforeUpdate = crowdfundingCampaignRepository.findAll().size();
        crowdfundingCampaign.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCrowdfundingCampaignMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(crowdfundingCampaign))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CrowdfundingCampaign in the database
        List<CrowdfundingCampaign> crowdfundingCampaignList = crowdfundingCampaignRepository.findAll();
        assertThat(crowdfundingCampaignList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCrowdfundingCampaign() throws Exception {
        // Initialize the database
        crowdfundingCampaignRepository.saveAndFlush(crowdfundingCampaign);

        int databaseSizeBeforeDelete = crowdfundingCampaignRepository.findAll().size();

        // Delete the crowdfundingCampaign
        restCrowdfundingCampaignMockMvc
            .perform(delete(ENTITY_API_URL_ID, crowdfundingCampaign.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CrowdfundingCampaign> crowdfundingCampaignList = crowdfundingCampaignRepository.findAll();
        assertThat(crowdfundingCampaignList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
