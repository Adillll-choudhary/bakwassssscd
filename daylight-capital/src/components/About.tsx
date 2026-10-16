import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './About.css';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Ultra-Premium Infinite Marquee Movement
    const track = trackRef.current;
    if (!track) return;

    // Calculate width for absolute smoothness
    const trackWidth = track.scrollWidth;
    
    const animation = gsap.to(track, {
      x: -trackWidth / 2,
      duration: 120, // Significantly slower for luxury feel
      repeat: -1,
      ease: "none",
      onRestart: () => {
        // Ensure seamless reset
        gsap.set(track, { x: 0 });
      }
    });

    // Hover Interaction via GSAP for better control
    const marquee = marqueeRef.current;
    if (marquee) {
      marquee.addEventListener('mouseenter', () => {
        gsap.to(animation, { timeScale: 0.15, duration: 1, ease: 'power2.out' });
      });
      marquee.addEventListener('mouseleave', () => {
        gsap.to(animation, { timeScale: 1, duration: 1.5, ease: 'power2.inOut' });
      });
    }

    // Reveal animations for text content
    gsap.from('.reveal-text', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });
  }, { scope: sectionRef });

  const sectors = ["CONSUMER", "STRATEGY", "GROWTH", "CAPITAL", "ADVISORY", "SCALE", "PARTNERSHIPS", "EXPANSION", "INVESTORS", "VENTURE", "EQUITY", "LEADERSHIP", "EXECUTION", "INSIGHTS", "MOMENTUM", "AMBITION"];

  return (
    <section ref={sectionRef} id="about" className="about-refined">
      <div className="container">
        <div className="about-grid-cinematic">
          <div className="about-col-content">
            <div className="about-eyebrow reveal-text">WHO WE ARE</div>
            <h2 className="about-heading-large reveal-text">
              We Partner.<br/>
              We Advise.<br/>
              <span className="text-accent" style={{ fontStyle: 'italic' }}>We Build Value.</span>
            </h2>
            <div className="about-description">
              <p className="about-desc-text reveal-text">
                Daylight Capital is a strategic advisory and consulting firm built for consumer businesses. We work alongside founders to navigate growth, capital, and critical business decisions with clarity and conviction.
              </p>
              <p className="about-desc-text reveal-text">
                Whether raising capital, structuring debt, refining strategy, or preparing for scale, we combine analytical rigor with practical execution to support long-term value creation.
              </p>
            </div>
            
            <div className="about-action reveal-text">
              <button className="about-btn-pill">
                LEARN MORE ABOUT US
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </button>
            </div>

            <div className="about-metrics-ultra reveal-text">
              <div className="metric-item">
                <span className="m-val-gold">New Age</span>
                <span className="m-label">STRATEGIC THINKING</span>
              </div>
              <div className="metric-item">
                <span className="m-val-gold">Tier-1</span>
                <span className="m-label">GLOBAL INVESTOR NETWORK</span>
              </div>
            </div>
          </div>
          
          <div className="about-col-image">
            <div className="about-image-full glass-panel">
              <img src="/assets/about_bg.webp" alt="Lobby" className="parallax-img" />
            </div>
          </div>
        </div>
      </div>

      <div className="marquee-ultra-container" ref={marqueeRef}>
        <div className="marquee-track" ref={trackRef}>
          {/* Duplicate the groups twice for perfect seamless looping */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="marquee-group">
              {sectors.map((sector, idx) => (
                <div key={idx} className="marquee-item">
                  <span className="sector-text">{sector}</span>
                  <span className="sector-outline">{sector}</span>
                  <span className="sector-star">✦</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="marquee-glass-overlay"></div>
      </div>
    </section>
  );
};

export default About;
