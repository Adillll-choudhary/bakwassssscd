import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './PortfolioPage.css';
import SEO from '../components/SEO';

const logos = [...Array.from({ length: 17 }, (_, i) => `/client_${i + 1}.webp`), '/client_18.png', '/client_19.png'];

const testimonials = [
  {
    name: "Vaibhav Bhandari",
    role: "Co-Founder, Supply6",
    image: "/vaibhav.webp",
    quote: "Every founder deserves someone who believes in the business as much as they do. For us, that has been Keshav and Daylight Capital. His advise went far beyond fundraising. They challenged our thinking, stood by us during difficult decisions, and always acted with complete integrity. It’s rare to find advisors who genuinely care about creating long-term value instead of just closing transactions. Thank you for being an important part of the Supply6 journey.",
    logo: "/client_1.webp",
    logoLarge: true
  },
  {
    name: "Aakriti Rawal",
    role: "Co-Founder, House of Chikankari",
    image: "/Aakriti.webp",
    quote: "We had the opportunity to work with Keshav at Daylight Capital across both our Seed and Series A fundraises, and his contribution went far beyond that of a traditional investment banker. What stood out was his strategic thinking and deep understanding of the consumer ecosystem. His extensive industry research, thoughtful insights, and ability to challenge our assumptions helped us sharpen our fundraising narrative and prepare for investor conversations with much greater confidence. He ensured our investor deck, financial model, and diligence materials were thoroughly prepared, making the fundraising process significantly more structured and enabling timely execution. Throughout the journey, Keshav was a trusted sounding board, bringing clarity, discipline, and a long-term perspective to every discussion. I would highly recommend Keshav and the team at Daylight Capital to any founder looking for a strategic fundraising partner who adds value well beyond capital raising.",
    logo: "/client_14.webp",
    logoLarge: true
  },
  {
    name: "Rohith Nair",
    role: "Managing Partner (Start-Ups Banking), IDFC Bank",
    image: "/rohith.webp",
    quote: "I’ve had the pleasure of working with Keshav on a few opportunities and what stands out every single time is his passion, energy, and sharp eye for spotting great businesses. Beyond the numbers, Keshav has a strong instinct for identifying founders and ideas that can truly scale. He rolls up his sleeves, gets deep into the details, and brings a rare combination of business acumen and a relentless go-getter attitude. It’s always refreshing to work with someone who is so invested in the success of the businesses he backs. Excited to see him continue making a mark in the startup ecosystem. Way to go, Keshav!",
    logo: ""
  }
];



const PortfolioPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<any>(null);
  const dragStartX = useRef<number | null>(null);
  // const dragStartX = useRef<number | null>(null);

  // GSAP reveal effect for the quote text on slide change
  useEffect(() => {
    gsap.fromTo('.large-quote', 
      { opacity: 0, y: 30, rotateX: -5 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'power4.out' }
    );
    gsap.fromTo('.voices-founder-profile-card', 
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 1, ease: 'power4.out' }
    );
    gsap.fromTo('.voice-meta', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    );
  }, [activeTestimonial]);

  // Autoplay / Resetable progress timeline timer
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeTestimonial]);

  // Drag and Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      } else {
        setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      }
    }
    dragStartX.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - e.clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      } else {
        setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      }
    }
    dragStartX.current = null;
  };

  useGSAP(() => {
    gsap.from('.portfolio-reveal-text', {
      y: 60,
      opacity: 0,
      rotateX: -15,
      stagger: 0.12,
      duration: 1.5,
      ease: 'power4.out'
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="portfolio-page">
      <SEO 
        title="Portfolio & Strategic Track Record | Daylight Capital" 
        description="Discover our strategic track record and the success stories of the visionary founders and consumer brands we partner with at Daylight Capital." 
      />
      <header className="portfolio-hero">
        <div className="container">
          <div className="portfolio-hero-asymmetric">
            <div className="portfolio-hero-left">
              <span className="portfolio-reveal-text portfolio-eyebrow">OUR PORTFOLIO</span>
              <h1 className="portfolio-reveal-text portfolio-hero-title">
                Strategic <br />
                <span className="serif-italic">Track Record</span>
              </h1>
            </div>
            
            <div className="portfolio-hero-right">
              <div className="portfolio-reveal-text portfolio-hero-desc">

                <p style={{ marginTop: '20px' }}>
                  We encourage you to speak with the founders we work with. Their experience with us will always speak louder than our presentations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Logos Section */}
      <section className="portfolio-logos">
        <div className="container">
          <div className="section-header reveal-text">
            <span className="arch-label">OUR PARTNERS</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>Select Brands We Have <span className="serif-italic">Impacted.</span></h2>
          </div>
          <div className="logos-grid">
            {logos.map((logo, i) => (
              <div key={i} className="logo-item">
                <img 
                  src={logo} 
                  alt={`Brand ${i + 1}`} 
                  className={`brand-logo-img ${[0, 8, 17].includes(i) ? 'logo-black' : ''} ${[1, 8, 9, 10, 15, 17].includes(i) ? 'logo-large' : ''}`} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Strategic Voices Section */}
      <section className="portfolio-voices">
        <div className="container">
          <div className="voices-layout">
            <div className="voices-header reveal-text">
              <span className="arch-label">STRATEGIC VOICES</span>
              
              <div className="voices-founder-profile-card">
                <div className="voices-founder-photo-wrap">
                  <img 
                    src={testimonials[activeTestimonial].image} 
                    alt={testimonials[activeTestimonial].name} 
                    className="voices-founder-photo" 
                  />
                </div>
                <h3 className="voices-founder-name">{testimonials[activeTestimonial].name}</h3>
                <span className="voices-founder-title">{testimonials[activeTestimonial].role}</span>
              </div>
            </div>
            
            <div 
              className="voice-main-content"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            >
              <div className="voice-active-quote">
                <p className="large-quote reveal-text">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <div className="voice-meta reveal-text">
                  {testimonials[activeTestimonial].logo && (
                    <img 
                      src={testimonials[activeTestimonial].logo} 
                      alt="Client Brand" 
                      className={`voice-brand-logo ${testimonials[activeTestimonial].logoLarge ? 'logo-large' : ''}`} 
                    />
                  )}
                </div>
              </div>

              <div className="voice-navigation">
                {testimonials.map((_, i) => (
                  <button 
                    key={i} 
                    className={`voice-nav-item ${activeTestimonial === i ? 'active' : ''}`}
                    onClick={() => setActiveTestimonial(i)}
                  >
                    <span className="nav-index">0{i + 1}</span>
                    <div className="nav-bar-wrap">
                      <div className="nav-bar-fill"></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
