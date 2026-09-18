import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  CheckCircle2, ArrowRight, ArrowLeft, Upload, MapPin,
  Calendar, Clock, FileText, ShieldAlert, Check, Layers, AlertCircle, Edit3
} from 'lucide-react';

const SERVICES = [
  'Office Cleaning',
  'HVAC & AC',
  'Electrical',
  'Plumbing',
  'Security',
  'Landscaping',
  'Painting',
  'Pest Control',
  'General Maintenance',
];

const PRIORITIES = ['Low', 'Medium', 'High', 'Emergency'] as const;

export const CreateRequestPage: React.FC = () => {
  const { createRequest } = useDemo();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [submittedReqId, setSubmittedReqId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    service: 'HVAC & AC',
    requirement: 'Full quarterly maintenance, filter replacements and diagnostic checks for our office property.',
    priority: 'High' as 'Low' | 'Medium' | 'High' | 'Emergency',

    projectTitle: 'Office HVAC Maintenance & Repair',
    projectDescription: 'Complete system servicing across 4 floors including filter replacement and thermostat calibration.',
    existingProvider: 'None',

    siteName: 'Evergreen Tower',
    address: '45 Deansgate',
    street: 'Deansgate',
    city: 'Manchester',
    country: 'United Kingdom',
    contactName: 'Alex Morgan',
    phone: '+44 161 892 4000',
    email: 'demo@fixora.com',
    accessInstructions: 'Report to Reception desk on Ground Floor for security badge access.',

    preferredDate: '2026-09-22',
    preferredTime: 'Morning (08:00 - 12:00)',
    flexibility: '± 1 Day',
    duration: '1 Day',

    attachments: ['site_layout.pdf', 'hvac_unit_photo.jpg'],
  });

  const [uploadedFiles, setUploadedFiles] = useState<string[]>(['site_layout.pdf', 'hvac_unit_photo.jpg']);

  const handleChange = (field: string, val: any) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      setUploadedFiles(prev => [...prev, fileName]);
      setFormData(prev => ({ ...prev, attachments: [...prev.attachments, fileName] }));
    }
  };

  const handleSubmit = () => {
    const newReqId = createRequest(formData);
    setSubmittedReqId(newReqId);
  };

  return (
    <div className="create-request-page">
      <div className="container">
        {/* HEADER */}
        <div className="cr-header">
          <span className="kicker">NEW SERVICE REQUIREMENT</span>
          <h2>Create Property Service Request</h2>
          <p>Complete the step-by-step form to match with a trusted service partner within the VERSAL AXIS network.</p>
        </div>

        {/* STEP PROGRESS INDICATOR */}
        <div className="cr-progress-bar">
          {[
            { num: 1, label: 'Service' },
            { num: 2, label: 'Project' },
            { num: 3, label: 'Location' },
            { num: 4, label: 'Schedule' },
            { num: 5, label: 'Attachments' },
            { num: 6, label: 'Review' },
          ].map(s => (
            <div
              key={s.num}
              className={`cr-step-pill ${step === s.num ? 'active' : step > s.num ? 'completed' : ''}`}
              onClick={() => step > s.num && setStep(s.num)}
            >
              <div className="pill-num">
                {step > s.num ? <Check size={12} /> : s.num}
              </div>
              <span className="pill-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* FORM CONTAINER */}
        {submittedReqId ? (
          <div className="cr-form-container confirmation-page-box" style={{ maxWidth: '840px', margin: '0 auto', padding: '48px 40px' }}>
            {/* 1. SUCCESS HEADER */}
            <div className="conf-header" style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', marginBottom: 20 }}>
                <CheckCircle2 size={48} color="#10B981" />
              </div>

              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>
                RFQ Submitted Successfully
              </h2>

              <p style={{ fontSize: '16px', color: 'var(--ink-soft)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.6 }}>
                Your request has been successfully submitted and is now being reviewed by our provider network.
              </p>
            </div>

            {/* 2. REQUEST DETAILS & STATUS GRID */}
            <div className="conf-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: 40 }}>
              {/* REQUEST DETAILS CARD */}
              <div style={{ background: 'var(--cream)', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid rgba(14, 23, 21, 0.08)', textAlign: 'left' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, marginBottom: 16, color: 'var(--ink)', borderBottom: '1px solid rgba(14, 23, 21, 0.06)', paddingBottom: 10 }}>
                  Request Details
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--ink-xsoft)' }}>Request ID:</span>
                    <strong style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>{submittedReqId}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--ink-xsoft)' }}>Service:</span>
                    <strong style={{ color: 'var(--teal)' }}>{formData.service}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--ink-xsoft)' }}>Project:</span>
                    <strong style={{ color: 'var(--ink)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '180px' }}>{formData.projectTitle}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--ink-xsoft)' }}>Location:</span>
                    <strong style={{ color: 'var(--ink)' }}>{formData.siteName}, {formData.city}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--ink-xsoft)' }}>Schedule:</span>
                    <strong style={{ color: 'var(--ink)' }}>{formData.preferredDate} ({formData.preferredTime})</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--ink-xsoft)' }}>Priority:</span>
                    <strong style={{ color: 'var(--ink)' }}>{formData.priority}</strong>
                  </div>
                </div>
              </div>

              {/* STATUS CARD */}
              <div style={{ background: 'var(--cream)', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid rgba(14, 23, 21, 0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', color: 'var(--ink-xsoft)', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
                    CURRENT STATUS
                  </span>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(59, 130, 246, 0.12)', color: '#2563EB', padding: '6px 14px', borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 700, marginBottom: 16 }}>
                    <CheckCircle2 size={14} /> Request Submitted
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                    We'll notify you when a provider submits a quotation.
                  </p>
                </div>

                <div style={{ background: 'rgba(20, 99, 88, 0.06)', borderRadius: 'var(--radius-sm)', padding: '12px 14px', fontSize: '12px', color: 'var(--teal)', fontWeight: 600, marginTop: 16 }}>
                  💡 Tip: Check back or wait for live notifications.
                </div>
              </div>
            </div>

            {/* 4. WHAT HAPPENS NEXT? */}
            <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '28px 24px', border: '1px solid rgba(14, 23, 21, 0.08)', marginBottom: 40, textAlign: 'left' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, marginBottom: 20, color: 'var(--ink)' }}>
                What Happens Next?
              </h4>
              <div className="next-steps-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bright-teal)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, flexShrink: 0, marginTop: 2 }}>
                    ✓
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)', display: 'block' }}>RFQ Submitted</strong>
                    <span style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>Your request has been received.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(14, 23, 21, 0.08)', color: 'var(--ink-xsoft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>
                    ○
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)', display: 'block' }}>Provider Review</strong>
                    <span style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>Trusted providers will review your requirement.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(14, 23, 21, 0.08)', color: 'var(--ink-xsoft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>
                    ○
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)', display: 'block' }}>Quotation Received</strong>
                    <span style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>You'll receive a notification when a quotation is available.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(14, 23, 21, 0.08)', color: 'var(--ink-xsoft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>
                    ○
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)', display: 'block' }}>Review & Accept</strong>
                    <span style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>Review the quotation and decide whether to accept it.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(14, 23, 21, 0.08)', color: 'var(--ink-xsoft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>
                    ○
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)', display: 'block' }}>Payment & Project Start</strong>
                    <span style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>After accepting, complete the required upfront payment and the project will be confirmed.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. ACTION BUTTONS */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <button
                type="button"
                className="btn-primary pill magnetic-btn"
                style={{ padding: '14px 40px', fontSize: '15px' }}
                onClick={() => navigate('/requester/dashboard')}
              >
                Go to Dashboard <ArrowRight size={16} style={{ marginLeft: 6 }} />
              </button>

              <button
                type="button"
                className="btn-ghost pill"
                style={{ fontSize: '14px', color: 'var(--teal)', fontWeight: 600 }}
                onClick={() => navigate('/requester/requests')}
              >
                View Request
              </button>
            </div>
          </div>
        ) : (
          <div className="cr-form-container">
            {/* STEP 01 — SERVICE REQUEST */}
            {step === 1 && (
              <div className="cr-step-content">
                <h3>STEP 01 — SERVICE REQUEST</h3>
              <p className="step-sub">Select the service category and priority level for your property.</p>

              <div className="form-group">
                <label>Select Service Category</label>
                <div className="service-options-grid">
                  {SERVICES.map(svc => (
                    <div
                      key={svc}
                      className={`svc-option-card ${formData.service === svc ? 'selected' : ''}`}
                      onClick={() => handleChange('service', svc)}
                    >
                      <span className="svc-opt-name">{svc}</span>
                      {formData.service === svc && <CheckCircle2 size={16} className="svc-check" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Priority Level</label>
                <div className="priority-options-grid">
                  {PRIORITIES.map(p => (
                    <button
                      key={p}
                      type="button"
                      className={`priority-btn ${p.toLowerCase()} ${formData.priority === p ? 'selected' : ''}`}
                      onClick={() => handleChange('priority', p)}
                    >
                      {p === 'Emergency' && <ShieldAlert size={14} />}
                      <span>{p}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Requirement Description</label>
                <textarea
                  rows={4}
                  value={formData.requirement}
                  onChange={e => handleChange('requirement', e.target.value)}
                  placeholder="Describe your property maintenance requirement in detail..."
                  required
                />
              </div>

              <div className="cr-btn-row">
                <div />
                <button type="button" className="btn-primary pill" onClick={() => setStep(2)}>
                  Next: Project Info <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 02 — PROJECT INFORMATION */}
          {step === 2 && (
            <div className="cr-step-content">
              <h3>STEP 02 — PROJECT INFORMATION</h3>
              <p className="step-sub">Provide general project overview details.</p>

              <div className="form-group">
                <label>Project Title</label>
                <input
                  type="text"
                  value={formData.projectTitle}
                  onChange={e => handleChange('projectTitle', e.target.value)}
                  placeholder="e.g. Office HVAC Quarterly Maintenance"
                  required
                />
              </div>

              <div className="form-group">
                <label>Project Description</label>
                <textarea
                  rows={4}
                  value={formData.projectDescription}
                  onChange={e => handleChange('projectDescription', e.target.value)}
                  placeholder="Detailed breakdown of work scope, floor area, or technical specs..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Existing Service Provider (Optional)</label>
                <input
                  type="text"
                  value={formData.existingProvider}
                  onChange={e => handleChange('existingProvider', e.target.value)}
                  placeholder="e.g. Previous provider name or 'None'"
                />
              </div>

              <div className="cr-btn-row">
                <button type="button" className="btn-ghost pill" onClick={() => setStep(1)}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button type="button" className="btn-primary pill" onClick={() => setStep(3)}>
                  Next: Location <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 03 — SERVICE LOCATION */}
          {step === 3 && (
            <div className="cr-step-content">
              <h3>STEP 03 — SERVICE LOCATION</h3>
              <p className="step-sub">Specify where the property service will take place.</p>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Site / Building Name</label>
                  <input
                    type="text"
                    value={formData.siteName}
                    onChange={e => handleChange('siteName', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Street Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={e => handleChange('address', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => handleChange('city', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={e => handleChange('country', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label>Site Contact Name</label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={e => handleChange('contactName', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Site Access Instructions</label>
                <textarea
                  rows={2}
                  value={formData.accessInstructions}
                  onChange={e => handleChange('accessInstructions', e.target.value)}
                  placeholder="e.g. Loading bay access, reception sign-in, keycode..."
                />
              </div>

              {/* MAP PLACEHOLDER */}
              <div className="map-placeholder-box">
                <MapPin size={24} color="#146358" />
                <span>Map Location Preview: 45 Deansgate, Manchester M3 2AY</span>
              </div>

              <div className="cr-btn-row">
                <button type="button" className="btn-ghost pill" onClick={() => setStep(2)}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button type="button" className="btn-primary pill" onClick={() => setStep(4)}>
                  Next: Schedule <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 04 — SCHEDULE */}
          {step === 4 && (
            <div className="cr-step-content">
              <h3>STEP 04 — SCHEDULE</h3>
              <p className="step-sub">Define preferred service timelines and flexibility.</p>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Preferred Service Date</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={e => handleChange('preferredDate', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Preferred Time of Day</label>
                  <select
                    value={formData.preferredTime}
                    onChange={e => handleChange('preferredTime', e.target.value)}
                  >
                    <option value="Morning (08:00 - 12:00)">Morning (08:00 - 12:00)</option>
                    <option value="Afternoon (12:00 - 16:00)">Afternoon (12:00 - 16:00)</option>
                    <option value="Evening (16:00 - 20:00)">Evening (16:00 - 20:00)</option>
                  </select>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Schedule Flexibility</label>
                  <select
                    value={formData.flexibility}
                    onChange={e => handleChange('flexibility', e.target.value)}
                  >
                    <option value="Exact Date Only">Exact Date Only</option>
                    <option value="± 1 Day">± 1 Day</option>
                    <option value="± 3 Days">± 3 Days</option>
                    <option value="Flexible within Week">Flexible within Week</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Estimated Job Duration</label>
                  <select
                    value={formData.duration}
                    onChange={e => handleChange('duration', e.target.value)}
                  >
                    <option value="Half Day (4 hrs)">Half Day (4 hrs)</option>
                    <option value="1 Day">1 Full Day</option>
                    <option value="2-3 Days">2-3 Days</option>
                    <option value="Ongoing / Recurring">Ongoing / Recurring</option>
                  </select>
                </div>
              </div>

              <div className="cr-btn-row">
                <button type="button" className="btn-ghost pill" onClick={() => setStep(3)}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button type="button" className="btn-primary pill" onClick={() => setStep(5)}>
                  Next: Attachments <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 05 — ATTACHMENTS */}
          {step === 5 && (
            <div className="cr-step-content">
              <h3>STEP 05 — ATTACHMENTS</h3>
              <p className="step-sub">Upload relevant site photos, specification PDFs or floor plans.</p>

              <div className="upload-dropzone">
                <Upload size={36} color="#146358" />
                <p><strong>Click to upload</strong> or drag & drop files here</p>
                <span>Supports JPG, PNG, PDF (max 10MB)</span>
                <input type="file" onChange={handleFileUpload} className="hidden-file-input" />
              </div>

              {uploadedFiles.length > 0 && (
                <div className="uploaded-files-list">
                  <label>Uploaded Files ({uploadedFiles.length})</label>
                  <div className="file-chips-grid">
                    {uploadedFiles.map((file, i) => (
                      <div key={i} className="file-chip">
                        <FileText size={14} />
                        <span>{file}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="cr-btn-row">
                <button type="button" className="btn-ghost pill" onClick={() => setStep(4)}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button type="button" className="btn-primary pill" onClick={() => setStep(6)}>
                  Next: Review Request <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 06 — REVIEW REQUEST */}
          {step === 6 && (
            <div className="cr-step-content">
              <h3>STEP 06 — REVIEW REQUEST</h3>
              <p className="step-sub">Verify your information before submitting to the VERSAL AXIS network.</p>

              <div className="review-summary-card">
                <div className="review-section">
                  <div className="review-sec-head">
                    <h4>Service & Priority</h4>
                    <button className="edit-step-btn" onClick={() => setStep(1)}><Edit3 size={12} /> Edit</button>
                  </div>
                  <div className="review-grid">
                    <div><strong>Category:</strong> {formData.service}</div>
                    <div><strong>Priority:</strong> {formData.priority}</div>
                    <div className="full-width"><strong>Requirement:</strong> {formData.requirement}</div>
                  </div>
                </div>

                <div className="review-section">
                  <div className="review-sec-head">
                    <h4>Project Information</h4>
                    <button className="edit-step-btn" onClick={() => setStep(2)}><Edit3 size={12} /> Edit</button>
                  </div>
                  <div className="review-grid">
                    <div><strong>Title:</strong> {formData.projectTitle}</div>
                    <div><strong>Existing Provider:</strong> {formData.existingProvider}</div>
                    <div className="full-width"><strong>Description:</strong> {formData.projectDescription}</div>
                  </div>
                </div>

                <div className="review-section">
                  <div className="review-sec-head">
                    <h4>Location & Contact</h4>
                    <button className="edit-step-btn" onClick={() => setStep(3)}><Edit3 size={12} /> Edit</button>
                  </div>
                  <div className="review-grid">
                    <div><strong>Site:</strong> {formData.siteName}</div>
                    <div><strong>Address:</strong> {formData.address}, {formData.city}</div>
                    <div><strong>Contact:</strong> {formData.contactName} ({formData.phone})</div>
                    <div><strong>Access:</strong> {formData.accessInstructions}</div>
                  </div>
                </div>

                <div className="review-section">
                  <div className="review-sec-head">
                    <h4>Schedule & Attachments</h4>
                    <button className="edit-step-btn" onClick={() => setStep(4)}><Edit3 size={12} /> Edit</button>
                  </div>
                  <div className="review-grid">
                    <div><strong>Preferred Date:</strong> {formData.preferredDate} ({formData.preferredTime})</div>
                    <div><strong>Duration:</strong> {formData.duration} ({formData.flexibility})</div>
                    <div><strong>Attachments:</strong> {uploadedFiles.join(', ')}</div>
                  </div>
                </div>
              </div>

              <div className="cr-btn-row">
                <button type="button" className="btn-ghost pill" onClick={() => setStep(5)}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button type="button" className="btn-primary pill highlight-submit" onClick={handleSubmit}>
                  Submit Request <CheckCircle2 size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);
};
