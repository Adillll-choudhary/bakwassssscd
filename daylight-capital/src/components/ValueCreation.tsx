import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Compass, BarChart3, ShieldCheck, Globe2, Handshake, Lightbulb, TrendingUp, InfinityIcon } from 'lucide-react';
import './ValueCreation.css';

const ValueCreation = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const pillars = [
    {
      title: "Founder-First Thinking",
      desc: "Prioritizing the vision that built the category, ensuring capital remains aligned with founder intent.",
      icon: <Compass size={24} strokeWidth={1} />
    },
    {
      title: "Strategic Capital Access",
      desc: "Engineering complex capital structures designed for multi-phase scaling and long-term dominance.",
      icon: <BarChart3 size={24} strokeWidth={1} />
    },
    {
      title: "Consumer Intelligence",
      desc: "Anticipating market shifts through proprietary behavioral data and trend forecasting.",
      icon: <Lightbulb size={24} strokeWidth={1} />
    },
    {
      title: "Institutional Discipline",
      desc: "Bringing world-class structural rigor and operational excellence to high-growth environments.",
      icon: <ShieldCheck size={24} strokeWidth={1} />
    },
    {
      title: "Global Growth Perspective",
      desc: "Providing the architectural support required for seamless international expansion and global scale.",
      icon: <Globe2 size={24} strokeWidth={1} />
    },
    {
      title: "Sustainable Value Creation",
      desc: "Building defensible moats and resilient business models that withstand market volatility.",
      icon: <InfinityIcon size={24} strokeWidth={1} />
    },
    {
      title: "Brand Scaling Expertise",
      desc: "Cultivating brand equity through institutional-grade storytelling and performance scaling.",
      icon: <TrendingUp size={24} strokeWidth={1} />
    },
    {
      title: "Long-Term Partnership",
      desc: "A commitment to visionary growth that extends far beyond immediate transactional cycles.",
      icon: <Handshake size={24} strokeWidth={1} />
    }
  ];

  useGSAP(() => {
    // Header Reveal
    gsap.from('.value-header-reveal', {
      y: 30,
      stagger: 0.1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
      }
    });

    // Grid Reveal
    gsap.from('.value-pillar-card', {
      y: 40,
      stagger: 0.05,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 90%',
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="value-creation-section">
      <div className="container">
        <div className="value-header">
          <h2 className="value-header-reveal value-title">
            How Do We Create <br />
            Meaningful <span className="text-accent-value">Long-Term Value?</span>
          </h2>
          <div className="value-header-reveal value-summary-box">
            <p className="value-description">
              Our philosophy is rooted in the architecture of growth. 
              We partner with category-defining brands to provide the 
              strategic intelligence, institutional rigor, and capital 
              foresight required for sustainable global dominance.
            </p>
          </div>
        </div>

        <div ref={gridRef} className="value-strategic-pipeline">
          {pillars.map((pillar, i) => (
            <div key={i} className="value-pipeline-row">
              <div className="pipeline-index">0{i + 1}</div>
              <div className="pipeline-icon-box">
                {pillar.icon}
              </div>
              <div className="pipeline-content">
                <h3 className="value-card-title serif-italic">{pillar.title}</h3>
                <p className="value-card-desc">{pillar.desc}</p>
              </div>
              <div className="pipeline-hover-reveal">
                <span className="reveal-tag">STRATEGIC PILLAR // 0{i + 1}</span>
              </div>
              <div className="pipeline-line"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueCreation;
