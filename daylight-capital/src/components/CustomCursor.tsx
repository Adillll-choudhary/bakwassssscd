import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use quickSetter for high-performance cursor tracking
    const xSetter = gsap.quickSetter(cursor, "x", "px");
    const ySetter = gsap.quickSetter(cursor, "y", "px");

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      
      xSetter(x);
      ySetter(y);

      // Sophisticated Target Detection
      const target = e.target as HTMLElement;
      const isMagnetic = target.closest('.magnetic-button-wrap');
      const isLink = target.closest('a') || target.closest('button') || target.closest('.nav-item');
      const isCard = target.closest('.service-premium-card') || target.closest('.industry-panel') || target.closest('.metric-col');
      const isText = target.closest('h1') || target.closest('h2') || target.closest('h3') || target.closest('.preview-title');

      if (isMagnetic) {
        gsap.to(cursor, {
          width: 140,
          height: 140,
          opacity: 1,
          backgroundColor: 'rgba(197, 160, 89, 0.15)',
          border: '2px solid var(--color-accent)',
          boxShadow: '0 0 35px rgba(197, 160, 89, 0.6)',
          mixBlendMode: 'normal',
          duration: 0.4,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      } else if (isLink) {
        gsap.to(cursor, {
          width: 0,
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else if (isCard) {
        gsap.to(cursor, {
          width: 90,
          height: 90,
          opacity: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--color-accent)',
          boxShadow: 'none',
          mixBlendMode: 'difference',
          duration: 0.5,
          ease: 'expo.out',
          overwrite: 'auto'
        });
      } else if (isText) {
        gsap.to(cursor, {
          width: 70,
          height: 70,
          opacity: 1,
          backgroundColor: 'var(--color-bg-primary)',
          border: '0px solid transparent',
          boxShadow: 'none',
          mixBlendMode: 'difference',
          duration: 0.4,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      } else {
        gsap.to(cursor, {
          width: 12,
          height: 12,
          opacity: 1,
          backgroundColor: 'var(--color-accent)',
          mixBlendMode: 'difference',
          backdropFilter: 'blur(0px)',
          border: '0px solid transparent',
          boxShadow: 'none',
          duration: 0.4,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={cursorRef} className="custom-dot"></div>
  );
};

export default CustomCursor;

