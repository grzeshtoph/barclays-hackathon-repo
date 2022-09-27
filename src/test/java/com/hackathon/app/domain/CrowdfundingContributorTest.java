package com.hackathon.app.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.hackathon.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CrowdfundingContributorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CrowdfundingContributor.class);
        CrowdfundingContributor crowdfundingContributor1 = new CrowdfundingContributor();
        crowdfundingContributor1.setId(1L);
        CrowdfundingContributor crowdfundingContributor2 = new CrowdfundingContributor();
        crowdfundingContributor2.setId(crowdfundingContributor1.getId());
        assertThat(crowdfundingContributor1).isEqualTo(crowdfundingContributor2);
        crowdfundingContributor2.setId(2L);
        assertThat(crowdfundingContributor1).isNotEqualTo(crowdfundingContributor2);
        crowdfundingContributor1.setId(null);
        assertThat(crowdfundingContributor1).isNotEqualTo(crowdfundingContributor2);
    }
}
