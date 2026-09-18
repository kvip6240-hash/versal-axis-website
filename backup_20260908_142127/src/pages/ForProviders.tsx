import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, TrendingUp, Calendar, Award, Star, Briefcase } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (!ScrollTrigger.version) gsap.registerPlugin(ScrollTrigger);

const challenges = [
  { title: 'Inconsistent Job Flow', desc: 'Unpredictable work means unstable revenue and difficulty planning resources.' },
  { title: 'No Credibility System', desc: 'Hard to prove quality and build reputation when working with new clients independently.' },
  { title: 'Admin Overload', desc: 'Scheduling, invoicing and job management takes time away from actual service delivery.' },
];

const providerBenefits = [
  { icon: TrendingUp, title: 'Verified Opportunities', desc: 'Receive pre-qualified job opportunities matched to your specialisation and area.' },
  { icon: Calendar, title: 'Manage Your Schedule', desc: 'Accept or decline jobs on your terms. Full schedule visibility through your provider dashboard.' },
  { icon: Award, title: 'Build Your Reputation', desc: 'Client ratings and completed job records build your professional profile on the platform.' },
  { icon: Star, title: 'Grow Your Business', desc: 'Access a pipeline of business clients you would never reach independently.' },
  { icon: Briefcase, title: 'Professional Tools', desc: 'Job management, completion reporting, and digital sign-off tools built in.' },
  { icon: CheckCircle2, title: 'Reliable Payments', desc: 'Transparent payment terms with structured invoicing through the platform.' },
];

const onboardingSteps = [
  { num: '01', title: 'Apply Online', desc: 'Submit your service provider application in minutes — tell us your specialisation and coverage area.' },
  { num: '02', title: 'Verification', desc: 'Our team verifies your credentials, certifications and background before onboarding.' },
  { num: '03', title: 'Profile Setup', desc: 'Set up your provider profile with services offered, service area and availability preferences.' },
  { num: '04', title: 'Start Receiving Jobs', desc: 'Get matched to relevant business clients and start building your FIXORA service record.' },
];

const howProviderWorks = [
  { step: '01', label: 'Job Alert Received', desc: 'FIXORA notifies you of a matched job opportunity.' },
  { step: '02', label: 'Review & Accept', desc: 'Review full job details and accept or decline within the platform.' },
  { step: '03', label: 'Attend & Complete', desc: 'Arrive on-site, complete the service and document via the app.' },
  { step: '04', label: 'Sign-Off & Submit', desc: 'Get client sign-off and submit your completion report.' },
  { step: '05', label: 'Payment Processed', desc: 'Transparent payment processed through FIXORA.' },
];

export function ForProvidersPage() {
  const heroRef = useRef<HTMLElement>(null);
  const challengesRef = useRef<HTMLElement>(null);
  const workflowRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);
  const onboardingRef = useRef<HTMLElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stConfig = { start: 'top 85%', toggleActions: 'play none none reverse' };
      
      if (heroRef.current) {
        gsap.fromTo(heroRef.current.querySelector('.kicker'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
        gsap.fromTo(heroRef.current.querySelector('.inner-hero-title'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.3, ease: 'power3.out' });
        gsap.fromTo(heroRef.current.querySelector('.inner-hero-subtitle'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5 });
        gsap.fromTo(heroRef.current.querySelector('.hero-actions'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.6 });
      }

      if (challengesRef.current) {
        gsap.fromTo(challengesRef.current.querySelectorAll('.problem-card'), 
          { y: 40, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: challengesRef.current, ...stConfig } }
        );
      }

      if (workflowRef.current) {
        gsap.fromTo(workflowRef.current.querySelectorAll('.workflow-step'), 
          { x: -30, opacity: 0 }, 
          { x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: workflowRef.current, ...stConfig } }
        );
      }

      if (benefitsRef.current) {
        gsap.fromTo(benefitsRef.current.querySelectorAll('.provider-benefit-card'), 
          { y: 50, opacity: 0, scale: 0.95 }, 
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: 'back.out(1.4)', scrollTrigger: { trigger: benefitsRef.current, ...stConfig } }
        );
      }

      if (onboardingRef.current) {
        gsap.fromTo(onboardingRef.current.querySelectorAll('.onboarding-card'), 
          { y: 40, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: onboardingRef.current, ...stConfig } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section ref={heroRef} className="inner-hero-section provider-hero">
        <div className="inner-hero-bg" />
        <div className="container inner-hero-content">
          <span className="kicker light">FOR SERVICE PROVIDERS</span>
          <h1 className="inner-hero-title">Grow Your Service Business<br />With FIXORA.</h1>
          <p className="inner-hero-subtitle">
            Join the FIXORA provider network and access verified business clients, consistent job flow, and the tools to manage your service business professionally.
          </p>
          <div className="hero-actions" style={{ marginTop: 32 }}>
            <Link to="/contact" className="btn-primary dark-pill">Become a Service Provider</Link>
            <Link to="/how-it-works" className="btn-ghost light-link">
              How It Works <ArrowRight size={16} style={{ display: 'inline', marginLeft: 4 }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section ref={challengesRef} className="page-section bg-cream">
        <div className="container">
          <SectionHeading kicker="THE CHALLENGE" title="Running a service business is hard." subtitle="Service providers face common obstacles that FIXORA is built to solve." />
          <div className="problems-grid">
            {challenges.map(c => (
              <div key={c.title} className="problem-card">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How providers work with FIXORA */}
      <section ref={workflowRef} className="page-section bg-cream-2">
        <div className="container">
          <SectionHeading kicker="HOW IT WORKS FOR YOU" title="Your workflow with FIXORA." />
          <div className="workflow-timeline">
            {howProviderWorks.map((w, i) => (
              <div key={w.step} className="workflow-step">
                <div className="workflow-step-num">{w.step}</div>
                <div className="workflow-step-body">
                  <h4 className="workflow-step-label">{w.label}</h4>
                  <p className="workflow-step-desc">{w.desc}</p>
                </div>
                {i < howProviderWorks.length - 1 && <div className="workflow-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={benefitsRef} className="page-section bg-cream">
        <div className="container">
          <SectionHeading kicker="PROVIDER BENEFITS" title="Everything you need to grow." />
          <div className="provider-benefits-grid">
            {providerBenefits.map(b => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="provider-benefit-card">
                  <div className="provider-benefit-icon"><Icon size={22} color="#10B981" /></div>
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Onboarding */}
      <section ref={onboardingRef} className="page-section bg-ink">
        <div className="container">
          <SectionHeading kicker="GETTING STARTED" title="Join FIXORA in 4 simple steps." light />
          <div className="onboarding-grid">
            {onboardingSteps.map(s => (
              <div key={s.num} className="onboarding-card">
                <span className="onboarding-num">{s.num}</span>
                <h3 className="onboarding-title">{s.title}</h3>
                <p className="onboarding-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="inner-cta-section">
        <div className="container">
          <div className="inner-cta-block">
            <h2 className="inner-cta-title">Ready to grow your service business?</h2>
            <p className="inner-cta-sub">Apply to join the FIXORA provider network today and start receiving verified business opportunities.</p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn-primary pill">Become a Service Provider</Link>
              <Link to="/contact" className="btn-ghost light-link">Talk to Our Team <ArrowRight size={16} style={{ display: 'inline', marginLeft: 4 }} /></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
