package com.hackathon.app.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.hackathon.app.IntegrationTest;
import com.hackathon.app.domain.CBDCUser;
import com.hackathon.app.repository.CBDCUserRepository;
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
 * Integration tests for the {@link CBDCUserResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CBDCUserResourceIT {

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cbdc-users";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CBDCUserRepository cBDCUserRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCBDCUserMockMvc;

    private CBDCUser cBDCUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CBDCUser createEntity(EntityManager em) {
        CBDCUser cBDCUser = new CBDCUser()
            .email(DEFAULT_EMAIL)
            .password(DEFAULT_PASSWORD)
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME);
        return cBDCUser;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CBDCUser createUpdatedEntity(EntityManager em) {
        CBDCUser cBDCUser = new CBDCUser()
            .email(UPDATED_EMAIL)
            .password(UPDATED_PASSWORD)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME);
        return cBDCUser;
    }

    @BeforeEach
    public void initTest() {
        cBDCUser = createEntity(em);
    }

    @Test
    @Transactional
    void createCBDCUser() throws Exception {
        int databaseSizeBeforeCreate = cBDCUserRepository.findAll().size();
        // Create the CBDCUser
        restCBDCUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cBDCUser)))
            .andExpect(status().isCreated());

        // Validate the CBDCUser in the database
        List<CBDCUser> cBDCUserList = cBDCUserRepository.findAll();
        assertThat(cBDCUserList).hasSize(databaseSizeBeforeCreate + 1);
        CBDCUser testCBDCUser = cBDCUserList.get(cBDCUserList.size() - 1);
        assertThat(testCBDCUser.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testCBDCUser.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testCBDCUser.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testCBDCUser.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
    }

    @Test
    @Transactional
    void createCBDCUserWithExistingId() throws Exception {
        // Create the CBDCUser with an existing ID
        cBDCUser.setId(1L);

        int databaseSizeBeforeCreate = cBDCUserRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCBDCUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cBDCUser)))
            .andExpect(status().isBadRequest());

        // Validate the CBDCUser in the database
        List<CBDCUser> cBDCUserList = cBDCUserRepository.findAll();
        assertThat(cBDCUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCBDCUsers() throws Exception {
        // Initialize the database
        cBDCUserRepository.saveAndFlush(cBDCUser);

        // Get all the cBDCUserList
        restCBDCUserMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cBDCUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)));
    }

    @Test
    @Transactional
    void getCBDCUser() throws Exception {
        // Initialize the database
        cBDCUserRepository.saveAndFlush(cBDCUser);

        // Get the cBDCUser
        restCBDCUserMockMvc
            .perform(get(ENTITY_API_URL_ID, cBDCUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cBDCUser.getId().intValue()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME));
    }

    @Test
    @Transactional
    void getNonExistingCBDCUser() throws Exception {
        // Get the cBDCUser
        restCBDCUserMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCBDCUser() throws Exception {
        // Initialize the database
        cBDCUserRepository.saveAndFlush(cBDCUser);

        int databaseSizeBeforeUpdate = cBDCUserRepository.findAll().size();

        // Update the cBDCUser
        CBDCUser updatedCBDCUser = cBDCUserRepository.findById(cBDCUser.getId()).get();
        // Disconnect from session so that the updates on updatedCBDCUser are not directly saved in db
        em.detach(updatedCBDCUser);
        updatedCBDCUser.email(UPDATED_EMAIL).password(UPDATED_PASSWORD).firstName(UPDATED_FIRST_NAME).lastName(UPDATED_LAST_NAME);

        restCBDCUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCBDCUser.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCBDCUser))
            )
            .andExpect(status().isOk());

        // Validate the CBDCUser in the database
        List<CBDCUser> cBDCUserList = cBDCUserRepository.findAll();
        assertThat(cBDCUserList).hasSize(databaseSizeBeforeUpdate);
        CBDCUser testCBDCUser = cBDCUserList.get(cBDCUserList.size() - 1);
        assertThat(testCBDCUser.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCBDCUser.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testCBDCUser.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testCBDCUser.getLastName()).isEqualTo(UPDATED_LAST_NAME);
    }

    @Test
    @Transactional
    void putNonExistingCBDCUser() throws Exception {
        int databaseSizeBeforeUpdate = cBDCUserRepository.findAll().size();
        cBDCUser.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCBDCUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cBDCUser.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cBDCUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the CBDCUser in the database
        List<CBDCUser> cBDCUserList = cBDCUserRepository.findAll();
        assertThat(cBDCUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCBDCUser() throws Exception {
        int databaseSizeBeforeUpdate = cBDCUserRepository.findAll().size();
        cBDCUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCBDCUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cBDCUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the CBDCUser in the database
        List<CBDCUser> cBDCUserList = cBDCUserRepository.findAll();
        assertThat(cBDCUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCBDCUser() throws Exception {
        int databaseSizeBeforeUpdate = cBDCUserRepository.findAll().size();
        cBDCUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCBDCUserMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cBDCUser)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CBDCUser in the database
        List<CBDCUser> cBDCUserList = cBDCUserRepository.findAll();
        assertThat(cBDCUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCBDCUserWithPatch() throws Exception {
        // Initialize the database
        cBDCUserRepository.saveAndFlush(cBDCUser);

        int databaseSizeBeforeUpdate = cBDCUserRepository.findAll().size();

        // Update the cBDCUser using partial update
        CBDCUser partialUpdatedCBDCUser = new CBDCUser();
        partialUpdatedCBDCUser.setId(cBDCUser.getId());

        partialUpdatedCBDCUser.email(UPDATED_EMAIL).password(UPDATED_PASSWORD);

        restCBDCUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCBDCUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCBDCUser))
            )
            .andExpect(status().isOk());

        // Validate the CBDCUser in the database
        List<CBDCUser> cBDCUserList = cBDCUserRepository.findAll();
        assertThat(cBDCUserList).hasSize(databaseSizeBeforeUpdate);
        CBDCUser testCBDCUser = cBDCUserList.get(cBDCUserList.size() - 1);
        assertThat(testCBDCUser.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCBDCUser.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testCBDCUser.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testCBDCUser.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
    }

    @Test
    @Transactional
    void fullUpdateCBDCUserWithPatch() throws Exception {
        // Initialize the database
        cBDCUserRepository.saveAndFlush(cBDCUser);

        int databaseSizeBeforeUpdate = cBDCUserRepository.findAll().size();

        // Update the cBDCUser using partial update
        CBDCUser partialUpdatedCBDCUser = new CBDCUser();
        partialUpdatedCBDCUser.setId(cBDCUser.getId());

        partialUpdatedCBDCUser.email(UPDATED_EMAIL).password(UPDATED_PASSWORD).firstName(UPDATED_FIRST_NAME).lastName(UPDATED_LAST_NAME);

        restCBDCUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCBDCUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCBDCUser))
            )
            .andExpect(status().isOk());

        // Validate the CBDCUser in the database
        List<CBDCUser> cBDCUserList = cBDCUserRepository.findAll();
        assertThat(cBDCUserList).hasSize(databaseSizeBeforeUpdate);
        CBDCUser testCBDCUser = cBDCUserList.get(cBDCUserList.size() - 1);
        assertThat(testCBDCUser.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCBDCUser.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testCBDCUser.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testCBDCUser.getLastName()).isEqualTo(UPDATED_LAST_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingCBDCUser() throws Exception {
        int databaseSizeBeforeUpdate = cBDCUserRepository.findAll().size();
        cBDCUser.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCBDCUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cBDCUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cBDCUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the CBDCUser in the database
        List<CBDCUser> cBDCUserList = cBDCUserRepository.findAll();
        assertThat(cBDCUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCBDCUser() throws Exception {
        int databaseSizeBeforeUpdate = cBDCUserRepository.findAll().size();
        cBDCUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCBDCUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cBDCUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the CBDCUser in the database
        List<CBDCUser> cBDCUserList = cBDCUserRepository.findAll();
        assertThat(cBDCUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCBDCUser() throws Exception {
        int databaseSizeBeforeUpdate = cBDCUserRepository.findAll().size();
        cBDCUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCBDCUserMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cBDCUser)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CBDCUser in the database
        List<CBDCUser> cBDCUserList = cBDCUserRepository.findAll();
        assertThat(cBDCUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCBDCUser() throws Exception {
        // Initialize the database
        cBDCUserRepository.saveAndFlush(cBDCUser);

        int databaseSizeBeforeDelete = cBDCUserRepository.findAll().size();

        // Delete the cBDCUser
        restCBDCUserMockMvc
            .perform(delete(ENTITY_API_URL_ID, cBDCUser.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CBDCUser> cBDCUserList = cBDCUserRepository.findAll();
        assertThat(cBDCUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
