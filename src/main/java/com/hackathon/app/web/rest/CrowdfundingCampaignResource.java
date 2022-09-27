package com.hackathon.app.web.rest;

import com.hackathon.app.domain.CrowdfundingCampaign;
import com.hackathon.app.repository.CrowdfundingCampaignRepository;
import com.hackathon.app.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.hackathon.app.domain.CrowdfundingCampaign}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CrowdfundingCampaignResource {

    private final Logger log = LoggerFactory.getLogger(CrowdfundingCampaignResource.class);

    private static final String ENTITY_NAME = "crowdfundingCampaign";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CrowdfundingCampaignRepository crowdfundingCampaignRepository;

    public CrowdfundingCampaignResource(CrowdfundingCampaignRepository crowdfundingCampaignRepository) {
        this.crowdfundingCampaignRepository = crowdfundingCampaignRepository;
    }

    /**
     * {@code POST  /crowdfunding-campaigns} : Create a new crowdfundingCampaign.
     *
     * @param crowdfundingCampaign the crowdfundingCampaign to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new crowdfundingCampaign, or with status {@code 400 (Bad Request)} if the crowdfundingCampaign has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/crowdfunding-campaigns")
    public ResponseEntity<CrowdfundingCampaign> createCrowdfundingCampaign(@RequestBody CrowdfundingCampaign crowdfundingCampaign)
        throws URISyntaxException {
        log.debug("REST request to save CrowdfundingCampaign : {}", crowdfundingCampaign);
        if (crowdfundingCampaign.getId() != null) {
            throw new BadRequestAlertException("A new crowdfundingCampaign cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CrowdfundingCampaign result = crowdfundingCampaignRepository.save(crowdfundingCampaign);
        return ResponseEntity
            .created(new URI("/api/crowdfunding-campaigns/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /crowdfunding-campaigns/:id} : Updates an existing crowdfundingCampaign.
     *
     * @param id the id of the crowdfundingCampaign to save.
     * @param crowdfundingCampaign the crowdfundingCampaign to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated crowdfundingCampaign,
     * or with status {@code 400 (Bad Request)} if the crowdfundingCampaign is not valid,
     * or with status {@code 500 (Internal Server Error)} if the crowdfundingCampaign couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/crowdfunding-campaigns/{id}")
    public ResponseEntity<CrowdfundingCampaign> updateCrowdfundingCampaign(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CrowdfundingCampaign crowdfundingCampaign
    ) throws URISyntaxException {
        log.debug("REST request to update CrowdfundingCampaign : {}, {}", id, crowdfundingCampaign);
        if (crowdfundingCampaign.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, crowdfundingCampaign.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!crowdfundingCampaignRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CrowdfundingCampaign result = crowdfundingCampaignRepository.save(crowdfundingCampaign);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, crowdfundingCampaign.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /crowdfunding-campaigns/:id} : Partial updates given fields of an existing crowdfundingCampaign, field will ignore if it is null
     *
     * @param id the id of the crowdfundingCampaign to save.
     * @param crowdfundingCampaign the crowdfundingCampaign to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated crowdfundingCampaign,
     * or with status {@code 400 (Bad Request)} if the crowdfundingCampaign is not valid,
     * or with status {@code 404 (Not Found)} if the crowdfundingCampaign is not found,
     * or with status {@code 500 (Internal Server Error)} if the crowdfundingCampaign couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/crowdfunding-campaigns/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CrowdfundingCampaign> partialUpdateCrowdfundingCampaign(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CrowdfundingCampaign crowdfundingCampaign
    ) throws URISyntaxException {
        log.debug("REST request to partial update CrowdfundingCampaign partially : {}, {}", id, crowdfundingCampaign);
        if (crowdfundingCampaign.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, crowdfundingCampaign.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!crowdfundingCampaignRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CrowdfundingCampaign> result = crowdfundingCampaignRepository
            .findById(crowdfundingCampaign.getId())
            .map(existingCrowdfundingCampaign -> {
                if (crowdfundingCampaign.getFundingGoal() != null) {
                    existingCrowdfundingCampaign.setFundingGoal(crowdfundingCampaign.getFundingGoal());
                }
                if (crowdfundingCampaign.getFundingGoalReached() != null) {
                    existingCrowdfundingCampaign.setFundingGoalReached(crowdfundingCampaign.getFundingGoalReached());
                }
                if (crowdfundingCampaign.getFinished() != null) {
                    existingCrowdfundingCampaign.setFinished(crowdfundingCampaign.getFinished());
                }
                if (crowdfundingCampaign.getEscrowPartyId() != null) {
                    existingCrowdfundingCampaign.setEscrowPartyId(crowdfundingCampaign.getEscrowPartyId());
                }
                if (crowdfundingCampaign.getEscrowAccountId() != null) {
                    existingCrowdfundingCampaign.setEscrowAccountId(crowdfundingCampaign.getEscrowAccountId());
                }
                if (crowdfundingCampaign.getEscrowPipId() != null) {
                    existingCrowdfundingCampaign.setEscrowPipId(crowdfundingCampaign.getEscrowPipId());
                }
                if (crowdfundingCampaign.getCurrencyId() != null) {
                    existingCrowdfundingCampaign.setCurrencyId(crowdfundingCampaign.getCurrencyId());
                }
                if (crowdfundingCampaign.getCampaignPartyId() != null) {
                    existingCrowdfundingCampaign.setCampaignPartyId(crowdfundingCampaign.getCampaignPartyId());
                }
                if (crowdfundingCampaign.getCampaignAccountId() != null) {
                    existingCrowdfundingCampaign.setCampaignAccountId(crowdfundingCampaign.getCampaignAccountId());
                }
                if (crowdfundingCampaign.getCampaignBankId() != null) {
                    existingCrowdfundingCampaign.setCampaignBankId(crowdfundingCampaign.getCampaignBankId());
                }

                return existingCrowdfundingCampaign;
            })
            .map(crowdfundingCampaignRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, crowdfundingCampaign.getId().toString())
        );
    }

    /**
     * {@code GET  /crowdfunding-campaigns} : get all the crowdfundingCampaigns.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of crowdfundingCampaigns in body.
     */
    @GetMapping("/crowdfunding-campaigns")
    public List<CrowdfundingCampaign> getAllCrowdfundingCampaigns() {
        log.debug("REST request to get all CrowdfundingCampaigns");
        return crowdfundingCampaignRepository.findAll();
    }

    /**
     * {@code GET  /crowdfunding-campaigns/:id} : get the "id" crowdfundingCampaign.
     *
     * @param id the id of the crowdfundingCampaign to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the crowdfundingCampaign, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/crowdfunding-campaigns/{id}")
    public ResponseEntity<CrowdfundingCampaign> getCrowdfundingCampaign(@PathVariable Long id) {
        log.debug("REST request to get CrowdfundingCampaign : {}", id);
        Optional<CrowdfundingCampaign> crowdfundingCampaign = crowdfundingCampaignRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(crowdfundingCampaign);
    }

    /**
     * {@code DELETE  /crowdfunding-campaigns/:id} : delete the "id" crowdfundingCampaign.
     *
     * @param id the id of the crowdfundingCampaign to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/crowdfunding-campaigns/{id}")
    public ResponseEntity<Void> deleteCrowdfundingCampaign(@PathVariable Long id) {
        log.debug("REST request to delete CrowdfundingCampaign : {}", id);
        crowdfundingCampaignRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
