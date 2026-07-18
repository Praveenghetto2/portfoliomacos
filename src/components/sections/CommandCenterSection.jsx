import React from 'react';
import { motion } from 'framer-motion';

const LabCard = ({ num, category, desc, bgImage, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group relative bg-[#0D0D16] rounded-3xl h-[240px] overflow-hidden border border-white/5 cursor-pointer shadow-apple-sm flex flex-col justify-end p-6 hover:-translate-y-1 transition-all duration-300"
  >
    {/* Background Image with dark radial gradient overlay */}
    <div className="absolute inset-0 z-0">
      <img 
        src={bgImage} 
        alt={category} 
        className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D16] via-[#0D0D16]/50 to-transparent"></div>
    </div>

    {/* Content */}
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[9px] font-mono font-bold text-brand-purple-light tracking-wider uppercase">
          {num}
        </span>
        <span className="w-1 h-1 rounded-full bg-brand-purple"></span>
        <span className="text-[8px] font-mono font-bold text-white/40 tracking-wider">
          ACTIVE NODE
        </span>
      </div>
      <h3 className="text-lg md:text-xl font-display font-extrabold text-white uppercase tracking-tight leading-none mb-1">
        {category}
      </h3>
      <p className="text-[10px] text-white/50 leading-relaxed font-body">
        {desc}
      </p>
    </div>

    {/* Hover Arrow indicator */}
    <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  </motion.div>
);

const CommandCenterSection = () => {
  const cards = [
    { num: "DECK 01", category: "LinkedIn Articles", desc: "Thoughts on design, finance and life.", bgImage: "/assets/futuristic_workspace.jpg" },
    { num: "DECK 02", category: "Design Thoughts", desc: "Ideas, principles and mental models.", bgImage: "/assets/hero_globe.jpg" },
    { num: "DECK 03", category: "Future BankingConcepts", desc: "Exploring what's next in financial experiences.", bgImage: "/assets/astronaut_character.jpg" },
    { num: "DECK 04", category: "AI Experiments", desc: "Building with AI to solve real problems.", bgImage: "/assets/project_planets.jpg" },
    { num: "DECK 05", category: "Side Projects", desc: "Peculiar projects and explorations.", bgImage: "/assets/vault_door.jpg" },
    { num: "DECK 06", category: "Videos", desc: "Talks, breakdowns, and walkthroughs.", bgImage: "/assets/futuristic_workspace.jpg" },
  ];

  return (
    <section 
      id="lab" 
      className="relative w-full min-h-screen bg-apple-bg bg-grid-pattern py-28 px-6 md:px-12 lg:px-24 border-b border-apple-border flex items-center"
    >
      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Title Description */}
        <div className="col-span-1 lg:col-span-4 flex flex-col items-start justify-center z-10">
          <span className="text-[10px] font-mono font-bold text-apple-subtext tracking-widest uppercase mb-4 block">
            The Command Control
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-apple-text uppercase leading-none mb-4">
            IDEAS. <br /> EXPERIMENTS. <br /> THOUGHTS.
          </h2>
          <p className="text-sm text-apple-subtext max-w-xs mb-8 leading-relaxed font-body">
            A hub to share ideas, insights and experiments on the future of finance and design.
          </p>

          <a 
            href="/blog" 
            className="inline-flex items-center gap-3 group px-6 py-3.5 rounded-full border border-apple-border bg-white shadow-apple-sm hover:border-brand-purple transition-all"
          >
            <span className="text-xs font-mono font-bold text-apple-text group-hover:text-brand-purple uppercase tracking-wider">
              Explore Lab
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Right Side: Card Deck Grid */}
        <div className="col-span-1 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 z-10">
          {cards.map((c, idx) => (
            <LabCard key={c.category} {...c} delay={idx * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default CommandCenterSection;
