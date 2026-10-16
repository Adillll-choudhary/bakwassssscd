import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const counterRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // Counter animation
    const obj = { value: 0 };
    tl.to(obj, {
      value: 100,
      duration: 2.5,
      ease: 'power4.inOut',
      onUpdate: () => {
        if (counterRef.current) counterRef.current.textContent = Math.floor(obj.value).toString().padStart(3, '0');
      }
    });

    tl.to(barRef.current, {
      scaleX: 1,
      duration: 2.5,
      ease: 'power4.inOut',
    }, 0);

    tl.to('.preloader-text span', {
      y: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power4.out'
    }, '-=1');

    tl.to(preloaderRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: 'expo.inOut',
      delay: 0.2
    });

  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      <div className="preloader-content">
        <div className="preloader-text">
          <span>DAYLIGHT</span>
          <span className="accent">CAPITAL</span>
        </div>
        <div className="preloader-meta">
          <div className="counter-wrapper">
            <span ref={counterRef}>000</span>
            <span className="percent">%</span>
          </div>
          <div className="preloader-bar-container">
            <div ref={barRef} className="preloader-bar"></div>
          </div>
          <div className="preloader-status">INITIALIZING SYSTEM // 001</div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
