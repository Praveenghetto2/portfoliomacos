import React, { useState } from 'react';
import { motion } from 'framer-motion';

const VaultCard = ({ title, subtitle, isLeft }) => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div 
      onClick={() => setUnlocked(!unlocked)}
      className={`p-5 rounded-2xl border bg-white shadow-apple-sm transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 max-w-sm ${
        unlocked 
          ? 'border-brand-purple shadow-apple-md scale-[1.02]' 
          : 'border-apple-border hover:border-brand-purple/40'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Planet Mini Icon sphere */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-dark to-brand-purple flex items-center justify-center text-white text-[10px] font-bold shadow-[0_4px_10px_rgba(108,61,255,0.2)]">
          P
        </div>
        <div>
          <h4 className="text-sm font-display font-extrabold text-apple-text uppercase tracking-tight leading-none mb-1">
            {title}
          </h4>
          <p className="text-[9px] font-mono font-bold text-apple-subtext uppercase tracking-widest">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Unlock lock indicator */}
      <div className={`px-3 py-1.5 rounded-full border text-[9px] font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 transition-colors ${
        unlocked 
          ? 'bg-brand-purple text-white border-transparent' 
          : 'bg-apple-bg text-apple-text border-apple-border hover:bg-white'
      }`}>
        {unlocked ? (
          <>
            <span>UNLOCKED</span>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 9.9-1" />
            </svg>
          </>
        ) : (
          <>
            <span>UNLOCK</span>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </>
        )}
      </div>
    </div>
  );
};

const VaultSection = () => {
  const [spinVault, setSpinVault] = useState(false);

  return (
    <section className="relative w-full min-h-screen bg-apple-bg bg-grid-pattern py-28 px-6 md:px-12 lg:px-24 border-b border-apple-border flex items-center">
      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Text Description */}
        <div className="col-span-1 lg:col-span-3 flex flex-col items-start z-10">
          <span className="text-[10px] font-mono font-bold text-apple-subtext tracking-widest uppercase mb-4 block">
            The Vault
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-apple-text uppercase leading-none mb-4">
            EVERY GREAT <br /> STORY IS LOCKED <br /> IN A VAULT
          </h2>
          <p className="text-sm text-apple-subtext max-w-xs mb-8 leading-relaxed font-body">
            Unlock the case studies to explore the process, impact and outcomes.
          </p>
          
          <a 
            href="/work" 
            className="inline-flex items-center gap-3 group px-6 py-3.5 rounded-full border border-apple-border bg-white shadow-apple-sm hover:border-brand-purple transition-all"
          >
            <span className="text-xs font-mono font-bold text-apple-text group-hover:text-brand-purple uppercase tracking-wider">
              View All Case Studies
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Middle Column: Giant Vault door (composed beautifully with spin action) */}
        <div className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center z-10">
          <div 
            onClick={() => setSpinVault(!spinVault)}
            className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px] flex items-center justify-center cursor-pointer group"
          >
            {/* Soft planetary glow background */}
            <div className="absolute inset-0 bg-brand-purple/15 rounded-full blur-3xl scale-110"></div>
            
            {/* Vault Outer Wheel spinning */}
            <motion.div 
              animate={{ rotate: spinVault ? 180 : 0 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="w-full h-full relative rounded-full overflow-hidden shadow-apple-glass border-4 border-white"
            >
              <img 
                src="/assets/vault_door.jpg" 
                alt="Mechanical gear vault gate door" 
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 mix-blend-darken"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_#FFFFFF_70%)]"></div>
            </motion.div>

            {/* Click to spin tooltip */}
            <div className="absolute bg-white/90 backdrop-blur-md border border-apple-border px-4 py-2 rounded-full shadow-apple-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-ping"></span>
              <span className="text-[9px] font-mono font-bold tracking-widest text-apple-text uppercase">Spin Gear Door</span>
            </div>
          </div>
        </div>

        {/* Right Side: Lock/Unlock Cards Grid */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-6 z-10">
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-apple-subtext uppercase mb-2">
              Case Database
            </h4>
            <VaultCard title="Orbit Banking" subtitle="Planet of Payments" />
            <VaultCard title="Payment Hub" subtitle="Planet of Infrastructure" />
            <VaultCard title="Future Banking" subtitle="Planet of AI Banking" />
            <VaultCard title="UX Audit AI" subtitle="Planet of Design Intelligence" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default VaultSection;
