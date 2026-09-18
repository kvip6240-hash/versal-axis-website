import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* Col 1 — Brand */}
        <div className="footer-col brand-col">
          <Link to="/" className="nav-brand light" style={{ textDecoration: 'none' }}>
            <img src="/fixora-logo.png" alt="VERSAL AXIS" className="logo-img" />
            VERSAL AXIS
          </Link>
          <p className="footer-tagline">
            The complete B2B service management platform. Connecting businesses with verified service providers across the UK.
          </p>
        </div>

        {/* Col 2 — Company */}
        <div className="footer-col links-col">
          <h4>Company</h4>
          <Link to="/why-fixora">About Us</Link>
          <Link to="/customers">Success Stories</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Col 3 — Industries */}
        <div className="footer-col links-col">
          <h4>Industries</h4>
          <Link to="/industries">Corporate Facilities</Link>
          <Link to="/industries">Industrial & Logistics</Link>
          <Link to="/industries">Healthcare & Clinics</Link>
          <Link to="/industries">Retail & Chains</Link>
        </div>

        {/* Col 4 — Solutions */}
        <div className="footer-col links-col">
          <h4>Solutions</h4>
          <Link to="/for-businesses">For Businesses</Link>
          <Link to="/for-providers">For Service Providers</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        {/* Col 5 — Contact */}
        <div className="footer-col links-col">
          <h4>Get In Touch</h4>
          <a href="mailto:hello@fixora.com" className="footer-contact-item">
            <Mail size={14} />
            hello@fixora.com
          </a>
          <a href="tel:+441234567890" className="footer-contact-item">
            <Phone size={14} />
            +44 (0) 123 456 7890
          </a>
          <a href="#" className="footer-contact-item">
            <MessageCircle size={14} />
            WhatsApp Support
          </a>
        </div>
      </div>

      <div className="footer-bottom-bar container">
        <span>© {year} VERSAL AXIS Platform Ltd. All rights reserved.</span>
        <div className="footer-legal-links">
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
