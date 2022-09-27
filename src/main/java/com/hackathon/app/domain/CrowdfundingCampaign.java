package com.hackathon.app.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CrowdfundingCampaign.
 */
@Entity
@Table(name = "crowdfunding_campaign")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CrowdfundingCampaign implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "funding_goal")
    private Long fundingGoal;

    @Column(name = "funding_goal_reached")
    private Boolean fundingGoalReached;

    @Column(name = "finished")
    private Boolean finished;

    @Column(name = "escrow_party_id")
    private Long escrowPartyId;

    @Column(name = "escrow_account_id")
    private Long escrowAccountId;

    @Column(name = "escrow_pip_id")
    private Long escrowPipId;

    @Column(name = "currency_id")
    private Long currencyId;

    @Column(name = "campaign_party_id")
    private Long campaignPartyId;

    @Column(name = "campaign_account_id")
    private Long campaignAccountId;

    @Column(name = "campaign_bank_id")
    private Long campaignBankId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CrowdfundingCampaign id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFundingGoal() {
        return this.fundingGoal;
    }

    public CrowdfundingCampaign fundingGoal(Long fundingGoal) {
        this.setFundingGoal(fundingGoal);
        return this;
    }

    public void setFundingGoal(Long fundingGoal) {
        this.fundingGoal = fundingGoal;
    }

    public Boolean getFundingGoalReached() {
        return this.fundingGoalReached;
    }

    public CrowdfundingCampaign fundingGoalReached(Boolean fundingGoalReached) {
        this.setFundingGoalReached(fundingGoalReached);
        return this;
    }

    public void setFundingGoalReached(Boolean fundingGoalReached) {
        this.fundingGoalReached = fundingGoalReached;
    }

    public Boolean getFinished() {
        return this.finished;
    }

    public CrowdfundingCampaign finished(Boolean finished) {
        this.setFinished(finished);
        return this;
    }

    public void setFinished(Boolean finished) {
        this.finished = finished;
    }

    public Long getEscrowPartyId() {
        return this.escrowPartyId;
    }

    public CrowdfundingCampaign escrowPartyId(Long escrowPartyId) {
        this.setEscrowPartyId(escrowPartyId);
        return this;
    }

    public void setEscrowPartyId(Long escrowPartyId) {
        this.escrowPartyId = escrowPartyId;
    }

    public Long getEscrowAccountId() {
        return this.escrowAccountId;
    }

    public CrowdfundingCampaign escrowAccountId(Long escrowAccountId) {
        this.setEscrowAccountId(escrowAccountId);
        return this;
    }

    public void setEscrowAccountId(Long escrowAccountId) {
        this.escrowAccountId = escrowAccountId;
    }

    public Long getEscrowPipId() {
        return this.escrowPipId;
    }

    public CrowdfundingCampaign escrowPipId(Long escrowPipId) {
        this.setEscrowPipId(escrowPipId);
        return this;
    }

    public void setEscrowPipId(Long escrowPipId) {
        this.escrowPipId = escrowPipId;
    }

    public Long getCurrencyId() {
        return this.currencyId;
    }

    public CrowdfundingCampaign currencyId(Long currencyId) {
        this.setCurrencyId(currencyId);
        return this;
    }

    public void setCurrencyId(Long currencyId) {
        this.currencyId = currencyId;
    }

    public Long getCampaignPartyId() {
        return this.campaignPartyId;
    }

    public CrowdfundingCampaign campaignPartyId(Long campaignPartyId) {
        this.setCampaignPartyId(campaignPartyId);
        return this;
    }

    public void setCampaignPartyId(Long campaignPartyId) {
        this.campaignPartyId = campaignPartyId;
    }

    public Long getCampaignAccountId() {
        return this.campaignAccountId;
    }

    public CrowdfundingCampaign campaignAccountId(Long campaignAccountId) {
        this.setCampaignAccountId(campaignAccountId);
        return this;
    }

    public void setCampaignAccountId(Long campaignAccountId) {
        this.campaignAccountId = campaignAccountId;
    }

    public Long getCampaignBankId() {
        return this.campaignBankId;
    }

    public CrowdfundingCampaign campaignBankId(Long campaignBankId) {
        this.setCampaignBankId(campaignBankId);
        return this;
    }

    public void setCampaignBankId(Long campaignBankId) {
        this.campaignBankId = campaignBankId;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CrowdfundingCampaign)) {
            return false;
        }
        return id != null && id.equals(((CrowdfundingCampaign) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CrowdfundingCampaign{" +
            "id=" + getId() +
            ", fundingGoal=" + getFundingGoal() +
            ", fundingGoalReached='" + getFundingGoalReached() + "'" +
            ", finished='" + getFinished() + "'" +
            ", escrowPartyId=" + getEscrowPartyId() +
            ", escrowAccountId=" + getEscrowAccountId() +
            ", escrowPipId=" + getEscrowPipId() +
            ", currencyId=" + getCurrencyId() +
            ", campaignPartyId=" + getCampaignPartyId() +
            ", campaignAccountId=" + getCampaignAccountId() +
            ", campaignBankId=" + getCampaignBankId() +
            "}";
    }
}
