import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import './ServicesPreview.css';

const services = [
  {
    title: "Capital & Fundraising",
    desc: "Bespoke capital structures and M&A advisory for global category dominance.",
    id: "capital"
  },
  {
    title: "Investor Readiness",
    desc: "Architecting the narrative and rigor required for tier-1 institutional capital.",
    id: "readiness"
  },
  {
    title: "Finance & Analytics",
    desc: "Deep-dive operational metrics and financial modeling for data-driven growth.",
    id: "finance"
  },
  {
    title: "Strategy Consulting",
    desc: "Unlocking structural value and category leadership through strategic depth.",
    id: "strategy"
  }
];

const ServicesPreview = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.service-premium-card', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.services-editorial-grid',
        start: 'top 85%',
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="services-preview" className="services-preview">
      <div className="container">
        <div className="preview-header">
          <div className="header-left">
            <span className="arch-label">02 // OUR CAPABILITIES</span>
            <h2 className="preview-title">Strategic Architecture <br/>for <span className="text-accent">Growth.</span></h2>
            <p className="header-summary">
              We provide the structural rigor and institutional depth required to navigate complex capital markets 
              and architect sustainable category leadership for the next generation of consumer brands.
            </p>
          </div>
          <div className="header-right-visual">
             <div className="visual-mask">
                <img src="/assets/services_preview.webp" alt="Strategic Depth" className="preview-main-img" />
             </div>
          </div>
        </div>

        <div className="services-editorial-grid">
          {services.map((service, i) => (
            <Link 
              key={i} 
              to={`/services#${service.id}`}
              className={`service-premium-card card-variant-${i % 2}`}
            >
              <div className="card-top-meta">
                <span className="card-num">/ 0{i + 1}</span>
                <span className="card-category">CAPABILITY</span>
              </div>
              <div className="card-main-content">
                <h3 className="card-title-massive">{service.title}</h3>
                <p className="card-desc-premium">{service.desc}</p>
                <div className="card-action-gold">
                   <span>DISCOVER MORE</span>
                   <div className="action-line"></div>
                </div>
              </div>
              <div className="card-visual-accent"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
