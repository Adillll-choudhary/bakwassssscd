import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Founder.css';

const Founder = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.founder-title-reveal', {
      opacity: 0,
      y: 100,
      duration: 1.5,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      }
    });

    gsap.to('.portrait-placeholder', {
      y: -50,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="insights" className="section insights-cinematic">
      <div className="section-marker">
        <div className="marker-label">04 // INSIGHTS & LEADERSHIP</div>
      </div>
      <div className="container">
        <div className="insights-grid">
          <div className="insights-image-side">
            <div ref={imageRef} className="portrait-container">
              <div className="portrait-placeholder glass-panel">
                <img src="/assets/founder_bg.webp" alt="Keshav Agarwal" className="founder-image" />
                <div className="portrait-grain"></div>
                <div className="portrait-glow"></div>
              </div>
              <div className="portrait-caption">
                <span className="name">KESHAV AGARWAL</span>
                <span className="role">FOUNDER // MANAGING PARTNER</span>
              </div>
            </div>
          </div>
          
          <div className="insights-content-side">
            <div className="founder-title-reveal">
              <h2 className="editorial-title">Architecting <br/><span className="text-accent italic">Tomorrow's</span> <br/>Legacy.</h2>
            </div>
            
            <div className="editorial-body fade-in-section">
              <p className="lead-text">
                "We don't just allocate capital; we architect the structural foundation for brands to dominate their categories over the long horizon."
              </p>
              <div className="bio-columns">
                <p>
                  Keshav brings over a decade of deep strategic insight and transactional expertise across consumer, retail, and technology sectors. Prior to founding Daylight Capital, he led pivotal M&A advisory roles for global category leaders.
                </p>
                <p>
                  His philosophy is rooted in the belief that true value creation happens at the intersection of rigorous financial engineering and uncompromising brand vision.
                </p>
              </div>
              
              <div className="insights-cta">
                <a href="#" className="button-glass">READ LEADERSHIP JOURNAL</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
