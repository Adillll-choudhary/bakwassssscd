import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Approach.css';

const Approach = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Section reveal
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });

    // Line-by-line text reveal
    const lines = textRef.current?.querySelectorAll('.reveal-line-inner');
    if (lines) {
      gsap.from(lines, {
        y: '100%',
        stagger: 0.15,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 75%',
        }
      });
    }

    // Image reveal
    gsap.from('.approach-image-mask', {
      scale: 1.1,
      opacity: 0,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top 70%',
      }
    });

    // CTA fade in last
    gsap.from('.approach-cta', {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 75%',
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="approach-editorial-section">
      <div className="container">
        <div className="approach-split-layout">
          <div ref={textRef} className="approach-col-left">
            <div className="reveal-line-mask">
              <span className="reveal-line-inner eyebrow-editorial">OUR APPROACH</span>
            </div>
            <div className="reveal-line-mask">
              <h2 className="reveal-line-inner heading-editorial">
                A Step-by-Step Balancing <br />
                Act for <span className="serif-italic">Sustainable Growth.</span>
              </h2>
            </div>
            <div className="reveal-line-mask desc-mask">
              <p className="reveal-line-inner paragraph-editorial">
                We believe in the quiet power of structural rigor. Our advisory framework 
                is built on a foundation of founder partnerships and institutional depth, 
                designed to scale consumer brands with precision and foresight. 
                In a world of noise, we focus on the calm architecture of long-term value.
              </p>
            </div>
            <button className="approach-cta">
              UNDERSTAND OUR APPROACH
            </button>
          </div>

          <div ref={imageRef} className="approach-col-right">
            <div className="approach-image-frame">
              <div className="approach-image-mask">
                <img 
                  src="/assets/approach_editorial.webp" 
                  alt="Strategic Approach" 
                  className="approach-featured-img" 
                />
              </div>
              <div className="approach-shape-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
