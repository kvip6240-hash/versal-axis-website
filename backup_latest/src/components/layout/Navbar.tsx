import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, X, Menu } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Industries', href: '/industries' },
  { label: 'Contact', href: '/contact' },
];

const solutionsLinks = [
  { label: 'For Businesses', href: '/for-businesses', desc: 'Manage all your facility services in one place' },
  { label: 'For Service Providers', href: '/for-providers', desc: 'Grow your service business with VERSAL AXIS' },
  { label: 'Why VERSAL AXIS', href: '/why-fixora', desc: 'The VERSAL AXIS advantage explained' },
  { label: 'Success Stories', href: '/customers', desc: 'Real results from real businesses' },
  { label: 'Careers', href: '/careers', desc: 'Join the VERSAL AXIS team' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close mobile on route change
  useEffect(() => { setMobileOpen(false); setMegaOpen(false); }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href.split('#')[0]) && href !== '/';
  };

  return (
    <>
      <nav className={`nav-pill ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-brand">
          <img src="/fixora-logo.png" alt="VERSAL AXIS" className="logo-img" />
          VERSAL AXIS
        </Link>

        <div className="nav-links">
          {navLinks.map(link => (
            link.href.startsWith('/#') ? (
              <a key={link.label} href={link.href} className={isActive(link.href) ? 'active' : ''}>
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.href} className={isActive(link.href) ? 'active' : ''}>
                {link.label}
              </Link>
            )
          ))}

          {/* Solutions mega-menu trigger */}
          <div className="nav-mega-wrapper" ref={megaRef}>
            <button
              className={`nav-mega-btn ${megaOpen ? 'open' : ''}`}
              onClick={() => setMegaOpen(v => !v)}
            >
              Solutions <ChevronDown size={14} />
            </button>
            {megaOpen && (
              <div className="nav-mega-dropdown">
                <div className="mega-inner">
                  <p className="mega-label">VERSAL AXIS SOLUTIONS</p>
                  {solutionsLinks.map(l => (
                    <Link key={l.href} to={l.href} className="mega-item">
                      <span className="mega-item-title">{l.label}</span>
                      <span className="mega-item-desc">{l.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="nav-right">
          <Link to="/demo-login" className="btn-ghost light-link pill" style={{ border: '1px solid rgba(16, 185, 129, 0.4)', padding: '6px 14px', fontSize: '13px', fontWeight: 700, color: 'var(--teal)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span>Demo Portal</span>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
          </Link>
          <Link to="/contact" className="btn-primary pill nav-btn">Get Started</Link>
          <button className="nav-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer-root">
          <div className="mobile-drawer-overlay" onClick={() => setMobileOpen(false)} />
          <div className="mobile-drawer">
            <div className="mobile-drawer-header">
              <Link to="/" className="nav-brand" onClick={() => setMobileOpen(false)}>
                <img src="/fixora-logo.png" alt="VERSAL AXIS" className="logo-img" />
                VERSAL AXIS
              </Link>
              <button className="mobile-drawer-close" onClick={() => setMobileOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="mobile-drawer-links">
              {navLinks.map(link => (
                link.href.startsWith('/#') ? (
                  <a key={link.label} href={link.href} className="mobile-nav-link">{link.label}</a>
                ) : (
                  <Link key={link.label} to={link.href} className="mobile-nav-link">{link.label}</Link>
                )
              ))}
              <div className="mobile-nav-divider" />
              <p className="mobile-nav-section-label">Solutions</p>
              {solutionsLinks.map(l => (
                <Link key={l.href} to={l.href} className="mobile-nav-link">{l.label}</Link>
              ))}
            </div>
            <div className="mobile-drawer-cta">
              <Link to="/contact" className="btn-primary pill" style={{ width: '100%', textAlign: 'center', display: 'block', padding: '16px' }}>
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
