import React from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Shield, Award, Sparkles, CheckCircle2 } from 'lucide-react';

const IdentityApp = () => {
  const timeline = [
    { year: '2020', role: 'Intern', company: 'IQVIA', desc: 'Data validation & enterprise portal UI testing.' },
    { year: '2021', role: 'Frontend Developer', company: 'DSG Inc.', desc: 'Built component architecture & client-facing dashboards.' },
    { year: '2023', role: 'UI/UX Designer', company: 'Revlitix', desc: 'Shipped AI revenue SaaS dashboards (+25% adoption lift).' },
    { year: '2026', role: 'Senior Product Designer', company: 'Candescent', desc: 'Building enterprise finance & GTM systems at scale.' },
  ];

  const radarSkills = [
    { name: 'UX Strategy', score: 92 },
    { name: 'User Research', score: 88 },
    { name: 'Design Systems', score: 96 },
    { name: 'Fintech Domain', score: 95 },
    { name: 'AI Interface UX', score: 90 },
    { name: 'Front-End React', score: 85 },
  ];

  const philosophies = [
    "Good design isn't beautiful. Good design removes complexity.",
    "BCA in Computer Science means I design systems engineering actually wants to build.",
    "Design around decisions, not just data categories."
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className="p-8 space-y-8 select-text font-body text-apple-text overflow-y-auto h-full bg-[#FAF9F6]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      
      {/* Header Profile Section — Iron Man HUD meets Apple Health */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-indigo-50/50 via-white to-purple-50/50 border border-black/5 shadow-apple-sm"
      >
        <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-br from-[#007AFF] via-[#5856D6] to-[#FF9F0A]">
          <div className="w-full h-full rounded-full bg-[#1D1D1F] flex items-center justify-center text-white text-2xl font-bold font-display">
            PK
          </div>
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px]">
            ✓
          </div>
        </div>
        
        <div className="text-center md:text-left space-y-1 flex-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <h1 className="text-2xl font-display font-bold uppercase text-apple-text">Praveen Kumar</h1>
            <span className="bg-[#007AFF]/10 text-[#007AFF] text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">IDENTITY.OS</span>
          </div>
          <p className="text-xs text-brand-purple font-mono font-semibold uppercase tracking-wider">Senior Product Designer & Systems Architect</p>
          <p className="text-xs text-apple-subtext leading-relaxed pt-1">
            Combining Computer Science rigor with deep user research to translate enterprise fintech and AI data into clear, human digital systems.
          </p>
        </div>
      </motion.div>

      {/* Grid Row: Career Timeline & Skill Radar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Career Timeline */}
        <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-white border border-black/5 shadow-apple-sm space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-apple-subtext border-b border-black/5 pb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#007AFF]" /> Career Timeline
          </h2>
          <div className="space-y-3 pt-1">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex gap-4 items-start relative p-3 rounded-xl border border-transparent hover:border-indigo-200 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <span className="text-xs font-mono font-bold text-[#007AFF] w-12 flex-shrink-0 pt-0.5">{item.year}</span>
                <div className="border-l-2 border-[#007AFF]/20 pl-4 space-y-0.5">
                  <h4 className="text-xs font-display font-bold uppercase text-apple-text">{item.role} · <span className="text-apple-subtext">{item.company}</span></h4>
                  <p className="text-[11px] text-apple-subtext leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skill Competency Radar */}
        <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-white border border-black/5 shadow-apple-sm space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-apple-subtext border-b border-black/5 pb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#007AFF]" /> Skill Matrix Index
          </h2>
          <div className="space-y-3 pt-1">
            {radarSkills.map((skill, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-apple-text font-medium">{skill.name}</span>
                  <span className="text-apple-subtext font-bold">{skill.score}%</span>
                </div>
                <div className="h-1.5 w-full bg-apple-bg rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#007AFF] to-[#5856D6] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.score}%` }}
                    transition={{ duration: 1, type: 'spring', stiffness: 50, damping: 15 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Personal Philosophy Quotes */}
      <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-white border border-black/5 shadow-apple-sm space-y-4">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-apple-subtext border-b border-black/5 pb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FF9F0A]" /> Core Design Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {philosophies.map((quote, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-4 rounded-xl bg-apple-bg border border-apple-border flex flex-col justify-between hover:border-purple-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <p className="text-xs font-display font-medium text-apple-text italic leading-relaxed">"{quote}"</p>
              <span className="text-[9px] font-mono text-brand-purple uppercase tracking-wider mt-3 font-bold">Principle 0{idx + 1}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
};

export default IdentityApp;

