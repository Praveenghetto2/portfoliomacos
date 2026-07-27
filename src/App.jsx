import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

gsap.registerPlugin(ScrollTrigger);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          background: '#FAFAF9',
          color: '#1D1D1F',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 999999
        }}>
          <div style={{ maxWidth: '600px', padding: '32px', background: 'white', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '48px' }}>⚠️</span>
            <h1 style={{ fontSize: '24px', fontWeight: 800, marginTop: '16px', color: '#1D1D1F' }}>Application Error</h1>
            <p style={{ fontSize: '14px', color: '#86868B', marginTop: '8px', lineHeight: 1.5 }}>
              React encountered a rendering issue. Error details:
            </p>
            <div style={{
              marginTop: '16px',
              padding: '16px',
              background: '#F5F5F7',
              borderRadius: '12px',
              textAlign: 'left',
              fontSize: '12px',
              fontFamily: 'monospace',
              color: '#FF3B30',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap'
            }}>
              {this.state.error?.toString()}
              <br/><br/>
              {this.state.error?.stack}
            </div>
            <button 
              onClick={() => window.location.reload()}
              style={{
                marginTop: '24px',
                padding: '12px 24px',
                background: '#8B5CF6',
                color: 'white',
                border: 'none',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

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

  // Initialize Lenis smooth scroll + GSAP ScrollTrigger integration
  useEffect(() => {
    let lenisInstance = null;
    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
      });

      lenisInstance = lenis;
      lenisRef.current = lenis;
      window.lenis = lenis;

      // Connect Lenis scroll to GSAP ScrollTrigger so pinning/scrubbing works
      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    } catch (err) {
      console.warn("Lenis smooth scroll failed to initialize:", err);
    }

    return () => {
      if (lenisInstance) {
        try {
          lenisInstance.destroy();
        } catch (e) {}
      }
      lenisRef.current = null;
      window.lenis = null;
    };
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <div className="app-container">
          <CustomCursor />
          <Navigation />
          <AnimatedRoutes />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
