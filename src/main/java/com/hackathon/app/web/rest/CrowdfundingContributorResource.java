package com.hackathon.app.web.rest;

import com.hackathon.app.domain.CrowdfundingContributor;
import com.hackathon.app.repository.CrowdfundingContributorRepository;
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
 * REST controller for managing {@link com.hackathon.app.domain.CrowdfundingContributor}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CrowdfundingContributorResource {

    private final Logger log = LoggerFactory.getLogger(CrowdfundingContributorResource.class);

    private static final String ENTITY_NAME = "crowdfundingContributor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CrowdfundingContributorRepository crowdfundingContributorRepository;

    public CrowdfundingContributorResource(CrowdfundingContributorRepository crowdfundingContributorRepository) {
        this.crowdfundingContributorRepository = crowdfundingContributorRepository;
    }

    /**
     * {@code POST  /crowdfunding-contributors} : Create a new crowdfundingContributor.
     *
     * @param crowdfundingContributor the crowdfundingContributor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new crowdfundingContributor, or with status {@code 400 (Bad Request)} if the crowdfundingContributor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/crowdfunding-contributors")
    public ResponseEntity<CrowdfundingContributor> createCrowdfundingContributor(
        @RequestBody CrowdfundingContributor crowdfundingContributor
    ) throws URISyntaxException {
        log.debug("REST request to save CrowdfundingContributor : {}", crowdfundingContributor);
        if (crowdfundingContributor.getId() != null) {
            throw new BadRequestAlertException("A new crowdfundingContributor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CrowdfundingContributor result = crowdfundingContributorRepository.save(crowdfundingContributor);
        return ResponseEntity
            .created(new URI("/api/crowdfunding-contributors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /crowdfunding-contributors/:id} : Updates an existing crowdfundingContributor.
     *
     * @param id the id of the crowdfundingContributor to save.
     * @param crowdfundingContributor the crowdfundingContributor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated crowdfundingContributor,
     * or with status {@code 400 (Bad Request)} if the crowdfundingContributor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the crowdfundingContributor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/crowdfunding-contributors/{id}")
    public ResponseEntity<CrowdfundingContributor> updateCrowdfundingContributor(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CrowdfundingContributor crowdfundingContributor
    ) throws URISyntaxException {
        log.debug("REST request to update CrowdfundingContributor : {}, {}", id, crowdfundingContributor);
        if (crowdfundingContributor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, crowdfundingContributor.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!crowdfundingContributorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CrowdfundingContributor result = crowdfundingContributorRepository.save(crowdfundingContributor);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, crowdfundingContributor.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /crowdfunding-contributors/:id} : Partial updates given fields of an existing crowdfundingContributor, field will ignore if it is null
     *
     * @param id the id of the crowdfundingContributor to save.
     * @param crowdfundingContributor the crowdfundingContributor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated crowdfundingContributor,
     * or with status {@code 400 (Bad Request)} if the crowdfundingContributor is not valid,
     * or with status {@code 404 (Not Found)} if the crowdfundingContributor is not found,
     * or with status {@code 500 (Internal Server Error)} if the crowdfundingContributor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/crowdfunding-contributors/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CrowdfundingContributor> partialUpdateCrowdfundingContributor(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CrowdfundingContributor crowdfundingContributor
    ) throws URISyntaxException {
        log.debug("REST request to partial update CrowdfundingContributor partially : {}, {}", id, crowdfundingContributor);
        if (crowdfundingContributor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, crowdfundingContributor.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!crowdfundingContributorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CrowdfundingContributor> result = crowdfundingContributorRepository
            .findById(crowdfundingContributor.getId())
            .map(existingCrowdfundingContributor -> {
                if (crowdfundingContributor.getCampaignId() != null) {
                    existingCrowdfundingContributor.setCampaignId(crowdfundingContributor.getCampaignId());
                }
                if (crowdfundingContributor.getAmountDonated() != null) {
                    existingCrowdfundingContributor.setAmountDonated(crowdfundingContributor.getAmountDonated());
                }
                if (crowdfundingContributor.getPartyId() != null) {
                    existingCrowdfundingContributor.setPartyId(crowdfundingContributor.getPartyId());
                }
                if (crowdfundingContributor.getAccountId() != null) {
                    existingCrowdfundingContributor.setAccountId(crowdfundingContributor.getAccountId());
                }
                if (crowdfundingContributor.getPipId() != null) {
                    existingCrowdfundingContributor.setPipId(crowdfundingContributor.getPipId());
                }
                if (crowdfundingContributor.getCurrencyId() != null) {
                    existingCrowdfundingContributor.setCurrencyId(crowdfundingContributor.getCurrencyId());
                }

                return existingCrowdfundingContributor;
            })
            .map(crowdfundingContributorRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, crowdfundingContributor.getId().toString())
        );
    }

    /**
     * {@code GET  /crowdfunding-contributors} : get all the crowdfundingContributors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of crowdfundingContributors in body.
     */
    @GetMapping("/crowdfunding-contributors")
    public List<CrowdfundingContributor> getAllCrowdfundingContributors() {
        log.debug("REST request to get all CrowdfundingContributors");
        return crowdfundingContributorRepository.findAll();
    }

    /**
     * {@code GET  /crowdfunding-contributors/:id} : get the "id" crowdfundingContributor.
     *
     * @param id the id of the crowdfundingContributor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the crowdfundingContributor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/crowdfunding-contributors/{id}")
    public ResponseEntity<CrowdfundingContributor> getCrowdfundingContributor(@PathVariable Long id) {
        log.debug("REST request to get CrowdfundingContributor : {}", id);
        Optional<CrowdfundingContributor> crowdfundingContributor = crowdfundingContributorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(crowdfundingContributor);
    }

    /**
     * {@code DELETE  /crowdfunding-contributors/:id} : delete the "id" crowdfundingContributor.
     *
     * @param id the id of the crowdfundingContributor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/crowdfunding-contributors/{id}")
    public ResponseEntity<Void> deleteCrowdfundingContributor(@PathVariable Long id) {
        log.debug("REST request to delete CrowdfundingContributor : {}", id);
        crowdfundingContributorRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
