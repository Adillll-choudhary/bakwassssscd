import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './GlobalPresence.css';

const GlobalPresence = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.globe-content', {
      opacity: 0,
      x: -100,
      duration: 1.5,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section global-presence-section">
      {/* Background Video Layer */}
      <div className="presence-video-bg">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="presence-video"
        >
          <source src="/global_video.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay-white"></div>
      </div>

      <div className="section-marker">
        <div className="marker-label">06 // GLOBAL FOOTPRINT</div>
      </div>
      
      <div className="container relative-content">
        <div className="presence-grid">
          <div className="globe-content">
            <h2 className="presence-title">Borderless <br/><span className="text-accent italic">Institutional</span> Reach.</h2>
            <p className="presence-desc">
              From the emerging dynamism of the Mumbai-Dubai corridor to the established financial pillars of London and New York, Daylight Capital maintains a seamless cross-border advisory network.
            </p>
            <div className="presence-stats">
              <div className="presence-stat-item">
                <span className="stat-value">05</span>
                <span className="stat-label">Global Strategic Hubs</span>
              </div>
              <div className="presence-stat-item">
                <span className="stat-value">24/7</span>
                <span className="stat-label">Transactional Availability</span>
              </div>
            </div>
          </div>
          <div className="globe-visual">
            {/* Earth Canvas Removed as per request */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalPresence;
