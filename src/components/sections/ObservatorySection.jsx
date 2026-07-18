import React from 'react';
import { motion } from 'framer-motion';

const ConceptCard = ({ title, desc, icon, idx }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: idx * 0.1 }}
    className="bg-white border border-apple-border rounded-3xl p-6 shadow-apple-sm hover:border-brand-purple hover:shadow-apple-md transition-all duration-300 cursor-pointer group flex flex-col justify-between w-[220px] shrink-0"
  >
    {/* Icon wrapper */}
    <div className="w-10 h-10 rounded-2xl border border-apple-border bg-apple-bg flex items-center justify-center mb-6 text-brand-purple group-hover:scale-105 transition-transform">
      {icon}
    </div>
    
    <div>
      <h3 className="text-base font-display font-extrabold text-apple-text mb-1 uppercase tracking-tight leading-tight group-hover:text-brand-purple transition-colors">
        {title}
      </h3>
      <p className="text-[10px] font-body text-apple-subtext leading-relaxed">
        {desc}
      </p>
    </div>
  </motion.div>
);

const ObservatorySection = () => {
  const concepts = [
    { 
      title: "Conversational Banking", 
      desc: "Talk. Transact. Done.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )
    },
    { 
      title: "Autonomous Finance", 
      desc: "AI that acts for you.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    { 
      title: "AI Financial Agents", 
      desc: "Your personal CFO.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    },
    { 
      title: "Invisible Payments", 
      desc: "Seamless by design.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      )
    },
    { 
      title: "Predictive Banking", 
      desc: "Always one step ahead.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M23 6l-9.5 9.5-5-5L1 18" />
          <path d="M17 6h6v6" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative w-full min-h-screen bg-apple-bg bg-grid-pattern py-28 px-6 md:px-12 lg:px-24 border-b border-apple-border flex items-center">
      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Title and CTA */}
        <div className="col-span-1 lg:col-span-4 flex flex-col items-start z-10">
          <span className="text-[10px] font-mono font-bold text-apple-subtext tracking-widest uppercase mb-4 block">
            The Observatory
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-apple-text uppercase leading-none mb-4">
            WHAT BANKING <br /> LOOKS LIKE <br /> IN 2035
          </h2>
          <p className="text-sm text-apple-subtext max-w-xs mb-8 leading-relaxed font-body">
            Exploring the future of money, technology and human possibilities.
          </p>

          <a 
            href="/blog" 
            className="inline-flex items-center gap-3 group px-6 py-3.5 rounded-full border border-apple-border bg-white shadow-apple-sm hover:border-brand-purple transition-all mb-8 lg:mb-12"
          >
            <span className="text-xs font-mono font-bold text-apple-text group-hover:text-brand-purple uppercase tracking-wider">
              Explore The Future
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {/* Observatory Telescope Image (Cropped inside circular frame) */}
          <div className="w-56 h-56 rounded-full overflow-hidden border border-apple-border shadow-apple-glass relative pointer-events-none">
            <img 
              src="/assets/design_island.jpg" 
              alt="Planetary observatory telescope dome" 
              className="w-full h-full object-cover scale-110 mix-blend-darken"
            />
            {/* Blend mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent"></div>
          </div>
        </div>

        {/* Right Side: Concept Cards scroll list */}
        <div className="col-span-1 lg:col-span-8 flex flex-col relative pt-6 pb-8">
          <div className="flex gap-6 overflow-x-auto pb-12 pt-4 scrollbar-thin px-4">
            {concepts.map((concept, idx) => (
              <ConceptCard key={concept.title} {...concept} idx={idx} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ObservatorySection;
