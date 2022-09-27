package com.hackathon.app.repository;

import com.hackathon.app.domain.CrowdfundingContributor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CrowdfundingContributor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CrowdfundingContributorRepository extends JpaRepository<CrowdfundingContributor, Long> {}
