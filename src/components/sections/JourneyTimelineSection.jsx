import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const timelineData = [
  { year: "2020", title: "Launch", desc: "The Beginning", x: 10, y: 50 },
  { year: "2021", title: "Learning", desc: "Learning & Exploring", x: 26, y: 50 },
  { year: "2023", title: "Building", desc: "Building & Creating Impact", x: 45, y: 50 },
  { year: "2025", title: "Fintech", desc: "Scaling Impact", x: 64, y: 50 },
  { year: "2026", title: "AI + Finance", desc: "The New Frontier", x: 80, y: 50 },
  { year: "FUTURE", title: "Unknown Galaxy", desc: "What's next?", x: 94, y: 50, isFuture: true },
];

const TimelineNode = ({ year, title, desc, x, y, isFuture }) => (
  <div
    className="absolute flex flex-col items-center z-10"
    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
  >
    {/* Year & Details (Text on top of node) */}
    <div className="text-center mb-4 select-none">
      <h3 className={`text-xl md:text-2xl font-display font-extrabold ${isFuture ? 'text-brand-purple' : 'text-apple-text'}`}>
        {year}
      </h3>
      <p className="text-[9px] font-mono font-bold tracking-widest uppercase text-brand-purple whitespace-nowrap mt-1">
        {title}
      </p>
      <p className="text-[9px] font-mono text-apple-subtext whitespace-nowrap">
        {desc}
      </p>
    </div>

    {/* Bullet Node Indicator */}
    {!isFuture ? (
      <div className="w-4 h-4 rounded-full bg-white border-[3px] border-apple-border relative flex items-center justify-center shadow-apple-sm group-hover:border-brand-purple transition-colors">
        <div className="w-1.5 h-1.5 bg-brand-purple rounded-full"></div>
      </div>
    ) : (
      <div className="w-6 h-6 rounded-full bg-brand-purple/20 flex items-center justify-center animate-pulse">
        <div className="w-2.5 h-2.5 bg-brand-purple rounded-full shadow-[0_0_10px_#6C3DFF]"></div>
      </div>
    )}
  </div>
);

const SpaceshipSprite = ({ progress }) => {
  const leftVal = useTransform(progress, [0, 1], ['10%', '94%']);
  
  return (
    <motion.div
      className="absolute z-20 w-16 h-8 flex items-center justify-center select-none"
      style={{
        left: leftVal,
        top: '50%',
        x: '-50%',
        y: '-50%',
      }}
    >
      {/* Ship Shape (SVG Renders a premium sleek modern shuttle looking right) */}
      <svg width="48" height="24" viewBox="0 0 24 12" fill="none" className="rotate-0 filter drop-shadow-[0_2px_8px_rgba(108,61,255,0.4)]">
        <path d="M22 6C20 4 15 2 10 2C7 2 4 4 1 5.5L0 6L1 6.5C4 8 7 10 10 10C15 10 20 8 22 6Z" fill="#0D0D16" />
        <path d="M22 6C20.5 5.2 16 3.5 10 3.5C7.5 3.5 5 4.5 2 5.5L1.5 6L2 6.5C5 7.5 7.5 8.5 10 8.5C16 8.5 20.5 6.8 22 6Z" fill="#6C3DFF" />
        <circle cx="16" cy="6" r="1" fill="#FFFFFF" />
        {/* Engine flame */}
        <path d="M-1 5L-5 6L-1 7Z" fill="#A58CFF" className="animate-pulse" />
      </svg>
      {/* Engine glow path */}
      <div className="absolute right-12 w-6 h-3 bg-brand-purple/40 rounded-full blur-[3px]"></div>
    </motion.div>
  );
};

const JourneyTimelineSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} id="timeline" className="relative w-full py-32 bg-apple-bg bg-grid-pattern overflow-hidden border-b border-apple-border">
      
      {/* Main Grid Header layout */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 mb-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
        <div>
          <span className="text-[10px] font-mono font-bold text-apple-subtext tracking-widest uppercase mb-4 block">
            The Journey Timeline
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-apple-text uppercase leading-none">
            A PATH OF CURIOSITY <br /> AND CREATION
          </h2>
        </div>
        <div className="flex flex-col items-start md:items-end">
          <p className="text-sm text-apple-subtext max-w-sm mb-6 md:text-right leading-relaxed font-body">
            Scroll to travel through my journey in the financial cosmos.
          </p>
          <button className="inline-flex items-center gap-2 group px-5 py-3 rounded-full border border-apple-border bg-white shadow-apple-sm hover:border-brand-purple transition-all">
            <span className="text-xs font-mono font-bold text-apple-text group-hover:text-brand-purple uppercase tracking-wider">
              Scroll To Travel
            </span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-bounce">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Curved Highway path area */}
      <div className="relative w-full h-[350px] max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 flex items-center">
        {/* Horizontal Track line */}
        <div className="absolute left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24 h-[3px] bg-apple-border z-0">
          <motion.div 
            className="h-full bg-gradient-to-r from-brand-purple to-brand-purple-light origin-left"
            style={{ scaleX: pathLength }}
          ></motion.div>
        </div>

        {/* Nodes overlay */}
        <div className="absolute inset-x-6 md:inset-x-12 lg:inset-x-24 h-full relative z-10 flex items-center justify-between">
          {timelineData.map((node) => (
            <TimelineNode key={node.year} {...node} />
          ))}
          
          {/* Spaceship sliding */}
          <SpaceshipSprite progress={smoothProgress} />

          {/* Glowing wormhole portals at far-right end */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full z-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-brand-purple/20 rounded-full blur-md animate-ping"></div>
            <div className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-[#A58CFF] to-brand-purple border border-white shadow-[0_0_20px_#6C3DFF] flex items-center justify-center">
              <div className="w-3 h-3 bg-brand-dark rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimelineSection;
