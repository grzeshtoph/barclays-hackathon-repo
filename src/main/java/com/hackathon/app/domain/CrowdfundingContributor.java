package com.hackathon.app.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CrowdfundingContributor.
 */
@Entity
@Table(name = "crowdfunding_contributor")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CrowdfundingContributor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "campaign_id")
    private Long campaignId;

    @Column(name = "amount_donated")
    private Long amountDonated;

    @Column(name = "party_id")
    private Long partyId;

    @Column(name = "account_id")
    private Long accountId;

    @Column(name = "pip_id")
    private Long pipId;

    @Column(name = "currency_id")
    private Long currencyId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CrowdfundingContributor id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCampaignId() {
        return this.campaignId;
    }

    public CrowdfundingContributor campaignId(Long campaignId) {
        this.setCampaignId(campaignId);
        return this;
    }

    public void setCampaignId(Long campaignId) {
        this.campaignId = campaignId;
    }

    public Long getAmountDonated() {
        return this.amountDonated;
    }

    public CrowdfundingContributor amountDonated(Long amountDonated) {
        this.setAmountDonated(amountDonated);
        return this;
    }

    public void setAmountDonated(Long amountDonated) {
        this.amountDonated = amountDonated;
    }

    public Long getPartyId() {
        return this.partyId;
    }

    public CrowdfundingContributor partyId(Long partyId) {
        this.setPartyId(partyId);
        return this;
    }

    public void setPartyId(Long partyId) {
        this.partyId = partyId;
    }

    public Long getAccountId() {
        return this.accountId;
    }

    public CrowdfundingContributor accountId(Long accountId) {
        this.setAccountId(accountId);
        return this;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Long getPipId() {
        return this.pipId;
    }

    public CrowdfundingContributor pipId(Long pipId) {
        this.setPipId(pipId);
        return this;
    }

    public void setPipId(Long pipId) {
        this.pipId = pipId;
    }

    public Long getCurrencyId() {
        return this.currencyId;
    }

    public CrowdfundingContributor currencyId(Long currencyId) {
        this.setCurrencyId(currencyId);
        return this;
    }

    public void setCurrencyId(Long currencyId) {
        this.currencyId = currencyId;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CrowdfundingContributor)) {
            return false;
        }
        return id != null && id.equals(((CrowdfundingContributor) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CrowdfundingContributor{" +
            "id=" + getId() +
            ", campaignId=" + getCampaignId() +
            ", amountDonated=" + getAmountDonated() +
            ", partyId=" + getPartyId() +
            ", accountId=" + getAccountId() +
            ", pipId=" + getPipId() +
            ", currencyId=" + getCurrencyId() +
            "}";
    }
}
