import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      gsap.to(dot, { x: mouseX - 4, y: mouseY - 4, duration: 0.05, ease: 'none' });
    };

    // Smooth cursor lag
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      gsap.set(cursor, { x: cursorX - 20, y: cursorY - 20 });
      requestAnimationFrame(animate);
    };
    animate();

    // Hover effects
    const onEnter = () => {
      gsap.to(cursor, { scale: 2.2, opacity: 0.6, duration: 0.3, ease: 'power2.out' });
    };
    const onLeave = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
    };

    // Click effect
    const onClick = () => {
      gsap.timeline()
        .to(cursor, { scale: 0.7, duration: 0.1, ease: 'power2.in' })
        .to(cursor, { scale: 1, duration: 0.3, ease: 'elastic.out(1.2, 0.5)' });
    };

    const interactives = document.querySelectorAll('button, a, [data-cursor-hover]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
