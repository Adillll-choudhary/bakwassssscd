import { useRef, memo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.footer-reveal-el', {
      y: 40,
      opacity: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 85%',
      }
    });
  }, { scope: footerRef });

  const footerLinks = {
    company: [
      { label: 'Home', path: '/' },
      { label: 'About Us', path: '/about' },
      { label: 'Services', path: '/services' },
      { label: 'Recruiters', path: '/recruiters' },
      { label: 'Contact Us', path: '/#contact' }
    ],
    services: [
      { label: 'Capital // Fundraising', path: '/services#capital' },
      { label: 'Strategy // Consulting', path: '/services#strategy' },
      { label: 'Investor // Readiness', path: '/services#readiness' },
      { label: 'Finance // Analytics', path: '/services#finance' }
    ],
    resources: [
      { label: 'Portfolio', path: '/portfolio' },
      { label: 'Insights', path: '/insights' },
      { label: 'Recruiters', path: '/recruiters' }
    ]
  };

  return (
    <footer ref={footerRef} className="footer-editorial">
      <div className="container">
        <div className="footer-main-grid">
          {/* Left Side: Brand & Description */}
          <div className="footer-brand-side footer-reveal-el">
            <Link to="/" className="footer-logo-link">
              <img src="/logo.webp?v=4" alt="Daylight Capital" className="footer-logo" />
            </Link>
            <p className="footer-brand-desc">
              Investment Banking + Strategic Consulting for high-growth businesses and emerging consumer brands.
            </p>
            <div className="footer-socials">
              <a href="https://www.linkedin.com/company/project-daylight-capital" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link"><Linkedin size={18} strokeWidth={1.5} /></a>
              <a href="mailto:Keshav@daylightcapital.in" aria-label="Email" className="social-link"><Mail size={18} strokeWidth={1.5} /></a>
            </div>
          </div>

          {/* Center Area: Navigation Columns */}
          <div className="footer-nav-columns">
            <div className="footer-column footer-reveal-el">
              <span className="footer-col-title">COMPANY</span>
              {footerLinks.company.map((link) => (
                <Link key={link.label} to={link.path} className="footer-nav-link">{link.label}</Link>
              ))}
            </div>
            <div className="footer-column footer-reveal-el">
              <span className="footer-col-title">SERVICES</span>
              {footerLinks.services.map((link) => (
                <Link key={link.label} to={link.path} className="footer-nav-link">{link.label}</Link>
              ))}
            </div>
            <div className="footer-column footer-reveal-el">
              <span className="footer-col-title">RESOURCES</span>
              {footerLinks.resources.map((link) => (
                <Link key={link.label} to={link.path} className="footer-nav-link">{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Right Side: Newsletter */}
          <div className="footer-newsletter footer-reveal-el">
            <span className="footer-col-title">STAY CONNECTED</span>
            <p className="newsletter-text">
              Subscribe to receive insights on markets, brands and growth.
            </p>
            <div className="newsletter-input-wrapper">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="newsletter-input" 
              />
              <button className="newsletter-submit" aria-label="Subscribe">
                <ArrowRight size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar footer-reveal-el">
          <div className="bottom-line"></div>
          <div className="bottom-content">
            <span className="copyright">© {new Date().getFullYear()} Daylight Capital Advisors Private Limited. All rights reserved.</span>
            <span className="studio-credit">Website by <span className="text-accent">Coldune Studio</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
