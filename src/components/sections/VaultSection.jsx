import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const VaultCard = ({ id, title, subtitle, isUnlocked, onToggle }) => {
  const caseStudyPath = (id === 'orbit' || id === 'hub') 
    ? "/case-study/revlitix-saas" 
    : "/case-study/sonic";

  return (
    <div 
      className={`p-5 rounded-2xl border bg-white shadow-apple-sm transition-all duration-300 flex flex-col gap-4 max-w-sm ${
        isUnlocked 
          ? 'border-brand-purple shadow-apple-md' 
          : 'border-apple-border hover:border-brand-purple/40'
      }`}
    >
      <div className="flex items-center justify-between gap-4 w-full">
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

        {/* Lock/Unlock Toggle trigger */}
        <button 
          onClick={() => onToggle(id)}
          className={`px-3 py-1.5 rounded-full border text-[9px] font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 transition-all ${
            isUnlocked 
              ? 'bg-brand-purple/10 text-brand-purple border-brand-purple/20' 
              : 'bg-apple-bg text-apple-text border-apple-border hover:bg-white'
          }`}
        >
          {isUnlocked ? (
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
        </button>
      </div>

      {/* View Case Study link reveal */}
      {isUnlocked && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="w-full border-t border-apple-border pt-3 flex justify-end"
        >
          <Link 
            to={caseStudyPath} 
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-purple hover:text-brand-purple-light transition-colors uppercase tracking-wider"
          >
            Read Case Study
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

const VaultSection = () => {
  const [unlockedCards, setUnlockedCards] = useState({});

  const handleToggle = (id) => {
    setUnlockedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const unlockedCount = Object.values(unlockedCards).filter(Boolean).length;
  
  // Angle calculated dynamically based on unlock count (45 degrees per unlock)
  const rotationAngle = unlockedCount * 45;
  const isFullyUnlocked = unlockedCount === 4;

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

        {/* Middle Column: Giant Vault door (composed beautifully with spin action linked to state) */}
        <div className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center z-10">
          <div className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px] flex items-center justify-center group">
            
            {/* Soft planetary glow background - pulses brighter as cards are unlocked */}
            <motion.div 
              animate={{
                scale: isFullyUnlocked ? 1.25 : 1 + unlockedCount * 0.05,
                opacity: 0.15 + unlockedCount * 0.1,
              }}
              className="absolute inset-0 bg-brand-purple rounded-full blur-3xl"
            />
            
            {/* Vault Outer Wheel spinning linked to rotationAngle */}
            <motion.div 
              animate={{ rotate: rotationAngle }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="w-full h-full relative rounded-full overflow-hidden shadow-apple-glass border-4 border-white z-10"
            >
              <img 
                src="/assets/vault_door.jpg" 
                alt="Mechanical gear vault gate door" 
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 mix-blend-darken"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_#FFFFFF_70%)]"></div>
            </motion.div>

            {/* Click to spin tooltip */}
            <div className="absolute z-20 bg-white/90 backdrop-blur-md border border-apple-border px-5 py-2 rounded-full shadow-apple-md flex items-center gap-2 transform translate-y-[150px] md:translate-y-[210px]">
              <span className={`w-2 h-2 rounded-full ${isFullyUnlocked ? 'bg-brand-blue animate-ping' : 'bg-brand-purple animate-pulse'}`}></span>
              <span className="text-[9px] font-mono font-bold tracking-widest text-apple-text uppercase">
                {isFullyUnlocked ? 'Vault Fully Open' : `Unlocked ${unlockedCount}/4 Nodes`}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Lock/Unlock Cards Grid */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-6 z-10">
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-apple-subtext uppercase mb-2">
              Case Database
            </h4>
            <VaultCard 
              id="orbit" 
              title="Orbit Banking" 
              subtitle="Planet of Payments" 
              isUnlocked={!!unlockedCards.orbit}
              onToggle={handleToggle}
            />
            <VaultCard 
              id="hub" 
              title="Payment Hub" 
              subtitle="Planet of Infrastructure" 
              isUnlocked={!!unlockedCards.hub}
              onToggle={handleToggle}
            />
            <VaultCard 
              id="future" 
              title="Future Banking" 
              subtitle="Planet of AI Banking" 
              isUnlocked={!!unlockedCards.future}
              onToggle={handleToggle}
            />
            <VaultCard 
              id="audit" 
              title="UX Audit AI" 
              subtitle="Planet of Design Intelligence" 
              isUnlocked={!!unlockedCards.audit}
              onToggle={handleToggle}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default VaultSection;
