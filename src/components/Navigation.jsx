import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Intro', section: 'hero' },
  { label: 'Philosophy', section: 'philosophy' },
  { label: 'Work', section: 'work' },
  { label: 'Impact', section: 'impact' },
  { label: 'About', section: 'about' },
  { label: 'Contact', section: 'contact' },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOSMode, setIsOSMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomepage = location.pathname === '/';

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkOS = () => {
      setIsOSMode(document.documentElement.classList.contains('is-os-mode'));
    };
    checkOS();
    
    if (typeof window !== 'undefined' && window.MutationObserver) {
      const observer = new MutationObserver(checkOS);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((e, section) => {
    e.preventDefault();
    if (isHomepage) {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate(`/#${section}`);
    }
    setMobileOpen(false);
  }, [isHomepage, navigate]);

  if (isHomepage && isOSMode && !isMobile) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-white/70 backdrop-blur-xl border-apple-border shadow-apple-sm py-3'
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-display font-extrabold tracking-tighter text-apple-text hover:text-brand-purple transition-colors">
            PK<span className="text-brand-purple">.</span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.section}
                href={`#${link.section}`}
                onClick={(e) => handleNavClick(e, link.section)}
                className="text-[11px] font-mono font-bold tracking-widest uppercase text-apple-subtext hover:text-brand-purple transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full border border-apple-border flex items-center justify-center text-apple-subtext hover:text-brand-purple hover:border-brand-purple transition-colors bg-white/50 backdrop-blur-md">
              <Moon size={14} />
            </button>
            <button
              className="md:hidden w-9 h-9 rounded-full border border-apple-border flex items-center justify-center text-apple-text bg-white/50"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-2xl flex flex-col justify-center items-center"
          >
            <button
              className="absolute top-5 right-6 md:right-12 w-10 h-10 rounded-full border border-apple-border flex items-center justify-center text-apple-text"
              onClick={() => setMobileOpen(false)}
            >
              <X size={18} />
            </button>
            <nav className="flex flex-col gap-8 text-center">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.section}
                  href={`#${link.section}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={(e) => handleNavClick(e, link.section)}
                  className="text-4xl font-display font-extrabold uppercase text-apple-text hover:text-brand-purple transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
