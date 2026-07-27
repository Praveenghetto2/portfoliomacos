import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PlanetOrb = ({ index }) => {
  // Return different premium gradient spheres matching the mockup's 5 planets
  if (index === 0) {
    // 01 Orbit Banking - Purple sphere with glow & clean diagonal orbit ring
    return (
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Glow */}
        <div className="absolute inset-0 bg-brand-purple/20 rounded-full blur-2xl scale-125"></div>
        {/* Sphere */}
        <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-brand-dark via-[#3A1C9E] to-brand-purple-light shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.8),_0_10px_30px_rgba(108,61,255,0.4)] relative overflow-hidden">
          <div className="absolute top-2 left-6 w-16 h-8 bg-white/10 rounded-full blur-[6px] rotate-[-25deg]"></div>
        </div>
        {/* Orbit Ring */}
        <div className="absolute w-52 h-14 border border-brand-purple/30 rounded-full rotate-[-15deg] scale-y-[0.35] shadow-[0_0_15px_rgba(108,61,255,0.2)]"></div>
      </div>
    );
  }
  if (index === 1) {
    // 02 Growthos - Electric intelligence node sphere
    return (
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Glow */}
        <div className="absolute inset-0 bg-brand-purple/10 rounded-full blur-2xl scale-125"></div>
        {/* Sphere */}
        <div className="w-36 h-36 rounded-full bg-gradient-to-b from-[#180E35] to-brand-dark border-2 border-brand-purple/40 relative flex items-center justify-center overflow-hidden">
          {/* Inner mesh lines */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(108,61,255,0.15)_80%)]"></div>
          {/* Node dots */}
          <span className="absolute w-2 h-2 rounded-full bg-brand-purple-light top-8 left-12 animate-pulse shadow-[0_0_8px_#A58CFF]"></span>
          <span className="absolute w-2 h-2 rounded-full bg-brand-purple top-16 right-10 animate-pulse shadow-[0_0_8px_#6C3DFF]"></span>
          <span className="absolute w-1.5 h-1.5 rounded-full bg-brand-blue bottom-10 left-16 animate-pulse"></span>
        </div>
        {/* Orbit Ring */}
        <div className="absolute w-44 h-44 border border-brand-purple/20 border-dashed rounded-full rotate-45"></div>
      </div>
    );
  }
  if (index === 2) {
    // 03 Future Banking - Planet of AI Banking (Concentric double rings)
    return (
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Glow */}
        <div className="absolute inset-0 bg-brand-blue/10 rounded-full blur-2xl scale-125"></div>
        {/* Sphere */}
        <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-brand-dark via-[#1A264F] to-[#2563EB] shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.9),_0_10px_30px_rgba(37,99,235,0.3)] relative overflow-hidden">
          <div className="absolute top-4 left-6 w-12 h-6 bg-white/20 rounded-full blur-[4px] rotate-[-20deg]"></div>
        </div>
        {/* Double Rings */}
        <div className="absolute w-56 h-10 border border-brand-blue/30 rounded-full rotate-[-25deg] scale-y-[0.3]"></div>
        <div className="absolute w-48 h-8 border border-brand-purple/20 rounded-full rotate-[-25deg] scale-y-[0.35] translate-y-1"></div>
      </div>
    );
  }
  if (index === 3) {
    // 04 Payment Hub - Planet of Infrastructure (Complex gold/purple sphere)
    return (
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Glow */}
        <div className="absolute inset-0 bg-brand-purple/15 rounded-full blur-2xl scale-125"></div>
        {/* Sphere */}
        <div className="w-36 h-36 rounded-full bg-gradient-to-br from-brand-dark via-[#2E1854] to-[#F59E0B] shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.9),_0_10px_30px_rgba(245,158,11,0.2)] relative overflow-hidden">
          {/* Grid panel texture */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
        </div>
        {/* Gold Grid Orbits */}
        <div className="absolute w-52 h-16 border border-[#F59E0B]/30 rounded-full rotate-[15deg] scale-y-[0.3]"></div>
        <div className="absolute w-52 h-16 border border-brand-purple/30 rounded-full rotate-[-35deg] scale-y-[0.25]"></div>
      </div>
    );
  }
  // 05 UX Audit AI - Design intelligence (Nebula sphere)
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Glow */}
      <div className="absolute inset-0 bg-brand-purple/25 rounded-full blur-2xl scale-125"></div>
      {/* Sphere */}
      <div className="w-36 h-36 rounded-full bg-gradient-to-r from-brand-dark via-[#431407] to-[#EC4899] shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.9),_0_10px_30px_rgba(236,72,153,0.35)] relative overflow-hidden">
        <div className="absolute -inset-2 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.15),_transparent_50%)]"></div>
      </div>
      {/* Orbit Ring */}
      <div className="absolute w-50 h-12 border border-[#EC4899]/30 rounded-full rotate-[-10deg] scale-y-[0.35]"></div>
    </div>
  );
};

import { Link } from 'react-router-dom';

const PlanetCard = ({ num, title, subtitle, index }) => {
  const cardRef = useRef(null);

  // Map indexes to real case study paths
  const caseStudyPath = (index === 0 || index === 3) 
    ? "/case-study/revlitix-saas" 
    : "/case-study/sonic";

  // Motion values for tracking cursor relative to card center
  const mouseXVal = useMotionValue(0);
  const mouseYVal = useMotionValue(0);

  // Smooth springs for card rotation (3D tilt effect)
  const rotateX = useSpring(useTransform(mouseYVal, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useTransform(mouseXVal, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 22 });

  // Floating parallax displacement for the inner planet orb
  const orbX = useSpring(useTransform(mouseXVal, [-0.5, 0.5], [-15, 15]), { stiffness: 200, damping: 25 });
  const orbY = useSpring(useTransform(mouseYVal, [-0.5, 0.5], [-15, 15]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const localX = e.clientX - rect.left - width / 2;
    const localY = e.clientY - rect.top - height / 2;
    mouseXVal.set(localX / width);
    mouseYVal.set(localY / height);
  };

  const handleMouseLeave = () => {
    mouseXVal.set(0);
    mouseYVal.set(0);
  };

  return (
    <Link to={caseStudyPath} className="block shrink-0 no-underline">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        className="w-[280px] md:w-[330px] flex flex-col items-center justify-start text-center cursor-pointer group p-8 rounded-[32px] border border-apple-border bg-white/40 backdrop-blur-md shadow-apple-sm hover:shadow-apple-md hover:border-brand-purple/20 transition-colors duration-300"
      >
        {/* 3D Planet representation with parallax layer displacement */}
        <motion.div 
          style={{ 
            x: orbX, 
            y: orbY, 
            transformStyle: 'preserve-3d', 
            translateZ: 50 
          }}
          className="mb-8"
        >
          <PlanetOrb index={index} />
        </motion.div>

        {/* Info elements underneath */}
        <div className="flex flex-col items-center" style={{ transform: 'translateZ(25px)' }}>
          <span className="text-[10px] font-mono font-bold text-apple-subtext mb-2 block tracking-widest">{num}</span>
          <h3 className="text-lg md:text-xl font-display font-extrabold text-apple-text tracking-tight uppercase mb-1">
            {title}
          </h3>
          <p className="text-[10px] font-mono font-bold text-brand-purple uppercase tracking-widest">
            {subtitle}
          </p>
          
          {/* Action indicator */}
          <span className="text-[9px] font-mono font-bold text-[#3B82F6] uppercase tracking-wider mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Open Case Study →
          </span>
        </div>

      </motion.div>
    </Link>
  );
};

const ExploreSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const scrollDistance = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const planets = [
    { num: "01", title: "Orbit Banking", subtitle: "Planet of Payments" },
    { num: "02", title: "GrowtHos", subtitle: "Planet of Intelligence" },
    { num: "03", title: "Future Banking", subtitle: "Planet of AI Banking" },
    { num: "04", title: "Payment Hub", subtitle: "Planet of Infrastructure" },
    { num: "05", title: "UX Audit AI", subtitle: "Planet of Design Intelligence" },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="projects" 
      className="relative w-full h-screen bg-apple-bg bg-grid-pattern overflow-hidden border-b border-apple-border flex items-center"
    >
      {/* Fixed Left Header */}
      <div className="absolute top-24 left-6 md:left-12 lg:left-24 z-30 max-w-sm">
        <span className="text-[10px] font-mono font-bold text-apple-subtext tracking-widest uppercase mb-4 block">
          The Universe Map
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-apple-text uppercase mb-4 leading-[0.95]">
          EXPLORE PLANETS<br/>OF MY WORK
        </h2>
        <p className="text-sm text-apple-subtext font-body mb-8 leading-relaxed">
          Each planet represents a product, a challenge, and a universe of impact.
        </p>

        {/* View All Projects Button */}
        <a 
          href="/work" 
          className="inline-flex items-center gap-3 group px-5 py-3 rounded-full border border-apple-border bg-white shadow-apple-sm hover:border-brand-purple transition-all"
        >
          <span className="text-xs font-mono font-bold text-apple-text group-hover:text-brand-purple uppercase tracking-wider">
            View All Projects
          </span>
          <div className="w-6 h-6 rounded-full border border-apple-border group-hover:border-brand-purple flex items-center justify-center text-apple-subtext group-hover:text-brand-purple transition-colors">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </a>
      </div>

      {/* Horizontal Planet Track */}
      <div className="absolute inset-0 flex items-center">
        <div ref={trackRef} className="flex gap-16 pl-6 md:pl-12 lg:pl-24 pt-20 will-change-transform items-center">
          {/* Spacer to push panels past the absolute header */}
          <div className="w-[38vw] md:w-[48vw] shrink-0" />
          {planets.map((p, idx) => (
            <PlanetCard key={p.num} index={idx} {...p} />
          ))}
          <div className="w-[15vw] shrink-0" />
        </div>
      </div>

      {/* Next slide floating indicator arrow */}
      <div className="absolute right-12 bottom-12 w-12 h-12 rounded-full border border-apple-border bg-white/80 backdrop-blur-md shadow-apple-sm flex items-center justify-center text-apple-text animate-bounce z-30">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </section>
  );
};

export default ExploreSection;
