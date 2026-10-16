import { useEffect } from 'react';
import ReactGA from 'react-ga4';
// Initialize GA4 - Note: Call this outside component or strictly once
ReactGA.initialize('G-8MVMCZBSGV');

// ... (other imports)
import { useRef, useState, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const InsightsPage = lazy(() => import('./pages/InsightsPage'));
const RecruitersPage = lazy(() => import('./pages/RecruitersPage'));

import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Track pageviews on route change
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);

  useGSAP(() => {
    if (isLoading) return;

    // 1. Ultra-Smooth Lenis Initialization (Desktop only)
    const isMobile = window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    
    let lenis: any = null;
    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.1,
      });
      // window.lenis assignment
      window.lenis = lenis;

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      lenis.on('scroll', ScrollTrigger.update);
    }

    // 2. The "Revealer" Transition Animation
    // This runs only once when isLoading becomes false
    const tl = gsap.timeline();
    
    tl.to('.reveal-slat', {
      scaleY: 0,
      stagger: 0.1,
      duration: 1.5,
      ease: 'expo.inOut',
    })
    .from('.hero-main-img', {
      scale: 1.5,
      duration: 2.5,
      ease: 'power4.out',
    }, 0)
    .from('.hero-title-reveal', {
      y: 100,
      opacity: 0,
      rotateX: -20,
      stagger: 0.15,
      duration: 1.8,
      ease: 'expo.out',
    }, '-=0.8'); // Start slightly earlier but with a delay-like feel

    // Global Section Reveals
    const sections = gsap.utils.toArray('.section');
    sections.forEach((section: any) => {
      gsap.from(section.querySelectorAll('.container > *'), {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });
    });

    // 3. Refresh ScrollTrigger once DOM is revealed
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      if (lenis) lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: containerRef, dependencies: [isLoading] });

  // Scroll to top or specific section on route change
  useGSAP(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(location.hash);
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
          ScrollTrigger.refresh();
        }
      }, 300);
    } else {
      // @ts-expect-error ignore
      if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }
  }, { dependencies: [location.pathname, location.hash] });

  return (
    <div ref={containerRef} className="app">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <CustomCursor />
      <div className="grain-texture"></div>
      
      {!isLoading && (
        <>
          {/* Transition Reveal Slats */}
          <div className="reveal-curtain-container" style={{ pointerEvents: 'none' }}>
            <div className="reveal-slat"></div>
            <div className="reveal-slat"></div>
            <div className="reveal-slat"></div>
            <div className="reveal-slat"></div>
          </div>

          <Navbar />
          <main>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/insights" element={<InsightsPage />} />
                <Route path="/recruiters" element={<RecruitersPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
