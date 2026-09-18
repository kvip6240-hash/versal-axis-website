import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  ShieldCheck, CheckCircle2, FileText, ArrowRight, X,
  Building2, Calendar, Clock, ChevronLeft, CreditCard
} from 'lucide-react';

export const ProposalPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { proposals, acceptProposal, rejectProposal } = useDemo();
  const navigate = useNavigate();

  const proposal = proposals.find(p => p.id === id) || proposals[0];

  if (!proposal) {
    return <div className="container" style={{ padding: '100px 0' }}>Proposal not found</div>;
  }

  const handleAccept = () => {
    acceptProposal(proposal.id);
    const projId = `FX-PROJ-${proposal.requestId.replace('REQ-2026-', '')}`;
    navigate(`/requester/payment/${projId}`);
  };

  const handleReject = () => {
    rejectProposal(proposal.id);
    navigate('/requester/requests');
  };

  return (
    <div className="proposal-page">
      <div className="container">
        {/* BACK LINK */}
        <button className="back-link-btn" onClick={() => navigate('/requester/requests')}>
          <ChevronLeft size={16} /> Back to Requests
        </button>

        {/* PROPOSAL HEADER */}
        <div className="prop-header-card">
          <div className="prop-header-left">
            <span className="kicker">QUOTATION RECEIVED</span>
            <h2>{proposal.projectTitle}</h2>
            <div className="prop-meta-row">
              <span>Request ID: <strong>{proposal.requestId}</strong></span>
              <span>Site: <strong>{proposal.siteName}</strong></span>
              <span>Scheduled: <strong>{proposal.scheduledDate} ({proposal.estimatedDuration})</strong></span>
            </div>
          </div>

          <div className="prop-header-right">
            <div className="total-price-box">
              <span className="price-lbl">Total Quotation</span>
              <span className="price-num">£{proposal.totalQuote.toLocaleString()}</span>
              <span className="vat-lbl">Includes VAT & all materials</span>
            </div>
          </div>
        </div>

        {/* PROVIDER VERIFICATION BOX */}
        <div className="provider-info-box">
          <div className="provider-logo-wrap">
            <Building2 size={24} color="#146358" />
          </div>
          <div className="provider-details">
            <div className="provider-title-row">
              <h3>{proposal.providerName}</h3>
              <span className="verified-badge"><ShieldCheck size={14} /> Selected Network Provider</span>
            </div>
            <p>Specialist commercial facility maintenance provider across Manchester & North West UK.</p>
          </div>
        </div>

        {/* PAYMENT TERMS RULE BANNER */}
        <div className="payment-terms-banner">
          <div className="terms-header">
            <CreditCard size={18} />
            <span>VERSAL AXIS STRUCTURED PAYMENT MILESTONES</span>
          </div>
          <div className="terms-grid">
            <div className="term-card highlight">
              <span className="term-pct">{proposal.upfrontPercentage}% UPFRONT</span>
              <span className="term-amount">£{proposal.upfrontAmount.toLocaleString()}</span>
              <p>Due upon quotation acceptance to confirm provider dispatch & materials.</p>
            </div>

            <div className="term-card">
              <span className="term-pct">{proposal.balancePercentage}% UPON COMPLETION</span>
              <span className="term-amount">£{proposal.balanceAmount.toLocaleString()}</span>
              <p>Due only after provider completes project & uploads verified work report.</p>
            </div>
          </div>
        </div>

        {/* PROPOSAL BODY CONTENT */}
        <div className="prop-body-grid">
          {/* LEFT: SCOPE OF WORK */}
          <div className="prop-left-col">
            <div className="prop-section-card">
              <h3>Detailed Scope of Work</h3>
              <ul className="scope-list">
                {proposal.scopeOfWork.map((item, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={16} className="check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="prop-section-card">
              <h3>What's Included</h3>
              <ul className="included-list">
                {proposal.whatsIncluded.map((item, idx) => (
                  <li key={idx}>
                    <span className="dot-bullet" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: COST BREAKDOWN */}
          <div className="prop-right-col">
            <div className="prop-section-card cost-card">
              <h3>Itemized Cost Breakdown</h3>

              <div className="cost-breakdown-list">
                <div className="cost-row">
                  <span>Labour & Engineering</span>
                  <strong>£{proposal.laborCost.toLocaleString()}</strong>
                </div>
                <div className="cost-row">
                  <span>Materials & Filters</span>
                  <strong>£{proposal.materialsCost.toLocaleString()}</strong>
                </div>
                <div className="cost-row">
                  <span>Specialist Equipment</span>
                  <strong>£{proposal.equipmentCost.toLocaleString()}</strong>
                </div>
                <div className="cost-row">
                  <span>Transport & Logistics</span>
                  <strong>£{proposal.transportCost.toLocaleString()}</strong>
                </div>

                <div className="cost-divider" />

                <div className="cost-row total">
                  <span>Total Quote</span>
                  <strong>£{proposal.totalQuote.toLocaleString()}</strong>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              {proposal.status === 'PENDING' ? (
                <div className="prop-action-buttons">
                  <button className="btn-primary pill full-width magnetic-btn accept-btn" onClick={handleAccept}>
                    Accept Proposal & Proceed to Payment <ArrowRight size={16} />
                  </button>

                  <button className="btn-ghost pill full-width reject-btn" onClick={handleReject}>
                    Reject Proposal
                  </button>
                </div>
              ) : (
                <div className="prop-accepted-status">
                  <CheckCircle2 size={18} />
                  <span>Proposal {proposal.status}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
