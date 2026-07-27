import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layers, Zap, Palette, Sliders, Box, Cpu } from 'lucide-react';

const EXPERIMENTS = [
  {
    id: 'glassmorphism',
    title: 'Glassmorphism System',
    category: 'macOS UI / Frost',
    accentColor: '#6366F1', // indigo accent
    desc: 'Exploring frosted-glass UI patterns for macOS-inspired interfaces',
    status: 'Active',
    icon: Layers,
    tags: ['macOS', 'Vibrancy']
  },
  {
    id: 'micro-interactions',
    title: 'Micro-Interaction Library',
    category: 'Animation / Motion',
    accentColor: '#10B981', // emerald accent
    desc: 'A collection of 40+ reusable Lottie and CSS animations for product surfaces',
    status: 'Shipped',
    icon: Zap,
    tags: ['Lottie', '40+ Anims']
  },
  {
    id: 'dark-mode-engine',
    title: 'Dark Mode Color Engine',
    category: 'Color Systems',
    accentColor: '#8B5CF6', // violet accent
    desc: 'Systematic approach to generating accessible dark-mode palettes from any brand color',
    status: 'Active',
    icon: Palette,
    tags: ['WCAG AAA', 'Color Math']
  },
  {
    id: 'motion-tokens',
    title: 'Motion Design Tokens',
    category: 'Design Systems',
    accentColor: '#F59E0B', // amber accent
    desc: 'Codifying easing curves, durations, and spring configs as reusable design tokens',
    status: 'Research',
    icon: Sliders,
    tags: ['Easing', 'Spring Physics']
  },
  {
    id: 'spatial-ui',
    title: 'Spatial UI Prototypes',
    category: 'Spatial Computing',
    accentColor: '#F43F5E', // rose accent
    desc: 'Exploring depth, parallax, and 3D transforms for spatial computing interfaces',
    status: 'Research',
    icon: Box,
    tags: ['Vision Pro', '3D Parallax']
  },
  {
    id: 'ai-workflows',
    title: 'AI-Assisted Design Workflows',
    category: 'AI & Generative',
    accentColor: '#06B6D4', // cyan accent
    desc: 'Experimenting with generative AI tools for rapid ideation and asset creation',
    status: 'Active',
    icon: Cpu,
    tags: ['Generative AI', 'Prompt UI']
  }
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Active':
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
        dot: 'bg-emerald-500'
      };
    case 'Research':
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200/80',
        dot: 'bg-amber-500'
      };
    case 'Shipped':
      return {
        bg: 'bg-blue-50 text-blue-700 border-blue-200/80',
        dot: 'bg-blue-500'
      };
    default:
      return {
        bg: 'bg-slate-50 text-slate-700 border-slate-200/80',
        dot: 'bg-slate-500'
      };
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' }
  }
};

const DesignLabApp = () => {
  return (
    <div className="p-6 sm:p-8 space-y-6 select-text font-body text-slate-800 overflow-y-auto h-full bg-[#FAF9F6]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-5">
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label="beaker">🧪</span>
          <div>
            <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Design Lab
            </h1>
            <p className="text-xs text-slate-500 font-mono">6 experiments in progress</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-700 text-xs font-mono font-semibold self-start sm:self-auto border border-purple-500/20">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>ACTIVE R&D WORKSPACE</span>
        </div>
      </div>

      {/* Grid Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {EXPERIMENTS.map((exp) => {
          const statusBadge = getStatusBadge(exp.status);
          const IconComponent = exp.icon;

          return (
            <motion.div
              key={exp.id}
              variants={cardVariants}
              whileHover={{ y: -2 }}
              style={{ borderLeftColor: exp.accentColor }}
              className="p-5 rounded-2xl bg-white border border-slate-200/60 border-l-4 shadow-xs hover:shadow-md hover:border-slate-300/80 transition-all duration-200 flex flex-col justify-between gap-4 cursor-pointer group"
            >
              <div className="space-y-3">
                {/* Category & Icon header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full inline-block shrink-0 shadow-xs"
                      style={{ backgroundColor: exp.accentColor }}
                    />
                    <span className="font-mono uppercase text-[10px] tracking-wider text-slate-500 font-bold">
                      {exp.category}
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-100/70 text-slate-500 group-hover:bg-slate-100 transition-colors">
                    <IconComponent className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[16px] font-display font-bold text-slate-900 tracking-tight leading-snug">
                  {exp.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] text-slate-500 leading-relaxed font-body">
                  {exp.desc}
                </p>
              </div>

              {/* Card Footer / Status Badge */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  {exp.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md truncate">
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium border shrink-0 ${statusBadge.bg}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                  {exp.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default DesignLabApp;
