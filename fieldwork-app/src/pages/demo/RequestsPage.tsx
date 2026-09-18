import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import type { RequestItem } from '../../context/DemoContext';
import {
  FileText, Clock, ShieldCheck, Plus, ArrowRight, MapPin, Calendar,
  Building2, ChevronRight, AlertCircle, CheckCircle2, Zap, X
} from 'lucide-react';

export const RequestsPage: React.FC = () => {
  const { requests, proposals } = useDemo();
  const navigate = useNavigate();
  const [selectedReq, setSelectedReq] = useState<RequestItem | null>(null);

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
    <div className="req-list-page">
      <div className="container">
        {/* PAGE HEADER */}
        <div className="page-head-row">
          <div>
            <span className="kicker">PROPERTY REQUIREMENTS</span>
            <h2>Service Requests</h2>
            <p>Track all submitted requirements, quotations, and active service stages.</p>
          </div>
          <button className="btn-primary pill magnetic-btn" onClick={() => navigate('/requester/create-request')}>
            <Plus size={16} /> Create Request
          </button>
        </div>

        {/* REQUEST CARDS GRID */}
        <div className="requests-grid">
          {requests.map(req => {
            const matchingProp = proposals.find(p => p.requestId === req.id && p.status === 'PENDING');

            return (
              <div key={req.id} className="request-card" onClick={() => setSelectedReq(req)}>
                <div className="req-card-header">
                  <div className="req-id-wrap">
                    <span className="req-id">{req.id}</span>
                    <span className="req-date">{req.submittedDate}</span>
                  </div>
                  {getStatusBadge(req.status)}
                </div>

                <h3 className="req-card-title">{req.projectTitle}</h3>
                <p className="req-card-sub">{req.requirement}</p>

                <div className="req-card-meta">
                  <div><MapPin size={14} /> {req.siteName}, {req.city}</div>
                  <div><Calendar size={14} /> {req.preferredDate} ({req.preferredTime})</div>
                </div>

                {matchingProp && (
                  <div className="req-action-banner" onClick={(e) => { e.stopPropagation(); navigate(`/requester/proposal/${matchingProp.id}`); }}>
                    <span>Quotation Received (£{matchingProp.totalQuote.toLocaleString()})</span>
                    <span className="btn-link-sm">View Proposal <ArrowRight size={14} /></span>
                  </div>
                )}

                <div className="req-card-footer">
                  <span className="req-priority-tag">Priority: {req.priority}</span>
                  <span className="view-details-link">View Details <ChevronRight size={14} /></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* REQUEST DETAILS MODAL */}
        {selectedReq && (
          <div className="modal-backdrop" onClick={() => setSelectedReq(null)}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <span className="req-id-modal">{selectedReq.id}</span>
                  <h3>{selectedReq.projectTitle}</h3>
                </div>
                <button className="modal-close-btn" onClick={() => setSelectedReq(null)}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body">
                <div className="modal-status-bar">
                  <span>Current Status:</span>
                  {getStatusBadge(selectedReq.status)}
                </div>

                <div className="modal-detail-group">
                  <h4>Service Requirements</h4>
                  <div className="modal-grid-2">
                    <div><strong>Category:</strong> {selectedReq.service}</div>
                    <div><strong>Priority:</strong> {selectedReq.priority}</div>
                    <div className="full-width"><strong>Description:</strong> {selectedReq.requirement}</div>
                  </div>
                </div>

                <div className="modal-detail-group">
                  <h4>Location & Contact</h4>
                  <div className="modal-grid-2">
                    <div><strong>Site:</strong> {selectedReq.siteName}</div>
                    <div><strong>Address:</strong> {selectedReq.address}, {selectedReq.city}, {selectedReq.country}</div>
                    <div><strong>Contact:</strong> {selectedReq.contactName} ({selectedReq.phone})</div>
                    <div><strong>Email:</strong> {selectedReq.email}</div>
                    <div className="full-width"><strong>Access:</strong> {selectedReq.accessInstructions}</div>
                  </div>
                </div>

                <div className="modal-detail-group">
                  <h4>Schedule & Attachments</h4>
                  <div className="modal-grid-2">
                    <div><strong>Preferred Date:</strong> {selectedReq.preferredDate}</div>
                    <div><strong>Time Slot:</strong> {selectedReq.preferredTime}</div>
                    <div><strong>Duration:</strong> {selectedReq.duration}</div>
                    <div><strong>Flexibility:</strong> {selectedReq.flexibility}</div>
                    <div className="full-width"><strong>Attachments:</strong> {selectedReq.attachments.join(', ')}</div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-ghost pill" onClick={() => setSelectedReq(null)}>Close</button>
                {proposals.find(p => p.requestId === selectedReq.id && p.status === 'PENDING') && (
                  <button
                    className="btn-primary pill"
                    onClick={() => {
                      const prop = proposals.find(p => p.requestId === selectedReq.id);
                      if (prop) navigate(`/requester/proposal/${prop.id}`);
                    }}
                  >
                    View Proposal <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
