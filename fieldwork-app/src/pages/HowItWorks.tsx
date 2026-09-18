import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardList, ShieldCheck, Users, CheckCircle2, BarChart3, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    icon: ClipboardList,
    title: 'Business Creates a Request',
    desc: 'A business submits a service request through the VERSAL AXIS platform — specifying the type of service, location, urgency, and any special requirements.',
    detail: 'Intuitive request form. Attach photos, documents, and notes. Set priority levels and preferred scheduling windows.',
    color: '#10B981',
  },
  {
    num: '02',
    icon: ShieldCheck,
    title: 'VERSAL AXIS Verifies the Requirement',
    desc: 'Our intelligent system reviews the request, validates service category and scope, and ensures all necessary details are complete before matching begins.',
    detail: 'Automated requirement checks. Compliance verification. SLA prioritisation and urgency routing.',
    color: '#3B82F6',
  },
  {
    num: '03',
    icon: Users,
    title: 'Verified Provider is Matched',
    desc: 'VERSAL AXIS matches the request to the best-qualified, verified service provider based on expertise, location, availability and performance record.',
    detail: 'Smart matching algorithm. Performance scoring. Geographic proximity. Specialisation alignment.',
    color: '#8B5CF6',
  },
  {
    num: '04',
    icon: ArrowRight,
    title: 'Provider Accepts the Job',
    desc: 'The matched provider reviews the full job brief and accepts the assignment. Both parties receive instant confirmation with all relevant details.',
    detail: 'Real-time notifications. Job brief sharing. Schedule confirmation. Contact details exchange.',
    color: '#F59E0B',
  },
  {
    num: '05',
    icon: CheckCircle2,
    title: 'Service is Completed',
    desc: 'The provider arrives on-site and completes the service to VERSAL AXIS quality standards. A completion report is submitted upon job sign-off.',
    detail: 'On-site arrival tracking. Digital sign-off. Photo documentation. Quality checklist compliance.',
    color: '#10B981',
  },
  {
    num: '06',
    icon: BarChart3,
    title: 'Business Tracks & Manages',
    desc: 'The business has full visibility of every job — past, present and future — through the VERSAL AXIS management dashboard with live status updates.',
    detail: 'Live job tracking. Status updates. Multi-site management. Invoice and payment visibility.',
    color: '#3B82F6',
  },
  {
    num: '07',
    icon: FileText,
    title: 'VERSAL AXIS Maintains Records',
    desc: 'VERSAL AXIS automatically maintains comprehensive service records, performance data, maintenance history and compliance documentation for every property.',
    detail: 'Full audit trail. Compliance reporting. Asset maintenance history. Provider performance analytics.',
    color: '#8B5CF6',
  },
];

export function HowItWorksPage() {
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!stepsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(stepsRef.current!.querySelectorAll('.hiw-step-card'),
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className="inner-hero-section">
        <div className="inner-hero-bg" />
        <div className="container inner-hero-content">
          <span className="kicker light">STREAMLINED PROCESS</span>
          <h1 className="inner-hero-title">How VERSAL AXIS Works</h1>
          <p className="inner-hero-subtitle">
            A complete end-to-end workflow that connects businesses with verified service providers — from first request to final record.
          </p>
          <div className="hero-actions" style={{ marginTop: 32 }}>
            <Link to="/for-businesses" className="btn-primary dark-pill">For Businesses</Link>
            <Link to="/for-providers" className="btn-ghost light-link">
              For Providers <ArrowRight size={16} style={{ display: 'inline', marginLeft: 4 }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Progress overview bar */}
      <section className="hiw-overview-bar">
        <div className="container">
          <div className="hiw-overview-steps">
            {steps.map((s, i) => (
              <div key={s.num} className="hiw-overview-step">
                <div className="hiw-overview-dot" style={{ background: s.color }} />
                <span className="hiw-overview-label">{s.title.split(' ').slice(0, 3).join(' ')}</span>
                {i < steps.length - 1 && <div className="hiw-overview-line" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="hiw-steps-section">
        <div className="container">
          <div className="hiw-steps-grid" ref={stepsRef}>
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 1;
              return (
                <div key={step.num} className={`hiw-step-card ${isEven ? 'even' : 'odd'}`}>
                  <div className="hiw-step-number-col">
                    <div className="hiw-step-circle" style={{ borderColor: step.color, color: step.color }}>
                      {step.num}
                    </div>
                    {idx < steps.length - 1 && <div className="hiw-step-connector" />}
                  </div>
                  <div className="hiw-step-body">
                    <div className="hiw-step-icon-box" style={{ background: `${step.color}18` }}>
                      <Icon size={28} style={{ color: step.color }} />
                    </div>
                    <h3 className="hiw-step-title">{step.title}</h3>
                    <p className="hiw-step-desc">{step.desc}</p>
                    <div className="hiw-step-detail-box">
                      <p className="hiw-step-detail-text">{step.detail}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="hiw-stats-section">
        <div className="container">
          <SectionHeading kicker="PROVEN RESULTS" title="Built for performance at every stage." align="center" />
          <div className="hiw-stats-grid">
            {[
              { num: '< 2hr', label: 'Average Match Time', desc: 'From request to confirmed provider' },
              { num: '98%', label: 'Completion Rate', desc: 'Jobs completed to standard first time' },
              { num: '500+', label: 'Verified Providers', desc: 'Across 8 service categories' },
              { num: '24/7', label: 'Platform Availability', desc: 'Round-the-clock management access' },
            ].map(stat => (
              <div key={stat.label} className="hiw-stat-card">
                <span className="hiw-stat-num">{stat.num}</span>
                <span className="hiw-stat-label">{stat.label}</span>
                <span className="hiw-stat-desc">{stat.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="inner-cta-section">
        <div className="container">
          <div className="inner-cta-block">
            <h2 className="inner-cta-title">Ready to simplify your service operations?</h2>
            <p className="inner-cta-sub">Join businesses that use VERSAL AXIS to manage every service need in one place.</p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn-primary pill">Partner as a Business</Link>
              <Link to="/for-providers" className="btn-ghost light-link">Become a Provider <ArrowRight size={16} style={{ display: 'inline', marginLeft: 4 }} /></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
