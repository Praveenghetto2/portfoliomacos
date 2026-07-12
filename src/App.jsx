import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import Work from './pages/Work';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import Resume from './pages/Resume';
import NotFound from './pages/NotFound';
import './App.css';

/* ── Animated Routes wrapper ── */
function AnimatedRoutes() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/case-study/:id" element={<CaseStudy />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

/* ── App Shell ── */
function App() {
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // RAF loop for Lenis + Framer Motion integration
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      window.lenis = null;
    };
  }, []);

  return (
    <Router>
      <div className="app-container">
        <CustomCursor />
        <Navigation />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
