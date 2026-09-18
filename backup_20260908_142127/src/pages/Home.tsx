import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  CheckCircle2, ArrowRight, Building2, Home as HomeIcon,
  Briefcase, Building, UserCheck, Shield, Layers, Clock,
  ChevronRight, AlertTriangle, Search, Zap, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceDetailPanel } from '../components/ServiceDetailPanel';
import type { ServiceData } from '../components/ServiceDetailPanel';
import { servicesData } from '../data/servicesData';

if (!ScrollTrigger.version) gsap.registerPlugin(ScrollTrigger);

const storySteps = [
  { text: 'Something breaks.', highlight: 'Unexpected maintenance issues interrupt your day.', icon: <AlertTriangle size={40} color="#10B981" strokeWidth={1.5} /> },
  { text: 'FIXORA finds the right service.', highlight: 'Instantly matched with verified property experts.', icon: <Search size={40} color="#10B981" strokeWidth={1.5} /> },
  { text: 'A professional arrives.', highlight: 'On-time, equipped, and background-checked.', icon: <Zap size={40} color="#10B981" strokeWidth={1.5} /> },
  { text: 'The problem gets solved.', highlight: 'High quality work with transparent verification.', icon: <CheckCircle2 size={40} color="#10B981" strokeWidth={1.5} /> },
  { text: 'Your property keeps moving.', highlight: 'End-to-end care so you can focus on what matters.', icon: <HomeIcon size={40} color="#10B981" strokeWidth={1.5} /> },
];

const testimonialsData = [
  { name: 'Sarah M.', role: 'Homeowner, South London', text: 'FIXORA transformed how I manage my home. I used to chase multiple different contractors — now one call handles everything from boiler servicing to plumbing. Absolutely brilliant service.', rating: 5, avatar: 'SM', accentColor: '#10B981' },
  { name: 'James K.', role: 'Property Manager, Manchester', text: 'Managing a portfolio of properties used to be exhausting. FIXORA cuts my coordination time in half. The professionals are all verified and always arrive on time.', rating: 5, avatar: 'JK', accentColor: '#3B82F6' },
  { name: 'Aisha L.', role: 'Office Manager, Birmingham', text: 'Our office needed electrical work, painting and a deep clean all at once. FIXORA coordinated the whole thing seamlessly — zero disruption to the team.', rating: 5, avatar: 'AL', accentColor: '#8B5CF6' },
];

export function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  const heroWrapperRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const scrollVideoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLElement>(null);
  const gaugePctRef = useRef<HTMLSpanElement>(null);
  const trustRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const propertySystemRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const whyFixoraRef = useRef<HTMLElement>(null);
  const propertyTypesRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const cinematicStoryRef = useRef<HTMLElement>(null);

  const prefersReducedMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), orientation: 'vertical', smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (anchor) { e.preventDefault(); const el = document.getElementById(anchor.getAttribute('href')!.slice(1)); if (el) lenis.scrollTo(el, { offset: -80 }); }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => { lenis.destroy(); document.removeEventListener('click', handleAnchorClick); };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) setScrollProgress(scrollY / docHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const video = scrollVideoRef.current;
    const container = wrapperRef.current;
    if (!video || !container) return;

    const updateVideoProgress = () => {
      const rect = container.getBoundingClientRect();
      const maxScroll = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.max(0, Math.min(1, (-rect.top) / maxScroll));

      if (gaugePctRef.current) {
        gaugePctRef.current.textContent = `${Math.round(progress * 100)}%`;
      }

      if (Number.isFinite(video.duration) && video.duration > 0) {
        const targetTime = progress * (video.duration - 0.05);
        if (Math.abs(video.currentTime - targetTime) > 0.04) {
          video.currentTime = targetTime;
        }
      }
    };

    const handleMeta = () => {
      video.pause();
      updateVideoProgress();
    };

    window.addEventListener('scroll', updateVideoProgress, { passive: true });
    window.addEventListener('resize', updateVideoProgress, { passive: true });
    video.addEventListener('loadedmetadata', handleMeta);
    video.src = '/scroll-video.mp4';
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.pause();
    updateVideoProgress();

    return () => {
      window.removeEventListener('scroll', updateVideoProgress);
      window.removeEventListener('resize', updateVideoProgress);
      video.removeEventListener('loadedmetadata', handleMeta);
    };
  }, []);

  useEffect(() => {
    if (!heroWrapperRef.current || !heroContentRef.current || prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      if (heroVideoRef.current) tl.fromTo(heroVideoRef.current, { scale: 1.15 }, { scale: 1.0, duration: 2.5, ease: 'power2.out' });
      const headline = heroContentRef.current?.querySelector('.hero-headline');
      const lines = heroContentRef.current?.querySelectorAll('.hero-headline-line');
      const staggerItems = heroContentRef.current?.querySelectorAll('.hero-stagger-item');
      if (headline) tl.set(headline, { opacity: 1 }, 0.2);
      if (lines && lines.length > 0) tl.fromTo(lines, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.18, ease: 'power3.out' }, 0.3);
      if (staggerItems && staggerItems.length > 0) tl.fromTo(staggerItems, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.14, ease: 'power3.out' }, 0.6);
    });
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const stConfig = { start: 'top 82%', toggleActions: 'play none none reverse' };
      if (trustRef.current) { gsap.fromTo(trustRef.current.querySelectorAll('.trust-anim'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: trustRef.current, ...stConfig } }); gsap.fromTo(trustRef.current.querySelectorAll('.trust-card'), { y: 50, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.4)', scrollTrigger: { trigger: trustRef.current, start: 'top 75%' } }); }
      if (statsRef.current) { gsap.fromTo(statsRef.current.querySelectorAll('.stat-item'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.14, ease: 'power3.out', scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } }); }
      if (servicesRef.current) { const list = servicesRef.current.querySelector('.services-cinematic-list'); if (list) gsap.fromTo(list, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: list, start: 'top 85%' } }); }
      if (propertySystemRef.current) { gsap.fromTo(propertySystemRef.current.querySelectorAll('.system-anim'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: propertySystemRef.current, ...stConfig } }); }
      if (howItWorksRef.current) gsap.fromTo(howItWorksRef.current.querySelectorAll('.step-card'), { y: 60, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: howItWorksRef.current, ...stConfig } });
      if (whyFixoraRef.current) gsap.fromTo(whyFixoraRef.current.querySelectorAll('.benefit-box'), { y: 45, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: whyFixoraRef.current, ...stConfig } });
      if (propertyTypesRef.current) gsap.fromTo(propertyTypesRef.current.querySelectorAll('.property-card'), { y: 55, opacity: 0, scale: 0.93 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.12, ease: 'back.out(1.4)', scrollTrigger: { trigger: propertyTypesRef.current, ...stConfig } });
      if (testimonialsRef.current) gsap.fromTo(testimonialsRef.current.querySelectorAll('.testimonial-card'), { y: 60, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: testimonialsRef.current, start: 'top 80%' } });
      if (cinematicStoryRef.current) { gsap.fromTo(cinematicStoryRef.current.querySelectorAll('.fixora-way-card'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.14, ease: 'power3.out', scrollTrigger: { trigger: cinematicStoryRef.current, start: 'top 80%' } }); }
      if (wrapperRef.current) { const canvasSticky = wrapperRef.current.querySelector('.canvas-sticky'); if (canvasSticky) gsap.fromTo(canvasSticky, { y: 80, scale: 0.96, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: wrapperRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }); }
    });
    return () => ctx.revert();
  }, [prefersReducedMotion]);


  return (
    <div className="fixora-landing">
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress * 100}%` }} />

      {/* HERO */}
      <section className="hero-section" ref={heroWrapperRef}>
        <video ref={heroVideoRef} className="hero-video-bg" src="/Commercial_facility_services_mon._202609071314_erasio.mp4" autoPlay muted loop playsInline />
        <div className="hero-overlay" />
        <div className="hero-grain" />
        <div className="hero-content-wrapper" ref={heroContentRef}>
          <div className="hero-badge hero-stagger-item">
            <span className="dot" />
            ON SITE - COMMERCIAL CLEANING
          </div>
          <h1 className="hero-headline">
            <span className="hero-headline-line">One Property.</span>
            <span className="hero-headline-line accent-italic">Every Fix.</span>
          </h1>
          <p className="hero-subtitle hero-stagger-item">Dispatch technicians, track progress, and get paid faster than ever before.</p>
          <div className="hero-actions hero-stagger-item">
            <Link to="/contact" className="btn-primary dark-pill magnetic-btn">Get a Quote</Link>
            <a href="#services" className="btn-ghost light-link magnetic-btn">Explore Services <ArrowRight size={16} style={{ display: 'inline', marginLeft: 4 }} /></a>
          </div>
          <div className="hero-metrics hero-stagger-item">
            <div className="hero-metric"><span className="hero-metric-num">500+</span><span className="hero-metric-label">Verified Pros</span></div>
            <div className="hero-metric-divider" />
            <div className="hero-metric"><span className="hero-metric-num">8+</span><span className="hero-metric-label">Core Services</span></div>
            <div className="hero-metric-divider" />
            <div className="hero-metric"><span className="hero-metric-num">98%</span><span className="hero-metric-label">Satisfaction</span></div>
          </div>
        </div>
        <div className="scroll-indicator hero-stagger-item">
          <div className="scroll-indicator-mouse"><div className="scroll-indicator-wheel" /></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* TRUST */}
      <section id="trust" className="trust-section" ref={trustRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <div className="trust-header trust-anim">
            <span className="kicker">UNIFIED CARE</span>
            <h2 className="trust-title">Your property doesn't need ten different service providers.</h2>
            <p className="trust-subtitle">FIXORA brings essential property maintenance, repair and care into one coordinated system — right across the UK.</p>
          </div>
          <div className="trust-grid">
            <div className="trust-card trust-anim"><div className="trust-icon-box"><Layers size={24} /></div><h3>8+ Essential Services</h3><p>Complete property care handled by certified category experts.</p></div>
            <div className="trust-card trust-anim"><div className="trust-icon-box"><UserCheck size={24} /></div><h3>Verified Professionals</h3><p>Vetted, background-checked technicians for guaranteed safety.</p></div>
            <div className="trust-card trust-anim"><div className="trust-icon-box"><Building2 size={24} /></div><h3>One Service Platform</h3><p>A single interface to request, track, and manage all repairs.</p></div>
            <div className="trust-card trust-anim"><div className="trust-icon-box"><Shield size={24} /></div><h3>UK-Wide Coverage</h3><p>Serving residential and commercial properties across the UK.</p></div>
          </div>
        </div>
      </section>


      {/* CANVAS SCRUB */}
      <section className="canvas-wrapper" ref={wrapperRef as React.RefObject<HTMLElement>}>
        <div className="canvas-sticky">
          <video ref={scrollVideoRef} className="canvas-video" muted playsInline preload="auto" />
          <div className="progress-gauge">
            <span className="pct" ref={gaugePctRef}>0%</span>
            <span className="lbl">Property</span>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-cinematic-section" ref={servicesRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <div className="section-head-center">
            <span className="kicker">CORE SERVICES</span>
            <h2 className="section-title">Immersive Property Care</h2>
            <p className="section-subtitle">Click any service to explore what's included.</p>
          </div>
          <div className="services-cinematic-list">
            {servicesData.map((svc, idx) => {
              const IconComp = svc.icon;
              return (
                <div key={svc.num} className="service-cinematic-card" style={{ top: '100px', zIndex: idx }} onClick={() => setSelectedService(svc)}>
                  <div className="service-card-left">
                    <div className="service-number-pill"><span className="svc-num">{svc.num}</span><span className="svc-badge-pill">{svc.badge}</span></div>
                    <h3 className="svc-title">{svc.title}</h3>
                    <p className="svc-tagline">{svc.tagline}</p>
                    <div className="svc-tasks-container">
                      <span className="tasks-label">KEY CAPABILITIES</span>
                      <div className="tasks-grid">{svc.tasks.map(task => (<div key={task} className="task-chip"><CheckCircle2 size={14} className="task-check" /><span>{task}</span></div>))}</div>
                    </div>
                    <button className="svc-cta-btn magnetic-btn" onClick={(e) => { e.stopPropagation(); setSelectedService(svc); }}><span>Learn More</span><ChevronRight size={16} /></button>
                  </div>
                  <div className="service-card-right" style={{ backgroundImage: `url(${svc.image})` }}>
                    <div className="card-image-overlay" />
                    <div className="cinematic-graphic-wrapper">
                      <div className="graphic-icon-main glass-floating"><IconComp size={52} color="#FFFFFF" strokeWidth={1.5} /></div>
                      <div className="graphic-glass-card"><div className="glass-indicator"><span className="live-dot" /> Active Coverage</div><div className="glass-metric">100% Verified Professionals</div></div>
                    </div>
                  </div>
                  <div className="service-card-hover-cta"><span>View Details</span><ChevronRight size={18} /></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROPERTY SYSTEM */}
      <section id="complete-property" className="property-system-section" ref={propertySystemRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <div className="section-head-center system-anim"><span className="kicker">INTEGRATED PLATFORM</span><h2 className="section-title">One system for the whole property.</h2><p className="section-subtitle">From everyday repairs to complete property care, FIXORA connects every essential service through one simple experience.</p></div>
          <div className="system-composition-wrapper">
            <div className="system-center-hub system-node"><div className="hub-inner"><span className="hub-logo">FIXORA</span><span className="hub-tag">Core Engine</span></div></div>
            <div className="system-nodes-grid">{['Plumbing', 'Electrical', 'HVAC & AC', 'Cleaning', 'Painting', 'Pest Control', 'Security', 'Maintenance'].map((node, idx) => (<div key={node} className={`system-node node-item node-${idx + 1}`}><div className="node-dot" /><span className="node-name">{node}</span></div>))}</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (home teaser) */}
      <section id="how-it-works" className="how-section" ref={howItWorksRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <div className="section-head-center"><span className="kicker">STREAMLINED PROCESS</span><h2 className="section-title">Property care, without the chaos.</h2></div>
          <div className="steps-timeline-grid">
            {[['01', 'Tell us what you need', 'Choose the service or describe the issue in seconds.'], ['02', 'We match the right professional', 'The right specialist for the job, dispatched promptly.'], ['03', 'Get it fixed', 'Professional service delivered directly at your property.'], ['04', 'Stay covered', 'Reliable support and warranty beyond a single visit.']].map(([num, title, desc]) => (
              <div key={num} className="step-card"><span className="step-num">{num}</span><h3>{title}</h3><p>{desc}</p></div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/how-it-works" className="btn-primary pill" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              See Full Process <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY FIXORA */}
      <section id="why-fixora" className="why-section" ref={whyFixoraRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <div className="section-head-center"><span className="kicker">THE FIXORA ADVANTAGE</span><h2 className="section-title">Built for complete peace of mind</h2></div>
          <div className="benefits-grid">
            {[[Layers, 'ONE PLATFORM', 'Everything you need in one place, eliminating back-and-forth communication.'], [UserCheck, 'TRUSTED PROFESSIONALS', 'Skilled, vetted people for every category ensuring standard excellence.'], [Clock, 'TRANSPARENT SERVICE', 'Clear pricing and progress tracking from request to completion.'], [Shield, 'COMPLETE PROPERTY CARE', 'From small urgent repairs to long-term ongoing property maintenance.']].map(([Icon, title, desc], i) => (
              <div key={i} className="benefit-box">
                <div className="benefit-header"><Icon size={20} className="benefit-icon" /><h3>{title as string}</h3></div>
                <p>{desc as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTY TYPES */}
      <section id="property-types" className="property-types-section" ref={propertyTypesRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <div className="section-head-center"><span className="kicker">VERSATILE SOLUTIONS</span><h2 className="section-title">Tailored for every property type</h2></div>
          <div className="property-types-grid">
            {[[HomeIcon, 'HOMES', 'Apartments, houses & residential properties across the UK.'], [Briefcase, 'OFFICES', 'Workspaces that need reliable upkeep and zero downtime.'], [Building, 'COMMERCIAL SPACES', 'Shops, restaurants & business properties nationwide.'], [Building2, 'MANAGED PROPERTIES', 'Recurring maintenance for larger real estate portfolios.']].map(([Icon, title, desc], i) => (
              <div key={i} className="property-card"><div className="prop-icon-wrapper"><Icon size={28} /></div><h3>{title as string}</h3><p>{desc as string}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="testimonials-section" ref={testimonialsRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <div className="section-head-center"><span className="kicker">TRUSTED BY PROPERTY OWNERS</span><h2 className="section-title">What our clients say</h2></div>
          <div className="testimonials-grid">
            {testimonialsData.map((t, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-stars">{[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: t.accentColor }}>{t.avatar}</div>
                  <div><div className="testimonial-name">{t.name}</div><div className="testimonial-role">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE FIXORA WAY */}
      <section id="cinematic-story" className="fixora-way-section" ref={cinematicStoryRef as React.RefObject<HTMLElement>}>
        <div className="fixora-way-bg-glow" />
        <div className="container">
          <div className="fixora-way-header"><span className="kicker light">THE FIXORA WAY</span><h2 className="fixora-way-title">A better way to take<br />care of your property.</h2></div>
          <div className="fixora-way-cards bento-grid">
            {storySteps.map((step, idx) => (
              <div key={idx} className="fixora-way-card bento-item">
                <div className="fwc-bg-num">0{idx + 1}</div>
                <div className="fwc-top"><span className="fwc-icon">{step.icon}</span></div>
                <div className="fwc-content"><h3 className="fwc-title">{step.text}</h3><p className="fwc-sub">{step.highlight}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="cta-section">
        <div className="container">
          <div className="cta-block cta-anim">
            <h2 className="cta-title">Whatever your property needs, FIXORA is ready.</h2>
            <p className="cta-sub">One platform. Every essential service. Complete property care across the UK.</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn-primary pill magnetic-btn">Get a Quote</Link>
              <Link to="/contact" className="btn-ghost light-link magnetic-btn" style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '12px 24px', borderRadius: '999px' }}>Talk to FIXORA</Link>
            </div>
          </div>
        </div>
      </section>

      {selectedService && <ServiceDetailPanel service={selectedService} onClose={() => setSelectedService(null)} />}
    </div>
  );
}
