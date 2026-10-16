import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Shield, Target, TrendingUp, Users, Globe, ArrowUpRight } from 'lucide-react';
import './WhyDaylight.css';

const WhyDaylight = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const points = [
    {
      title: "Strategic Intelligence",
      desc: "Navigating complex market dynamics with institutional rigor and deep-data foresight.",
      icon: <Target size={24} strokeWidth={1} />,
      size: "large" // Spans more space
    },
    {
      title: "Founder Partnership",
      desc: "A bespoke advisory approach focused on protecting and amplifying the visionary founder's journey.",
      icon: <Users size={20} strokeWidth={1} />,
      size: "small"
    },
    {
      title: "Capital Expertise",
      desc: "Beyond simple funding—we architect structural capital solutions designed for sustainable scale.",
      icon: <Shield size={20} strokeWidth={1} />,
      size: "small"
    },
    {
      title: "Consumer Depth",
      desc: "Anticipating shifts in sentiment and behavior through proprietary consumer intelligence.",
      icon: <TrendingUp size={20} strokeWidth={1} />,
      size: "medium"
    },
    {
      title: "Global Horizon",
      desc: "Comprehensive support for cross-border expansion and international category leadership.",
      icon: <Globe size={20} strokeWidth={1} />,
      size: "small"
    }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  useGSAP(() => {
    // Header Parallax
    gsap.to('.why-title-main', {
      x: -100,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Image Parallax
    gsap.to('.why-parallax-img', {
      y: -50,
      scale: 1.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });

    // Bento Cards Stagger
    gsap.from('.why-bento-card', {
      y: 60,
      stagger: 0.05,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.why-bento-grid',
        start: 'top 90%',
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="why-daylight-section-v2">
      <div className="why-bg-text">DAYLIGHT // ADVISORY</div>
      
      <div className="container" ref={containerRef}>
        <div className="why-v2-header">
          <div className="header-meta">
            <span className="why-label-pill">Institutional Excellence</span>
            <div className="header-line"></div>
          </div>
          <h2 className="why-title-main">
            Why <span className="italic-accent">Daylight?</span>
          </h2>
        </div>

        <div className="why-bento-grid">
          {/* Main Hero Card - Spans 2 Rows */}
          <div className="why-bento-card card-hero" onMouseMove={handleMouseMove}>
            <div className="card-visual">
              <img 
                src="/assets/hero_institutional_luxury_1778167490035.webp" 
                alt="Institutional Quality" 
                className="why-parallax-img" 
              />
              <div className="visual-overlay"></div>
            </div>
            <div className="card-content">
              <div className="card-top">
                <span className="tag">MANIFESTO</span>
                <ArrowUpRight size={20} className="arrow-icon" />
              </div>
              <h3 className="card-headline">A Structural <br/>Advantage.</h3>
              <p className="card-description">
                We operate at the intersection of institutional rigor and founder empathy. 
                Our platform provides the strategic depth required to transform category-defining 
                brands into global market leaders.
              </p>
            </div>
          </div>

          {/* Points Grid */}
          <div className="why-points-cluster">
            {points.map((point, index) => (
              <div 
                key={index} 
                className={`why-bento-card point-card card-${point.size}`}
                onMouseMove={handleMouseMove}
              >
                <div className="point-icon">{point.icon}</div>
                <div className="point-info">
                  <h4 className="point-title">{point.title}</h4>
                  <p className="point-desc">{point.desc}</p>
                </div>
                <div className="point-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDaylight;
