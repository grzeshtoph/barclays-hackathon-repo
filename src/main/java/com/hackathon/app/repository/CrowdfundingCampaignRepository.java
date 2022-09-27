package com.hackathon.app.repository;

import com.hackathon.app.domain.CrowdfundingCampaign;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CrowdfundingCampaign entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CrowdfundingCampaignRepository extends JpaRepository<CrowdfundingCampaign, Long> {}
