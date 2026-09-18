import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CheckCircle2, ArrowRight, Building2, Home as HomeIcon,
  Briefcase, Building, UserCheck, Shield, Layers, Clock,
  ChevronRight, AlertTriangle, Search, Zap, Star,
  ShieldCheck, FileText, CheckSquare, Award, ArrowDown, X, LogIn
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { ServiceDetailPanel } from '../components/ServiceDetailPanel';
import type { ServiceData } from '../components/ServiceDetailPanel';
import { servicesData } from '../data/servicesData';

if (!ScrollTrigger.version) gsap.registerPlugin(ScrollTrigger);

const storySteps = [
  { text: 'Something breaks.', highlight: 'Unexpected maintenance issues interrupt your day.', icon: <AlertTriangle size={40} color="#10B981" strokeWidth={1.5} /> },
  { text: 'VERSAL AXIS finds the right service.', highlight: 'Instantly matched with verified property experts.', icon: <Search size={40} color="#10B981" strokeWidth={1.5} /> },
  { text: 'A professional arrives.', highlight: 'On-time, equipped, and background-checked.', icon: <Zap size={40} color="#10B981" strokeWidth={1.5} /> },
  { text: 'The problem gets solved.', highlight: 'High quality work with transparent verification.', icon: <CheckCircle2 size={40} color="#10B981" strokeWidth={1.5} /> },
  { text: 'Your property keeps moving.', highlight: 'End-to-end care so you can focus on what matters.', icon: <HomeIcon size={40} color="#10B981" strokeWidth={1.5} /> },
];

const testimonialsData = [
  { name: 'Sarah M.', role: 'Homeowner, South London', text: 'VERSAL AXIS transformed how I manage my home. I used to chase multiple different contractors — now one call handles everything from boiler servicing to plumbing. Absolutely brilliant service.', rating: 5, avatar: 'SM', accentColor: '#10B981' },
  { name: 'James K.', role: 'Property Manager, Manchester', text: 'Managing a portfolio of properties used to be exhausting. VERSAL AXIS cuts my coordination time in half. The professionals are all verified and always arrive on time.', rating: 5, avatar: 'JK', accentColor: '#3B82F6' },
  { name: 'Aisha L.', role: 'Office Manager, Birmingham', text: 'Our office needed electrical work, painting and a deep clean all at once. VERSAL AXIS coordinated the whole thing seamlessly — zero disruption to the team.', rating: 5, avatar: 'AL', accentColor: '#8B5CF6' },
];

export function HomePage() {
  const { isLoggedIn, login } = useDemo();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleBookServiceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate('/requester/create-request');
    } else {
      setShowLoginModal(true);
    }
  };

  const handle1ClickLoginAndBook = () => {
    login('demo@fixora.com', 'demo123');
    setShowLoginModal(false);
    navigate('/requester/create-request');
  };

  const handleGoToLoginPage = () => {
    setShowLoginModal(false);
    navigate('/demo-login?redirect=/requester/create-request&action=book');
  };

  const handleContinueAsGuest = () => {
    setShowLoginModal(false);
    navigate('/requester/create-request');
  };

  const handleExploreServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const heroWrapperRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const scrollCanvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLElement>(null);
  const gaugePctRef = useRef<HTMLSpanElement>(null);
  const trustStripRef = useRef<HTMLElement>(null);
  const comparisonRef = useRef<HTMLElement>(null);
  const builtTrustRef = useRef<HTMLElement>(null);
  const trustRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const propertySystemRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const whyFixoraRef = useRef<HTMLElement>(null);
  const propertyTypesRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const cinematicStoryRef = useRef<HTMLElement>(null);
  const licensingTrustRef = useRef<HTMLElement>(null);

  const prefersReducedMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (anchor) { e.preventDefault(); const el = document.getElementById(anchor.getAttribute('href')!.slice(1)); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
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
    const container = wrapperRef.current;
    const canvas = scrollCanvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frameCount = 240;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    let currentFrame = 0;
    let frameRequest = 0;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrame);
    };

    const drawFrame = (index: number) => {
      let targetImg = images[index];
      if (!targetImg || !targetImg.complete) {
        for (let offset = 1; offset < frameCount; offset++) {
          if (index - offset >= 0 && images[index - offset]?.complete) {
            targetImg = images[index - offset];
            break;
          }
          if (index + offset < frameCount && images[index + offset]?.complete) {
            targetImg = images[index + offset];
            break;
          }
        }
      }
      if (!targetImg || !targetImg.complete || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.max(canvas.width / targetImg.naturalWidth, canvas.height / targetImg.naturalHeight);
      const w = targetImg.naturalWidth * scale;
      const h = targetImg.naturalHeight * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;
      ctx.drawImage(targetImg, x, y, w, h);
    };

    const updateProgress = () => {
      const rect = container.getBoundingClientRect();
      const maxScroll = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.max(0, Math.min(1, (-rect.top) / maxScroll));

      if (gaugePctRef.current) {
        gaugePctRef.current.textContent = `${Math.round(progress * 100)}%`;
      }

      const targetFrame = Math.min(frameCount - 1, Math.floor(progress * (frameCount - 1)));
      if (targetFrame !== currentFrame) {
        currentFrame = targetFrame;
        drawFrame(currentFrame);
      }
    };

    const queueUpdate = () => {
      if (frameRequest) return;
      frameRequest = window.requestAnimationFrame(() => {
        frameRequest = 0;
        updateProgress();
      });
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `/frames_v3/frame_${i.toString().padStart(4, '0')}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (i === 0 || loadedCount === 1) {
          setCanvasSize();
          drawFrame(0);
        }
        if (loadedCount === frameCount) {
          updateProgress();
        }
      };
      images.push(img);
    }

    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', () => { setCanvasSize(); queueUpdate(); }, { passive: true });

    setCanvasSize();

    return () => {
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', setCanvasSize);
      if (frameRequest) window.cancelAnimationFrame(frameRequest);
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

      if (trustStripRef.current) {
        gsap.fromTo(trustStripRef.current.querySelectorAll('.trust-strip-anim'), { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: trustStripRef.current, ...stConfig } });
      }

      if (comparisonRef.current) {
        gsap.fromTo(comparisonRef.current.querySelectorAll('.comp-anim'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.14, ease: 'power3.out', scrollTrigger: { trigger: comparisonRef.current, ...stConfig } });
      }

      if (builtTrustRef.current) {
        gsap.fromTo(builtTrustRef.current.querySelectorAll('.bt-anim'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: builtTrustRef.current, ...stConfig } });
      }

      if (trustRef.current) {
        gsap.fromTo(trustRef.current.querySelectorAll('.trust-anim'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: trustRef.current, ...stConfig } });
        gsap.fromTo(trustRef.current.querySelectorAll('.trust-card'), { y: 50, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.4)', scrollTrigger: { trigger: trustRef.current, start: 'top 75%' } });
      }

      if (statsRef.current) {
        gsap.fromTo(statsRef.current.querySelectorAll('.stat-item'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.14, ease: 'power3.out', scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } });
      }

      if (servicesRef.current) {
        const list = servicesRef.current.querySelector('.services-cinematic-list');
        if (list) gsap.fromTo(list, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: list, start: 'top 85%' } });
      }

      if (propertySystemRef.current) {
        gsap.fromTo(propertySystemRef.current.querySelectorAll('.system-anim'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: propertySystemRef.current, ...stConfig } });
      }

      if (howItWorksRef.current) {
        gsap.fromTo(howItWorksRef.current.querySelectorAll('.step-card'), { y: 60, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: howItWorksRef.current, ...stConfig } });
      }

      if (whyFixoraRef.current) {
        gsap.fromTo(whyFixoraRef.current.querySelectorAll('.benefit-box'), { y: 45, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: whyFixoraRef.current, ...stConfig } });
      }

      if (propertyTypesRef.current) {
        gsap.fromTo(propertyTypesRef.current.querySelectorAll('.property-card'), { y: 55, opacity: 0, scale: 0.93 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.12, ease: 'back.out(1.4)', scrollTrigger: { trigger: propertyTypesRef.current, ...stConfig } });
      }

      if (testimonialsRef.current) {
        gsap.fromTo(testimonialsRef.current.querySelectorAll('.testimonial-card'), { y: 60, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: testimonialsRef.current, start: 'top 80%' } });
      }

      if (cinematicStoryRef.current) {
        gsap.fromTo(cinematicStoryRef.current.querySelectorAll('.fixora-way-card'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.14, ease: 'power3.out', scrollTrigger: { trigger: cinematicStoryRef.current, start: 'top 80%' } });
      }

      if (licensingTrustRef.current) {
        gsap.fromTo(licensingTrustRef.current.querySelector('.licensing-trust-box'), { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: licensingTrustRef.current, start: 'top 80%' } });
      }

      if (wrapperRef.current) {
        const canvasSticky = wrapperRef.current.querySelector('.canvas-sticky');
        if (canvasSticky) gsap.fromTo(canvasSticky, { y: 80, scale: 0.96, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: wrapperRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } });
      }
    });
    return () => ctx.revert();
  }, [prefersReducedMotion]);


  return (
    <div className="fixora-landing">
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress * 100}%` }} />

      {/* 1. HERO SECTION */}
      <section className="hero-section" ref={heroWrapperRef}>
        <video ref={heroVideoRef} className="hero-video-bg" src="/hero-facility.mp4" autoPlay muted loop playsInline />
        <div className="hero-overlay" />
        <div className="hero-grain" />
        <div className="hero-content-wrapper" ref={heroContentRef}>
          <div className="hero-badge hero-stagger-item">
            <span className="dot" />
            TRUSTED PROPERTY SERVICES NETWORK
          </div>
          <h1 className="hero-headline">
            <span className="hero-headline-line">One Property.</span>
            <span className="hero-headline-line accent-italic">Every Fix.</span>
          </h1>

          <p className="hero-subtitle hero-stagger-item">
            VERSAL AXIS brings essential property repair, maintenance and care into one simple experience.
          </p>

          <div className="hero-actions hero-stagger-item">
            <button onClick={handleBookServiceClick} className="btn-primary dark-pill magnetic-btn" style={{ border: 'none', cursor: 'pointer' }}>
              Book a Service
            </button>
            <a href="#services" onClick={handleExploreServicesClick} className="btn-ghost light-link magnetic-btn" style={{ cursor: 'pointer' }}>
              Explore Services <ArrowRight size={16} style={{ display: 'inline', marginLeft: 4 }} />
            </a>
          </div>

          <div className="hero-metrics hero-stagger-item">
            <div className="hero-metric"><span className="hero-metric-num">500+</span><span className="hero-metric-label">Trusted Providers</span></div>
            <div className="hero-metric-divider" />
            <div className="hero-metric"><span className="hero-metric-num">8+</span><span className="hero-metric-label">Core Services</span></div>
            <div className="hero-metric-divider" />
            <div className="hero-metric"><span className="hero-metric-num">100%</span><span className="hero-metric-label">Accountable Service</span></div>
          </div>
        </div>
        <div className="scroll-indicator hero-stagger-item">
          <div className="scroll-indicator-mouse"><div className="scroll-indicator-wheel" /></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* 2. HIGH-VISIBILITY TRUST STRIP DIRECTLY BELOW HERO */}
      <section id="trust-strip" className="trust-strip-section" ref={trustStripRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <div className="trust-strip-header trust-strip-anim">
            <span className="kicker">THE DIFFERENCE IS TRUST</span>
            <h2 className="trust-strip-title">The difference is trust.</h2>
            <p className="trust-strip-subtitle">
              Your property deserves more than a provider who simply says they can do the job. Versal Axis is designed around trusted service partners and a structured process that keeps every requirement visible from request to completion.
            </p>
          </div>
          <div className="trust-strip-grid">
            <div className="trust-strip-card trust-strip-anim">
              <div className="trust-strip-icon-box"><ShieldCheck size={26} /></div>
              <h3>TRUSTED PROVIDERS</h3>
              <p>A carefully selected network of service providers.</p>
            </div>
            <div className="trust-strip-card trust-strip-anim">
              <div className="trust-strip-icon-box"><FileText size={26} /></div>
              <h3>CLEAR PROPOSALS</h3>
              <p>Transparent service requirements, timelines and costs.</p>
            </div>
            <div className="trust-strip-card trust-strip-anim">
              <div className="trust-strip-icon-box"><CheckSquare size={26} /></div>
              <h3>MANAGED PROJECTS</h3>
              <p>Visibility from request through completion.</p>
            </div>
            <div className="trust-strip-card trust-strip-anim">
              <div className="trust-strip-icon-box"><Award size={26} /></div>
              <h3>ACCOUNTABLE SERVICE</h3>
              <p>A structured process designed to reduce uncertainty.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SCROLLING VIDEO ANIMATION - DIRECTLY BELOW TRUST STRIP */}
      <section className="canvas-wrapper" ref={wrapperRef as React.RefObject<HTMLElement>}>
        <div className="canvas-sticky">
          <canvas ref={scrollCanvasRef} className="canvas-video" />
          <div className="progress-gauge">
            <span className="pct" ref={gaugePctRef}>0%</span>
            <span className="lbl">Property</span>
          </div>
        </div>
      </section>

      {/* 4. VISUAL "THE OLD WAY VS VERSAL AXIS" COMPARISON */}
      <section id="comparison" className="comparison-section" ref={comparisonRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <div className="section-head-center comp-anim">
            <span className="kicker">PROCUREMENT CONTRAST</span>
            <h2 className="section-title">The Risk vs. The Versal Axis Approach</h2>
            <p className="section-subtitle">Comparing unmanaged contractor risk with Versal Axis's structured, accountable service delivery.</p>
          </div>

          <div className="comparison-grid">
            {/* LEFT: THE RISK */}
            <div className="comparison-card risk-card comp-anim">
              <div className="comparison-header">
                <span className="comparison-badge risk-badge"><AlertTriangle size={14} /> THE RISK</span>
                <h3>Uncertain & Unmanaged</h3>
              </div>
              <div className="comparison-flow">
                <div className="flow-step risk-flow-step">
                  <span className="flow-badge">01</span>
                  <div className="flow-content">
                    <strong>Unknown provider</strong>
                    <p>Hiring without performance history or verification</p>
                  </div>
                </div>
                <div className="flow-connector"><ArrowDown size={14} /></div>
                <div className="flow-step risk-flow-step">
                  <span className="flow-badge">02</span>
                  <div className="flow-content">
                    <strong>Payment upfront</strong>
                    <p>Financial commitment before scope is finalized</p>
                  </div>
                </div>
                <div className="flow-connector"><ArrowDown size={14} /></div>
                <div className="flow-step risk-flow-step">
                  <span className="flow-badge">03</span>
                  <div className="flow-content">
                    <strong>Missed appointment</strong>
                    <p>Unpredictable timelines and lack of communication</p>
                  </div>
                </div>
                <div className="flow-connector"><ArrowDown size={14} /></div>
                <div className="flow-step risk-flow-step">
                  <span className="flow-badge">04</span>
                  <div className="flow-content">
                    <strong>Poor / incomplete service</strong>
                    <p>Substandard work execution without oversight</p>
                  </div>
                </div>
                <div className="flow-connector"><ArrowDown size={14} /></div>
                <div className="flow-step risk-flow-step">
                  <span className="flow-badge">05</span>
                  <div className="flow-content">
                    <strong>Unclear accountability</strong>
                    <p>Disappearing contractors and zero recourse</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: THE VERSAL AXIS APPROACH */}
            <div className="comparison-card fixora-card comp-anim">
              <div className="comparison-header">
                <span className="comparison-badge fixora-badge"><CheckCircle2 size={14} /> THE VERSAL AXIS APPROACH</span>
                <h3>Structured & Accountable</h3>
              </div>
              <div className="comparison-flow">
                <div className="flow-step fixora-flow-step">
                  <span className="flow-badge active">01</span>
                  <div className="flow-content">
                    <strong>Trusted provider</strong>
                    <p>Assigned from Versal Axis's carefully selected network</p>
                  </div>
                </div>
                <div className="flow-connector active"><ArrowDown size={14} /></div>
                <div className="flow-step fixora-flow-step">
                  <span className="flow-badge active">02</span>
                  <div className="flow-content">
                    <strong>Structured proposal</strong>
                    <p>Clear requirements, transparent costs & timeline</p>
                  </div>
                </div>
                <div className="flow-connector active"><ArrowDown size={14} /></div>
                <div className="flow-step fixora-flow-step">
                  <span className="flow-badge active">03</span>
                  <div className="flow-content">
                    <strong>Clear timeline</strong>
                    <p>Confirmed schedule with proactive milestone tracking</p>
                  </div>
                </div>
                <div className="flow-connector active"><ArrowDown size={14} /></div>
                <div className="flow-step fixora-flow-step">
                  <span className="flow-badge active">04</span>
                  <div className="flow-content">
                    <strong>Managed project</strong>
                    <p>Full lifecycle visibility from start to finish</p>
                  </div>
                </div>
                <div className="flow-connector active"><ArrowDown size={14} /></div>
                <div className="flow-step fixora-flow-step">
                  <span className="flow-badge active">05</span>
                  <div className="flow-content">
                    <strong>Completion tracking</strong>
                    <p>Verified delivery and logged job completion history</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAKE TRUST A CORE VERSAL AXIS BRAND PRINCIPLE */}
      <section id="built-around-trust" className="built-trust-section" ref={builtTrustRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <div className="section-head-center bt-anim">
            <span className="kicker">BRAND PRINCIPLES</span>
            <h2 className="section-title">Built around trust</h2>
            <p className="section-subtitle">
              Versal Axis brings trusted service providers and structured property-service management together in one platform.
            </p>
          </div>
          <div className="built-trust-grid">
            <div className="built-trust-card bt-anim">
              <div className="built-trust-icon"><UserCheck size={28} /></div>
              <h3>Trusted Provider Network</h3>
              <p>Connect businesses with service providers within the Versal Axis network.</p>
            </div>
            <div className="built-trust-card bt-anim">
              <div className="built-trust-icon"><Layers size={28} /></div>
              <h3>Structured Workflow</h3>
              <p>Every requirement follows a clear process from request to completion.</p>
            </div>
            <div className="built-trust-card bt-anim">
              <div className="built-trust-icon"><FileText size={28} /></div>
              <h3>Transparent Pricing</h3>
              <p>Service costs, timelines and requirements are clearly presented before approval.</p>
            </div>
            <div className="built-trust-card bt-anim">
              <div className="built-trust-icon"><Clock size={28} /></div>
              <h3>Project Visibility</h3>
              <p>Keep track of the work throughout the project lifecycle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SHOW THE SERVICE NETWORK */}
      <section id="services" className="services-cinematic-section" ref={servicesRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <div className="section-head-center">
            <span className="kicker">TRUSTED PROVIDER NETWORK</span>
            <h2 className="section-title">Essential Property Services</h2>
            <p className="section-subtitle">One trusted network across essential property services. Click any service to explore details.</p>
          </div>
          <div className="services-cinematic-list">
            {servicesData.map((svc, idx) => {
              const IconComp = svc.icon;
              return (
                <div key={svc.num} className="service-cinematic-card" style={{ top: '100px', zIndex: idx }} onClick={() => setSelectedService(svc)}>
                  <div className="service-card-left">
                    <div className="service-number-pill">
                      <span className="svc-num">{svc.num}</span>
                      <span className="svc-badge-pill">{svc.badge}</span>
                    </div>
                    <h3 className="svc-title">{svc.title}</h3>
                    <p className="svc-tagline">{svc.tagline}</p>

                    <div className="svc-trusted-tag">
                      <ShieldCheck size={13} /> Selected Network Provider
                    </div>

                    <div className="svc-tasks-container">
                      <span className="tasks-label">KEY CAPABILITIES</span>
                      <div className="tasks-grid">
                        {svc.tasks.map(task => (
                          <div key={task} className="task-chip">
                            <CheckCircle2 size={14} className="task-check" />
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button className="svc-cta-btn magnetic-btn" onClick={(e) => { e.stopPropagation(); setSelectedService(svc); }}>
                      <span>Learn More</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="service-card-right" style={{ backgroundImage: `url(${svc.image})` }}>
                    <div className="card-image-overlay" />
                    <div className="cinematic-graphic-wrapper">
                      <div className="graphic-icon-main glass-floating"><IconComp size={52} color="#FFFFFF" strokeWidth={1.5} /></div>
                      <div className="graphic-glass-card">
                        <div className="glass-indicator"><span className="live-dot" /> Active Coverage</div>
                        <div className="glass-metric">Trusted Provider Network</div>
                      </div>
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
          <div className="section-head-center system-anim">
            <span className="kicker">INTEGRATED PLATFORM</span>
            <h2 className="section-title">One system for the whole property.</h2>
            <p className="section-subtitle">From everyday repairs to complete property care, VERSAL AXIS connects every essential service through one simple experience.</p>
          </div>
          <div className="system-composition-wrapper">
            <div className="system-center-hub system-node"><div className="hub-inner"><span className="hub-logo">VERSAL AXIS</span><span className="hub-tag">Core Engine</span></div></div>
            <div className="system-nodes-grid">
              {['Plumbing', 'Electrical', 'HVAC & AC', 'Cleaning', 'Painting', 'Pest Control', 'Security', 'Maintenance'].map((node, idx) => (
                <div key={node} className={`system-node node-item node-${idx + 1}`}><div className="node-dot" /><span className="node-name">{node}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. STRENGTHEN THE VERSAL AXIS WORKFLOW */}
      <section id="how-it-works" className="how-section" ref={howItWorksRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <div className="section-head-center">
            <span className="kicker">STRUCTURED SERVICE DELIVERY</span>
            <h2 className="section-title">Accountable Property Care Workflow</h2>
            <p className="section-subtitle">Versal Axis ensures every property request is handled through a transparent, managed process.</p>
          </div>
          <div className="workflow-timeline-grid">
            <div className="step-card">
              <div className="step-num-wrap">
                <span className="step-num">01</span>
                <span className="workflow-tag">REQUEST</span>
              </div>
              <h3>Property requirement submitted</h3>
              <p>Log service specs, urgency, and location details directly in the system.</p>
            </div>

            <div className="step-card">
              <div className="step-num-wrap">
                <span className="step-num">02</span>
                <span className="workflow-tag">PROPOSAL</span>
              </div>
              <h3>Structured scope, timeline and cost</h3>
              <p>Transparent service requirements, timelines and costs before work begins.</p>
            </div>

            <div className="step-card">
              <div className="step-num-wrap">
                <span className="step-num">03</span>
                <span className="workflow-tag highlight">TRUSTED PROVIDER</span>
              </div>
              <h3>Service assigned through the Versal Axis network</h3>
              <p>Assigned to a qualified, accountable service provider within our network.</p>
            </div>

            <div className="step-card">
              <div className="step-num-wrap">
                <span className="step-num">04</span>
                <span className="workflow-tag">PROJECT</span>
              </div>
              <h3>Work is managed and tracked</h3>
              <p>Active tracking and full visibility throughout the project lifecycle.</p>
            </div>

            <div className="step-card">
              <div className="step-num-wrap">
                <span className="step-num">05</span>
                <span className="workflow-tag">COMPLETION</span>
              </div>
              <h3>Service completed and recorded</h3>
              <p>Verified delivery and logged job completion record for total clarity.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/how-it-works" className="btn-primary pill" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              See Full Process <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY VERSAL AXIS */}
      <section id="why-fixora" className="why-section" ref={whyFixoraRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <div className="section-head-center"><span className="kicker">THE VERSAL AXIS ADVANTAGE</span><h2 className="section-title">Built for complete peace of mind</h2></div>
          <div className="benefits-grid">
            {[[Layers, 'ONE PLATFORM', 'Everything you need in one place, eliminating back-and-forth communication.'], [UserCheck, 'TRUSTED PROVIDER NETWORK', 'Skilled, vetted service partners for every category ensuring standard excellence.'], [Clock, 'TRANSPARENT SERVICE', 'Clear pricing and progress tracking from request to completion.'], [Shield, 'COMPLETE PROPERTY CARE', 'From small urgent repairs to long-term ongoing property maintenance.']].map(([Icon, title, desc], i) => (
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

      {/* THE VERSAL AXIS WAY */}
      <section id="cinematic-story" className="fixora-way-section" ref={cinematicStoryRef as React.RefObject<HTMLElement>}>
        <div className="fixora-way-bg-glow" />
        <div className="container">
          <div className="fixora-way-header"><span className="kicker light">THE VERSAL AXIS WAY</span><h2 className="fixora-way-title">A better way to take<br />care of your property.</h2></div>
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

      {/* 7. STRONG TRUST STATEMENT BEFORE LICENSING CTA */}
      <section id="licensing-cta" className="licensing-trust-section" ref={licensingTrustRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <div className="licensing-trust-box">
            <span className="kicker light">DEPENDABLE PROPERTY MANAGEMENT</span>
            <h2 className="licensing-trust-title">Property services should never feel like a gamble.</h2>
            <p className="licensing-trust-subtitle">
              Versal Axis creates a more structured and dependable way for businesses to manage property services — bringing trusted providers, transparent proposals and project visibility together in one platform.
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn-primary dark-pill magnetic-btn" style={{ background: 'var(--bright-teal)', color: 'var(--ink)' }}>EXPLORE VERSAL AXIS</Link>
              <Link to="/contact" className="btn-ghost light-link magnetic-btn" style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '14px 28px', borderRadius: '999px' }}>DISCUSS LICENSING</Link>
            </div>
          </div>
        </div>
      </section>

      {selectedService && <ServiceDetailPanel service={selectedService} onClose={() => setSelectedService(null)} />}

      {/* SERVICE LOGIN OPTION MODAL */}
      {showLoginModal && (
        <div className="modal-backdrop" onClick={() => setShowLoginModal(false)}>
          <div className="book-modal-card" onClick={e => e.stopPropagation()}>
            <div className="book-modal-header">
              <div>
                <div className="book-modal-badge">
                  <ShieldCheck size={13} /> Service Access
                </div>
                <h3 className="book-modal-title">Sign In to Book a Service</h3>
                <p className="book-modal-sub">
                  Sign in with your Requester account to create service requests, review live proposals, and track verified providers from start to finish.
                </p>
              </div>
              <button className="book-modal-close" onClick={() => setShowLoginModal(false)} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div className="book-modal-creds">
              <div className="book-modal-creds-title">Demo Requester Account</div>
              <div className="book-modal-creds-row">
                <span>Email:</span>
                <code>demo@fixora.com</code>
              </div>
              <div className="book-modal-creds-row">
                <span>Password:</span>
                <code>demo123</code>
              </div>
            </div>

            <div className="book-modal-options">
              <button className="book-option-btn-primary" onClick={handle1ClickLoginAndBook}>
                <span>1-Click Launch & Book Service</span>
                <ArrowRight size={18} />
              </button>

              <button className="book-option-btn-secondary" onClick={handleGoToLoginPage}>
                <span>Go to Service Sign In Page</span>
                <LogIn size={16} />
              </button>

              <button className="book-guest-link" onClick={handleContinueAsGuest}>
                Or continue to booking form without signing in →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
