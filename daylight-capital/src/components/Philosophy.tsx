import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Philosophy.css';

const Philosophy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.philo-reveal', {
      y: 60,
      opacity: 0,
      stagger: 0.2,
      duration: 1.5,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      }
    });

    gsap.from('.philo-image-box', {
      clipPath: 'inset(100% 0 0 0)',
      duration: 2,
      ease: 'expo.inOut',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="philosophy-section">
      <div className="container">
        <div className="philo-grid">
          <div className="philo-content">
            <span className="philo-reveal eyebrow-philo">OUR PHILOSOPHY</span>
            <h2 className="philo-reveal philo-title">
              Beyond the <br />
              <span className="serif-italic">Balance Sheet.</span>
            </h2>
            <div className="philo-reveal philo-text-box">
              <p>
                We believe that true value is architected, not just found. 
                Our approach combines institutional rigor with a deep empathy 
                for the founder's journey, ensuring that capital is always 
                aligned with visionary long-term growth.
              </p>
              <p>
                In a world of noise, we focus on the structural levers that 
                create defensible moats and sustainable category leadership.
              </p>
            </div>
          </div>
          
          <div className="philo-visual">
            <div className="philo-image-box">
              <img src="/assets/luxury_boardroom_1778163758325.webp" alt="Philosophy" className="philo-img" />
              <div className="philo-overlay"></div>
              <div className="philo-tag">
                <span>EST. 2014 // GLOBAL SCALE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
