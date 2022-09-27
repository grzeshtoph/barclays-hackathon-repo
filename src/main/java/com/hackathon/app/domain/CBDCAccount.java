package com.hackathon.app.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CBDCAccount.
 */
@Entity
@Table(name = "cbdc_account")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CBDCAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "party_id")
    private Long partyId;

    @Column(name = "account_id")
    private Long accountId;

    @Column(name = "pip_id")
    private Long pipId;

    @Column(name = "currency_id")
    private Long currencyId;

    @Column(name = "cbdc_user_id")
    private Long cbdcUserID;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CBDCAccount id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPartyId() {
        return this.partyId;
    }

    public CBDCAccount partyId(Long partyId) {
        this.setPartyId(partyId);
        return this;
    }

    public void setPartyId(Long partyId) {
        this.partyId = partyId;
    }

    public Long getAccountId() {
        return this.accountId;
    }

    public CBDCAccount accountId(Long accountId) {
        this.setAccountId(accountId);
        return this;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Long getPipId() {
        return this.pipId;
    }

    public CBDCAccount pipId(Long pipId) {
        this.setPipId(pipId);
        return this;
    }

    public void setPipId(Long pipId) {
        this.pipId = pipId;
    }

    public Long getCurrencyId() {
        return this.currencyId;
    }

    public CBDCAccount currencyId(Long currencyId) {
        this.setCurrencyId(currencyId);
        return this;
    }

    public void setCurrencyId(Long currencyId) {
        this.currencyId = currencyId;
    }

    public Long getCbdcUserID() {
        return this.cbdcUserID;
    }

    public CBDCAccount cbdcUserID(Long cbdcUserID) {
        this.setCbdcUserID(cbdcUserID);
        return this;
    }

    public void setCbdcUserID(Long cbdcUserID) {
        this.cbdcUserID = cbdcUserID;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CBDCAccount)) {
            return false;
        }
        return id != null && id.equals(((CBDCAccount) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CBDCAccount{" +
            "id=" + getId() +
            ", partyId=" + getPartyId() +
            ", accountId=" + getAccountId() +
            ", pipId=" + getPipId() +
            ", currencyId=" + getCurrencyId() +
            ", cbdcUserID=" + getCbdcUserID() +
            "}";
    }
}
