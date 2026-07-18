import React from 'react';
import { motion } from 'framer-motion';

const MissionCard = ({ num, title, date, desc, isActive }) => (
  <div className="flex flex-col items-start w-[240px] shrink-0 relative">
    {/* Card container */}
    <div className={`w-full p-6 rounded-2xl border transition-all duration-300 ${
      isActive 
        ? 'bg-gradient-to-br from-brand-purple to-[#4F1FE0] text-white border-transparent shadow-apple-md hover:shadow-apple-glass translate-y-[-8px]' 
        : 'bg-white border-apple-border text-apple-text hover:border-brand-purple/50 shadow-apple-sm hover:shadow-apple-md'
    }`}>
      <span className={`text-[9px] font-mono font-bold tracking-widest uppercase mb-1 block ${
        isActive ? 'text-brand-purple-light' : 'text-apple-subtext'
      }`}>
        Mission {num}
      </span>
      <h4 className="text-lg font-display font-extrabold mb-1 uppercase tracking-tight leading-tight">
        {title}
      </h4>
      <span className={`text-[10px] font-mono font-semibold block mb-4 ${
        isActive ? 'text-white/80' : 'text-apple-subtext'
      }`}>
        {date}
      </span>
      {desc && (
        <p className={`text-xs leading-relaxed ${
          isActive ? 'text-white/90' : 'text-apple-subtext'
        }`}>
          {desc}
        </p>
      )}
    </div>

    {/* Connection Dot on Timeline line */}
    <div className="absolute left-[30px] bottom-[-40px] flex flex-col items-center">
      <div className={`w-[1px] h-[30px] ${isActive ? 'bg-brand-purple' : 'bg-apple-border'}`}></div>
      <div className={`w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.15)] ${
        isActive ? 'bg-brand-purple' : 'bg-apple-subtext'
      }`}>
        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
      </div>
    </div>
  </div>
);

const AstronautLogSection = () => {
  const missions = [
    { num: "01", title: "Healthcare Design", date: "2019 - 2020", desc: "Designed patient portal and telemetry systems." },
    { num: "02", title: "Marketing SaaS", date: "2020 - 2022", desc: "Crafted automated funnel analytics & custom reports." },
    { num: "03", title: "Fintech Products", date: "2022 - 2024", desc: "Created multi-tenant checkout & billing platforms." },
    { num: "04", title: "Designing The Future of Banking", date: "2024 - →", desc: "Spearheading spatial computing concepts and autonomous ledger tools.", isActive: true },
  ];

  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen bg-apple-bg bg-grid-pattern overflow-hidden flex items-center py-28 px-6 md:px-12 lg:px-24 border-b border-apple-border"
    >
      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Title and Astronaut Helmet Image */}
        <div className="col-span-1 lg:col-span-4 flex flex-col items-start z-10">
          <span className="text-[10px] font-mono font-bold text-apple-subtext tracking-widest uppercase mb-4 block">
            The Astronaut Log
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-apple-text uppercase leading-none mb-4">
            BEYOND THE <br /> DESIGNER
          </h2>
          <p className="text-sm text-apple-subtext max-w-xs mb-8 leading-relaxed font-body">
            Every journey has a beginning. Here's mine.
          </p>
          
          <a 
            href="/resume" 
            className="inline-flex items-center gap-3 group px-6 py-3.5 rounded-full border border-apple-border bg-white shadow-apple-sm hover:border-brand-purple transition-all mb-8 lg:mb-12"
          >
            <span className="text-xs font-mono font-bold text-apple-text group-hover:text-brand-purple uppercase tracking-wider">
              Read My Story
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {/* Astronaut Portrait Image (Slightly smaller, cropped) */}
          <div className="w-56 h-56 rounded-full overflow-hidden border border-apple-border shadow-apple-glass relative pointer-events-none">
            <img 
              src="/assets/astronaut_character.jpg" 
              alt="Astronaut Log Portrait" 
              className="w-full h-full object-cover scale-110"
            />
            {/* Soft overlay gradient to melt image edge */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent"></div>
          </div>
        </div>

        {/* Right Side: Horizontal Timelines cards */}
        <div className="col-span-1 lg:col-span-8 flex flex-col relative pt-12 pb-16">
          {/* Main timeline horizontal connection line */}
          <div className="absolute left-0 right-0 bottom-[47px] h-[2px] bg-apple-border"></div>

          {/* Horizontal scroll Container for cards */}
          <div className="flex gap-6 overflow-x-auto pb-20 pt-4 scrollbar-thin px-4">
            {missions.map((m, idx) => (
              <motion.div
                key={m.num}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <MissionCard {...m} />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AstronautLogSection;
