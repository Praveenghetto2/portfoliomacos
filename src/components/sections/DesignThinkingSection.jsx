import React from 'react';
import { motion } from 'framer-motion';

const DesignThinkingSection = () => {
  const tools = [
    { name: 'Figma', icon: '✦' },
    { name: 'React', icon: '⚛' },
    { name: 'Tailwind', icon: '★' },
    { name: 'Framer Motion', icon: '▲' },
    { name: 'GSAP', icon: '⚡' },
    { name: 'Three.js', icon: '⬢' },
  ];

  const expertises = [
    { name: 'Product Design', score: 5 },
    { name: 'User Research', score: 4 },
    { name: 'Fintech Solutions', score: 5 },
    { name: 'Interaction Design', score: 5 },
    { name: 'Design Systems', score: 5 },
    { name: 'No-Code & Automation', score: 4 },
  ];

  const skillNodes = [
    { name: 'PRODUCT STRATEGY', x: '50%', y: '10%' },
    { name: 'UI DESIGN', x: '82%', y: '25%' },
    { name: 'DESIGN SYSTEMS', x: '80%', y: '75%' },
    { name: 'MOTION DESIGN', x: '50%', y: '90%' },
    { name: 'AI AUTOMATION', x: '20%', y: '75%' },
    { name: 'FINTECH', x: '18%', y: '25%' },
  ];

  return (
    <section className="relative w-full min-h-screen bg-apple-bg bg-grid-pattern py-28 px-6 md:px-12 lg:px-24 border-b border-apple-border flex items-center">
      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Heading */}
        <div className="col-span-1 lg:col-span-3 flex flex-col items-start z-10">
          <span className="text-[10px] font-mono font-bold text-apple-subtext tracking-widest uppercase mb-4 block">
            The Skills Radar
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-apple-text uppercase leading-none mb-4">
            SKILLS THAT <br /> POWER MY <br /> UNIVERSE
          </h2>
          <p className="text-sm text-apple-subtext max-w-xs mb-8 leading-relaxed font-body">
            A network of skills, tools and thinking that build my universe.
          </p>
          <button className="inline-flex items-center gap-3 group px-6 py-3.5 rounded-full border border-apple-border bg-white shadow-apple-sm hover:border-brand-purple transition-all">
            <span className="text-xs font-mono font-bold text-apple-text group-hover:text-brand-purple uppercase tracking-wider">
              Explore Skills
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Middle Column: Skills Radar Map Graphic (SVG + CSS) */}
        <div className="col-span-1 lg:col-span-6 h-[400px] md:h-[500px] relative flex items-center justify-center bg-white/40 backdrop-blur-sm border border-apple-border rounded-[40px] shadow-apple-sm overflow-hidden p-6">
          {/* Radar background circles */}
          <div className="absolute w-[80%] h-[80%] rounded-full border border-brand-purple/5 border-dashed"></div>
          <div className="absolute w-[60%] h-[60%] rounded-full border border-brand-purple/10"></div>
          <div className="absolute w-[40%] h-[40%] rounded-full border border-brand-purple/5"></div>
          
          {/* Connecting SVG Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="50" y1="50" x2="50" y2="10" stroke="rgba(108, 61, 255, 0.2)" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="82" y2="25" stroke="rgba(108, 61, 255, 0.2)" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="80" y2="75" stroke="rgba(108, 61, 255, 0.2)" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="50" y2="90" stroke="rgba(108, 61, 255, 0.2)" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="20" y2="75" stroke="rgba(108, 61, 255, 0.2)" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="18" y2="25" stroke="rgba(108, 61, 255, 0.2)" strokeWidth="0.5" />
          </svg>

          {/* Central core node */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="absolute z-20 w-32 h-32 rounded-full bg-gradient-to-br from-brand-purple to-[#4F1FE0] text-white flex flex-col items-center justify-center text-center shadow-[0_10px_35px_rgba(108,61,255,0.4)] cursor-pointer"
          >
            <span className="text-[10px] font-mono font-bold tracking-widest text-brand-purple-light uppercase mb-1">Core</span>
            <span className="text-xs font-display font-extrabold tracking-tight">DESIGN THINKING</span>
          </motion.div>

          {/* Connected orbiting nodes */}
          {skillNodes.map((node, i) => (
            <motion.div
              key={node.name}
              whileHover={{ scale: 1.05, y: -2 }}
              className="absolute z-10 px-4 py-2.5 rounded-full border border-apple-border bg-white shadow-apple-sm text-[9px] font-mono font-bold tracking-widest text-apple-text flex items-center gap-2 cursor-pointer hover:border-brand-purple transition-all"
              style={{ top: node.y, left: node.x, transform: 'translate(-50%, -50%)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple"></span>
              {node.name}
            </motion.div>
          ))}
        </div>

        {/* Right Column: Tools & Expertise list */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-8 z-10">
          {/* Tools Grid */}
          <div className="bg-white/50 backdrop-blur-md border border-apple-border rounded-3xl p-6 shadow-apple-sm">
            <h4 className="text-xs font-mono font-bold tracking-widest text-apple-subtext uppercase mb-4">
              Tools & Platforms
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {tools.map((t) => (
                <div 
                  key={t.name}
                  className="flex flex-col items-center justify-center p-3 rounded-xl border border-apple-border bg-white hover:border-brand-purple transition-all group"
                  title={t.name}
                >
                  <span className="text-xl text-brand-purple group-hover:scale-110 transition-transform mb-1">{t.icon}</span>
                  <span className="text-[9px] font-mono font-bold tracking-tighter text-apple-text uppercase text-center">{t.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expertise dots rating */}
          <div className="bg-white/50 backdrop-blur-md border border-apple-border rounded-3xl p-6 shadow-apple-sm">
            <h4 className="text-xs font-mono font-bold tracking-widest text-apple-subtext uppercase mb-4">
              Expertise
            </h4>
            <div className="space-y-3">
              {expertises.map((exp) => (
                <div key={exp.name} className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-apple-text uppercase tracking-wider">{exp.name}</span>
                  {/* Rating dots */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <span 
                        key={dot} 
                        className={`w-2 h-2 rounded-full ${
                          dot <= exp.score ? 'bg-brand-purple' : 'bg-apple-border'
                        }`}
                      ></span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DesignThinkingSection;
