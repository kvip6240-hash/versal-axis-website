import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { Shield, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';

export const DemoLoginPage: React.FC = () => {
  const { login } = useDemo();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/requester/dashboard';
  const isBooking = searchParams.get('action') === 'book' || redirectUrl.includes('create-request');

  const [email, setEmail] = useState('demo@fixora.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate(redirectUrl);
    } else {
      setError('Invalid credentials. Use demo@fixora.com / demo123');
    }
  };

  const handleQuickLogin = () => {
    login('demo@fixora.com', 'demo123');
    navigate(redirectUrl);
  };

  return (
    <div className="demo-login-page">
      <div className="container">
        <div className="demo-login-card">
          <div className="demo-login-header">
            <div className="demo-login-badge">
              <span className="dot" /> {isBooking ? 'SERVICE BOOKING ACCESS' : 'DEMO PORTAL'}
            </div>
            <h2>{isBooking ? 'Sign In to Book a Service' : 'Requester Demo Sign In'}</h2>
            <p>
              {isBooking
                ? 'Sign in to create your property service request, review live quotations, and track jobs from start to finish.'
                : 'Experience the complete Versal Axis property-service journey from request to completion.'}
            </p>
          </div>

          <div className="demo-credentials-box">
            <div className="cred-title">
              <UserCheck size={16} /> Demo Requester Account
            </div>
            <div className="cred-grid">
              <div><strong>Email:</strong> demo@fixora.com</div>
              <div><strong>Password:</strong> demo123</div>
              <div><strong>Company:</strong> Evergreen Buildings</div>
              <div><strong>User:</strong> Alex Morgan (Requester)</div>
            </div>
          </div>

          {error && <div className="demo-error-msg">{error}</div>}

          <form onSubmit={handleSubmit} className="demo-login-form">
            <div className="form-group">
              <label>Work Email</label>
              <div className="input-with-icon">
                <Mail size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="demo@fixora.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary pill full-width magnetic-btn">
              {isBooking ? 'Sign In & Continue Booking' : 'Sign In to Requester Dashboard'} <ArrowRight size={16} />
            </button>
          </form>

          <div className="demo-quick-action">
            <span className="divider-text">OR</span>
            <button className="btn-ghost full-width quick-demo-btn" onClick={handleQuickLogin}>
              {isBooking ? '1-Click Launch & Book Service' : '1-Click Instant Demo Launch'}
            </button>
            {isBooking && (
              <button
                type="button"
                className="btn-ghost full-width"
                style={{ marginTop: 10, border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 13, textDecoration: 'underline', cursor: 'pointer' }}
                onClick={() => navigate('/requester/create-request')}
              >
                Or continue to Booking without signing in →
              </button>
            )}
          </div>

          <div className="demo-login-footer">
            <Shield size={14} />
            <span>No real backend or payment required. Persistent in browser storage.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
