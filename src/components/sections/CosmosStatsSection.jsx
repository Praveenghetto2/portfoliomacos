import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedCounter = ({ value, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-apple-text tracking-tighter block mb-1">
      {count}{suffix}
    </span>
  );
};

const CosmosStatsSection = () => {
  const stats = [
    { 
      num: 12, 
      label: "Planets Explored", 
      desc: "[Products]", 
      suffix: "+",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-purple">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      )
    },
    { 
      num: 100, 
      label: "Transactions Designed", 
      desc: "[Impact]", 
      suffix: "M+",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-purple">
          <path d="M16 4h4v4" />
          <path d="M20 4L12 12" />
          <path d="M8 20H4v-4" />
          <path d="M4 20l8-8" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      )
    },
    { 
      num: 500, 
      label: "Flows Designed", 
      desc: "[User Journeys]", 
      suffix: "+",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-purple">
          <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z" />
          <path d="M6 21a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v12a3 3 0 0 0 3 3z" />
        </svg>
      )
    },
    { 
      num: 2000, 
      label: "Screens Created", 
      desc: "[Interfaces]", 
      suffix: "+",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-purple">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M9 3v18" />
          <path d="M9 12h12" />
        </svg>
      )
    },
    { 
      num: 5, 
      label: "Years Building", 
      desc: "[Experience]", 
      suffix: "+",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-purple">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 6v6l4 2" />
        </svg>
      )
    },
  ];

  return (
    <section className="relative w-full py-24 bg-apple-bg bg-grid-pattern border-b border-apple-border">
      {/* Background radial glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full blur-[100px] bg-brand-purple/5"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-[10px] font-mono font-bold text-apple-subtext tracking-widest uppercase mb-4 block">
            Financial Cosmos Stats
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-apple-text uppercase leading-none">
            NUMBERS FROM THE UNIVERSE
          </h2>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-start p-6 rounded-3xl border border-apple-border bg-white shadow-apple-sm hover:border-brand-purple transition-all"
            >
              {/* Stat Icon */}
              <div className="w-10 h-10 rounded-2xl border border-apple-border bg-apple-bg flex items-center justify-center mb-6 shadow-apple-sm">
                {stat.icon}
              </div>

              {/* Animated Stat Value */}
              <AnimatedCounter value={stat.num} suffix={stat.suffix} />
              
              {/* Labels */}
              <span className="text-xs font-display font-extrabold text-apple-text uppercase tracking-tight leading-tight mt-2">
                {stat.label}
              </span>
              <span className="text-[9px] font-mono font-bold text-apple-subtext uppercase tracking-widest mt-1">
                {stat.desc}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CosmosStatsSection;
