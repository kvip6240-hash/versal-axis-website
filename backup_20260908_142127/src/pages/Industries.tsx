import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Factory, Truck, Heart, ShoppingBag, Coffee, Home, BookOpen } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (!ScrollTrigger.version) gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    id: 'corporate',
    icon: Building2,
    label: 'Corporate Facilities',
    color: '#10B981',
    challenges: ['Managing multiple service vendors', 'Ensuring business continuity', 'Compliance documentation'],
    services: ['HVAC & Climate Control', 'Electrical Maintenance', 'Cleaning & Hygiene', 'Security Systems', 'General Maintenance'],
    solution: 'FIXORA centralises all corporate facility services under one management layer — giving facility managers complete control, visibility and compliance documentation across every site.',
    metric: { num: '40%', label: 'Reduction in service admin time' },
  },
  {
    id: 'industrial',
    icon: Factory,
    label: 'Industrial & Manufacturing',
    color: '#3B82F6',
    challenges: ['Minimising production downtime', 'Specialist trade requirements', 'Safety compliance'],
    services: ['Electrical Systems', 'HVAC & Ventilation', 'Plumbing & Drainage', 'Pest Control', 'Security & Access'],
    solution: 'Industrial facilities require specialist expertise and rapid response. FIXORA ensures the right certified professionals are dispatched immediately to minimise any operational impact.',
    metric: { num: '25%', label: 'Faster emergency response' },
  },
  {
    id: 'logistics',
    icon: Truck,
    label: 'Logistics & Warehousing',
    color: '#8B5CF6',
    challenges: ['24/7 operational requirements', 'Large-footprint maintenance', 'Hygiene & pest standards'],
    services: ['Cleaning & Sanitation', 'Pest Control', 'Electrical & Lighting', 'Plumbing', 'Security'],
    solution: 'Logistics operations never stop — and neither does FIXORA. Our 24/7 platform ensures warehouse and distribution centres maintain full operational readiness at all times.',
    metric: { num: '30%', label: 'Fewer operational delays' },
  },
  {
    id: 'healthcare',
    icon: Heart,
    label: 'Healthcare & Clinics',
    color: '#EF4444',
    challenges: ['Strict hygiene compliance', 'Patient safety requirements', 'Rapid fault resolution'],
    services: ['Deep Cleaning & Hygiene', 'Plumbing & Water Safety', 'Electrical Compliance', 'HVAC & Air Quality', 'Pest Control'],
    solution: 'Healthcare environments demand the highest standards. FIXORA only dispatches verified providers with relevant healthcare facility experience and compliance certifications.',
    metric: { num: '98%', label: 'Compliance rate maintained' },
  },
  {
    id: 'retail',
    icon: ShoppingBag,
    label: 'Retail & Chains',
    color: '#F59E0B',
    challenges: ['Multi-site coordination', 'Brand consistency', 'Minimal disruption to trading'],
    services: ['Cleaning & Presentation', 'Electrical & Lighting', 'HVAC', 'Security Systems', 'General Maintenance'],
    solution: 'Retail chains need consistent service quality across all locations. FIXORA\'s centralised platform makes managing maintenance and services for multiple sites effortless.',
    metric: { num: '35%', label: 'Cost savings through consolidation' },
  },
  {
    id: 'hospitality',
    icon: Coffee,
    label: 'Hospitality',
    color: '#EC4899',
    challenges: ['Guest experience protection', 'Rapid same-day response', 'Seasonal demand peaks'],
    services: ['Deep Cleaning', 'Plumbing', 'Electrical', 'HVAC & AC', 'Pest Control', 'Painting & Decoration'],
    solution: 'In hospitality, guest experience is everything. FIXORA ensures rapid same-day response to any maintenance issue — protecting your reputation and guest satisfaction.',
    metric: { num: '< 2hr', label: 'Average emergency response' },
  },
  {
    id: 'commercial',
    icon: Home,
    label: 'Commercial Buildings',
    color: '#14B8A6',
    challenges: ['Multi-tenant complexity', 'Common area upkeep', 'Landlord compliance'],
    services: ['General Maintenance', 'Cleaning', 'Electrical', 'Plumbing', 'Security & Access', 'Pest Control'],
    solution: 'Managing commercial buildings requires coordination across tenants, contracts and compliance. FIXORA streamlines all service management with full audit trails for every property.',
    metric: { num: '50+', label: 'Properties managed per client' },
  },
  {
    id: 'education',
    icon: BookOpen,
    label: 'Educational Institutions',
    color: '#6366F1',
    challenges: ['Term-time service restrictions', 'Child safety compliance', 'Budget management'],
    services: ['Cleaning & Hygiene', 'Plumbing', 'Electrical', 'Pest Control', 'Painting', 'HVAC'],
    solution: 'Educational institutions require careful scheduling around term times. FIXORA plans and coordinates services during school holidays and off-hours to ensure zero disruption.',
    metric: { num: '100%', label: 'DBS checked providers' },
  },
];

export function IndustriesPage() {
  const [active, setActive] = useState(industries[0].id);
  const current = industries.find(i => i.id === active)!;
  const Icon = current.icon;
  
  const heroRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stConfig = { start: 'top 85%', toggleActions: 'play none none reverse' };
      
      if (heroRef.current) {
        gsap.fromTo(heroRef.current.querySelector('.kicker'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
        gsap.fromTo(heroRef.current.querySelector('.inner-hero-title'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.3, ease: 'power3.out' });
        gsap.fromTo(heroRef.current.querySelector('.inner-hero-subtitle'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5 });
      }

      if (tabsRef.current) {
        gsap.fromTo(tabsRef.current.querySelectorAll('.industry-tab'), 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out', scrollTrigger: { trigger: tabsRef.current, ...stConfig } }
        );
      }

      if (gridRef.current) {
        gsap.fromTo(gridRef.current.querySelectorAll('.all-industry-card'), 
          { opacity: 0, scale: 0.95, y: 30 }, 
          { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.4)', scrollTrigger: { trigger: gridRef.current, ...stConfig } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  // Animate panel on tab change
  useEffect(() => {
    const panel = document.querySelector('.industry-panel');
    if (panel) {
      gsap.fromTo(panel, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    }
  }, [active]);

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section ref={heroRef} className="inner-hero-section">
        <div className="inner-hero-bg" />
        <div className="container inner-hero-content">
          <span className="kicker light">INDUSTRIES WE SERVE</span>
          <h1 className="inner-hero-title">Built for Every Industry.</h1>
          <p className="inner-hero-subtitle">
            FIXORA serves a wide range of sectors — each with tailored service management solutions built around specific operational needs.
          </p>
        </div>
      </section>

      {/* Industry Tabs + Content */}
      <section ref={tabsRef} className="industries-section">
        <div className="container">
          {/* Tabs */}
          <div className="industry-tabs-wrapper">
            <div className="industry-tabs">
              {industries.map(ind => {
                const IndIcon = ind.icon;
                return (
                  <button
                    key={ind.id}
                    className={`industry-tab ${active === ind.id ? 'active' : ''}`}
                    onClick={() => setActive(ind.id)}
                    style={active === ind.id ? { borderColor: ind.color, color: ind.color } : {}}
                  >
                    <IndIcon size={16} />
                    {ind.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Panel */}
          <div className="industry-panel" key={active}>
            <div className="industry-panel-left">
              <div className="industry-panel-icon" style={{ background: `${current.color}18`, color: current.color }}>
                <Icon size={40} />
              </div>
              <h2 className="industry-panel-title">{current.label}</h2>
              <p className="industry-panel-solution">{current.solution}</p>

              <div className="industry-metric-box" style={{ borderColor: `${current.color}40` }}>
                <span className="industry-metric-num" style={{ color: current.color }}>{current.metric.num}</span>
                <span className="industry-metric-label">{current.metric.label}</span>
              </div>

              <Link to="/contact" className="btn-primary pill" style={{ marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Discuss Your Industry <ArrowRight size={16} />
              </Link>
            </div>

            <div className="industry-panel-right">
              <div className="industry-detail-card">
                <h4 className="industry-detail-label">Common Challenges</h4>
                <div className="industry-detail-list">
                  {current.challenges.map(c => (
                    <div key={c} className="industry-detail-item challenge">{c}</div>
                  ))}
                </div>
              </div>
              <div className="industry-detail-card">
                <h4 className="industry-detail-label">Services Required</h4>
                <div className="industry-detail-list">
                  {current.services.map(s => (
                    <div key={s} className="industry-detail-item service">{s}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All industries grid */}
      <section ref={gridRef} className="page-section bg-cream-2">
        <div className="container">
          <SectionHeading kicker="ALL SECTORS" title="Every industry, one platform." />
          <div className="all-industries-grid">
            {industries.map(ind => {
              const IndIcon = ind.icon;
              return (
                <button key={ind.id} className={`all-industry-card ${active === ind.id ? 'active' : ''}`}
                  onClick={() => { setActive(ind.id); document.querySelector('.industry-tabs-wrapper')?.scrollIntoView({ behavior: 'smooth' }); }}
                  style={active === ind.id ? { borderColor: ind.color } : {}}
                >
                  <div className="all-industry-icon" style={{ background: `${ind.color}15`, color: ind.color }}><IndIcon size={24} /></div>
                  <span className="all-industry-label">{ind.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="inner-cta-section">
        <div className="container">
          <div className="inner-cta-block">
            <h2 className="inner-cta-title">Don't see your industry?</h2>
            <p className="inner-cta-sub">FIXORA serves many sectors. Get in touch to discuss your specific requirements and how we can help.</p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn-primary pill">Contact Our Team</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
