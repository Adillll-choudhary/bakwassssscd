import { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Linkedin } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleContactClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(contactEl);
        } else {
          contactEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Insights', path: '/insights' },
    { label: 'Recruiters', path: '/recruiters' },
    { label: 'Contact Us', path: '/#contact', onClick: handleContactClick }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isHomePage ? 'on-home' : 'on-other'}`}>
      <div className="navbar-container">
        <div className="logo-wrapper">
          <Link to="/">
            <img 
              src="/logo.webp?v=4" 
              alt="Daylight Capital" 
              className={`brand-logo ${(isHomePage && !scrolled && !menuOpen) ? 'logo-white' : 'logo-black'}`} 
            />
          </Link>
        </div>
        
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((item) => (
            <Link 
              key={item.label} 
              to={item.path} 
              className="nav-item"
              onClick={item.onClick ?? (() => setMenuOpen(false))}
            >
              {item.label}
            </Link>
          ))}
          <span className="nav-divider"></span>
          <a href="https://www.linkedin.com/company/project-daylight-capital" target="_blank" rel="noopener noreferrer" className="nav-item linkedin-icon">
            <Linkedin size={18} />
          </a>
        </div>

        {/* Hamburger Button */}
        <button 
          className={`mobile-menu-btn ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default memo(Navbar);
