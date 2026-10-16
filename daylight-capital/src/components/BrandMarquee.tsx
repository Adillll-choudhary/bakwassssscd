import './BrandMarquee.css';

const BrandMarquee = () => {
  const brands = [...Array.from({ length: 17 }, (_, i) => `/client_${i + 1}.webp`), '/client_18.png', '/client_19.png'];

  return (
    <section className="brand-marquee-section section">
      <div className="container">
        <div className="marquee-header">
          <span className="arch-label">STRATEGIC ALLIANCES</span>
          <h2 className="marquee-title">Trusted by Visionary <span className="serif-italic text-accent">Founders</span></h2>
        </div>
      </div>
      
      <div className="marquee-wrapper">
        <div className="marquee-fade-left"></div>
        <div className="marquee-fade-right"></div>
        
        <div className="marquee-content">
          <div className="marquee-track">
            {brands.map((brand, i) => (
              <div key={`track1-${i}`} className="marquee-item">
                <img 
                  src={brand} 
                  alt={`Brand ${i + 1}`} 
                  className={`marquee-img ${[0, 8, 17].includes(i % 18) ? 'logo-black' : ''} ${[1, 8, 9, 10, 15, 17].includes(i % 18) ? 'logo-large' : ''}`} 
                />
              </div>
            ))}
          </div>
          
          <div className="marquee-track">
            {brands.map((brand, i) => (
              <div key={`track2-${i}`} className="marquee-item">
                <img 
                  src={brand} 
                  alt={`Brand ${i + 1}`} 
                  className={`marquee-img ${[0, 8, 17].includes(i % 18) ? 'logo-black' : ''} ${[1, 8, 9, 10, 15, 17].includes(i % 18) ? 'logo-large' : ''}`} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
