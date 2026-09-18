import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  CheckCircle2, ShieldCheck, FileText, ArrowRight, Download,
  Building2, ChevronLeft, Image as ImageIcon, CreditCard
} from 'lucide-react';

export const CompletionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useDemo();
  const navigate = useNavigate();

  const project = projects.find(p => p.id === id) || projects[0];

  if (!project) {
    return <div className="container" style={{ padding: '100px 0' }}>Project not found</div>;
  }

  const needsBalance = !project.balancePaid && project.balanceAmount > 0;

  return (
    <div className="completion-page-root">
      <div className="container">
        <button className="back-link-btn" onClick={() => navigate(`/requester/project/${project.id}`)}>
          <ChevronLeft size={16} /> Back to Project Details
        </button>

        {/* COMPLETION HEADER */}
        <div className="completion-card-box">
          <div className="comp-head-top">
            <div className="comp-badge-success">
              <CheckCircle2 size={18} /> PROJECT COMPLETED BY PROVIDER
            </div>
            <span className="comp-date">Completed on 14 Sep 2026</span>
          </div>

          <h2>Completion Details & Verified Report</h2>
          <p className="comp-sub">
            PrimeCare Facilities Ltd has marked all work scope as completed and uploaded digital proof of service.
          </p>

          <div className="comp-meta-grid">
            <div><strong>Project ID:</strong> {project.id}</div>
            <div><strong>Provider:</strong> {project.providerName}</div>
            <div><strong>Service Category:</strong> {project.service}</div>
            <div><strong>Location:</strong> {project.location}</div>
          </div>
        </div>

        {/* FINAL PAYMENT BALANCE ACTION CARD IF APPLICABLE */}
        {needsBalance ? (
          <div className="balance-payment-card">
            <div className="bal-head">
              <CreditCard size={20} />
              <div>
                <h3>Remaining 40% Balance Payment Due (£{project.balanceAmount.toLocaleString()})</h3>
                <p>Total Project Value: £{project.totalValue.toLocaleString()} | Upfront Paid: £{project.upfrontAmount.toLocaleString()}</p>
              </div>
            </div>

            <button className="btn-primary pill magnetic-btn" onClick={() => navigate(`/requester/final-payment/${project.id}`)}>
              Pay Final Balance £{project.balanceAmount.toLocaleString()} <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="balance-paid-banner">
            <ShieldCheck size={20} color="#10B981" />
            <div>
              <strong>Payment Status: FULLY PAID</strong>
              <p>All upfront and final milestone payments have been received and verified.</p>
            </div>
            {project.status !== 'CLOSED' && (
              <button className="btn-primary pill" onClick={() => navigate(`/requester/review/${project.id}`)}>
                Rate & Review Provider <ArrowRight size={14} />
              </button>
            )}
          </div>
        )}

        {/* WORK SUMMARY & PROOF PHOTOS */}
        <div className="comp-body-grid">
          <div className="comp-left-col">
            <div className="comp-sec-box">
              <h3>Work Executed & Summary</h3>
              <p className="summary-text">
                {project.workSummary ||
                  'Full HVAC diagnostic test completed across 4 floors. 16 HEPA air filters replaced, condenser coils chemical flushed, thermostat units recalibrated, and full system airflow balanced to OEM parameters.'}
              </p>
            </div>

            <div className="comp-sec-box">
              <h3>Proof of Work Photos</h3>
              <div className="comp-photos-grid">
                {(project.completedPhotos || [
                  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80',
                  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
                ]).map((url, i) => (
                  <div key={i} className="comp-photo-item" style={{ backgroundImage: `url(${url})` }}>
                    <div className="photo-overlay"><ImageIcon size={20} /> Signed Completion Photo {i + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="comp-right-col">
            <div className="comp-sec-box">
              <h3>Completion Documentation</h3>
              <div className="doc-item-card">
                <FileText size={24} color="#146358" />
                <div className="doc-info">
                  <strong>Digital Work Report & Compliance Cert</strong>
                  <span>Versal_Axis_Completion_Cert_{project.id}.pdf (1.4 MB)</span>
                </div>
                <button className="doc-download-btn" onClick={() => alert('Demo PDF report downloaded!')}>
                  <Download size={16} />
                </button>
              </div>
            </div>

            <div className="comp-sec-box">
              <h3>Provider Sign-off</h3>
              <div className="provider-signoff-info">
                <Building2 size={20} color="#146358" />
                <div>
                  <strong>PrimeCare Facilities Ltd</strong>
                  <span className="sign-date">Verified Senior Lead Sign-off: Mark Davies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
