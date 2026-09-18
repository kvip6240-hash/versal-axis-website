import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  CheckCircle2, ShieldCheck, MapPin, Calendar, Clock, ArrowRight,
  Building2, ChevronLeft, AlertCircle, FileText, Zap, Activity, Star
} from 'lucide-react';

export const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, proposals } = useDemo();
  const navigate = useNavigate();

  const project = projects.find(p => p.id === id) || projects[0];

  if (!project) {
    return <div className="container" style={{ padding: '100px 0' }}>Project not found</div>;
  }

  const matchingProp = proposals.find(p => p.id === project.proposalId);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
      case 'SCHEDULED':
        return <span className="status-pill info"><ShieldCheck size={12} /> Confirmed</span>;
      case 'WORK STARTED':
      case 'IN PROGRESS':
        return <span className="status-pill active"><Zap size={12} /> Work In Progress</span>;
      case 'COMPLETED':
        return <span className="status-pill success"><CheckCircle2 size={12} /> Completed</span>;
      case 'BALANCE PAYMENT DUE':
        return <span className="status-pill danger"><AlertCircle size={12} /> Balance Payment Due</span>;
      case 'CLOSED':
        return <span className="status-pill neutral">Closed</span>;
      default:
        return <span className="status-pill info">{status}</span>;
    }
  };

  return (
    <div className="proj-details-page">
      <div className="container">
        <button className="back-link-btn" onClick={() => navigate('/requester/projects')}>
          <ChevronLeft size={16} /> Back to Projects
        </button>

        {/* HEADER CARD */}
        <div className="proj-head-card">
          <div className="proj-head-left">
            <span className="kicker">LIVE PROJECT TRACKING</span>
            <h2>{project.projectName}</h2>
            <div className="proj-meta-chips">
              <span>ID: <strong>{project.id}</strong></span>
              <span>Provider: <strong>{project.providerName}</strong></span>
              <span>Service: <strong>{project.service}</strong></span>
              <span>Location: <strong>{project.location}</strong></span>
            </div>
          </div>

          <div className="proj-head-right">
            {getStatusBadge(project.status)}
            <div className="val-box">
              <span>Total Value: £{project.totalValue.toLocaleString()}</span>
              <span className="paid-tag">{project.paymentStatus}</span>
            </div>
          </div>
        </div>

        {/* PROGRESS TIMELINE */}
        <div className="timeline-card">
          <h3>Project Timeline & Milestones</h3>
          <div className="timeline-steps-grid">
            {project.timeline.map((step, idx) => {
              const isReadyToReview = step.title.includes('Review') && project.status === 'COMPLETED' && (project.paymentStatus === 'FULLY PAID' || project.balanceAmount === 0);
              const isFinalPaymentDue = step.title.includes('Final Payment') && project.status === 'BALANCE PAYMENT DUE';

              let statusLabel = 'Pending';
              if (step.completed) statusLabel = '✓ Complete';
              else if (isReadyToReview) statusLabel = 'Ready to Review';
              else if (isFinalPaymentDue) statusLabel = 'Action Due';

              return (
                <div key={idx} className={`timeline-step-item ${step.completed ? 'completed' : isReadyToReview ? 'ready' : ''}`}>
                  <div className="step-circle">
                    {step.completed ? <CheckCircle2 size={14} /> : idx + 1}
                  </div>
                  <span className="step-title">{step.title}</span>
                  <span className={`step-status-lbl ${isReadyToReview ? 'ready-text' : ''}`}>{statusLabel}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ACTION NEEDED BANNER IF BALANCE DUE OR REVIEW DUE */}
        {project.status === 'BALANCE PAYMENT DUE' && project.balanceAmount > 0 && (
          <div className="action-required-banner danger">
            <AlertCircle size={20} />
            <div>
              <strong>Action Required: 40% Balance Payment Due (£{project.balanceAmount.toLocaleString()})</strong>
              <p>Work has been completed by PrimeCare Facilities Ltd. Pay remaining balance to unlock provider review.</p>
            </div>
            <button className="btn-primary pill" onClick={() => navigate(`/requester/final-payment/${project.id}`)}>
              Pay Balance £{project.balanceAmount.toLocaleString()} <ArrowRight size={14} />
            </button>
          </div>
        )}

        {(project.status === 'COMPLETED' || project.paymentStatus === 'FULLY PAID') && (project.balancePaid || project.balanceAmount === 0) && (
          <div className="action-required-banner success">
            <Star size={20} color="#F59E0B" />
            <div>
              <strong>Project Completed & Fully Paid!</strong>
              <p>Share your feedback and rate your experience with PrimeCare Facilities Ltd.</p>
            </div>
            <button className="btn-primary pill" onClick={() => navigate(`/requester/review/${project.id}`)}>
              Rate & Review Provider <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* MAIN DETAILS GRID */}
        <div className="proj-body-grid">
          {/* LEFT: SCOPE & UPDATES */}
          <div className="proj-left-col">
            {/* UPDATES STREAM */}
            <div className="proj-sec-box">
              <h3>Live Activity & Updates</h3>
              <div className="updates-stream">
                {project.updates.map((u, i) => (
                  <div key={i} className="update-card-item">
                    <div className="update-header">
                      <strong className="update-author">{u.author}</strong>
                      <span className="update-time">{u.timestamp}</span>
                    </div>
                    <p>{u.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SCOPE OF WORK */}
            {matchingProp && (
              <div className="proj-sec-box">
                <h3>Agreed Scope of Work</h3>
                <ul className="scope-check-list">
                  {matchingProp.scopeOfWork.map((s, i) => (
                    <li key={i}>
                      <CheckCircle2 size={16} color="#10B981" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT: PROVIDER & FINANCIALS */}
          <div className="proj-right-col">
            {/* PROVIDER DETAILS */}
            <div className="proj-sec-box">
              <h3>Assigned Service Provider</h3>
              <div className="provider-mini-card">
                <div className="prov-avatar"><Building2 size={20} /></div>
                <div>
                  <strong>{project.providerName}</strong>
                  <span className="prov-sub">Verified Category Partner</span>
                </div>
              </div>
              <div className="prov-contact-meta">
                <div><strong>Site Contact:</strong> Mark Davies (Senior Lead)</div>
                <div><strong>Phone:</strong> +44 161 992 3001</div>
                <div><strong>Response SLA:</strong> 2 Hours On-Site Guarantee</div>
              </div>
            </div>

            {/* FINANCIAL SUMMARY */}
            <div className="proj-sec-box">
              <h3>Payment Breakdown</h3>
              <div className="fin-summary-rows">
                <div className="fin-row">
                  <span>Total Project Value:</span>
                  <strong>£{project.totalValue.toLocaleString()}</strong>
                </div>
                <div className="fin-row">
                  <span>Upfront (60%):</span>
                  <span className={project.upfrontPaid ? 'paid-text' : ''}>
                    £{project.upfrontAmount.toLocaleString()} {project.upfrontPaid ? '✓ Paid' : 'Pending'}
                  </span>
                </div>
                <div className="fin-row">
                  <span>Balance (40%):</span>
                  <span className={project.balancePaid ? 'paid-text' : ''}>
                    £{project.balanceAmount.toLocaleString()} {project.balancePaid ? '✓ Paid' : 'Due on Completion'}
                  </span>
                </div>
              </div>
            </div>

            {/* QUICK COMPLETION LINK IF COMPLETED */}
            {(project.status === 'COMPLETED' || project.status === 'BALANCE PAYMENT DUE' || project.status === 'CLOSED') && (
              <button
                className="btn-ghost pill full-width completion-doc-btn"
                onClick={() => navigate(`/requester/completion/${project.id}`)}
              >
                <FileText size={16} /> View Completion Certificate & Photos
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
