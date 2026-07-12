import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navigation.css';

const NAV_ITEMS = [
  { label: 'Process', section: 'process' },
  { label: 'About', section: 'about' },
  { label: 'Contact', section: 'contact' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const ticking = useRef(false);

  const isHomepage = location.pathname === '/';

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Throttled scroll handler for scrolled state + active section tracking
  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;

    requestAnimationFrame(() => {
      const scrollY = window.scrollY;

      // Glassmorphism trigger
      setScrolled(scrollY > 80);

      // Active section tracking (homepage only)
      if (isHomepage) {
        const sections = NAV_ITEMS.map((item) => {
          const el = document.getElementById(item.section);
          if (!el) return { id: item.section, top: Infinity, bottom: Infinity };
          const rect = el.getBoundingClientRect();
          return {
            id: item.section,
            top: rect.top,
            bottom: rect.bottom,
          };
        });

        const offset = window.innerHeight * 0.35;
        let current = '';

        for (const section of sections) {
          if (section.top <= offset && section.bottom > 0) {
            current = section.id;
          }
        }

        setActiveSection(current);
      }

      ticking.current = false;
    });
  }, [isHomepage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Handle nav link click — smooth scroll on homepage, navigate on other pages
  const handleNavClick = useCallback(
    (e, section) => {
      e.preventDefault();

      if (isHomepage) {
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        navigate(`/#${section}`);
      }

      setIsOpen(false);
    },
    [isHomepage, navigate]
  );

  // Overlay animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const linkContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <header className={`nav-header ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo hover-target">
          PK<span className="nav-logo-dot">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <div className="nav-links">
            {NAV_ITEMS.map((item) => {
              // Hide About and Contact on non-homepage routes
              if (!isHomepage && (item.section === 'about' || item.section === 'contact')) {
                return null;
              }
              return (
                <a
                  key={item.section}
                  href={`/#${item.section}`}
                  className={`nav-link hover-target ${
                    isHomepage && activeSection === item.section ? 'active' : ''
                  }`}
                  onClick={(e) => handleNavClick(e, item.section)}
                >
                  {item.label}
                </a>
              );
            })}


            <Link 
              to="/work" 
              className={`nav-link hover-target ${location.pathname === '/work' ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Work
            </Link>

            <Link 
              to="/blog" 
              className={`nav-link hover-target ${location.pathname.startsWith('/blog') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            
            {/* Direct Route Link for Resume */}
            <Link 
              to="/resume" 
              className={`nav-link hover-target ${location.pathname === '/resume' ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Resume
            </Link>
          </div>
          <a
            href="mailto:praveenpk990057@gmail.com"
            className="nav-cta hover-target"
          >
            Let's Talk
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className={`mobile-menu-btn hover-target ${isOpen ? 'menu-open' : ''}`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="mobile-nav-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="mobile-nav-links"
              variants={linkContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {NAV_ITEMS.map((item) => {
                if (!isHomepage && (item.section === 'about' || item.section === 'contact')) {
                  return null;
                }
                return (
                  <motion.a
                    key={item.section}
                    href={`/#${item.section}`}
                    className="mobile-nav-link hover-target"
                    variants={linkVariants}
                    onClick={(e) => handleNavClick(e, item.section)}
                  >
                    {item.label}
                  </motion.a>
                );
              })}


              <motion.div variants={linkVariants}>
                <Link
                  to="/work"
                  className="mobile-nav-link hover-target"
                  onClick={() => setIsOpen(false)}
                >
                  Work
                </Link>
              </motion.div>

              <motion.div variants={linkVariants}>
                <Link
                  to="/blog"
                  className="mobile-nav-link hover-target"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
              </motion.div>

              <motion.div variants={linkVariants}>
                <Link
                  to="/resume"
                  className="mobile-nav-link hover-target"
                  onClick={() => setIsOpen(false)}
                >
                  Resume
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="mobile-nav-footer"
              variants={linkVariants}
            >
              <a
                href="mailto:praveenpk990057@gmail.com"
                className="mobile-nav-cta hover-target"
              >
                Let's Talk →
              </a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
