import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  User, Building2, Mail, Phone, MapPin, Shield, Bell, Lock,
  RotateCcw, Check, AlertTriangle, X
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { resetDemo } = useDemo();
  const [showResetModal, setShowResetModal] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Alex Morgan',
    role: 'Requester',
    company: 'Evergreen Buildings',
    companyReg: 'UK-892401-B',
    email: 'demo@fixora.com',
    phone: '+44 161 892 4000',
    address: '45 Deansgate, Manchester M3 2AY, UK',
    emailNotifs: true,
    smsNotifs: true,
    proposalAlerts: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const confirmReset = () => {
    setShowResetModal(false);
    resetDemo();
  };

  return (
    <div className="profile-page-root">
      <div className="container">
        <div className="page-head-row">
          <div>
            <span className="kicker">ACCOUNT & PREFERENCES</span>
            <h2>Requester Profile</h2>
            <p>Manage personal information, company specifications and demo settings.</p>
          </div>
        </div>

        <div className="profile-layout-grid">
          {/* LEFT COLUMN: USER AVATAR & QUICK STATS */}
          <div className="prof-left-col">
            <div className="prof-card-box user-summary-card">
              <div className="large-avatar">AM</div>
              <h3>Alex Morgan</h3>
              <span className="user-role-badge">Requester Account</span>
              <span className="user-co-lbl"><Building2 size={14} /> Evergreen Buildings</span>

              <div className="user-quick-meta">
                <div><strong>Email:</strong> demo@fixora.com</div>
                <div><strong>Phone:</strong> +44 161 892 4000</div>
                <div><strong>Status:</strong> Active Demo Session</div>
              </div>
            </div>

            <div className="prof-card-box demo-settings-card">
              <h3>Demo Management</h3>
              <p>Reset all demo requests, proposals, payments and projects to restart testing.</p>

              <button className="btn-ghost pill full-width reset-demo-btn" onClick={() => setShowResetModal(true)}>
                <RotateCcw size={15} /> Reset Demo Journey
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: FORM TABS */}
          <div className="prof-right-col">
            <form onSubmit={handleSave} className="prof-card-box">
              {savedSuccess && (
                <div className="save-success-alert">
                  <Check size={16} /> Profile settings updated successfully!
                </div>
              )}

              {/* PERSONAL INFO */}
              <div className="prof-form-section">
                <h3>Personal Information</h3>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Role / Position</label>
                    <input
                      type="text"
                      value={profile.role}
                      onChange={e => setProfile(prev => ({ ...prev, role: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Work Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={e => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={e => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* COMPANY INFO */}
              <div className="prof-form-section">
                <h3>Company Information</h3>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Company Name</label>
                    <input
                      type="text"
                      value={profile.company}
                      onChange={e => setProfile(prev => ({ ...prev, company: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Company Registration No.</label>
                    <input
                      type="text"
                      value={profile.companyReg}
                      onChange={e => setProfile(prev => ({ ...prev, companyReg: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Headquarters Address</label>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={e => setProfile(prev => ({ ...prev, address: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {/* NOTIFICATION PREFERENCES */}
              <div className="prof-form-section">
                <h3>Notification Preferences</h3>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={profile.emailNotifs}
                      onChange={e => setProfile(prev => ({ ...prev, emailNotifs: e.target.checked }))}
                    />
                    <span>Email notifications for quotation arrivals & milestone updates</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={profile.proposalAlerts}
                      onChange={e => setProfile(prev => ({ ...prev, proposalAlerts: e.target.checked }))}
                    />
                    <span>Instant proposal ready alerts</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={profile.smsNotifs}
                      onChange={e => setProfile(prev => ({ ...prev, smsNotifs: e.target.checked }))}
                    />
                    <span>SMS emergency service dispatches</span>
                  </label>
                </div>
              </div>

              <div className="prof-save-row">
                <button type="submit" className="btn-primary pill magnetic-btn">
                  Save Changes <Check size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RESET CONFIRMATION MODAL */}
        {showResetModal && (
          <div className="modal-backdrop" onClick={() => setShowResetModal(false)}>
            <div className="modal-card reset-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div className="warning-head">
                  <AlertTriangle size={24} color="#DC2626" />
                  <h3>Reset Demo Journey?</h3>
                </div>
                <button className="modal-close-btn" onClick={() => setShowResetModal(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body">
                <p>
                  This will clear all local demo state (requests, proposals, payments and projects) and reset the journey to the initial demo start state.
                </p>
              </div>

              <div className="modal-footer">
                <button className="btn-ghost pill" onClick={() => setShowResetModal(false)}>Cancel</button>
                <button className="btn-primary pill danger-btn" onClick={confirmReset}>
                  Confirm Reset Demo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
