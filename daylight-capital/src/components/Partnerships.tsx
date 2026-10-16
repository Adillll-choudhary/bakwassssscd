import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Partnerships.css';

const Partnerships = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.partner-card', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      }
    });

    gsap.from('.partnership-bg-img', {
      scale: 1.2,
      duration: 3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        scrub: true
      }
    });
  }, { scope: container });

  const partners = ["TATA", "RELIANCE", "SEQUOIA", "TIGER GLOBAL", "ACEL", "MATRIX"];

  return (
    <section ref={container} className="partnerships-section">
      <div className="partnership-visual-bg">
        <img src="/assets/sector_global_landscape_1778521601402.webp" alt="Global Horizon" className="partnership-bg-img" />
        <div className="partnership-vignette"></div>
      </div>
      
      <div className="container">
        <div className="partnership-content">
          <div className="partnership-header">
            <span className="eyebrow-p">TRUSTED BY THE ELITE</span>
            <h2 className="title-p">Global <span className="serif-italic">Capital</span> Network</h2>
            <p className="desc-p">
              We bridge the gap between visionary founders and the world's most 
              sophisticated institutional investors.
            </p>
          </div>
          
          <div className="partners-grid">
            {partners.map(p => (
              <div key={p} className="partner-card">
                <span className="partner-logo-text">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partnerships;
