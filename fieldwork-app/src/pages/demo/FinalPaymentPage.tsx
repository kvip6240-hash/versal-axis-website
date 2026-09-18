import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  CreditCard, ShieldCheck, Lock, CheckCircle2, ArrowRight,
  ChevronLeft, Loader2
} from 'lucide-react';

export const FinalPaymentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, payBalance } = useDemo();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const [cardData, setCardData] = useState({
    name: 'Alex Morgan',
    number: '4532 •••• •••• 8821',
    expiry: '12/28',
    cvv: '884',
  });

  const project = projects.find(p => p.id === id) || projects[0];

  if (!project) {
    return <div className="container" style={{ padding: '100px 0' }}>Project not found</div>;
  }

  const handleFinalPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      payBalance(project.id, cardData);
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        navigate(`/requester/review/${project.id}`);
      }, 1200);
    }, 1500);
  };

  return (
    <div className="payment-page-root">
      <div className="container">
        <button className="back-link-btn" onClick={() => navigate(`/requester/completion/${project.id}`)}>
          <ChevronLeft size={16} /> Back to Completion Details
        </button>

        <div className="payment-layout">
          {/* LEFT SUMMARY */}
          <div className="pay-summary-col">
            <div className="pay-card-box">
              <span className="kicker">FINAL MILESTONE PAYMENT</span>
              <h2>Pay 40% Remaining Balance</h2>
              <p className="pay-sub">
                Work has been marked as completed by PrimeCare Facilities Ltd. Pay remaining balance to finalize project and leave a review.
              </p>

              <div className="pay-proj-meta">
                <div><strong>Project ID:</strong> {project.id}</div>
                <div><strong>Provider:</strong> {project.providerName}</div>
                <div><strong>Service:</strong> {project.service}</div>
              </div>

              <div className="pay-breakdown-box">
                <div className="pay-row">
                  <span>Total Project Value</span>
                  <strong>£{project.totalValue.toLocaleString()}</strong>
                </div>
                <div className="pay-row muted">
                  <span>60% Upfront Paid</span>
                  <span>£{project.upfrontAmount.toLocaleString()} ✓</span>
                </div>
                <div className="pay-row highlight">
                  <span>40% Remaining Balance Due</span>
                  <strong>£{project.balanceAmount.toLocaleString()}</strong>
                </div>
              </div>

              <div className="pay-guarantee-note">
                <ShieldCheck size={18} color="#10B981" />
                <span>Versal Axis Final Release: Final settlement is released to provider upon payment.</span>
              </div>
            </div>
          </div>

          {/* RIGHT CARD FORM */}
          <div className="pay-form-col">
            <div className="pay-card-box">
              <div className="pay-form-header">
                <h3>Final Settlement Payment</h3>
                <CreditCard size={20} />
              </div>

              {success ? (
                <div className="payment-success-msg">
                  <CheckCircle2 size={48} color="#10B981" />
                  <h3>Final Payment Successful!</h3>
                  <p>Transaction ID: TXN-BAL-{Math.floor(100000 + Math.random() * 900000)}</p>
                  <span>Redirecting to Provider Review...</span>
                </div>
              ) : (
                <form onSubmit={handleFinalPayment} className="pay-card-form">
                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={e => setCardData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Card Number (Demo)</label>
                    <input
                      type="text"
                      value={cardData.number}
                      onChange={e => setCardData(prev => ({ ...prev, number: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={e => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>CVV Code</label>
                      <input
                        type="password"
                        value={cardData.cvv}
                        onChange={e => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="demo-pay-notice">
                    <Lock size={14} />
                    <span>Demo mode — no real money charged.</span>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary pill full-width pay-submit-btn magnetic-btn"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Finalizing Settlement...
                      </>
                    ) : (
                      <>
                        Pay £{project.balanceAmount.toLocaleString()} Balance <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
