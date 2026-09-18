import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';

const caseStudies = [
  {
    id: 'logistics-co',
    industry: 'Logistics & Warehousing',
    company: 'NorthRoute Logistics',
    location: 'Manchester, UK',
    problem: 'Managing 6 separate service contractors across 3 warehouses was creating coordination delays and compliance gaps. Emergency repairs were taking 8+ hours to arrange.',
    solution: 'VERSAL AXIS consolidated all facility services under one platform — cleaning, pest control, electrical and HVAC managed from a single dashboard with a single point of contact.',
    results: [
      { metric: '30%', label: 'Faster emergency response' },
      { metric: '40%', label: 'Reduction in admin overhead' },
      { metric: '100%', label: 'Compliance documentation maintained' },
    ],
    quote: 'VERSAL AXIS transformed how we manage our warehouses. What used to take hours of coordination now takes minutes.',
    author: 'Operations Director',
    accentColor: '#8B5CF6',
    avatar: 'NL',
  },
  {
    id: 'clinic-group',
    industry: 'Healthcare & Clinics',
    company: 'Meridian Clinic Group',
    location: 'Birmingham, UK',
    problem: 'Strict hygiene standards and patient safety requirements made it essential to have only fully certified, background-checked service providers — but sourcing these independently was time-consuming.',
    solution: 'VERSAL AXIS\'s verified provider network ensured only certified professionals with relevant healthcare experience were assigned to each clinic. All compliance documents automatically maintained.',
    results: [
      { metric: '100%', label: 'Verified, DBS-checked providers' },
      { metric: '25%', label: 'Reduction in service-related downtime' },
      { metric: '< 3hr', label: 'Emergency response time' },
    ],
    quote: 'Patient safety is our priority. VERSAL AXIS gives us confidence that every service professional entering our clinics is fully verified and compliant.',
    author: 'Facilities Manager',
    accentColor: '#EF4444',
    avatar: 'MC',
  },
  {
    id: 'retail-chain',
    industry: 'Retail & Chains',
    company: 'Vault Retail Group',
    location: 'London, UK',
    problem: 'With 12 retail locations, maintaining consistent service standards and coordinating maintenance across all stores was an operational challenge that disrupted trading.',
    solution: 'VERSAL AXIS\'s centralised multi-site management allowed the Vault team to log, track and manage service requests across all 12 locations from a single dashboard without disrupting trading hours.',
    results: [
      { metric: '35%', label: 'Cost savings through consolidation' },
      { metric: '12', label: 'Sites managed from one platform' },
      { metric: '50%', label: 'Fewer service disruptions to trading' },
    ],
    quote: 'Managing 12 stores used to require a full-time coordinator. With VERSAL AXIS, one person handles everything in minutes.',
    author: 'Head of Property',
    accentColor: '#F59E0B',
    avatar: 'VR',
  },
  {
    id: 'corporate-office',
    industry: 'Corporate Facilities',
    company: 'Apex Capital Partners',
    location: 'London, UK',
    problem: 'A Class A office building with 400+ daily occupants needed consistent, reliable facility management across electrical, HVAC, plumbing and cleaning — all with full audit trails.',
    solution: 'VERSAL AXIS implemented a complete facility management workflow — covering preventive maintenance schedules, reactive repairs and annual service contracts — all with automated compliance records.',
    results: [
      { metric: '40%', label: 'Less service management time' },
      { metric: '98%', label: 'Job completion rate' },
      { metric: 'Full', label: 'Audit trail maintained' },
    ],
    quote: 'The level of professionalism and platform capability VERSAL AXIS offers is enterprise-grade. Exactly what a modern office building needs.',
    author: 'Building Manager',
    accentColor: '#10B981',
    avatar: 'AC',
  },
  {
    id: 'hospitality',
    industry: 'Hospitality',
    company: 'The Clarendon Hotel Group',
    location: 'Edinburgh, UK',
    problem: 'Hotel maintenance issues directly impact guest experience. Same-day resolution was essential but the hotel had no reliable way to source qualified professionals quickly.',
    solution: 'VERSAL AXIS\'s 24/7 platform and verified provider network allowed the hotel\'s team to log any maintenance issue and receive same-day service — protecting guest experience at all times.',
    results: [
      { metric: '< 2hr', label: 'Average on-site response' },
      { metric: '15%', label: 'Improvement in guest satisfaction scores' },
      { metric: '20%', label: 'Reduction in maintenance costs' },
    ],
    quote: 'VERSAL AXIS doesn\'t just fix things — it protects our guest experience. That\'s invaluable in hospitality.',
    author: 'General Manager',
    accentColor: '#EC4899',
    avatar: 'CH',
  },
  {
    id: 'education',
    industry: 'Educational Institutions',
    company: 'Greenfield Academy Trust',
    location: 'Leeds, UK',
    problem: 'Managing maintenance across 4 school buildings required DBS-checked professionals and strict scheduling around term times — both difficult to consistently source and coordinate.',
    solution: 'VERSAL AXIS provided a pool of DBS-verified providers who could be scheduled for holiday-period maintenance, ensuring no disruption to students while keeping all buildings compliant.',
    results: [
      { metric: '100%', label: 'DBS-verified providers used' },
      { metric: '0', label: 'Term-time disruptions' },
      { metric: '4', label: 'Sites under central management' },
    ],
    quote: 'Student safety and compliance are non-negotiable. VERSAL AXIS gives our trust complete confidence in every provider that enters our schools.',
    author: 'Trust Facilities Lead',
    accentColor: '#6366F1',
    avatar: 'GA',
  },
];

const testimonials = [
  { name: 'Sarah M.', role: 'Homeowner, South London', text: 'VERSAL AXIS transformed how I manage my home. I used to chase multiple different contractors — now one call handles everything.', rating: 5, color: '#10B981', avatar: 'SM' },
  { name: 'James K.', role: 'Property Manager, Manchester', text: 'VERSAL AXIS cuts my coordination time in half. The professionals are all verified and always arrive on time.', rating: 5, color: '#3B82F6', avatar: 'JK' },
  { name: 'Aisha L.', role: 'Office Manager, Birmingham', text: 'Our office needed electrical work, painting and a deep clean all at once. VERSAL AXIS coordinated the whole thing seamlessly.', rating: 5, color: '#8B5CF6', avatar: 'AL' },
];

export function CustomersPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className="inner-hero-section">
        <div className="inner-hero-bg" />
        <div className="container inner-hero-content">
          <span className="kicker light">SUCCESS STORIES</span>
          <h1 className="inner-hero-title">Real Results.<br />Real Businesses.</h1>
          <p className="inner-hero-subtitle">
            Discover how businesses across the UK are transforming their service operations with VERSAL AXIS.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="page-section bg-cream">
        <div className="container">
          <SectionHeading kicker="CASE STUDIES" title="How VERSAL AXIS delivers results." />
          <div className="case-studies-grid">
            {caseStudies.map(cs => (
              <div key={cs.id} className={`case-study-card ${expanded === cs.id ? 'expanded' : ''}`} style={{ borderColor: expanded === cs.id ? cs.accentColor + '50' : undefined }}>
                <div className="cs-header">
                  <div className="cs-avatar" style={{ background: cs.accentColor }}>{cs.avatar}</div>
                  <div>
                    <div className="cs-industry-badge" style={{ color: cs.accentColor, background: `${cs.accentColor}15` }}>{cs.industry}</div>
                    <h3 className="cs-company">{cs.company}</h3>
                    <span className="cs-location">{cs.location}</span>
                  </div>
                </div>

                <div className="cs-metrics">
                  {cs.results.map(r => (
                    <div key={r.label} className="cs-metric">
                      <span className="cs-metric-num" style={{ color: cs.accentColor }}>{r.metric}</span>
                      <span className="cs-metric-label">{r.label}</span>
                    </div>
                  ))}
                </div>

                {expanded === cs.id && (
                  <div className="cs-detail">
                    <div className="cs-detail-section">
                      <h4 className="cs-detail-label">The Challenge</h4>
                      <p className="cs-detail-text">{cs.problem}</p>
                    </div>
                    <div className="cs-detail-section">
                      <h4 className="cs-detail-label">The VERSAL AXIS Solution</h4>
                      <p className="cs-detail-text">{cs.solution}</p>
                    </div>
                    <blockquote className="cs-quote">
                      <p>"{cs.quote}"</p>
                      <cite>— {cs.author}, {cs.company}</cite>
                    </blockquote>
                  </div>
                )}

                <button className="cs-toggle-btn" onClick={() => setExpanded(expanded === cs.id ? null : cs.id)} style={{ color: cs.accentColor }}>
                  {expanded === cs.id ? 'Show Less' : 'Read Full Story'} <ArrowRight size={14} style={{ transform: expanded === cs.id ? 'rotate(180deg)' : 'rotate(90deg)', transition: '0.2s' }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="page-section bg-cream-2">
        <div className="container">
          <SectionHeading kicker="TESTIMONIALS" title="What our clients say." />
          <div className="testimonials-grid">
            {testimonials.map(t => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-stars">{[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: t.color }}>{t.avatar}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="inner-cta-section">
        <div className="container">
          <div className="inner-cta-block">
            <h2 className="inner-cta-title">Join businesses transforming their operations.</h2>
            <p className="inner-cta-sub">Start your VERSAL AXIS journey today and become our next success story.</p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn-primary pill">Partner as a Business</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
