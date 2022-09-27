package com.hackathon.app.repository;

import com.hackathon.app.domain.CBDCUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CBDCUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CBDCUserRepository extends JpaRepository<CBDCUser, Long> {
    public CBDCUser findCBDCUserByEmail(String email);
}
