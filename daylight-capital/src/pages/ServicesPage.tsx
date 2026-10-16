import { useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesPage.css';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "capital",
    title: "Capital // Fundraising",
    tagline: "Capital strategies built for long-term scale",
    image: "/assets/services_capital.webp",
    explanation: "We architect complex capital raising strategies that align with long-term brand vision. Securing high-conviction institutional capital that accelerates category leadership.",
    capabilities: [
      "Seed to Series C Fundraising",
      "Primary Raise & Secondary Exits",
      "Venture Capital & Private Equity Access",
      "Family Office & Angel Syndication",
      "PSU & Private Bank Financing",
      "W. Capital, Term Loans & Project Financing",
      "Venture Debt & NBFC Financing",
      "Structured Debt Solutions"
    ],
    process: ["Sector Analysis", "Investor Profiling", "Deal Structuring", "Execution"],
    outcomes: [
      "Institutional Capital Access",
      "Optimized Fund Structures",
      "Strategic Investor Alignment",
      "Growth Capital Readiness",
      "Long-Term Financial Scalability",
      "Stronger Balance Sheet Re-Positioning"
    ]
  },
  {
    id: "readiness",
    title: "Investor // Readiness",
    tagline: "Positioning businesses for institutional confidence and scalable growth.",
    image: "/assets/services_readiness.webp",
    explanation: "Re-engineering the narrative, metrics, and governance to ensure absolute investment-grade readiness for category-leading founders.",
    capabilities: [
      "Investment Narrative Development",
      "Investor Pitch Deck & Industry Analysis",
      "Financial Modelling & Forecasting",
      "Data Room Preparation",
      "Due Diligence Readiness",
      "Governance Structuring",
      "Valuation Positioning",
      "Strategic Business Planning",
      "Institutional Documentation Support"
    ],
    process: ["Audit", "Gap Analysis", "Structural Engineering", "Simulation"],
    outcomes: [
      "Stronger Investor Confidence",
      "Premium Market Positioning",
      "Accelerated Fundraising Cycles",
      "Higher Conversion Efficiency",
      "Institutional Financial Discipline",
      "Scalable Operational Readiness"
    ]
  },
  {
    id: "finance",
    title: "Finance // Analytics",
    tagline: "Building financial clarity and data dependability",
    image: "/assets/services_finance.webp",
    explanation: "Moving beyond traditional accounting into strategic financial intelligence. Identifying the structural levers that drive sustainable profitability.",
    capabilities: [
      "MIS & Financial Reporting",
      "Unit Economics Analysis",
      "Cohort & Retention Analytics",
      "Margin Optimization Strategy",
      "Working Capital Planning",
      "Cash Flow Forecasting",
      "Business Intelligence Dashboards",
      "SKU & Category Profitability Analysis",
      "Financial Planning & Budgeting",
      "Growth & Efficiency Benchmarking"
    ],
    process: ["Ingestion", "Pattern recognition", "Forecasting", "Implementation"],
    outcomes: [
      "Stronger Financial Visibility",
      "Predictable Growth Economics",
      "Improved Cash Efficiency",
      "Smarter Strategic Decision-Making",
      "Sustainable Margin Expansion",
      "Institutional Financial Discipline"
    ]
  },
  {
    id: "strategy",
    title: "Strategy // Consulting",
    tagline: "Translating consumer insight into long-term market leadership.",
    image: "/assets/services_strategy.webp",
    explanation: "Building the strategic blueprints that allow brands to dominate their categories and defend their territory with institutional precision.",
    capabilities: [
      "Growth Strategy Development",
      "Go-To-Market Planning",
      "Consumer Insights & Market Research Reports",
      "Brand Positioning Strategy",
      "Distribution Expansion Planning",
      "International and Offline Expansion",
      "Pricing & Category Strategy",
      "Channel & Retail Structuring",
      "Competitive Landscape Analysis",
      "Business Model Optimization",
      "Founder & Leadership Advisory"
    ],
    process: ["Market Immersion", "Mapping", "Option Grids", "Roadmap"],
    outcomes: [
      "Clear Strategic Direction",
      "Faster Market Expansion",
      "Margin Accretive Expansion",
      "Stronger Consumer Positioning",
      "Scalable Growth Frameworks",
      "Sharper Decision-Making",
      "Long-Term Category Leadership"
    ]
  }
];

const ServicesPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Entrance
    gsap.from('.hero-reveal-text', {
      y: 100,
      opacity: 0,
      rotateX: -20,
      stagger: 0.2,
      duration: 1.8,
      ease: 'power4.out'
    });

    // Stacking Cards Logic
    const sections = gsap.utils.toArray('.service-stacking-card') as HTMLElement[];
    
    const mm = gsap.matchMedia();

    // Only apply pinning and stack-away effect on desktop
    mm.add("(min-width: 1101px)", () => {
      sections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          scrub: true,
        });

        if (i < sections.length - 1) {
          gsap.to(section.querySelector('.card-inner-stack'), {
            scale: 0.85,
            opacity: 0,
            filter: 'blur(20px)',
            y: -100,
            scrollTrigger: {
              trigger: sections[i + 1],
              start: 'top bottom',
              end: 'top top',
              scrub: true
            }
          });
        }
      });
    });

    // Keep reveal animations on all screen sizes
    sections.forEach((section) => {
      const img = section.querySelector('.stack-img-wrapper');
      const content = section.querySelector('.stack-content-wrapper');

      gsap.from(img, {
        scale: 1.3,
        opacity: 0,
        rotate: 5,
        duration: 1.5,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      });

      if (content) {
        gsap.from(content.querySelectorAll('.reveal-stack'), {
          x: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        });
      }
    });
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="services-page-out-the-box">
      <SEO 
        title="Our Services | Capital Structuring, Finance & Strategy" 
        description="Explore Daylight Capital's core capabilities in Capital Structuring, Strategic Finance, and Growth Strategy to engineer structural dominance." 
      />
      <header className="services-stack-hero">
        <div className="container">
          <div className="hero-asymmetric-layout">
            <div className="hero-left-main">
              <span className="hero-reveal-text manifesto-eyebrow">THE MANIFESTO</span>
              <h1 className="hero-reveal-text title-out">
                Architecting <br /> 
                <span className="serif-italic">The Future</span>
              </h1>
            </div>
            
            <div className="hero-right-side">
              <div className="hero-vertical-accent"></div>
              <p className="hero-reveal-text desc-out">
                We don't just advise; we engineer <br/>
                structural dominance. <br/>
                Explore our institutional framework for <br/>
                category leadership.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="services-stack-container">
        {services.map((service, i) => (
          <section key={service.id} id={service.id} className="service-stacking-card">
            <div className="card-inner-stack">
              <div className="container">
                <div className="stack-layout">
                  <div className="stack-img-wrapper">
                    <img src={service.image} alt={service.title} className="stack-img" />
                    <div className="stack-num-giant">{i + 1}</div>
                  </div>
                  
                  <div className="stack-content-wrapper">
                    <div className="stack-meta reveal-stack">
                      <span>0{i + 1}</span>
                      <div className="line"></div>
                      <span>ADVISORY</span>
                    </div>
                    
                    <h2 className="stack-title reveal-stack">{service.title}</h2>
                    <p className="stack-tagline reveal-stack">{service.tagline}</p>
                    
                    <div className="stack-info-grid">
                      <div className="info-col reveal-stack">
                        <span className="info-label">CAPABILITIES</span>
                        <ul className="info-list">
                          {service.capabilities.map(c => <li key={c}>{c}</li>)}
                        </ul>
                      </div>
                      <div className="info-col reveal-stack">
                        <span className="info-label">KEY OUTCOMES</span>
                        <div className="outcomes-stack">
                          {service.outcomes.map(o => <span key={o} className="out-pill">{o}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;


