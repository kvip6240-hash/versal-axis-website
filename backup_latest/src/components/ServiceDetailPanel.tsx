import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, CheckCircle2, Home, Briefcase, Building, Building2, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

export interface ServiceData {
  num: string;
  title: string;
  tagline: string;
  tasks: string[];
  badge: string;
  image: string;
  icon: React.ElementType;
  detail: {
    description: string;
    included: string[];
    suitable: string[];
    responseTime: string;
    guarantee: string;
  };
}

interface ServiceDetailPanelProps {
  service: ServiceData | null;
  onClose: () => void;
}

const propertyIcons: Record<string, React.ElementType> = {
  'Homes': Home,
  'Apartments': Home,
  'Offices': Briefcase,
  'Commercial': Building,
  'All Properties': Building2,
  'Residential': Home,
  'Managed Properties': Building2,
};

export function ServiceDetailPanel({ service, onClose }: ServiceDetailPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Open animation
  useEffect(() => {
    if (!service || !panelRef.current || !overlayRef.current) return;

    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
    tl.fromTo(panelRef.current,
      { x: '100%', opacity: 0 },
      { x: '0%', opacity: 1, duration: 0.6, ease: 'power4.out' },
      0.05
    );
    if (contentRef.current) {
      const items = contentRef.current.querySelectorAll('.panel-anim-item');
      tl.fromTo(items,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out' },
        0.3
      );
    }

    // ESC key to close
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', handleKey);

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [service]);

  const handleClose = () => {
    if (!panelRef.current || !overlayRef.current) return;
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, { x: '100%', duration: 0.45, ease: 'power4.in' });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0.1);
  };

  if (!service) return null;

  const IconComp = service.icon;

  return (
    <div className="sdp-root" aria-modal="true" role="dialog" aria-label={`${service.title} details`}>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="sdp-overlay"
        onClick={handleClose}
      />

      {/* Panel */}
      <div ref={panelRef} className="sdp-panel">
        {/* Hero image */}
        <div className="sdp-hero" style={{ backgroundImage: `url(${service.image})` }}>
          <div className="sdp-hero-overlay" />
          <div className="sdp-hero-content">
            <div className="sdp-icon-ring">
              <IconComp size={40} color="#fff" strokeWidth={1.5} />
            </div>
            <span className="sdp-badge">{service.badge}</span>
          </div>
          <button className="sdp-close-btn" onClick={handleClose} aria-label="Close panel">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable content */}
        <div ref={contentRef} className="sdp-body" data-lenis-prevent="true">
          {/* Title */}
          <div className="sdp-title-block panel-anim-item">
            <span className="sdp-num">{service.num}</span>
            <h2 className="sdp-title">{service.title}</h2>
            <p className="sdp-tagline">{service.tagline}</p>
          </div>

          {/* Full description */}
          <div className="sdp-section panel-anim-item">
            <p className="sdp-description">{service.detail.description}</p>
          </div>

          {/* What's included */}
          <div className="sdp-section panel-anim-item">
            <h3 className="sdp-section-title">What's Included</h3>
            <div className="sdp-included-grid">
              {service.detail.included.map((item) => (
                <div key={item} className="sdp-included-item">
                  <CheckCircle2 size={16} className="sdp-check" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suitable for */}
          <div className="sdp-section panel-anim-item">
            <h3 className="sdp-section-title">Suitable For</h3>
            <div className="sdp-suitable-row">
              {service.detail.suitable.map((type) => {
                const Icon = propertyIcons[type] || Building2;
                return (
                  <div key={type} className="sdp-suitable-chip">
                    <Icon size={14} />
                    <span>{type}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Meta row */}
          <div className="sdp-meta-row panel-anim-item">
            <div className="sdp-meta-item">
              <Clock size={18} className="sdp-meta-icon" />
              <div>
                <span className="sdp-meta-label">Response Time</span>
                <span className="sdp-meta-val">{service.detail.responseTime}</span>
              </div>
            </div>
            <div className="sdp-meta-item">
              <ShieldCheck size={18} className="sdp-meta-icon" />
              <div>
                <span className="sdp-meta-label">Guarantee</span>
                <span className="sdp-meta-val">{service.detail.guarantee}</span>
              </div>
            </div>
          </div>

          {/* Booking coming soon */}
          <div className="sdp-booking-soon panel-anim-item">
            <div className="sdp-booking-inner">
              <div className="sdp-booking-badge">
                <span className="sdp-pulse-dot" />
                Coming Soon
              </div>
              <h3 className="sdp-booking-title">Online Booking Launching Soon</h3>
              <p className="sdp-booking-sub">
                We're building a seamless booking experience. Join the waitlist and be the first to know when it goes live.
              </p>
              <button className="sdp-waitlist-btn">
                <span>Join the Waitlist</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Bottom space */}
          <div style={{ height: '40px' }} />
        </div>
      </div>
    </div>
  );
}
