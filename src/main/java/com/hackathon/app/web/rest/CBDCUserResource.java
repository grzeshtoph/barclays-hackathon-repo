package com.hackathon.app.web.rest;

import com.hackathon.app.domain.CBDCUser;
import com.hackathon.app.repository.CBDCUserRepository;
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
 * REST controller for managing {@link com.hackathon.app.domain.CBDCUser}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CBDCUserResource {

    private final Logger log = LoggerFactory.getLogger(CBDCUserResource.class);

    private static final String ENTITY_NAME = "cBDCUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CBDCUserRepository cBDCUserRepository;

    public CBDCUserResource(CBDCUserRepository cBDCUserRepository) {
        this.cBDCUserRepository = cBDCUserRepository;
    }

    /**
     * {@code POST  /cbdc-users} : Create a new cBDCUser.
     *
     * @param cBDCUser the cBDCUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cBDCUser, or with status {@code 400 (Bad Request)} if the cBDCUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cbdc-users")
    public ResponseEntity<CBDCUser> createCBDCUser(@RequestBody CBDCUser cBDCUser) throws URISyntaxException {
        log.debug("REST request to save CBDCUser : {}", cBDCUser);
        if (cBDCUser.getId() != null) {
            throw new BadRequestAlertException("A new cBDCUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CBDCUser result = cBDCUserRepository.save(cBDCUser);
        return ResponseEntity
            .created(new URI("/api/cbdc-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cbdc-users/:id} : Updates an existing cBDCUser.
     *
     * @param id the id of the cBDCUser to save.
     * @param cBDCUser the cBDCUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cBDCUser,
     * or with status {@code 400 (Bad Request)} if the cBDCUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cBDCUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cbdc-users/{id}")
    public ResponseEntity<CBDCUser> updateCBDCUser(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CBDCUser cBDCUser
    ) throws URISyntaxException {
        log.debug("REST request to update CBDCUser : {}, {}", id, cBDCUser);
        if (cBDCUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cBDCUser.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cBDCUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CBDCUser result = cBDCUserRepository.save(cBDCUser);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, cBDCUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cbdc-users/:id} : Partial updates given fields of an existing cBDCUser, field will ignore if it is null
     *
     * @param id the id of the cBDCUser to save.
     * @param cBDCUser the cBDCUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cBDCUser,
     * or with status {@code 400 (Bad Request)} if the cBDCUser is not valid,
     * or with status {@code 404 (Not Found)} if the cBDCUser is not found,
     * or with status {@code 500 (Internal Server Error)} if the cBDCUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cbdc-users/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CBDCUser> partialUpdateCBDCUser(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CBDCUser cBDCUser
    ) throws URISyntaxException {
        log.debug("REST request to partial update CBDCUser partially : {}, {}", id, cBDCUser);
        if (cBDCUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cBDCUser.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cBDCUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CBDCUser> result = cBDCUserRepository
            .findById(cBDCUser.getId())
            .map(existingCBDCUser -> {
                if (cBDCUser.getEmail() != null) {
                    existingCBDCUser.setEmail(cBDCUser.getEmail());
                }
                if (cBDCUser.getPassword() != null) {
                    existingCBDCUser.setPassword(cBDCUser.getPassword());
                }
                if (cBDCUser.getFirstName() != null) {
                    existingCBDCUser.setFirstName(cBDCUser.getFirstName());
                }
                if (cBDCUser.getLastName() != null) {
                    existingCBDCUser.setLastName(cBDCUser.getLastName());
                }

                return existingCBDCUser;
            })
            .map(cBDCUserRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, cBDCUser.getId().toString())
        );
    }

    /**
     * {@code GET  /cbdc-users} : get all the cBDCUsers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cBDCUsers in body.
     */
    @GetMapping("/cbdc-users")
    public List<CBDCUser> getAllCBDCUsers() {
        log.debug("REST request to get all CBDCUsers");
        return cBDCUserRepository.findAll();
    }

    /**
     * {@code GET  /cbdc-users/:id} : get the "id" cBDCUser.
     *
     * @param id the id of the cBDCUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cBDCUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cbdc-users/{id}")
    public ResponseEntity<CBDCUser> getCBDCUser(@PathVariable Long id) {
        log.debug("REST request to get CBDCUser : {}", id);
        Optional<CBDCUser> cBDCUser = cBDCUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cBDCUser);
    }

    /**
     * {@code DELETE  /cbdc-users/:id} : delete the "id" cBDCUser.
     *
     * @param id the id of the cBDCUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cbdc-users/{id}")
    public ResponseEntity<Void> deleteCBDCUser(@PathVariable Long id) {
        log.debug("REST request to delete CBDCUser : {}", id);
        cBDCUserRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
