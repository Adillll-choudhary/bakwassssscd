import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Industries.css';

const industries = [
  {
    id: "01",
    title: "Capital // Fundraising",
    desc: "Bespoke capital structures built for long-term scale and institutional access.",
    img: "/assets/services_capital.webp",
    stat: "STRATEGIC CAPITAL",
    coord: "18.92 N / 72.83 E",
    linkId: "capital"
  },
  {
    id: "02",
    title: "Strategy // Consulting",
    desc: "Translating consumer insight into long-term market leadership.",
    img: "/assets/services_strategy.webp",
    stat: "CATEGORY MOATS",
    coord: "35.67 N / Tokyo",
    linkId: "strategy"
  },
  {
    id: "03",
    title: "Investor // Readiness",
    desc: "Positioning businesses for institutional confidence and scalable growth.",
    img: "/assets/services_readiness.webp",
    stat: "DEAL READINESS",
    coord: "40.71 N / 74.00 W",
    linkId: "readiness"
  },
  {
    id: "04",
    title: "Finance // Analytics",
    desc: "Building financial clarity and data dependability for sustainable profitability.",
    img: "/assets/services_finance.webp",
    stat: "ECONOMIC PRECISION",
    coord: "51.50 N / 0.12 W",
    linkId: "finance"
  }
];

const Industries = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial Reveal
    gsap.from('.industry-panel', {
      opacity: 0,
      y: 100,
      stagger: 0.2,
      duration: 1.5,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="transactions" className="industries-liquid-accordion">
      <div className="accordion-header">
        <div className="container">
          <span className="arch-label">SECTORAL FOOTPRINT</span>
          <h2 className="arch-title">From <span className="text-accent" style={{ fontStyle: 'italic' }}>Strategy</span> <br/>to Execution.</h2>
        </div>
      </div>

      <div className="accordion-wrapper">
        {industries.map((item, i) => (
          <Link 
            to={`/services#${item.linkId}`}
            key={i} 
            className="industry-panel"
            style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
          >
            <div className="panel-bg">
              <img src={item.img} alt={item.title} />
              <div className="panel-overlay"></div>
            </div>
            
            <div className="panel-content">
              <div className="panel-top">
                <span className="panel-number">{item.id}</span>
              </div>
              
              <div className="panel-main">
                <h3 className="panel-title">{item.title}</h3>
              </div>

              <div className="panel-footer">
                <div className="explore-link">
                  <span>EXPLORE SECTOR</span>
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>

            {/* Vertical Label (Visible when collapsed) */}
            <div className="collapsed-label">
              <span>{item.title}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="container" style={{ marginTop: '80px', textAlign: 'center', paddingBottom: '100px' }}>
        <Link 
          to="/services" 
          className="button-dark-pill"
          onClick={() => window.scrollTo(0, 0)}
        >
          VIEW ALL SERVICES
        </Link>
      </div>
    </section>
  );
};

export default Industries;
