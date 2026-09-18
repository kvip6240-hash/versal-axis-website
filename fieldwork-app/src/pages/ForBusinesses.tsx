import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Building2, BarChart3, Settings, Clock, Users, Shield, Layers, Zap } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  { icon: Settings, label: 'Facility Services' },
  { icon: Layers, label: 'Preventive Maintenance' },
  { icon: Zap, label: 'Emergency Repairs' },
  { icon: Users, label: 'Provider Management' },
  { icon: ClipboardList, label: 'Job Requests' },
  { icon: BarChart3, label: 'Service Tracking' },
  { icon: Shield, label: 'Quality Control' },
  { icon: FileText, label: 'Service History' },
  { icon: Clock, label: 'Dispatch & Scheduling' },
  { icon: Building2, label: 'Multi-Site Management' },
];

import { ClipboardList, FileText } from 'lucide-react';

const problems = [
  {
    title: 'Too Many Service Vendors',
    desc: 'Managing 10+ separate contractors across different services creates chaos, delays and inconsistency.',
    icon: Users,
  },
  {
    title: 'Zero Visibility',
    desc: 'No centralised view of open jobs, pending repairs, or service history across your properties.',
    icon: BarChart3,
  },
  {
    title: 'Slow Response Times',
    desc: 'Emergency repairs take too long. Communication gaps cause operational downtime.',
    icon: Clock,
  },
];

const benefits = [
  { title: 'One Platform', desc: 'All service categories managed from a single dashboard — no more juggling multiple vendors.' },
  { title: 'Verified Providers', desc: 'Only background-checked, certified professionals are matched to your jobs.' },
  { title: 'Real-Time Tracking', desc: 'Monitor every job from request to completion with live status updates.' },
  { title: 'Quality Guaranteed', desc: 'VERSAL AXIS\'s quality standards apply to every job — with performance scoring.' },
  { title: 'Cost Transparency', desc: 'Clear, competitive pricing with no hidden fees or surprise charges.' },
  { title: 'Full Service History', desc: 'Comprehensive records of every service, maintenance log and compliance document.' },
];

const workflow = [
  { step: '01', label: 'Submit Request', desc: 'Log a job in seconds' },
  { step: '02', label: 'Instant Matching', desc: 'Best provider selected' },
  { step: '03', label: 'Provider Dispatched', desc: 'Confirmed & on the way' },
  { step: '04', label: 'Service Completed', desc: 'Signed off with report' },
  { step: '05', label: 'Records Updated', desc: 'Full audit trail saved' },
];

const industries = [
  'Corporate Offices', 'Healthcare Facilities', 'Retail Chains',
  'Logistics & Warehousing', 'Hospitality', 'Educational Institutions',
];

export function ForBusinessesPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const stConfig = { start: 'top 85%', toggleActions: 'play none none reverse' };
      
      // Hero Animation
      gsap.fromTo('.inner-hero-section .kicker', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
      gsap.fromTo('.inner-hero-section .inner-hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.3, ease: 'power3.out' });
      gsap.fromTo('.inner-hero-section .inner-hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5 });
      gsap.fromTo('.inner-hero-section .hero-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.6 });

      // Anim Reveals independent triggers
      const reveals = sectionRef.current!.querySelectorAll('.anim-reveal');
      reveals.forEach((el) => {
        // If it's a grid, animate children. Otherwise animate self.
        if (el.children.length > 1) {
          gsap.fromTo(el.children, 
            { y: 40, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: el, ...stConfig } }
          );
        } else {
          gsap.fromTo(el, 
            { y: 40, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, ...stConfig } }
          );
        }
      });

      // Stats
      const statGrid = sectionRef.current!.querySelector('.solution-right-stat-grid');
      if (statGrid) {
        gsap.fromTo(statGrid.querySelectorAll('.solution-stat-box'), 
          { y: 30, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.4)', scrollTrigger: { trigger: statGrid, ...stConfig } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="page-wrapper" ref={sectionRef}>
      {/* Hero */}
      <section className="inner-hero-section biz-hero">
        <div className="inner-hero-bg" />
        <div className="container inner-hero-content">
          <span className="kicker light">FOR BUSINESSES</span>
          <h1 className="inner-hero-title">One Platform.<br />Every Service Operation.</h1>
          <p className="inner-hero-subtitle">
            VERSAL AXIS gives businesses complete control over all facility services, maintenance, repairs and service providers — through a single, intelligent platform.
          </p>
          <div className="hero-actions" style={{ marginTop: 32 }}>
            <Link to="/contact" className="btn-primary dark-pill">Partner as a Business</Link>
            <Link to="/how-it-works" className="btn-ghost light-link">
              See How It Works <ArrowRight size={16} style={{ display: 'inline', marginLeft: 4 }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="page-section bg-cream">
        <div className="container">
          <SectionHeading kicker="THE CHALLENGE" title="Why traditional service management fails." subtitle="Businesses lose time, money and control when managing services the old way." />
          <div className="problems-grid anim-reveal">
            {problems.map(p => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="problem-card">
                  <div className="problem-icon-box"><Icon size={24} /></div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="page-section bg-ink">
        <div className="container">
          <div className="solution-two-col">
            <div className="solution-left">
              <span className="kicker light">THE VERSAL AXIS SOLUTION</span>
              <h2 className="section-title light" style={{ marginTop: 12 }}>
                Everything your business needs. One place.
              </h2>
              <p className="section-subtitle light" style={{ textAlign: 'left', marginTop: 16 }}>
                VERSAL AXIS replaces your network of disconnected contractors with a single, managed service platform — giving you visibility, speed and accountability across every service category.
              </p>
              <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Request any service in seconds', 'Instant matching to verified providers', 'Real-time job tracking dashboard', 'Complete maintenance records & compliance', 'Transparent pricing — no surprises'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <CheckCircle2 size={18} color="#10B981" />
                    <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="solution-right-stat-grid">
              {[
                { num: '500+', label: 'Verified Providers' },
                { num: '8+', label: 'Service Categories' },
                { num: '98%', label: 'Completion Rate' },
                { num: '< 2hr', label: 'Average Match Time' },
              ].map(s => (
                <div key={s.label} className="solution-stat-box">
                  <span className="solution-stat-num">{s.num}</span>
                  <span className="solution-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="page-section bg-cream">
        <div className="container">
          <SectionHeading kicker="PLATFORM CAPABILITIES" title="Everything you need to run service operations." />
          <div className="capabilities-grid anim-reveal">
            {capabilities.map(cap => {
              const Icon = cap.icon;
              return (
                <div key={cap.label} className="capability-chip">
                  <Icon size={20} color="#10B981" />
                  <span>{cap.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Workflow */}
      <section className="page-section bg-cream-2">
        <div className="container">
          <SectionHeading kicker="SERVICE WORKFLOW" title="From request to record — fully managed." />
          <div className="workflow-timeline anim-reveal">
            {workflow.map((w, i) => (
              <div key={w.step} className="workflow-step">
                <div className="workflow-step-num">{w.step}</div>
                <div className="workflow-step-body">
                  <h4 className="workflow-step-label">{w.label}</h4>
                  <p className="workflow-step-desc">{w.desc}</p>
                </div>
                {i < workflow.length - 1 && <div className="workflow-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="page-section bg-cream">
        <div className="container">
          <SectionHeading kicker="KEY BENEFITS" title="Why leading businesses choose VERSAL AXIS." />
          <div className="benefits-grid-wide anim-reveal">
            {benefits.map(b => (
              <div key={b.title} className="benefit-card-wide">
                <CheckCircle2 size={20} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <h4>{b.title}</h4>
                  <p>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="page-section bg-cream-2">
        <div className="container">
          <SectionHeading kicker="INDUSTRIES" title="Built for every sector." subtitle="VERSAL AXIS is trusted across a wide range of industries and property types." />
          <div className="industries-chip-grid anim-reveal">
            {industries.map(ind => (
              <Link key={ind} to="/industries" className="industry-chip">{ind}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="inner-cta-section">
        <div className="container">
          <div className="inner-cta-block">
            <h2 className="inner-cta-title">Ready to transform your service operations?</h2>
            <p className="inner-cta-sub">Join businesses that use VERSAL AXIS to manage every service need efficiently, transparently and reliably.</p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn-primary pill">Partner as a Business</Link>
              <Link to="/contact" className="btn-ghost light-link">Schedule a Demo <ArrowRight size={16} style={{ display: 'inline', marginLeft: 4 }} /></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
