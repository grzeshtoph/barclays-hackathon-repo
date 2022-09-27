package com.hackathon.app.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.hackathon.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CBDCUserTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CBDCUser.class);
        CBDCUser cBDCUser1 = new CBDCUser();
        cBDCUser1.setId(1L);
        CBDCUser cBDCUser2 = new CBDCUser();
        cBDCUser2.setId(cBDCUser1.getId());
        assertThat(cBDCUser1).isEqualTo(cBDCUser2);
        cBDCUser2.setId(2L);
        assertThat(cBDCUser1).isNotEqualTo(cBDCUser2);
        cBDCUser1.setId(null);
        assertThat(cBDCUser1).isNotEqualTo(cBDCUser2);
    }
}
