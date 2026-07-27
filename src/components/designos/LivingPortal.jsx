import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GREETINGS = [
  { text: "Good Morning, Praveen 👋", sub: "Welcome to your design universe." },
  { text: "Designing products.", sub: "Crafting experiences that move people." },
  { text: "Building systems.", sub: "Architecture for scale and clarity." },
  { text: "Creating impact.", sub: "Measurable outcomes, not just pixels." },
  { text: "Understanding people.", sub: "Research-driven, human-centered." },
  { text: "Making finance simpler.", sub: "Enterprise fintech, made elegant." },
];

const LivingPortal = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState('morning');

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) setTimeOfDay('morning');
    else if (hour >= 12 && hour < 17) setTimeOfDay('afternoon');
    else if (hour >= 17 && hour < 20) setTimeOfDay('evening');
    else setTimeOfDay('night');
  }, []);

  const getGreetingPrefix = () => {
    if (greetingIndex > 0) return GREETINGS[greetingIndex].text;
    switch (timeOfDay) {
      case 'morning': return 'Good Morning, Praveen 👋';
      case 'afternoon': return 'Good Afternoon, Praveen ☀️';
      case 'evening': return 'Good Evening, Praveen 🌅';
      case 'night': return 'Good Night, Praveen 🌙';
      default: return 'Good Morning, Praveen 👋';
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center max-w-lg mx-auto text-center pointer-events-none select-none py-4">
      
      {/* Dynamic Center Greeting */}
      <div className="mb-5 h-20 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={greetingIndex}
            initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -18, filter: 'blur(10px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h1
              className="text-[28px] md:text-[34px] font-display font-extrabold tracking-tight leading-tight"
              style={{
                color: '#1D1D1F',
                textShadow: '0 1px 2px rgba(255,255,255,0.3)'
              }}
            >
              {getGreetingPrefix()}
            </h1>
            <p className="text-[12px] font-body mt-1.5 max-w-sm leading-relaxed" style={{ color: 'rgba(29,29,31,0.55)' }}>
              {GREETINGS[greetingIndex].sub || 'Explore. Learn. Create impact.'}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Date Pill Tag */}
      <div 
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono select-none"
        style={{
          background: 'rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          border: '0.5px solid rgba(255, 255, 255, 0.75)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06), inset 0 0.5px 0 rgba(255, 255, 255, 0.9)',
          color: 'rgba(29,29,31,0.7)',
        }}
      >
        <span 
          className="w-2 h-2 rounded-full animate-pulse" 
          style={{ background: 'linear-gradient(135deg, #D4AF37, #F5E6A3)' }}
        />
        <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
      </div>
    </div>
  );
};

export default LivingPortal;
