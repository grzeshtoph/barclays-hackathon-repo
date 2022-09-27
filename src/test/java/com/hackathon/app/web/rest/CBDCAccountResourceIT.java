package com.hackathon.app.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.hackathon.app.IntegrationTest;
import com.hackathon.app.domain.CBDCAccount;
import com.hackathon.app.repository.CBDCAccountRepository;
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
 * Integration tests for the {@link CBDCAccountResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CBDCAccountResourceIT {

    private static final Long DEFAULT_PARTY_ID = 1L;
    private static final Long UPDATED_PARTY_ID = 2L;

    private static final Long DEFAULT_ACCOUNT_ID = 1L;
    private static final Long UPDATED_ACCOUNT_ID = 2L;

    private static final Long DEFAULT_PIP_ID = 1L;
    private static final Long UPDATED_PIP_ID = 2L;

    private static final Long DEFAULT_CURRENCY_ID = 1L;
    private static final Long UPDATED_CURRENCY_ID = 2L;

    private static final Long DEFAULT_CBDC_USER_ID = 1L;
    private static final Long UPDATED_CBDC_USER_ID = 2L;

    private static final String ENTITY_API_URL = "/api/cbdc-accounts";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CBDCAccountRepository cBDCAccountRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCBDCAccountMockMvc;

    private CBDCAccount cBDCAccount;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CBDCAccount createEntity(EntityManager em) {
        CBDCAccount cBDCAccount = new CBDCAccount()
            .partyId(DEFAULT_PARTY_ID)
            .accountId(DEFAULT_ACCOUNT_ID)
            .pipId(DEFAULT_PIP_ID)
            .currencyId(DEFAULT_CURRENCY_ID)
            .cbdcUserID(DEFAULT_CBDC_USER_ID);
        return cBDCAccount;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CBDCAccount createUpdatedEntity(EntityManager em) {
        CBDCAccount cBDCAccount = new CBDCAccount()
            .partyId(UPDATED_PARTY_ID)
            .accountId(UPDATED_ACCOUNT_ID)
            .pipId(UPDATED_PIP_ID)
            .currencyId(UPDATED_CURRENCY_ID)
            .cbdcUserID(UPDATED_CBDC_USER_ID);
        return cBDCAccount;
    }

    @BeforeEach
    public void initTest() {
        cBDCAccount = createEntity(em);
    }

    @Test
    @Transactional
    void createCBDCAccount() throws Exception {
        int databaseSizeBeforeCreate = cBDCAccountRepository.findAll().size();
        // Create the CBDCAccount
        restCBDCAccountMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cBDCAccount)))
            .andExpect(status().isCreated());

        // Validate the CBDCAccount in the database
        List<CBDCAccount> cBDCAccountList = cBDCAccountRepository.findAll();
        assertThat(cBDCAccountList).hasSize(databaseSizeBeforeCreate + 1);
        CBDCAccount testCBDCAccount = cBDCAccountList.get(cBDCAccountList.size() - 1);
        assertThat(testCBDCAccount.getPartyId()).isEqualTo(DEFAULT_PARTY_ID);
        assertThat(testCBDCAccount.getAccountId()).isEqualTo(DEFAULT_ACCOUNT_ID);
        assertThat(testCBDCAccount.getPipId()).isEqualTo(DEFAULT_PIP_ID);
        assertThat(testCBDCAccount.getCurrencyId()).isEqualTo(DEFAULT_CURRENCY_ID);
        assertThat(testCBDCAccount.getCbdcUserID()).isEqualTo(DEFAULT_CBDC_USER_ID);
    }

    @Test
    @Transactional
    void createCBDCAccountWithExistingId() throws Exception {
        // Create the CBDCAccount with an existing ID
        cBDCAccount.setId(1L);

        int databaseSizeBeforeCreate = cBDCAccountRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCBDCAccountMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cBDCAccount)))
            .andExpect(status().isBadRequest());

        // Validate the CBDCAccount in the database
        List<CBDCAccount> cBDCAccountList = cBDCAccountRepository.findAll();
        assertThat(cBDCAccountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCBDCAccounts() throws Exception {
        // Initialize the database
        cBDCAccountRepository.saveAndFlush(cBDCAccount);

        // Get all the cBDCAccountList
        restCBDCAccountMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cBDCAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].partyId").value(hasItem(DEFAULT_PARTY_ID.intValue())))
            .andExpect(jsonPath("$.[*].accountId").value(hasItem(DEFAULT_ACCOUNT_ID.intValue())))
            .andExpect(jsonPath("$.[*].pipId").value(hasItem(DEFAULT_PIP_ID.intValue())))
            .andExpect(jsonPath("$.[*].currencyId").value(hasItem(DEFAULT_CURRENCY_ID.intValue())))
            .andExpect(jsonPath("$.[*].cbdcUserID").value(hasItem(DEFAULT_CBDC_USER_ID.intValue())));
    }

    @Test
    @Transactional
    void getCBDCAccount() throws Exception {
        // Initialize the database
        cBDCAccountRepository.saveAndFlush(cBDCAccount);

        // Get the cBDCAccount
        restCBDCAccountMockMvc
            .perform(get(ENTITY_API_URL_ID, cBDCAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cBDCAccount.getId().intValue()))
            .andExpect(jsonPath("$.partyId").value(DEFAULT_PARTY_ID.intValue()))
            .andExpect(jsonPath("$.accountId").value(DEFAULT_ACCOUNT_ID.intValue()))
            .andExpect(jsonPath("$.pipId").value(DEFAULT_PIP_ID.intValue()))
            .andExpect(jsonPath("$.currencyId").value(DEFAULT_CURRENCY_ID.intValue()))
            .andExpect(jsonPath("$.cbdcUserID").value(DEFAULT_CBDC_USER_ID.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingCBDCAccount() throws Exception {
        // Get the cBDCAccount
        restCBDCAccountMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCBDCAccount() throws Exception {
        // Initialize the database
        cBDCAccountRepository.saveAndFlush(cBDCAccount);

        int databaseSizeBeforeUpdate = cBDCAccountRepository.findAll().size();

        // Update the cBDCAccount
        CBDCAccount updatedCBDCAccount = cBDCAccountRepository.findById(cBDCAccount.getId()).get();
        // Disconnect from session so that the updates on updatedCBDCAccount are not directly saved in db
        em.detach(updatedCBDCAccount);
        updatedCBDCAccount
            .partyId(UPDATED_PARTY_ID)
            .accountId(UPDATED_ACCOUNT_ID)
            .pipId(UPDATED_PIP_ID)
            .currencyId(UPDATED_CURRENCY_ID)
            .cbdcUserID(UPDATED_CBDC_USER_ID);

        restCBDCAccountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCBDCAccount.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCBDCAccount))
            )
            .andExpect(status().isOk());

        // Validate the CBDCAccount in the database
        List<CBDCAccount> cBDCAccountList = cBDCAccountRepository.findAll();
        assertThat(cBDCAccountList).hasSize(databaseSizeBeforeUpdate);
        CBDCAccount testCBDCAccount = cBDCAccountList.get(cBDCAccountList.size() - 1);
        assertThat(testCBDCAccount.getPartyId()).isEqualTo(UPDATED_PARTY_ID);
        assertThat(testCBDCAccount.getAccountId()).isEqualTo(UPDATED_ACCOUNT_ID);
        assertThat(testCBDCAccount.getPipId()).isEqualTo(UPDATED_PIP_ID);
        assertThat(testCBDCAccount.getCurrencyId()).isEqualTo(UPDATED_CURRENCY_ID);
        assertThat(testCBDCAccount.getCbdcUserID()).isEqualTo(UPDATED_CBDC_USER_ID);
    }

    @Test
    @Transactional
    void putNonExistingCBDCAccount() throws Exception {
        int databaseSizeBeforeUpdate = cBDCAccountRepository.findAll().size();
        cBDCAccount.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCBDCAccountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cBDCAccount.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cBDCAccount))
            )
            .andExpect(status().isBadRequest());

        // Validate the CBDCAccount in the database
        List<CBDCAccount> cBDCAccountList = cBDCAccountRepository.findAll();
        assertThat(cBDCAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCBDCAccount() throws Exception {
        int databaseSizeBeforeUpdate = cBDCAccountRepository.findAll().size();
        cBDCAccount.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCBDCAccountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cBDCAccount))
            )
            .andExpect(status().isBadRequest());

        // Validate the CBDCAccount in the database
        List<CBDCAccount> cBDCAccountList = cBDCAccountRepository.findAll();
        assertThat(cBDCAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCBDCAccount() throws Exception {
        int databaseSizeBeforeUpdate = cBDCAccountRepository.findAll().size();
        cBDCAccount.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCBDCAccountMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cBDCAccount)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CBDCAccount in the database
        List<CBDCAccount> cBDCAccountList = cBDCAccountRepository.findAll();
        assertThat(cBDCAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCBDCAccountWithPatch() throws Exception {
        // Initialize the database
        cBDCAccountRepository.saveAndFlush(cBDCAccount);

        int databaseSizeBeforeUpdate = cBDCAccountRepository.findAll().size();

        // Update the cBDCAccount using partial update
        CBDCAccount partialUpdatedCBDCAccount = new CBDCAccount();
        partialUpdatedCBDCAccount.setId(cBDCAccount.getId());

        partialUpdatedCBDCAccount.partyId(UPDATED_PARTY_ID).cbdcUserID(UPDATED_CBDC_USER_ID);

        restCBDCAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCBDCAccount.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCBDCAccount))
            )
            .andExpect(status().isOk());

        // Validate the CBDCAccount in the database
        List<CBDCAccount> cBDCAccountList = cBDCAccountRepository.findAll();
        assertThat(cBDCAccountList).hasSize(databaseSizeBeforeUpdate);
        CBDCAccount testCBDCAccount = cBDCAccountList.get(cBDCAccountList.size() - 1);
        assertThat(testCBDCAccount.getPartyId()).isEqualTo(UPDATED_PARTY_ID);
        assertThat(testCBDCAccount.getAccountId()).isEqualTo(DEFAULT_ACCOUNT_ID);
        assertThat(testCBDCAccount.getPipId()).isEqualTo(DEFAULT_PIP_ID);
        assertThat(testCBDCAccount.getCurrencyId()).isEqualTo(DEFAULT_CURRENCY_ID);
        assertThat(testCBDCAccount.getCbdcUserID()).isEqualTo(UPDATED_CBDC_USER_ID);
    }

    @Test
    @Transactional
    void fullUpdateCBDCAccountWithPatch() throws Exception {
        // Initialize the database
        cBDCAccountRepository.saveAndFlush(cBDCAccount);

        int databaseSizeBeforeUpdate = cBDCAccountRepository.findAll().size();

        // Update the cBDCAccount using partial update
        CBDCAccount partialUpdatedCBDCAccount = new CBDCAccount();
        partialUpdatedCBDCAccount.setId(cBDCAccount.getId());

        partialUpdatedCBDCAccount
            .partyId(UPDATED_PARTY_ID)
            .accountId(UPDATED_ACCOUNT_ID)
            .pipId(UPDATED_PIP_ID)
            .currencyId(UPDATED_CURRENCY_ID)
            .cbdcUserID(UPDATED_CBDC_USER_ID);

        restCBDCAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCBDCAccount.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCBDCAccount))
            )
            .andExpect(status().isOk());

        // Validate the CBDCAccount in the database
        List<CBDCAccount> cBDCAccountList = cBDCAccountRepository.findAll();
        assertThat(cBDCAccountList).hasSize(databaseSizeBeforeUpdate);
        CBDCAccount testCBDCAccount = cBDCAccountList.get(cBDCAccountList.size() - 1);
        assertThat(testCBDCAccount.getPartyId()).isEqualTo(UPDATED_PARTY_ID);
        assertThat(testCBDCAccount.getAccountId()).isEqualTo(UPDATED_ACCOUNT_ID);
        assertThat(testCBDCAccount.getPipId()).isEqualTo(UPDATED_PIP_ID);
        assertThat(testCBDCAccount.getCurrencyId()).isEqualTo(UPDATED_CURRENCY_ID);
        assertThat(testCBDCAccount.getCbdcUserID()).isEqualTo(UPDATED_CBDC_USER_ID);
    }

    @Test
    @Transactional
    void patchNonExistingCBDCAccount() throws Exception {
        int databaseSizeBeforeUpdate = cBDCAccountRepository.findAll().size();
        cBDCAccount.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCBDCAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cBDCAccount.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cBDCAccount))
            )
            .andExpect(status().isBadRequest());

        // Validate the CBDCAccount in the database
        List<CBDCAccount> cBDCAccountList = cBDCAccountRepository.findAll();
        assertThat(cBDCAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCBDCAccount() throws Exception {
        int databaseSizeBeforeUpdate = cBDCAccountRepository.findAll().size();
        cBDCAccount.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCBDCAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cBDCAccount))
            )
            .andExpect(status().isBadRequest());

        // Validate the CBDCAccount in the database
        List<CBDCAccount> cBDCAccountList = cBDCAccountRepository.findAll();
        assertThat(cBDCAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCBDCAccount() throws Exception {
        int databaseSizeBeforeUpdate = cBDCAccountRepository.findAll().size();
        cBDCAccount.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCBDCAccountMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cBDCAccount))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CBDCAccount in the database
        List<CBDCAccount> cBDCAccountList = cBDCAccountRepository.findAll();
        assertThat(cBDCAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCBDCAccount() throws Exception {
        // Initialize the database
        cBDCAccountRepository.saveAndFlush(cBDCAccount);

        int databaseSizeBeforeDelete = cBDCAccountRepository.findAll().size();

        // Delete the cBDCAccount
        restCBDCAccountMockMvc
            .perform(delete(ENTITY_API_URL_ID, cBDCAccount.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CBDCAccount> cBDCAccountList = cBDCAccountRepository.findAll();
        assertThat(cBDCAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
