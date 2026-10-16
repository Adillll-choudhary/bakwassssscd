import React, { useEffect, useRef } from 'react';
import './AboutUs.css';
import SEO from '../components/SEO';

import { Mail, Linkedin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutUs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Text Animation
      gsap.utils.toArray<HTMLElement>('.reveal-text').forEach((element) => {
        gsap.fromTo(element, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-us-page" ref={containerRef}>
      <SEO 
        title="About Daylight Capital | Strategic Growth Platforms" 
        description="Founded by Keshav Agarwal, Daylight Capital brings institutional rigor and hands-on execution to emerging consumer businesses and ambitious founders." 
      />
      
      {/* Hero Section: Editorial Cover Style */}
      <section className="manifesto-hero section">
        <div className="manifesto-hero-bg"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="manifesto-top-grid">
            <div className="manifesto-col-left reveal-text">
              <span className="arch-label gold-arch-label">OUR ETHOS</span>
              <h1 className="manifesto-heading">
                <span style={{ color: 'var(--color-text-primary)', fontStyle: 'normal', fontSize: 'clamp(3.5rem, 7vw, 8rem)', display: 'inline-block', lineHeight: '1' }}>Built For</span> <span className="serif-italic" style={{ color: '#b89047', fontSize: 'clamp(3.2rem, 6.5vw, 7.2rem)' }}>Long-<br />
                Term Growth</span>
              </h1>
            </div>
            <div className="manifesto-col-right reveal-text">
              <p className="manifesto-lead-text">
                Daylight Capital is a consulting financial advisory firm for consumer brands in India. We partner with founders at every stage of their growth journey.
              </p>

            </div>
          </div>

        </div>
      </section>

      {/* Founder's Letter Section */}
      <section className="founder-letter-new">
        <div className="container">
          <div className="letter-layout">
            
            {/* Left Column - Images */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div className="reveal-text" style={{ marginBottom: '20px' }}>
                <div className="f-left-header">
                  <span>FOUNDER'S NOTE</span>
                </div>
              </div>
              <div className="f-image-wrap reveal-text" style={{ display: 'flex', justifyContent: 'center' }}>
                <img src="/daylight founder (1).webp" alt="Keshav Agarwal, Founder of Daylight Capital" className="f-body-img" />
              </div>
              <div className="f-image-stack reveal-text" style={{ marginTop: '20px' }}>
                <img src="/daylight_4.webp" alt="Daylight Capital team meeting in a corporate boardroom" className="f-img-regular" style={{ aspectRatio: '16/9', objectPosition: 'center' }} />
                <img src="/IMG_6438.JPG.webp" alt="Keshav Agarwal speaking at a strategic growth event" className="f-img-regular" style={{ aspectRatio: '16/9', objectPosition: 'top' }} />
                <img src="/daylight_5.webp" alt="Daylight Capital networking event for founders" className="f-img-regular" style={{ aspectRatio: '16/9', objectPosition: 'top' }} />
              </div>
            </div>

            {/* Right Column - Text */}
            <div className="letter-content-right">
              
              <div className="reveal-text" style={{ marginBottom: '80px' }}>
                <h2 className="f-heading" style={{ marginTop: '0', fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '60px' }}>
                  A Letter From The <span className="serif-italic" style={{ color: '#b89047', position: 'relative', display: 'inline-block' }}>
                    Founder.
                    <svg style={{ position: 'absolute', bottom: '-3px', left: '-5%', width: '110%', height: '15px' }} viewBox="0 0 100 15" preserveAspectRatio="none">
                      <path d="M2,13 Q50,2 98,13" stroke="#b89047" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>
                </h2>
                <h2 className="f-heading">More than capital.</h2>
                <p className="f-text">I never set out to build another traditional advisory firm.</p>
                <p className="f-text">
                  Early in my journey, I realised that founders rarely need only pitch decks, financial models, 
                  or fundraising introductions. More often, they need clarity. They need partners who understand 
                  what it truly feels like to build something from the ground up. The uncertainty, the ambition, 
                  the pace, and the constant balancing act between growth and survival.
                </p>
                <p className="f-text">
                  Over the years, I have spent significant time understanding how consumer businesses actually 
                  operate, not just from boardrooms but from the ground level. I have worked closely with 
                  performance marketing teams, branding agencies, celebrity managers, manufacturers, 
                  importers, distributors, warehousing operators, international sellers, logistics partners, 
                  retailers, kirana stores, paan tapris, last-mile delivery networks, and tried to understand 
                  the perspective of every enabler in this ecosystem.
                </p>

                <div className="f-quote-wrap">
                  <span className="f-quote-mark">“</span>
                  <h3 className="f-quote-text serif-italic">"That belief is what shaped Daylight Capital."</h3>
                </div>
                <div className="f-divider"></div>
                <p className="f-text">
                  Today, we work closely with consumer brands across capital raising, growth strategy, financial 
                  planning, operational structuring, and long-term growth. What makes us different is simple. 
                  We do not operate like external consultants.
                </p>
                <p className="f-text">
                  We think, plan, and execute alongside founders. We immerse ourselves in the business, 
                  challenge assumptions, solve problems in real time, and support companies through the 
                  decisions that shape their future.
                </p>
              </div>

              <div className="reveal-text">
                <p className="f-text">
                  My ambition for Daylight Capital is clear. I want to build one of India's most trusted strategic 
                  growth platforms for emerging consumer businesses. A place where institutional thinking meets 
                  hands-on execution. A place where ambitious founders find not just advisors, but long-term 
                  partners invested in helping them build enduring and iconic companies.
                </p>
                <p className="f-text signature-thanks">Thank you for being here.</p>
                <div className="f-signature-block">
                  <span className="sig-name serif-italic">Keshav Agarwal</span>
                  <span className="sig-title">FOUNDER, DAYLIGHT CAPITAL</span>
                  <div className="sig-socials">
                    <a href="https://www.linkedin.com/in/keshavmagarwal" target="_blank" rel="noopener noreferrer" className="sig-link"><Linkedin size={16} /></a>
                    <a href="mailto:Keshav@daylightcapital.in" className="sig-link"><Mail size={16} /></a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Our Team Section */}
      <section className="our-team-section section">
        <div className="container">
          <div className="team-header-layout">
            <div className="team-header-left">
              <span className="arch-label">OUR TEAM</span>
              <h2 style={{ position: 'relative' }}>
                <span className="serif-italic" style={{ color: 'var(--color-text-primary)' }}>The People</span><br/>
                <span className="serif-italic" style={{ color: 'var(--color-text-primary)' }}>Behind </span>
                <span className="serif-italic" style={{ color: '#b89047', fontStyle: 'italic' }}>Daylight</span>
              </h2>
            </div>
            <div className="team-header-right">
              <p>
                A team of operators, advisors, and builders who bring institutional rigor 
                and founder empathy to everything we do.
              </p>
              <div className="manifesto-divider" style={{ marginTop: '20px', width: '40px' }}></div>
            </div>
          </div>

          <div className="team-grid">
            <div className="team-card">
              <div className="team-img-wrap">
                <img src="/keshav 2.webp" alt="Keshav Agarwal, Founder and Strategic Advisor at Daylight Capital" />
              </div>
              <div className="team-info">
                <h4>Keshav Agarwal</h4>
                <span className="team-role">FOUNDER</span>
                <p className="team-bio">Seasoned investment banker and operating advisor for consumer brands, combining strategic insight with hands-on execution.</p>
                <div className="team-socials">
                  <a href="https://www.linkedin.com/in/keshavmagarwal" target="_blank" rel="noopener noreferrer"><Linkedin size={14} /></a>
                  <a href="mailto:Keshav@daylightcapital.in"><Mail size={14} /></a>
                </div>
              </div>
            </div>

            <div className="team-card">
              <div className="team-img-wrap">
                <img src="/dhanisha jain.webp" alt="Dhanisha Jain, Advisor and FP&A Expert at Daylight Capital" />
              </div>
              <div className="team-info">
                <h4>Dhanisha Jain</h4>
                <span className="team-role">ADVISOR</span>
                <p className="team-bio">Partner at LS Nalwaya & Co, Heritage CA Firm, expert in FP&A & assurance assignments.</p>
                <div className="team-socials">
                  <a href="https://www.linkedin.com/in/dhanisha-jain/" target="_blank" rel="noopener noreferrer"><Linkedin size={14} /></a>
                  <a href="mailto:dhanishajain@lsnalwayaco.com"><Mail size={14} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated CTA Section */}
      <section className="about-cta-premium section">
        <div className="container">
          <div className="cta-premium-content">
            <div className="cta-text-side reveal-text">
              <span className="arch-label">NEXT STEPS</span>
              <h2>Let’s build something <br /><span className="serif-italic text-accent">Meaningful</span> Together.</h2>
              <p>Moving forward with greater confidence and strategic clarity.</p>
            </div>
            <div className="cta-button-side reveal-text">
              <Link to="/#contact" className="magnetic-button-wrap">
                <div className="magnetic-button">
                  <div className="magnetic-inner">
                    <span>START A <br /> CONVERSATION</span>
                    <ArrowUpRight size={24} />
                  </div>
                  <div className="button-blob"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default AboutUs;
