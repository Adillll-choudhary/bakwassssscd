import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Target, Zap, Globe } from 'lucide-react';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Capital Markets",
    role: "STRATEGIC ACCESS",
    desc: "Bespoke capital structures and M&A advisory for global category dominance.",
    icon: <Layers size={20} strokeWidth={1} />,
    tags: ["M&A", "EQUITY", "DEBT"]
  },
  {
    title: "Category Strategy",
    role: "OPERATIONAL DEPTH",
    desc: "Unlocking unit economics and long-term brand equity through rigorous data.",
    icon: <Target size={20} strokeWidth={1} />,
    tags: ["D2C", "OMNICHANNEL", "RETAIL"]
  },
  {
    title: "Brand Architecture",
    role: "NARRATIVE DESIGN",
    desc: "Engineering the emotional core and visual identity of visionary products.",
    icon: <Zap size={20} strokeWidth={1} />,
    tags: ["IDENTITY", "POSITIONING"]
  },
  {
    title: "Global Expansion",
    role: "MARKET ENTRY",
    desc: "Scaling localized brand ecosystems across diverse international markets.",
    icon: <Globe size={20} strokeWidth={1} />,
    tags: ["CROSS-BORDER", "LOGISTICS"]
  }
];

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Grid-Slide Reveal
    const panels = gsap.utils.toArray('.service-grid-panel');
    
    panels.forEach((panel: any) => {
      const line = panel.querySelector('.panel-reveal-line');
      const content = panel.querySelector('.panel-content-inner');
      const index = panel.querySelector('.panel-index-arch');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.to(line, {
        scaleX: 1,
        duration: 0.8,
        ease: 'power4.inOut'
      })
      .from(index, {
        y: 20,
        opacity: 0,
        duration: 0.5,
      }, '-=0.3')
      .from(content, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
      }, '-=0.4');
    });

    ScrollTrigger.refresh();

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="services" className="services-architectural">
      <div className="container">
        <div className="arch-header">
          <span className="arch-label">02 // CORE CAPABILITIES</span>
          <h2 className="arch-title no-split">Strategic Architecture for Growth.</h2>
        </div>

        <div className="services-grid-arch">
          {services.map((item, i) => (
            <div key={i} className="service-grid-panel">
              <div className="panel-reveal-line"></div>
              <div className="panel-header-arch">
                <span className="panel-index-arch">0{i + 1}</span>
                <div className="panel-icon-arch">{item.icon}</div>
              </div>
              <div className="panel-content-inner">
                <h3 className="panel-title-arch">{item.title}</h3>
                <p className="panel-desc-arch">{item.desc}</p>
                <div className="panel-footer-arch">
                  <div className="arch-tags">
                    {item.tags.map(tag => <span key={tag} className="arch-tag">{tag}</span>)}
                  </div>
                  <div className="arch-cta">VIEW PROTOCOL</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
