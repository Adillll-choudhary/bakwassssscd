import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Network.css';

const Network = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.network-pill', {
      scale: 0.8,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      }
    });
  }, { scope: container });

  const investors = [
    "SEQUOIA CAPITAL", "TIGER GLOBAL", "ACEL PARTNERS", 
    "MATRIX PARTNERS", "SOFTBANK VISION FUND", "LIGHTSPEED",
    "TEMASEK", "GENERAL ATLANTIC", "PROSUS VENTURES"
  ];

  return (
    <section ref={container} className="network-section">
      <div className="container">
        <div className="network-header">
          <span className="eyebrow-n">OUR ECOSYSTEM</span>
          <h2 className="title-n">An Institutional <br/> <span className="serif-italic">Investor Network.</span></h2>
          <p className="desc-n">
            We operate at the intersection of visionary entrepreneurship and 
            world-class institutional capital.
          </p>
        </div>
        
        <div className="network-grid-fluid">
          {investors.map((name, i) => (
            <div key={i} className="network-pill">
              <div className="pill-dot"></div>
              <span className="pill-text">{name}</span>
            </div>
          ))}
        </div>
        
        <div className="network-footer-tag">
          <span>GLOBAL REACH // LOCAL DEPTH // INSTITUTIONAL RIGOR</span>
        </div>
      </div>
    </section>
  );
};

export default Network;
