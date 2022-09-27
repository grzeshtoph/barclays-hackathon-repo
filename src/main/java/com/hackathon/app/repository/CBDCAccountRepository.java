package com.hackathon.app.repository;

import com.hackathon.app.domain.CBDCAccount;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CBDCAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CBDCAccountRepository extends JpaRepository<CBDCAccount, Long> {}
