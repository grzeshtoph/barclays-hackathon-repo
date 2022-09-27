package com.hackathon.app.web.rest;

import com.hackathon.app.domain.CBDCAccount;
import com.hackathon.app.repository.CBDCAccountRepository;
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
 * REST controller for managing {@link com.hackathon.app.domain.CBDCAccount}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CBDCAccountResource {

    private final Logger log = LoggerFactory.getLogger(CBDCAccountResource.class);

    private static final String ENTITY_NAME = "cBDCAccount";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CBDCAccountRepository cBDCAccountRepository;

    public CBDCAccountResource(CBDCAccountRepository cBDCAccountRepository) {
        this.cBDCAccountRepository = cBDCAccountRepository;
    }

    /**
     * {@code POST  /cbdc-accounts} : Create a new cBDCAccount.
     *
     * @param cBDCAccount the cBDCAccount to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cBDCAccount, or with status {@code 400 (Bad Request)} if the cBDCAccount has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cbdc-accounts")
    public ResponseEntity<CBDCAccount> createCBDCAccount(@RequestBody CBDCAccount cBDCAccount) throws URISyntaxException {
        log.debug("REST request to save CBDCAccount : {}", cBDCAccount);
        if (cBDCAccount.getId() != null) {
            throw new BadRequestAlertException("A new cBDCAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CBDCAccount result = cBDCAccountRepository.save(cBDCAccount);
        return ResponseEntity
            .created(new URI("/api/cbdc-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cbdc-accounts/:id} : Updates an existing cBDCAccount.
     *
     * @param id the id of the cBDCAccount to save.
     * @param cBDCAccount the cBDCAccount to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cBDCAccount,
     * or with status {@code 400 (Bad Request)} if the cBDCAccount is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cBDCAccount couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cbdc-accounts/{id}")
    public ResponseEntity<CBDCAccount> updateCBDCAccount(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CBDCAccount cBDCAccount
    ) throws URISyntaxException {
        log.debug("REST request to update CBDCAccount : {}, {}", id, cBDCAccount);
        if (cBDCAccount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cBDCAccount.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cBDCAccountRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CBDCAccount result = cBDCAccountRepository.save(cBDCAccount);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, cBDCAccount.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cbdc-accounts/:id} : Partial updates given fields of an existing cBDCAccount, field will ignore if it is null
     *
     * @param id the id of the cBDCAccount to save.
     * @param cBDCAccount the cBDCAccount to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cBDCAccount,
     * or with status {@code 400 (Bad Request)} if the cBDCAccount is not valid,
     * or with status {@code 404 (Not Found)} if the cBDCAccount is not found,
     * or with status {@code 500 (Internal Server Error)} if the cBDCAccount couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cbdc-accounts/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CBDCAccount> partialUpdateCBDCAccount(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CBDCAccount cBDCAccount
    ) throws URISyntaxException {
        log.debug("REST request to partial update CBDCAccount partially : {}, {}", id, cBDCAccount);
        if (cBDCAccount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cBDCAccount.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cBDCAccountRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CBDCAccount> result = cBDCAccountRepository
            .findById(cBDCAccount.getId())
            .map(existingCBDCAccount -> {
                if (cBDCAccount.getPartyId() != null) {
                    existingCBDCAccount.setPartyId(cBDCAccount.getPartyId());
                }
                if (cBDCAccount.getAccountId() != null) {
                    existingCBDCAccount.setAccountId(cBDCAccount.getAccountId());
                }
                if (cBDCAccount.getPipId() != null) {
                    existingCBDCAccount.setPipId(cBDCAccount.getPipId());
                }
                if (cBDCAccount.getCurrencyId() != null) {
                    existingCBDCAccount.setCurrencyId(cBDCAccount.getCurrencyId());
                }
                if (cBDCAccount.getCbdcUserID() != null) {
                    existingCBDCAccount.setCbdcUserID(cBDCAccount.getCbdcUserID());
                }

                return existingCBDCAccount;
            })
            .map(cBDCAccountRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, cBDCAccount.getId().toString())
        );
    }

    /**
     * {@code GET  /cbdc-accounts} : get all the cBDCAccounts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cBDCAccounts in body.
     */
    @GetMapping("/cbdc-accounts")
    public List<CBDCAccount> getAllCBDCAccounts() {
        log.debug("REST request to get all CBDCAccounts");
        return cBDCAccountRepository.findAll();
    }

    /**
     * {@code GET  /cbdc-accounts/:id} : get the "id" cBDCAccount.
     *
     * @param id the id of the cBDCAccount to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cBDCAccount, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cbdc-accounts/{id}")
    public ResponseEntity<CBDCAccount> getCBDCAccount(@PathVariable Long id) {
        log.debug("REST request to get CBDCAccount : {}", id);
        Optional<CBDCAccount> cBDCAccount = cBDCAccountRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cBDCAccount);
    }

    /**
     * {@code DELETE  /cbdc-accounts/:id} : delete the "id" cBDCAccount.
     *
     * @param id the id of the cBDCAccount to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cbdc-accounts/{id}")
    public ResponseEntity<Void> deleteCBDCAccount(@PathVariable Long id) {
        log.debug("REST request to delete CBDCAccount : {}", id);
        cBDCAccountRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
