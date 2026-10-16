import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Capabilities.css';

gsap.registerPlugin(ScrollTrigger);

const Capabilities = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const capabilities = [
    {
      title: "Access to Capital",
      desc: "Strategic funding solutions tailored to scale market-leading consumer brands with precision."
    },
    {
      title: "Strategic Advisory",
      desc: "Precision-engineered guidance for navigating complex market dynamics and structural growth."
    },
    {
      title: "Brand & Growth",
      desc: "Cultivating brand equity through institutional-grade storytelling and performance scaling."
    },
    {
      title: "Consumer Intelligence",
      desc: "Deep-data insights used to anticipate shifts in consumer sentiment and market behavior."
    },
    {
      title: "International Expansion",
      desc: "Architectural support for global market entry and sustainable cross-border scaling."
    },
    {
      title: "Founder Advisory",
      desc: "Bespoke partnership focused on protecting and amplifying the vision of category-leading founders."
    }
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    // Header Animation
    tl.from(headerRef.current?.querySelectorAll('.reveal-text') || [], {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out"
    });

    // Grid Animation
    tl.from(gridRef.current?.querySelectorAll('.capability-premium-card') || [], {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.8");

    // Divider Lines Animation
    tl.from(gridRef.current?.querySelectorAll('.card-divider') || [], {
      scaleX: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: "expo.inOut"
    }, "-=1");

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="capabilities-section">
      <div className="container">
        <div ref={headerRef} className="capabilities-header">
          <div className="mask-reveal">
            <span className="eyebrow reveal-text">STRATEGIC INFRASTRUCTURE</span>
          </div>
          <div className="mask-reveal">
            <h2 className="headline reveal-text">
              Institutional <span className="serif-italic">Architecture</span> <br />
              for Global <span className="serif-italic">Alpha</span>
            </h2>
          </div>
          <div className="mask-reveal">
            <p className="description reveal-text">
              We provide the structural rigor and institutional depth required to navigate 
              complex capital markets and architect sustainable category leadership.
            </p>
          </div>
        </div>

        <div ref={gridRef} className="capabilities-editorial-grid">
          {capabilities.map((item, index) => (
            <div key={index} className="capability-premium-card">
              <div className="card-bg-number">0{index + 1}</div>
              <div className="card-inner-premium">
                <div className="card-header-premium">
                  <div className="card-icon-minimal">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="4" y="4" width="16" height="16" />
                      <path d="M12 4v16M4 12h16" strokeOpacity="0.2" />
                    </svg>
                  </div>
                  <span className="card-index-pill">/ 0{index + 1}</span>
                </div>
                <h3 className="card-title-premium">{item.title}</h3>
                <p className="card-desc-premium">{item.desc}</p>
                <div className="card-footer-premium">
                  <div className="reveal-line"></div>
                </div>
              </div>
              <div className="card-hover-overlay"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
