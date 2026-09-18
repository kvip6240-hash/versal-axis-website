import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  Plus, FileText, Briefcase, Clock, ShieldCheck, ArrowRight,
  CheckCircle2, AlertCircle, ChevronRight, Zap, Building2, UserCheck, Layers
} from 'lucide-react';

export const RequesterDashboard: React.FC = () => {
  const { requests, proposals, projects, notifications } = useDemo();
  const navigate = useNavigate();

  const activeProjects = projects.filter(p => p.status !== 'CLOSED');
  const pendingProposals = proposals.filter(p => p.status === 'PENDING');
  const awaitingPaymentCount = projects.filter(p => p.paymentStatus === 'AWAITING UPFRONT' || p.paymentStatus === 'BALANCE DUE').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'QUOTATION RECEIVED':
        return <span className="status-pill warning"><Clock size={12} /> Quotation Received</span>;
      case 'AWAITING PAYMENT':
      case 'BALANCE PAYMENT DUE':
        return <span className="status-pill danger"><AlertCircle size={12} /> Payment Due</span>;
      case 'CONFIRMED':
      case 'SCHEDULED':
        return <span className="status-pill info"><ShieldCheck size={12} /> Confirmed</span>;
      case 'WORK STARTED':
      case 'IN PROGRESS':
        return <span className="status-pill active"><Zap size={12} /> Work In Progress</span>;
      case 'COMPLETED':
      case 'PAYMENT COMPLETED':
        return <span className="status-pill success"><CheckCircle2 size={12} /> Completed</span>;
      case 'CLOSED':
        return <span className="status-pill neutral">Closed</span>;
      default:
        return <span className="status-pill info">{status}</span>;
    }
  };

  return (
    <div className="req-dashboard-page">
      <div className="container">
        {/* DASHBOARD HEADER */}
        <div className="dash-header">
          <div className="dash-welcome">
            <div className="dash-co-badge">
              <Building2 size={14} /> Evergreen Buildings
            </div>
            <h1>Welcome back, Alex Morgan</h1>
            <p>Manage your commercial property service requests, proposals and active projects in real time.</p>
          </div>

          <div className="dash-header-actions">
            <Link to="/requester/create-request" className="btn-primary pill dash-create-cta magnetic-btn">
              <Plus size={18} />
              <span>Create Request</span>
            </Link>
          </div>
        </div>

        {/* STATS CARDS GRID */}
        <div className="dash-stats-grid">
          <div className="dash-stat-card" onClick={() => navigate('/requester/requests')}>
            <div className="stat-icon-wrap blue"><FileText size={22} /></div>
            <div className="stat-details">
              <span className="stat-num">{requests.length}</span>
              <span className="stat-lbl">Total Requests</span>
            </div>
          </div>

          <div className="dash-stat-card" onClick={() => navigate('/requester/projects')}>
            <div className="stat-icon-wrap green"><Briefcase size={22} /></div>
            <div className="stat-details">
              <span className="stat-num">{activeProjects.length}</span>
              <span className="stat-lbl">Active Projects</span>
            </div>
          </div>

          <div className="dash-stat-card" onClick={() => navigate('/requester/requests')}>
            <div className="stat-icon-wrap amber"><Clock size={22} /></div>
            <div className="stat-details">
              <span className="stat-num">{pendingProposals.length}</span>
              <span className="stat-lbl">Pending Proposals</span>
            </div>
          </div>

          <div className="dash-stat-card" onClick={() => navigate('/requester/projects')}>
            <div className="stat-icon-wrap teal"><ShieldCheck size={22} /></div>
            <div className="stat-details">
              <span className="stat-num">{awaitingPaymentCount}</span>
              <span className="stat-lbl">Action Required</span>
            </div>
          </div>
        </div>

        {/* MAIN DASHBOARD CONTENT GRID */}
        <div className="dash-main-grid">
          {/* LEFT COLUMN: ACTIVE PROJECTS & PROPOSALS */}
          <div className="dash-left-col">
            {/* PENDING PROPOSALS BANNER IF ANY */}
            {pendingProposals.length > 0 && (
              <div className="dash-proposal-alert-card">
                <div className="prop-alert-header">
                  <div className="prop-badge"><Clock size={14} /> NEW QUOTATION RECEIVED</div>
                  <span className="prop-amount">£{pendingProposals[0].totalQuote.toLocaleString()}</span>
                </div>
                <h3>{pendingProposals[0].projectTitle}</h3>
                <p>Provider <strong>{pendingProposals[0].providerName}</strong> submitted a proposal for {pendingProposals[0].siteName}.</p>
                <div className="prop-alert-actions">
                  <Link to={`/requester/proposal/${pendingProposals[0].id}`} className="btn-primary pill">
                    Review Proposal <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )}

            {/* ACTIVE PROJECTS SECTION */}
            <div className="dash-section-box">
              <div className="dash-box-header">
                <h3>Active Projects</h3>
                <Link to="/requester/projects" className="link-more">View All ({projects.length})</Link>
              </div>

              {projects.length === 0 ? (
                <div className="dash-empty-box">
                  <Briefcase size={32} />
                  <p>No active projects yet. Submit a request to get started.</p>
                  <Link to="/requester/create-request" className="btn-primary pill">Create Request</Link>
                </div>
              ) : (
                <div className="dash-proj-list">
                  {projects.map(proj => (
                    <div key={proj.id} className="dash-proj-card" onClick={() => navigate(`/requester/project/${proj.id}`)}>
                      <div className="proj-card-top">
                        <div>
                          <span className="proj-id-tag">{proj.id}</span>
                          <h4 className="proj-title">{proj.projectName}</h4>
                        </div>
                        {getStatusBadge(proj.status)}
                      </div>
                      <div className="proj-meta">
                        <span>Provider: <strong>{proj.providerName}</strong></span>
                        <span>Value: <strong>£{proj.totalValue.toLocaleString()}</strong></span>
                        <span>Date: <strong>{proj.scheduledDate}</strong></span>
                      </div>
                      <div className="proj-footer">
                        <span className="proj-location">{proj.location}</span>
                        <span className="btn-link-sm">Track Details <ChevronRight size={14} /></span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RECENT REQUESTS SECTION */}
            <div className="dash-section-box">
              <div className="dash-box-header">
                <h3>Recent Requests</h3>
                <Link to="/requester/requests" className="link-more">View All ({requests.length})</Link>
              </div>

              <div className="dash-req-table">
                {requests.map(req => (
                  <div key={req.id} className="dash-req-row" onClick={() => navigate(`/requester/requests`)}>
                    <div className="req-col-id">
                      <strong>{req.id}</strong>
                      <span className="req-date">{req.submittedDate}</span>
                    </div>
                    <div className="req-col-service">
                      <span className="service-name">{req.service}</span>
                      <span className="req-title">{req.projectTitle}</span>
                    </div>
                    <div className="req-col-status">
                      {getStatusBadge(req.status)}
                    </div>
                    <div className="req-col-arrow">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: RECENT ACTIVITY & RECOMMENDED SERVICES */}
          <div className="dash-right-col">
            {/* RECENT ACTIVITY */}
            <div className="dash-section-box">
              <div className="dash-box-header">
                <h3>Recent Activity</h3>
              </div>
              <div className="dash-activity-stream">
                {notifications.slice(0, 5).map(n => (
                  <div key={n.id} className="activity-item" onClick={() => navigate(n.link)}>
                    <div className="activity-dot" />
                    <div className="activity-content">
                      <strong>{n.title}</strong>
                      <p>{n.message}</p>
                      <span className="activity-time">{n.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RECOMMENDED SERVICES */}
            <div className="dash-section-box">
              <div className="dash-box-header">
                <h3>Recommended Services</h3>
              </div>
              <div className="dash-rec-services">
                {[
                  { name: 'HVAC Maintenance', category: 'HVAC & AC', desc: 'Quarterly diagnostics & filter check' },
                  { name: 'Commercial Cleaning', category: 'Cleaning', desc: 'Deep sanitation & office maintenance' },
                  { name: 'Electrical Inspection', category: 'Electrical', desc: 'EICR testing & safety compliance' },
                  { name: 'Plumbing Service', category: 'Plumbing', desc: 'Boiler checks & emergency response' },
                ].map((s, i) => (
                  <div key={i} className="rec-service-card" onClick={() => navigate('/requester/create-request')}>
                    <div className="rec-svc-header">
                      <strong>{s.name}</strong>
                      <span className="rec-tag">{s.category}</span>
                    </div>
                    <p>{s.desc}</p>
                    <span className="rec-action-link">Request Service <Plus size={12} /></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
