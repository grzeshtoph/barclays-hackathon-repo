package com.hackathon.app.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.hackathon.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CrowdfundingCampaignTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CrowdfundingCampaign.class);
        CrowdfundingCampaign crowdfundingCampaign1 = new CrowdfundingCampaign();
        crowdfundingCampaign1.setId(1L);
        CrowdfundingCampaign crowdfundingCampaign2 = new CrowdfundingCampaign();
        crowdfundingCampaign2.setId(crowdfundingCampaign1.getId());
        assertThat(crowdfundingCampaign1).isEqualTo(crowdfundingCampaign2);
        crowdfundingCampaign2.setId(2L);
        assertThat(crowdfundingCampaign1).isNotEqualTo(crowdfundingCampaign2);
        crowdfundingCampaign1.setId(null);
        assertThat(crowdfundingCampaign1).isNotEqualTo(crowdfundingCampaign2);
    }
}
