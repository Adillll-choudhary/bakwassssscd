import React, { useEffect, useRef } from 'react';
import './App.css';
import logo from './assets/logo.png';
import mapImg from './assets/map_transparent.png';

// Mapping to existing high-fidelity assets
import imgSolar from './assets/uma1.png';
import imgBess from './assets/uma2.png';
import imgHydrogen from './assets/uma3.png';

function App() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const Lenis = window.Lenis;

    if (!gsap || !ScrollTrigger || !Lenis) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);

    // A. Hero Parallax & Scale
    gsap.to('.hero-global', {
      scrollTrigger: { trigger: '.hero-global', start: 'top top', end: 'bottom top', scrub: true },
      scale: 0.95, opacity: 0.3, y: 30, ease: 'none'
    });

    // B. Anthem Sequential Reveal
    const tl = gsap.timeline();
    tl.fromTo('.hero-brand-tag span', { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.8, ease: 'power4.out' })
      .fromTo('.reveal-line span', { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1, stagger: 0.2, ease: 'power4.out' }, "-=0.4")
      .fromTo('.hero-subtext-refined', { opacity: 0, y: 20 }, { opacity: 0.7, y: 0, duration: 1 }, "-=0.5");

    // Scroll Triggered Reveals for other sections
    gsap.utils.toArray('.reveal-line-scroll span').forEach((text) => {
      gsap.fromTo(text, 
        { y: '100%', opacity: 0 },
        {
          y: '0%', opacity: 1, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: text, start: 'top 92%', toggleActions: 'play none none reverse' }
        }
      );
    });

    // C. Anti-Gravity Cards
    gsap.utils.toArray('.hub-card').forEach((card, i) => {
      gsap.fromTo(card,
        { y: 100, opacity: 0 },
        {
          y: i % 2 === 0 ? -40 : 40, opacity: 1, duration: 1.5, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%', scrub: 1 }
        }
      );
    });

    // D. Magnetic CTAs
    const magneticBtns = document.querySelectorAll('.cta-glass');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.4, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
      });
    });

    // E. Image Sequence Animation
    const canvas = document.getElementById('story-canvas');
    if (canvas) {
      const context = canvas.getContext('2d');
      canvas.width = 1920;
      canvas.height = 1080;

      const frameCount = 80;
      const currentFrame = (index) => (
        `/assets/story-sequence/Clean_energy_flow_202604232258_${index.toString().padStart(3, '0')}.jpg`
      );

      const images = [];
      const airbnb = {
        frame: 0
      };

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
      }

      gsap.to(airbnb, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: ".story-section",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
        onUpdate: render
      });

      images[0].onload = render;

      function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[airbnb.frame], 0, 0);
      }

      // Text Overlay Animations
      const storyTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".story-section",
          start: "top top",
          end: "bottom bottom",
          scrub: 1
        }
      });

      storyTimeline
        .to(".story-text-1", { opacity: 1, y: 0, duration: 1 })
        .to(".story-text-1", { opacity: 0, y: -20, duration: 1 }, "+=1")
        .to(".story-text-2", { opacity: 1, y: 0, duration: 1 })
        .to(".story-text-2", { opacity: 0, y: -20, duration: 1 }, "+=1")
        .to(".story-text-3", { opacity: 1, y: 0, duration: 1 })
        .to(".story-text-3", { opacity: 0, y: -20, duration: 1 }, "+=1")
        .to(".story-text-4", { opacity: 1, y: 0, duration: 1 });
    }

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const ecosystemData = [
    { title: 'Solar Infrastructure', id: 'ARC-01', img: imgSolar, specs: 'EFF: 22.4%' },
    { title: 'BESS Technology', id: 'ARC-02', img: imgBess, specs: 'SYNC: <20ms' },
    { title: 'Green Hydrogen', id: 'ARC-03', img: imgHydrogen, specs: 'PUR: 99.9%' }
  ];

  return (
    <div className="uma-site" ref={scrollRef}>
      {/* HUD Ornaments */}
      <div className="hud-corner top-left"><span>UMA_SYSTEM_v4.9</span></div>
      <div className="hud-corner top-right"><span>LAT: 28.6139° N</span></div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-group-left">
          <a href="#">Home</a>
          <a href="#about">About</a>
          <div className="nav-item-dropdown">
            <a href="#ecosystem">EcoSystem</a>
            <div className="dropdown-menu">
              <a href="#ecosystem">Solar Hub</a>
              <a href="#ecosystem">BESS Path</a>
              <a href="#ecosystem">Hydrogen</a>
            </div>
          </div>
        </div>
        <div className="logo"><img src={logo} alt="UMA Logo" className="logo-img" /></div>
        <div className="nav-group-right">
          <a href="#impact">Join US</a>
          <a href="#footer">Contact</a>
          <a href="#footer" className="cta-glass">Build with us</a>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="hero-global">
        <div className="hero-video-container">
          <video autoPlay loop muted playsInline className="hero-video">
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay-refined"></div>
        </div>
        <div className="hero-content-global">
          <div className="headline-reveal-container">
            <div className="hero-brand-tag"><span>UMA SOLAR</span></div>
            <h1 className="hero-headline-global">
              <div className="reveal-line"><span>POWERING</span></div>
              <div className="reveal-line"><span>CLEAN ENERGY</span></div>
            </h1>
            <p className="hero-subtext-refined">
              Engineering the foundation for a carbon-neutral planetary legacy through high-fidelity solar infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* NEW: Story Animation Section */}
      <section className="story-section">
        <div className="story-canvas-container">
          <canvas id="story-canvas"></canvas>
          <div className="story-overlay">
            <div className="story-text story-text-1">HARNESSING THE POWER OF THE SUN</div>
            <div className="story-text story-text-2">ENGINEERING INTELLIGENT ENERGY FLOWS</div>
            <div className="story-text story-text-3">SUSTAINABLE INFRASTRUCTURE AT SCALE</div>
            <div className="story-text story-text-4">A CARBON-NEUTRAL PLANETARY LEGACY</div>
          </div>
        </div>
      </section>

      {/* 2. Philosophy Section */}
      <section className="philosophy-parallax reveal-section">
        <div className="parallax-bg-text">VISIONARY</div>
        <div className="container">
          <div className="phi-layout">
            <div className="phi-text">
              <span className="section-label-alt">01 / PHILOSOPHY</span>
              <h2 className="section-headline-bold reveal-line-scroll">
                <span>BEYOND THE</span><br/><span>GRID.</span>
              </h2>
              <p className="phi-desc">We don't just build energy assets. We engineer high-fidelity solar infrastructure pathways for the next century.</p>
            </div>
            <div className="phi-visual">
              <div className="phi-glass-box">
                <div className="glass-inner">
                  <span className="phi-stat">99.8%</span>
                  <span className="phi-lab">UPTIME RELIABILITY</span>
                </div>
                <div className="phi-corner tr"></div>
                <div className="phi-corner bl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Ecosystem Hub */}
      <section id="ecosystem" className="ecosystem-hub reveal-section">
        <div className="container">
          <div className="hub-header">
            <span className="section-label-alt">02 / ARCHITECTURE</span>
            <h2 className="section-headline-bold reveal-line-scroll"><span>INTEGRATED SYSTEMS</span></h2>
          </div>
          <div className="hub-grid">
            {ecosystemData.map((item, i) => (
              <div className="hub-card" key={i}>
                <div className="card-image-container">
                  <img src={item.img} alt={item.title} className="card-image" />
                  <div className="image-overlay-diagnostic"></div>
                </div>
                <div className="card-content">
                  <div className="card-top"><span className="card-idx">{item.id}</span><div className="status-dot"></div></div>
                  <h3>{item.title}</h3>
                  <div className="card-specs"><span>{item.specs}</span><span>OP_ACTIVE</span></div>
                  <p>High-fidelity engineering for planetary scale deployment.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Engineering Journey */}
      <section className="journey-section reveal-section">
        <div className="container">
          <div className="journey-layout">
            <div className="journey-header">
              <span className="section-label-alt">03 / PROCESS</span>
              <h2 className="section-headline-bold reveal-line-scroll"><span>BLUEPRINT TO KWH</span></h2>
            </div>
            <div className="journey-steps">
              {[
                { title: 'RESEARCH', desc: 'Proprietary geospatial irradiance modeling.' },
                { title: 'ENGINEERING', desc: 'Custom-designed high-yield infrastructure.' },
                { title: 'OPERATE', desc: '24/7 autonomous diagnostic monitoring.' }
              ].map((step, i) => (
                <div className="step-item" key={i}>
                  <div className="step-marker">0{i+1}</div>
                  <div className="step-content">
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Map Diagnostic */}
      <section className="map-diagnostic reveal-section">
        <div className="container">
          <div className="diagnostic-wrap">
            <div className="diagnostic-text">
              <span className="section-label-alt">04 / FOOTPRINT</span>
              <h2 className="section-headline-bold reveal-line-scroll"><span>PAN-INDIA OPS</span></h2>
              <div className="stats-strip">
                <div className="stat-item"><span className="stat-val">30+</span><span className="stat-lab">YEARS</span></div>
                <div className="stat-item"><span className="stat-val">500MW</span><span className="stat-lab">ASSETS</span></div>
              </div>
            </div>
            <div className="map-visual-container">
              <div className="map-background-grid"></div>
              <img src={mapImg} alt="India Map" className="map-main-asset" />
              <div className="map-pings">
                <div className="ping" style={{top: '30%', left: '40%'}}></div>
                <div className="ping" style={{top: '60%', left: '35%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="footer-architectural">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src={logo} alt="UMA Logo" className="logo-img-footer" />
              <p>ENGINEERING THE FUTURE OF SUSTAINABLE INFRASTRUCTURE.</p>
            </div>
            <div className="footer-links-group">
              <div className="f-col"><h5>PLATFORM</h5><a href="#ecosystem">Solutions</a></div>
              <div className="f-col"><h5>CONNECT</h5><a href="#">LinkedIn</a></div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 UMA SOLAR. CINEMATIC_MOTION_v1.5</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
