package com.hackathon.app.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.hackathon.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CBDCAccountTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CBDCAccount.class);
        CBDCAccount cBDCAccount1 = new CBDCAccount();
        cBDCAccount1.setId(1L);
        CBDCAccount cBDCAccount2 = new CBDCAccount();
        cBDCAccount2.setId(cBDCAccount1.getId());
        assertThat(cBDCAccount1).isEqualTo(cBDCAccount2);
        cBDCAccount2.setId(2L);
        assertThat(cBDCAccount1).isNotEqualTo(cBDCAccount2);
        cBDCAccount1.setId(null);
        assertThat(cBDCAccount1).isNotEqualTo(cBDCAccount2);
    }
}
