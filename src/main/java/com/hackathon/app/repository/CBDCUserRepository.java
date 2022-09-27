package com.hackathon.app.repository;

import com.hackathon.app.domain.CBDCUser;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CBDCUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CBDCUserRepository extends JpaRepository<CBDCUser, Long> {
    Optional<CBDCUser> findCBDCUserByEmail(String email);
}
