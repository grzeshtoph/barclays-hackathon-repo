package com.hackathon.app.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.hackathon.app.IntegrationTest;
import com.hackathon.app.domain.CrowdfundingContributor;
import com.hackathon.app.repository.CrowdfundingContributorRepository;
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
 * Integration tests for the {@link CrowdfundingContributorResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CrowdfundingContributorResourceIT {

    private static final Long DEFAULT_CAMPAIGN_ID = 1L;
    private static final Long UPDATED_CAMPAIGN_ID = 2L;

    private static final Long DEFAULT_AMOUNT_DONATED = 1L;
    private static final Long UPDATED_AMOUNT_DONATED = 2L;

    private static final Long DEFAULT_PARTY_ID = 1L;
    private static final Long UPDATED_PARTY_ID = 2L;

    private static final Long DEFAULT_ACCOUNT_ID = 1L;
    private static final Long UPDATED_ACCOUNT_ID = 2L;

    private static final Long DEFAULT_PIP_ID = 1L;
    private static final Long UPDATED_PIP_ID = 2L;

    private static final Long DEFAULT_CURRENCY_ID = 1L;
    private static final Long UPDATED_CURRENCY_ID = 2L;

    private static final String ENTITY_API_URL = "/api/crowdfunding-contributors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CrowdfundingContributorRepository crowdfundingContributorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCrowdfundingContributorMockMvc;

    private CrowdfundingContributor crowdfundingContributor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CrowdfundingContributor createEntity(EntityManager em) {
        CrowdfundingContributor crowdfundingContributor = new CrowdfundingContributor()
            .campaignId(DEFAULT_CAMPAIGN_ID)
            .amountDonated(DEFAULT_AMOUNT_DONATED)
            .partyId(DEFAULT_PARTY_ID)
            .accountId(DEFAULT_ACCOUNT_ID)
            .pipId(DEFAULT_PIP_ID)
            .currencyId(DEFAULT_CURRENCY_ID);
        return crowdfundingContributor;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CrowdfundingContributor createUpdatedEntity(EntityManager em) {
        CrowdfundingContributor crowdfundingContributor = new CrowdfundingContributor()
            .campaignId(UPDATED_CAMPAIGN_ID)
            .amountDonated(UPDATED_AMOUNT_DONATED)
            .partyId(UPDATED_PARTY_ID)
            .accountId(UPDATED_ACCOUNT_ID)
            .pipId(UPDATED_PIP_ID)
            .currencyId(UPDATED_CURRENCY_ID);
        return crowdfundingContributor;
    }

    @BeforeEach
    public void initTest() {
        crowdfundingContributor = createEntity(em);
    }

    @Test
    @Transactional
    void createCrowdfundingContributor() throws Exception {
        int databaseSizeBeforeCreate = crowdfundingContributorRepository.findAll().size();
        // Create the CrowdfundingContributor
        restCrowdfundingContributorMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(crowdfundingContributor))
            )
            .andExpect(status().isCreated());

        // Validate the CrowdfundingContributor in the database
        List<CrowdfundingContributor> crowdfundingContributorList = crowdfundingContributorRepository.findAll();
        assertThat(crowdfundingContributorList).hasSize(databaseSizeBeforeCreate + 1);
        CrowdfundingContributor testCrowdfundingContributor = crowdfundingContributorList.get(crowdfundingContributorList.size() - 1);
        assertThat(testCrowdfundingContributor.getCampaignId()).isEqualTo(DEFAULT_CAMPAIGN_ID);
        assertThat(testCrowdfundingContributor.getAmountDonated()).isEqualTo(DEFAULT_AMOUNT_DONATED);
        assertThat(testCrowdfundingContributor.getPartyId()).isEqualTo(DEFAULT_PARTY_ID);
        assertThat(testCrowdfundingContributor.getAccountId()).isEqualTo(DEFAULT_ACCOUNT_ID);
        assertThat(testCrowdfundingContributor.getPipId()).isEqualTo(DEFAULT_PIP_ID);
        assertThat(testCrowdfundingContributor.getCurrencyId()).isEqualTo(DEFAULT_CURRENCY_ID);
    }

    @Test
    @Transactional
    void createCrowdfundingContributorWithExistingId() throws Exception {
        // Create the CrowdfundingContributor with an existing ID
        crowdfundingContributor.setId(1L);

        int databaseSizeBeforeCreate = crowdfundingContributorRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCrowdfundingContributorMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(crowdfundingContributor))
            )
            .andExpect(status().isBadRequest());

        // Validate the CrowdfundingContributor in the database
        List<CrowdfundingContributor> crowdfundingContributorList = crowdfundingContributorRepository.findAll();
        assertThat(crowdfundingContributorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCrowdfundingContributors() throws Exception {
        // Initialize the database
        crowdfundingContributorRepository.saveAndFlush(crowdfundingContributor);

        // Get all the crowdfundingContributorList
        restCrowdfundingContributorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(crowdfundingContributor.getId().intValue())))
            .andExpect(jsonPath("$.[*].campaignId").value(hasItem(DEFAULT_CAMPAIGN_ID.intValue())))
            .andExpect(jsonPath("$.[*].amountDonated").value(hasItem(DEFAULT_AMOUNT_DONATED.intValue())))
            .andExpect(jsonPath("$.[*].partyId").value(hasItem(DEFAULT_PARTY_ID.intValue())))
            .andExpect(jsonPath("$.[*].accountId").value(hasItem(DEFAULT_ACCOUNT_ID.intValue())))
            .andExpect(jsonPath("$.[*].pipId").value(hasItem(DEFAULT_PIP_ID.intValue())))
            .andExpect(jsonPath("$.[*].currencyId").value(hasItem(DEFAULT_CURRENCY_ID.intValue())));
    }

    @Test
    @Transactional
    void getCrowdfundingContributor() throws Exception {
        // Initialize the database
        crowdfundingContributorRepository.saveAndFlush(crowdfundingContributor);

        // Get the crowdfundingContributor
        restCrowdfundingContributorMockMvc
            .perform(get(ENTITY_API_URL_ID, crowdfundingContributor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(crowdfundingContributor.getId().intValue()))
            .andExpect(jsonPath("$.campaignId").value(DEFAULT_CAMPAIGN_ID.intValue()))
            .andExpect(jsonPath("$.amountDonated").value(DEFAULT_AMOUNT_DONATED.intValue()))
            .andExpect(jsonPath("$.partyId").value(DEFAULT_PARTY_ID.intValue()))
            .andExpect(jsonPath("$.accountId").value(DEFAULT_ACCOUNT_ID.intValue()))
            .andExpect(jsonPath("$.pipId").value(DEFAULT_PIP_ID.intValue()))
            .andExpect(jsonPath("$.currencyId").value(DEFAULT_CURRENCY_ID.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingCrowdfundingContributor() throws Exception {
        // Get the crowdfundingContributor
        restCrowdfundingContributorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCrowdfundingContributor() throws Exception {
        // Initialize the database
        crowdfundingContributorRepository.saveAndFlush(crowdfundingContributor);

        int databaseSizeBeforeUpdate = crowdfundingContributorRepository.findAll().size();

        // Update the crowdfundingContributor
        CrowdfundingContributor updatedCrowdfundingContributor = crowdfundingContributorRepository
            .findById(crowdfundingContributor.getId())
            .get();
        // Disconnect from session so that the updates on updatedCrowdfundingContributor are not directly saved in db
        em.detach(updatedCrowdfundingContributor);
        updatedCrowdfundingContributor
            .campaignId(UPDATED_CAMPAIGN_ID)
            .amountDonated(UPDATED_AMOUNT_DONATED)
            .partyId(UPDATED_PARTY_ID)
            .accountId(UPDATED_ACCOUNT_ID)
            .pipId(UPDATED_PIP_ID)
            .currencyId(UPDATED_CURRENCY_ID);

        restCrowdfundingContributorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCrowdfundingContributor.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCrowdfundingContributor))
            )
            .andExpect(status().isOk());

        // Validate the CrowdfundingContributor in the database
        List<CrowdfundingContributor> crowdfundingContributorList = crowdfundingContributorRepository.findAll();
        assertThat(crowdfundingContributorList).hasSize(databaseSizeBeforeUpdate);
        CrowdfundingContributor testCrowdfundingContributor = crowdfundingContributorList.get(crowdfundingContributorList.size() - 1);
        assertThat(testCrowdfundingContributor.getCampaignId()).isEqualTo(UPDATED_CAMPAIGN_ID);
        assertThat(testCrowdfundingContributor.getAmountDonated()).isEqualTo(UPDATED_AMOUNT_DONATED);
        assertThat(testCrowdfundingContributor.getPartyId()).isEqualTo(UPDATED_PARTY_ID);
        assertThat(testCrowdfundingContributor.getAccountId()).isEqualTo(UPDATED_ACCOUNT_ID);
        assertThat(testCrowdfundingContributor.getPipId()).isEqualTo(UPDATED_PIP_ID);
        assertThat(testCrowdfundingContributor.getCurrencyId()).isEqualTo(UPDATED_CURRENCY_ID);
    }

    @Test
    @Transactional
    void putNonExistingCrowdfundingContributor() throws Exception {
        int databaseSizeBeforeUpdate = crowdfundingContributorRepository.findAll().size();
        crowdfundingContributor.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCrowdfundingContributorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, crowdfundingContributor.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(crowdfundingContributor))
            )
            .andExpect(status().isBadRequest());

        // Validate the CrowdfundingContributor in the database
        List<CrowdfundingContributor> crowdfundingContributorList = crowdfundingContributorRepository.findAll();
        assertThat(crowdfundingContributorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCrowdfundingContributor() throws Exception {
        int databaseSizeBeforeUpdate = crowdfundingContributorRepository.findAll().size();
        crowdfundingContributor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCrowdfundingContributorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(crowdfundingContributor))
            )
            .andExpect(status().isBadRequest());

        // Validate the CrowdfundingContributor in the database
        List<CrowdfundingContributor> crowdfundingContributorList = crowdfundingContributorRepository.findAll();
        assertThat(crowdfundingContributorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCrowdfundingContributor() throws Exception {
        int databaseSizeBeforeUpdate = crowdfundingContributorRepository.findAll().size();
        crowdfundingContributor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCrowdfundingContributorMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(crowdfundingContributor))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CrowdfundingContributor in the database
        List<CrowdfundingContributor> crowdfundingContributorList = crowdfundingContributorRepository.findAll();
        assertThat(crowdfundingContributorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCrowdfundingContributorWithPatch() throws Exception {
        // Initialize the database
        crowdfundingContributorRepository.saveAndFlush(crowdfundingContributor);

        int databaseSizeBeforeUpdate = crowdfundingContributorRepository.findAll().size();

        // Update the crowdfundingContributor using partial update
        CrowdfundingContributor partialUpdatedCrowdfundingContributor = new CrowdfundingContributor();
        partialUpdatedCrowdfundingContributor.setId(crowdfundingContributor.getId());

        partialUpdatedCrowdfundingContributor.amountDonated(UPDATED_AMOUNT_DONATED).accountId(UPDATED_ACCOUNT_ID);

        restCrowdfundingContributorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCrowdfundingContributor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCrowdfundingContributor))
            )
            .andExpect(status().isOk());

        // Validate the CrowdfundingContributor in the database
        List<CrowdfundingContributor> crowdfundingContributorList = crowdfundingContributorRepository.findAll();
        assertThat(crowdfundingContributorList).hasSize(databaseSizeBeforeUpdate);
        CrowdfundingContributor testCrowdfundingContributor = crowdfundingContributorList.get(crowdfundingContributorList.size() - 1);
        assertThat(testCrowdfundingContributor.getCampaignId()).isEqualTo(DEFAULT_CAMPAIGN_ID);
        assertThat(testCrowdfundingContributor.getAmountDonated()).isEqualTo(UPDATED_AMOUNT_DONATED);
        assertThat(testCrowdfundingContributor.getPartyId()).isEqualTo(DEFAULT_PARTY_ID);
        assertThat(testCrowdfundingContributor.getAccountId()).isEqualTo(UPDATED_ACCOUNT_ID);
        assertThat(testCrowdfundingContributor.getPipId()).isEqualTo(DEFAULT_PIP_ID);
        assertThat(testCrowdfundingContributor.getCurrencyId()).isEqualTo(DEFAULT_CURRENCY_ID);
    }

    @Test
    @Transactional
    void fullUpdateCrowdfundingContributorWithPatch() throws Exception {
        // Initialize the database
        crowdfundingContributorRepository.saveAndFlush(crowdfundingContributor);

        int databaseSizeBeforeUpdate = crowdfundingContributorRepository.findAll().size();

        // Update the crowdfundingContributor using partial update
        CrowdfundingContributor partialUpdatedCrowdfundingContributor = new CrowdfundingContributor();
        partialUpdatedCrowdfundingContributor.setId(crowdfundingContributor.getId());

        partialUpdatedCrowdfundingContributor
            .campaignId(UPDATED_CAMPAIGN_ID)
            .amountDonated(UPDATED_AMOUNT_DONATED)
            .partyId(UPDATED_PARTY_ID)
            .accountId(UPDATED_ACCOUNT_ID)
            .pipId(UPDATED_PIP_ID)
            .currencyId(UPDATED_CURRENCY_ID);

        restCrowdfundingContributorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCrowdfundingContributor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCrowdfundingContributor))
            )
            .andExpect(status().isOk());

        // Validate the CrowdfundingContributor in the database
        List<CrowdfundingContributor> crowdfundingContributorList = crowdfundingContributorRepository.findAll();
        assertThat(crowdfundingContributorList).hasSize(databaseSizeBeforeUpdate);
        CrowdfundingContributor testCrowdfundingContributor = crowdfundingContributorList.get(crowdfundingContributorList.size() - 1);
        assertThat(testCrowdfundingContributor.getCampaignId()).isEqualTo(UPDATED_CAMPAIGN_ID);
        assertThat(testCrowdfundingContributor.getAmountDonated()).isEqualTo(UPDATED_AMOUNT_DONATED);
        assertThat(testCrowdfundingContributor.getPartyId()).isEqualTo(UPDATED_PARTY_ID);
        assertThat(testCrowdfundingContributor.getAccountId()).isEqualTo(UPDATED_ACCOUNT_ID);
        assertThat(testCrowdfundingContributor.getPipId()).isEqualTo(UPDATED_PIP_ID);
        assertThat(testCrowdfundingContributor.getCurrencyId()).isEqualTo(UPDATED_CURRENCY_ID);
    }

    @Test
    @Transactional
    void patchNonExistingCrowdfundingContributor() throws Exception {
        int databaseSizeBeforeUpdate = crowdfundingContributorRepository.findAll().size();
        crowdfundingContributor.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCrowdfundingContributorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, crowdfundingContributor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(crowdfundingContributor))
            )
            .andExpect(status().isBadRequest());

        // Validate the CrowdfundingContributor in the database
        List<CrowdfundingContributor> crowdfundingContributorList = crowdfundingContributorRepository.findAll();
        assertThat(crowdfundingContributorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCrowdfundingContributor() throws Exception {
        int databaseSizeBeforeUpdate = crowdfundingContributorRepository.findAll().size();
        crowdfundingContributor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCrowdfundingContributorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(crowdfundingContributor))
            )
            .andExpect(status().isBadRequest());

        // Validate the CrowdfundingContributor in the database
        List<CrowdfundingContributor> crowdfundingContributorList = crowdfundingContributorRepository.findAll();
        assertThat(crowdfundingContributorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCrowdfundingContributor() throws Exception {
        int databaseSizeBeforeUpdate = crowdfundingContributorRepository.findAll().size();
        crowdfundingContributor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCrowdfundingContributorMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(crowdfundingContributor))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CrowdfundingContributor in the database
        List<CrowdfundingContributor> crowdfundingContributorList = crowdfundingContributorRepository.findAll();
        assertThat(crowdfundingContributorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCrowdfundingContributor() throws Exception {
        // Initialize the database
        crowdfundingContributorRepository.saveAndFlush(crowdfundingContributor);

        int databaseSizeBeforeDelete = crowdfundingContributorRepository.findAll().size();

        // Delete the crowdfundingContributor
        restCrowdfundingContributorMockMvc
            .perform(delete(ENTITY_API_URL_ID, crowdfundingContributor.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CrowdfundingContributor> crowdfundingContributorList = crowdfundingContributorRepository.findAll();
        assertThat(crowdfundingContributorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
