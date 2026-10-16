import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Sectors.css';

const Sectors = () => {
  const container = useRef<HTMLDivElement>(null);

  const expertise = [
    { title: "Consumer Tech", img: "/assets/sector_venture_abstract_1778521547101.webp", tag: "DIGITAL ALPHA" },
    { title: "Luxury Retail", img: "/assets/sector_brand_texture_1778521584498.webp", tag: "BRAND EQUITY" },
    { title: "Strategic M&A", img: "/assets/sector_growth_architectural_1778521566398.webp", tag: "STRUCTURAL GROWTH" }
  ];

  useGSAP(() => {
    gsap.from('.sector-expertise-card', {
      y: 60,
      opacity: 0,
      stagger: 0.2,
      duration: 1.5,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 70%',
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="sectors-expertise-section">
      <div className="container">
        <div className="sectors-header">
          <span className="eyebrow-s">SECTOR DOMINANCE</span>
          <h2 className="title-s">Specialized <span className="serif-italic">Focus.</span></h2>
          <p className="desc-s">
            Our expertise is concentrated where innovation meets institutional demand. 
            We architect dominance in category-defining sectors.
          </p>
        </div>
        
        <div className="sectors-grid-premium">
          {expertise.map((item, i) => (
            <div key={i} className="sector-expertise-card">
              <div className="sector-img-box">
                <img src={item.img} alt={item.title} className="sector-bg-img" />
                <div className="sector-card-overlay"></div>
                <div className="sector-tag-minimal">{item.tag}</div>
              </div>
              <div className="sector-content-minimal">
                <h3 className="sector-title-minimal">{item.title}</h3>
                <div className="sector-line-minimal"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sectors;
