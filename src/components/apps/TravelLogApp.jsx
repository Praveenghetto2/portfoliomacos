import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Compass, CheckCircle } from 'lucide-react';

const DESTINATIONS = [
  {
    id: 'bangalore',
    flag: '🇮🇳',
    city: 'Bangalore',
    country: 'India',
    year: '2020-Present',
    desc: 'Where it all started. The tech capital that shaped my design thinking.',
    isHomeBase: true,
    accentGradient: 'from-purple-500 via-indigo-500 to-cyan-500',
    category: 'Home Base',
    coordinates: '12.9716° N, 77.5946° E',
    highlights: ['Tech Ecosystem', 'Fintech Labs', 'Design System Foundations']
  },
  {
    id: 'hyderabad',
    flag: '🇮🇳',
    city: 'Hyderabad',
    country: 'India',
    year: '2022',
    desc: 'Exploring the intersection of tradition and tech innovation.',
    isHomeBase: false,
    accentGradient: 'from-cyan-500 to-blue-600',
    category: 'Tech Hub',
    coordinates: '17.3850° N, 78.4867° E',
    highlights: ['Cyberabad Tech City', 'Heritage Architecture', 'Enterprise UX']
  },
  {
    id: 'goa',
    flag: '🇮🇳',
    city: 'Goa',
    country: 'India',
    year: '2023',
    desc: 'Beach-side design sprints and creative retreats.',
    isHomeBase: false,
    accentGradient: 'from-amber-400 via-orange-500 to-rose-500',
    category: 'Creative Retreat',
    coordinates: '15.2993° N, 74.1240° E',
    highlights: ['Design Offsites', 'Creative Focus', 'Minimalist Mindset']
  },
  {
    id: 'mumbai',
    flag: '🇮🇳',
    city: 'Mumbai',
    country: 'India',
    year: '2021',
    desc: 'The city that never sleeps — immersive UX research field trips.',
    isHomeBase: false,
    accentGradient: 'from-emerald-400 to-teal-600',
    category: 'UX Research',
    coordinates: '19.0760° N, 72.8777° E',
    highlights: ['Financial District', 'User Context Fieldwork', 'Rapid Wireframing']
  },
  {
    id: 'delhi',
    flag: '🇮🇳',
    city: 'Delhi',
    country: 'India',
    year: '2023',
    desc: 'Historical architecture inspiring modern interface patterns.',
    isHomeBase: false,
    accentGradient: 'from-rose-400 to-red-500',
    category: 'Design Systems',
    coordinates: '28.6139° N, 77.2090° E',
    highlights: ['Geometric Patterns', 'Symmetry & Grid Systems', 'Cultural Research']
  },
  {
    id: 'singapore',
    flag: '🇸🇬',
    city: 'Singapore',
    country: 'Singapore',
    year: '2024',
    desc: 'Southeast Asian design culture and fintech innovation hub.',
    isHomeBase: false,
    accentGradient: 'from-blue-500 via-indigo-600 to-purple-600',
    category: 'Fintech Hub',
    coordinates: '1.3521° N, 103.8198° E',
    highlights: ['Cross-Border Payments', 'Global Design Trends', 'Smart City UX']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const TravelLogApp = () => {
  const [selectedDest, setSelectedDest] = useState(DESTINATIONS[0]);

  return (
    <div className="relative h-full bg-[#F5F5F7] select-text font-body text-slate-800 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 pb-40">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl leading-none">🌐</span>
            <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
              Travel Log
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Places that shaped my perspective
          </p>
        </div>

        <div className="flex items-center gap-2.5 bg-white border border-slate-200/60 shadow-xs px-3.5 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse" />
          <span className="text-xs font-mono font-bold text-slate-600">
            6 DESTINATIONS LOGGED
          </span>
        </div>
      </div>

      {/* Grid of 6 Destinations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {DESTINATIONS.map((dest) => {
          const isSelected = selectedDest?.id === dest.id;
          return (
            <motion.div
              key={dest.id}
              variants={cardVariants}
              whileHover={{ y: -2 }}
              onClick={() => setSelectedDest(dest)}
              className={`relative bg-white border rounded-2xl p-5 overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-md hover:border-black/[0.08] ${
                isSelected ? 'ring-2 ring-[#007AFF] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border-transparent' : 'border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
              }`}
            >
              {/* Subtle Gradient Top-Border Strip */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${dest.accentGradient}`}
              />

              <div className="space-y-3 pt-1">
                {/* Header Row: City + Flag & Badges */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl leading-none">{dest.flag}</span>
                      <h3 className="font-display font-bold text-slate-900 text-base tracking-tight">
                        {dest.city}
                      </h3>
                    </div>
                    <p className="font-mono text-xs text-slate-400 mt-0.5">
                      {dest.country}
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {dest.isHomeBase && (
                      <span className="rounded-full bg-purple-100 text-purple-700 font-mono text-[10px] font-bold px-2 py-0.5 border border-purple-200/60 flex items-center gap-1 shadow-2xs">
                        🏠 HOME BASE
                      </span>
                    )}
                    <span className="rounded-full bg-[#007AFF]/10 text-[#007AFF] font-mono text-[10px] px-2 py-0.5">
                      {dest.year}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  {dest.desc}
                </p>
              </div>

              {/* Footer Meta */}
              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#007AFF]" />
                  <span className="text-[11px] text-slate-500">{dest.category}</span>
                </div>
                <span className="text-[10px] text-slate-400">{dest.coordinates}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      </div>

      {/* Selected Destination Detail Drawer */}
      <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 z-10 pointer-events-none">
        <AnimatePresence mode="wait">
          {selectedDest && (
            <motion.div
              key={selectedDest.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-black/[0.04] rounded-2xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] relative overflow-hidden pointer-events-auto"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${selectedDest.accentGradient}`} />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-xl">
                    {selectedDest.flag}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-slate-900 text-sm">
                        {selectedDest.city}, {selectedDest.country}
                      </h4>
                      {selectedDest.isHomeBase && (
                        <span className="text-[9px] font-mono font-bold bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full border border-purple-200">
                          Primary HQ
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-mono text-slate-400">
                      Logged Timeline: {selectedDest.year} · Coordinates: {selectedDest.coordinates}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#007AFF] bg-[#007AFF]/10 px-3 py-1.5 rounded-full border border-[#007AFF]/20 w-fit">
                  <Compass className="w-3.5 h-3.5 text-[#007AFF]" />
                  <span>Selected Destination</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                {selectedDest.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 border border-slate-200/50 px-3 py-2 rounded-xl">
                    <CheckCircle className="w-3.5 h-3.5 text-[#007AFF] flex-shrink-0" />
                    <span className="font-medium text-[12px]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TravelLogApp;
