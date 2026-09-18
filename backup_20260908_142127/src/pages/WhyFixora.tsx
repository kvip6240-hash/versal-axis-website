import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Layers, BarChart3, Star, Clock, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (!ScrollTrigger.version) gsap.registerPlugin(ScrollTrigger);

const advantages = [
  {
    icon: Shield,
    title: 'Verified Service Providers',
    stat: '100%',
    statLabel: 'DBS checked',
    desc: 'Every provider on the FIXORA platform is thoroughly background-checked, credential-verified and performance-scored before they can accept a job. No unverified contractors — ever.',
    color: '#10B981',
  },
  {
    icon: Zap,
    title: 'Faster Response Times',
    stat: '< 2hr',
    statLabel: 'Average match time',
    desc: 'From service request to confirmed provider assignment in under 2 hours. Our intelligent matching engine prioritises urgency, proximity and specialisation.',
    color: '#3B82F6',
  },
  {
    icon: Layers,
    title: 'Centralised Management',
    stat: '8+',
    statLabel: 'Service categories',
    desc: 'One platform to manage every service category — maintenance, plumbing, electrical, HVAC, cleaning, painting, pest control and security. No more juggling vendors.',
    color: '#8B5CF6',
  },
  {
    icon: BarChart3,
    title: 'Transparent Operations',
    stat: '100%',
    statLabel: 'Job visibility',
    desc: 'Real-time job tracking, transparent pricing, live status updates and a complete service history for every property. No black boxes — full operational clarity.',
    color: '#F59E0B',
  },
  {
    icon: Star,
    title: 'Quality Control',
    stat: '98%',
    statLabel: 'Completion rate',
    desc: 'FIXORA enforces quality standards at every step — from provider selection to job sign-off. Digital completion reports, photo documentation and client ratings.',
    color: '#EC4899',
  },
  {
    icon: Clock,
    title: 'Preventive Maintenance',
    stat: '30%',
    statLabel: 'Fewer emergency calls',
    desc: 'Schedule and track preventive maintenance programmes across all service categories. Reduce emergency callouts and extend the life of your property assets.',
    color: '#14B8A6',
  },
  {
    icon: TrendingUp,
    title: 'Better Tracking',
    stat: 'Full',
    statLabel: 'Audit trail',
    desc: 'Comprehensive service records, compliance documentation and performance analytics for every job, every provider and every property — all in one place.',
    color: '#6366F1',
  },
  {
    icon: CheckCircle2,
    title: 'Reliable Support',
    stat: '24/7',
    statLabel: 'Platform availability',
    desc: 'The FIXORA platform is available around the clock. Submit urgent requests, track live jobs, and access your complete service history at any time.',
    color: '#10B981',
  },
];

const comparison = [
  { feature: 'Vendor management', traditional: 'Multiple contacts', fixora: 'One platform' },
  { feature: 'Response time', traditional: 'Hours to days', fixora: 'Under 2 hours' },
  { feature: 'Provider verification', traditional: 'Unverified / manual', fixora: 'Fully verified & scored' },
  { feature: 'Job tracking', traditional: 'Phone / email', fixora: 'Real-time dashboard' },
  { feature: 'Service records', traditional: 'Paper / spreadsheets', fixora: 'Automated digital records' },
  { feature: 'Quality assurance', traditional: 'No standard process', fixora: 'Platform-enforced QA' },
  { feature: 'Cost visibility', traditional: 'Surprise invoices', fixora: 'Transparent pricing' },
  { feature: 'Compliance docs', traditional: 'Manual & inconsistent', fixora: 'Auto-generated reports' },
];

export function WhyFixoraPage() {
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const advRef = useRef<HTMLElement>(null);
  const compRef = useRef<HTMLElement>(null);
  
  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stConfig = { start: 'top 85%', toggleActions: 'play none none reverse' };
      
      // Hero Animation
      if (heroRef.current) {
        gsap.fromTo(heroRef.current.querySelector('.kicker'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
        gsap.fromTo(heroRef.current.querySelector('.inner-hero-title'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.3, ease: 'power3.out' });
        gsap.fromTo(heroRef.current.querySelector('.inner-hero-subtitle'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5 });
      }

      // Stats Banner
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.querySelectorAll('.why-stat-item'), 
          { y: 40, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: statsRef.current, ...stConfig } }
        );
      }

      // Advantages Grid
      if (advRef.current) {
        gsap.fromTo(advRef.current.querySelectorAll('.why-adv-card'), 
          { y: 50, opacity: 0, scale: 0.95 }, 
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: 'back.out(1.4)', scrollTrigger: { trigger: advRef.current, ...stConfig } }
        );
      }

      // Comparison Table
      if (compRef.current) {
        gsap.fromTo(compRef.current.querySelectorAll('.comparison-row'), 
          { x: -30, opacity: 0 }, 
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: compRef.current, ...stConfig } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section ref={heroRef} className="inner-hero-section">
        <div className="inner-hero-bg" />
        <div className="container inner-hero-content">
          <span className="kicker light">THE FIXORA ADVANTAGE</span>
          <h1 className="inner-hero-title">Why businesses choose<br />FIXORA.</h1>
          <p className="inner-hero-subtitle">
            A smarter approach to service management — built on transparency, speed, quality and reliability.
          </p>
        </div>
      </section>

      {/* Stats banner */}
      <section ref={statsRef} className="why-stats-banner">
        <div className="container">
          <div className="why-stats-row">
            {[
              { num: '500+', label: 'Verified Providers' },
              { num: '8+', label: 'Service Categories' },
              { num: '98%', label: 'Satisfaction Rate' },
              { num: '< 2hr', label: 'Average Response' },
            ].map(s => (
              <div key={s.label} className="why-stat-item">
                <span className="why-stat-num">{s.num}</span>
                <span className="why-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section ref={advRef} className="page-section bg-cream">
        <div className="container">
          <SectionHeading kicker="8 KEY ADVANTAGES" title="What makes FIXORA different." />
          <div className="why-advantages-grid">
            {advantages.map(adv => {
              const Icon = adv.icon;
              return (
                <div key={adv.title} className="why-adv-card">
                  <div className="why-adv-top">
                    <div className="why-adv-icon" style={{ background: `${adv.color}18`, color: adv.color }}><Icon size={24} /></div>
                    <div className="why-adv-stat-block">
                      <span className="why-adv-stat" style={{ color: adv.color }}>{adv.stat}</span>
                      <span className="why-adv-stat-label">{adv.statLabel}</span>
                    </div>
                  </div>
                  <h3 className="why-adv-title">{adv.title}</h3>
                  <p className="why-adv-desc">{adv.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section ref={compRef} className="page-section bg-ink">
        <div className="container">
          <SectionHeading kicker="COMPARISON" title="FIXORA vs. Traditional Approach." light />
          <div className="comparison-table">
            <div className="comparison-header">
              <div className="comp-col-label">Feature</div>
              <div className="comp-col-label">Traditional</div>
              <div className="comp-col-label fixora-col">FIXORA ✓</div>
            </div>
            {comparison.map((row, i) => (
              <div key={i} className="comparison-row">
                <div className="comp-feature">{row.feature}</div>
                <div className="comp-traditional">{row.traditional}</div>
                <div className="comp-fixora">{row.fixora}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="inner-cta-section">
        <div className="container">
          <div className="inner-cta-block">
            <h2 className="inner-cta-title">Experience the FIXORA difference.</h2>
            <p className="inner-cta-sub">Join businesses that have transformed how they manage service operations.</p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn-primary pill">Get Started Today</Link>
              <Link to="/customers" className="btn-ghost light-link">See Success Stories <ArrowRight size={16} style={{ display: 'inline', marginLeft: 4 }} /></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
