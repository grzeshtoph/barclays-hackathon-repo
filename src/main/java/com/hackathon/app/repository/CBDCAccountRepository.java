package com.hackathon.app.repository;

import com.hackathon.app.domain.CBDCAccount;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CBDCAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CBDCAccountRepository extends JpaRepository<CBDCAccount, Long> {
    List<CBDCAccount> findCBDCAccountsByCbdcUserIDOrderByAccountId(Long cbdcUserId);

    Optional<CBDCAccount> findCBDCAccountByAccountId(Long accountId);
}
