import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const container = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    


    // Initial state
    gsap.set('.hero-title-reveal', { y: '125%', skewY: 10, opacity: 0 });
    
    tl.to('.hero-title .mask-reveal .hero-title-reveal', {
      y: '0%',
      skewY: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 2.4,
      ease: 'power2.out',
      force3D: true,
      clearProps: 'transform' // Reset transform after animation for stability
    }, "-=0.5");

    tl.from('.hero-subtitle-container, .hero-actions-refined', {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 1.4,
      ease: 'power2.out'
    }, "-=1");

  }, { scope: container });



  return (
    <section ref={container} className="hero-motion-specialist">
      {/* Background Image/Video */}
      <div className="hero-sticky-visuals">
        <div className="hero-img-container">
          <video 
            src="/hero_video.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="hero-main-img" 
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
          <div className="hero-vignette-overlay"></div>
          <div className="hero-edge-blur-left"></div>
          <div className="hero-edge-right-cinematic"></div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="container hero-content-layout">


        <div className="hero-title-main" ref={titleContainerRef}>
          <h1 className="hero-title">
            <div className="mask-reveal">
              <div className="hero-title-reveal">India’s Next</div>
            </div>
            <div className="mask-reveal">
              <div className="hero-title-reveal">Great Consumer</div>
            </div>
            <div className="mask-reveal">
              <div className="hero-title-reveal text-accent serif-italic">Brands Will Be</div>
            </div>
            <div className="mask-reveal">
              <div className="hero-title-reveal text-accent serif-italic">Built Now</div>
            </div>
          </h1>
          <div className="hero-subtitle-container">
            <div className="hero-subtitle-line"></div>
            <p className="hero-subtitle-text">
              We help ambitious founders raise capital,<br />
              accelerate growth, and build category-leading businesses
            </p>
          </div>
          
          <div className="hero-actions-refined">
            <button className="hero-btn-minimal" onClick={() => navigate('/portfolio')}>
              DISCOVER OUR PORTFOLIO
            </button>
          </div>
        </div>

        <div className="hero-footer-refined">
          <div className="scroll-hint-luxury">
            <span className="hint-text">EXPLORE NARRATIVE</span>
            <div className="hint-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
