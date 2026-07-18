import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const HeroSection = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse Parallax for subtle depth
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothScrollY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const textY = useTransform(smoothScrollY, [0, 1], [0, -50]);
  const graphicsY = useTransform(smoothScrollY, [0, 1], [0, 50]);
  const opacityFade = useTransform(smoothScrollY, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      id="universe" 
      className="relative w-full min-h-screen bg-[#FFFFFF] overflow-hidden flex flex-col justify-between pt-28 pb-6 px-6 md:px-12 lg:px-24 border-b border-apple-border"
    >
      {/* Background Soft Purple Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[25%] right-[20%] w-[550px] h-[550px] rounded-full blur-[130px] bg-brand-purple/10"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] rounded-full blur-[100px] bg-brand-blue/5"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
        
        {/* LEFT COLUMN: Typography & CTA */}
        <motion.div 
          style={{ y: textY, opacity: opacityFade }}
          className="col-span-1 lg:col-span-5 flex flex-col items-start z-30 pt-10"
        >
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-1 mb-8"
          >
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#6B7280] uppercase">
              PRAVEEN KUMAR
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-brand-purple shadow-[0_0_8px_#6C3DFF]"></span>
              <span className="text-xs font-mono font-bold tracking-wider text-apple-text uppercase">
                Product Designer
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[0.95] text-apple-text mb-12 uppercase"
          >
            DESIGNING <br />
            THE FUTURE OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-purple-light to-brand-blue block mt-3 text-7xl md:text-8xl lg:text-9xl tracking-tighter">
              MONEY.
            </span>
          </motion.h1>

          {/* CTA Button: Pill with Dark Orb Arrow */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button className="flex items-center gap-5 bg-white/60 backdrop-blur-md border border-black/5 hover:border-brand-purple/20 pr-8 pl-3 py-3 rounded-full shadow-apple-sm hover:shadow-apple-md transition-all group">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#0D0D16] to-[#251254] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(13,13,22,0.3)] group-hover:scale-105 transition-transform duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-0.5 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <span className="text-xs font-mono font-bold tracking-[0.22em] text-apple-text uppercase">
                CLICK TO BEGIN JOURNEY
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Full Composite Graphic (Globe + Astronaut + Moon Ground) */}
        <motion.div 
          style={{ y: graphicsY, opacity: opacityFade }}
          className="col-span-1 lg:col-span-7 h-[550px] md:h-[700px] w-full relative z-20 flex items-center justify-center pointer-events-none"
        >
          {/* Main Composite Image */}
          <motion.div 
            className="w-full h-full relative"
            style={{ 
              x: mousePos.x * -0.5, 
              y: mousePos.y * -0.5 
            }}
          >
            <img 
              src="/assets/hero_main_scene.png" 
              alt="The Financial Cosmos Master Scene" 
              className="w-full h-full object-contain mix-blend-darken scale-110 translate-y-4"
            />
            {/* Ambient vignette to blend edges perfectly */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_50%,_#FFFFFF_78%)]"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* BOTTOM METRICS / INDICATORS */}
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between text-[10px] font-mono font-bold tracking-widest text-[#6B7280] uppercase z-20 pt-4">
        {/* Scroll Indicator */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-apple-text animate-pulse"></span>
          SCROLL TO EXPLORE
        </div>
        
        {/* Enter the Universe label and vertical anchor line */}
        <div className="flex flex-col items-center gap-1.5 translate-x-[-50%] absolute left-1/2 hidden md:flex">
          <span>ENTER THE FINANCIAL UNIVERSE</span>
          <div className="w-[1px] h-8 bg-apple-text/40 relative">
            <div className="absolute bottom-0 left-[-1.5px] w-1 h-1 rounded-full bg-brand-purple"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
