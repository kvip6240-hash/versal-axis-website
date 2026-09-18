import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Only show preloader once per session
    const seen = sessionStorage.getItem('fixora_preloader_seen');
    if (seen) {
      setShow(false);
      onComplete();
      return;
    }

    const tl = gsap.timeline();

    // 1. Fade in logo
    tl.fromTo(logoRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
      0.3
    );

    // 2. Animate progress bar + counter
    tl.to(progressBarRef.current, {
      width: '100%',
      duration: 1.8,
      ease: 'power2.inOut',
    }, 0.6);

    // Animate percent counter
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (percentRef.current) {
          percentRef.current.textContent = Math.round(counter.val) + '%';
        }
      }
    }, 0.6);

    // 3. Iris wipe out (scale up and fade)
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 1.04,
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => {
        sessionStorage.setItem('fixora_preloader_seen', 'true');
        setShow(false);
        onComplete();
      }
    }, '+=0.3');

    return () => { tl.kill(); };
  }, [onComplete]);

  if (!show) return null;

  return (
    <div ref={containerRef} className="preloader-root" aria-hidden="true">
      <div ref={logoRef} className="preloader-logo-wrap">
        <img src="/fixora-logo.png" alt="VERSAL AXIS" className="preloader-logo-img" />
        <span className="preloader-wordmark">VERSAL AXIS</span>
      </div>
      <div className="preloader-bar-wrap">
        <div className="preloader-bar-track">
          <div ref={progressBarRef} className="preloader-bar-fill" />
        </div>
        <span ref={percentRef} className="preloader-percent">0%</span>
      </div>
      <p className="preloader-tagline">Complete Property Care</p>
    </div>
  );
}
