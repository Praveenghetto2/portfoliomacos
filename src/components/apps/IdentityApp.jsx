import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Calendar, Shield, Award, Sparkles, CheckCircle2, Copy, Download, Code, Layers, FileText, ExternalLink, Briefcase, GraduationCap } from 'lucide-react';

const IdentityApp = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('praveenkumar.design@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const timeline = [
    { 
      year: '2026', 
      role: 'Senior Product Designer', 
      company: 'Candescent', 
      desc: 'Leading product design for enterprise digital interfaces & scaling internal design systems.',
      accent: '#4F46E5',
      impact: 'Enterprise Scale',
      skills: ['Design Systems', 'Figma', 'Product Strategy', 'Cross-Functional Ops']
    },
    { 
      year: '2023–2025', 
      role: 'UI/UX Designer', 
      company: 'Revlitix', 
      desc: 'Spearheaded UX strategy for AI revenue SaaS dashboards (+25% adoption lift, 12% conversion bump).',
      accent: '#7C3AED',
      impact: '+25% Adoption',
      skills: ['AI UX', 'SaaS Dashboards', 'Webflow', 'Usability Testing']
    },
    { 
      year: '2021–2022', 
      role: 'UI Developer', 
      company: 'DSG Inc.', 
      desc: 'Built component architecture & client-facing dashboards bridging design to React code.',
      accent: '#0EA5E9',
      impact: '2x Build Speed',
      skills: ['React.js', 'HTML/CSS', 'Responsive Grids', 'WCAG AA']
    },
    { 
      year: '2020', 
      role: 'UI/UX Testing Intern', 
      company: 'IQVIA', 
      desc: 'Data validation & enterprise health portal accessibility & interface testing.',
      accent: '#10B981',
      impact: 'QA Validation',
      skills: ['UI Testing', 'Data Quality', 'Healthcare Portals']
    },
  ];

  const radarSkills = [
    { name: 'Design Systems & Tokens', score: 96, category: 'Core Architecture' },
    { name: 'Fintech & Payment Rails Domain', score: 95, category: 'Domain Specialization' },
    { name: 'UX Strategy & Discovery', score: 92, category: 'Research & IA' },
    { name: 'AI Interface Design', score: 90, category: 'Emerging Tech' },
    { name: 'User Research & Contextual Inquiry', score: 88, category: 'Validation' },
    { name: 'Front-End React & Tailwind', score: 85, category: 'Technical Execution' },
  ];

  const techStack = [
    { name: 'Figma & Tokens Studio', category: 'Design & Systems', level: 'Expert', desc: 'Auto-layout, variables, component libraries' },
    { name: 'React.js & Tailwind CSS', category: 'Front-End Code', level: 'Advanced', desc: 'Component architecture, CSS grid/flexbox' },
    { name: 'Webflow', category: 'No-Code Web', level: 'Advanced', desc: 'Custom JS injects, responsive layouts' },
    { name: 'Framer Motion', category: 'Motion Design', level: 'Advanced', desc: 'Physics curves, layout transitions' },
    { name: 'UserTesting & Maze', category: 'UX Research', level: 'Proficient', desc: 'Unmoderated tests, quantitative metrics' },
    { name: 'WCAG 2.1 AAA Compliance', category: 'Accessibility', level: 'Expert', desc: 'Screen readers, color contrast, keyboard nav' },
  ];

  const education = [
    {
      degree: 'BCA — Computer Science',
      institution: 'Kristu Jayanti College (KJC), Bangalore',
      year: '2018 – 2021',
      desc: 'Formal computer science foundation covering data structures, object-oriented programming, and web development fundamentals.',
      highlight: 'CS Rigor + Design Thinking'
    }
  ];

  const philosophies = [
    {
      quote: "Good design isn't just beautiful. Good design removes cognitive complexity.",
      sub: "Focusing on decision velocity over visual clutter."
    },
    {
      quote: "A BCA in Computer Science means I design systems engineering actually wants to build.",
      sub: "Bridging Figma component variables directly with production React props."
    },
    {
      quote: "Design around decisions, not just data categories.",
      sub: "Surfacing actionable intelligence rather than static metrics spreadsheets."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.06 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
  };

  return (
    <motion.div
      className="p-6 sm:p-10 space-y-8 select-text font-body text-slate-800 overflow-y-auto h-full bg-[#FAF9F6] scroll-smooth"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Top Profile Hero Header */}
      <motion.div
        variants={itemVariants}
        className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-950 text-white shadow-xl relative overflow-hidden space-y-6"
      >
        {/* Ambient background blur circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          {/* Avatar Profile Ring */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-1 bg-gradient-to-br from-[#4F46E5] via-[#A855F7] to-[#EC4899] shadow-2xl">
              <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-white text-3xl font-extrabold font-display tracking-wider">
                PK
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white w-7 h-7 rounded-full border-2 border-slate-900 flex items-center justify-center text-[12px] font-bold shadow-lg">
              ✓
            </div>
          </div>

          {/* Name & Title Summary */}
          <div className="text-center md:text-left space-y-3 flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-white">
                Praveen Kumar
              </h1>
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                IDENTITY.OS v2.6
              </span>
            </div>

            <p className="text-[14px] text-indigo-300 font-mono font-bold uppercase tracking-wider">
              Senior Product Designer & Systems Architect
            </p>

            <p className="text-[13.5px] sm:text-[14.5px] text-slate-300 leading-relaxed max-w-2xl font-normal">
              Combining formal Computer Science rigor with deep contextual research to translate complex enterprise FinTech and AI data into intuitive, human-centered systems.
            </p>

            {/* Tags Pill Row */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-[11.5px] font-mono text-slate-300">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 flex items-center gap-1.5">
                📍 Bangalore / Remote
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 flex items-center gap-1.5">
                🎓 BCA Computer Science
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 flex items-center gap-1.5">
                ⚡ 5+ Yrs Product Design
              </span>
            </div>
          </div>
        </div>

        {/* Quick Action Button Bar */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[12.5px] font-mono font-bold transition-all cursor-pointer border border-white/15"
          >
            <Copy className="w-4 h-4 text-indigo-300" />
            <span>{copiedEmail ? '✓ Copied Email!' : 'praveenkumar.design@gmail.com'}</span>
          </button>

          <a
            href="https://github.com/Praveenghetto2/portfoliomacos"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[12.5px] font-mono font-bold transition-all cursor-pointer shadow-lg"
          >
            <ExternalLink className="w-4 h-4" />
            <span>GitHub Profile</span>
          </a>
        </div>
      </motion.div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-[12.5px] font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/60'
          }`}
        >
          01 / Career & Skill Matrix
        </button>
        <button
          onClick={() => setActiveTab('stack')}
          className={`px-4 py-2 rounded-xl text-[12.5px] font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'stack'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/60'
          }`}
        >
          02 / Tooling & Tech Stack
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`px-4 py-2 rounded-xl text-[12.5px] font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'education'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/60'
          }`}
        >
          03 / Background & Principles
        </button>
      </div>

      {/* TAB CONTENT 1: CAREER & SKILL MATRIX */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Career Timeline */}
            <motion.div variants={itemVariants} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                    <Briefcase className="w-4 h-4" />
                  </span>
                  <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-wider text-slate-900">
                    Career Timeline
                  </h2>
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-bold">4 POSITIONS</span>
              </div>

              <div className="space-y-5">
                {timeline.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-2 hover:bg-white hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-pointer border-l-4"
                    style={{ borderLeftColor: item.accent }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11.5px] font-mono font-bold text-slate-500">{item.year}</span>
                      <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                        {item.impact}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-[15px] font-display font-extrabold text-slate-950">
                        {item.role} <span className="text-slate-400 font-normal">· {item.company}</span>
                      </h3>
                      <p className="text-[13px] text-slate-600 leading-relaxed mt-1">{item.desc}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.skills.map((s, i) => (
                        <span key={i} className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200/60">
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skill Matrix Index */}
            <motion.div variants={itemVariants} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <Shield className="w-4 h-4" />
                  </span>
                  <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-wider text-slate-900">
                    Skill Matrix Index
                  </h2>
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-bold">COMPETENCY %</span>
              </div>

              <div className="space-y-4">
                {radarSkills.map((skill, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 space-y-2">
                    <div className="flex justify-between items-center text-[13px]">
                      <div>
                        <strong className="font-display font-extrabold text-slate-900 block">{skill.name}</strong>
                        <span className="text-[10px] font-mono text-slate-400 block">{skill.category}</span>
                      </div>
                      <span className="text-[13px] font-mono font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                        {skill.score}%
                      </span>
                    </div>

                    <div className="h-2 w-full bg-slate-200/80 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-full"
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
        </div>
      )}

      {/* TAB CONTENT 2: TOOLING & TECH STACK */}
      {activeTab === 'stack' && (
        <motion.div variants={itemVariants} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
                <Code className="w-4 h-4" />
              </span>
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-wider text-slate-900">
                Tools & Technical Proficiencies
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400 font-bold">6 CORE TOOLS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {techStack.map((t, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/60 space-y-2 hover:shadow-md hover:bg-white transition-all duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-indigo-600 px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100">
                    {t.category}
                  </span>
                  <span className="text-[11px] font-mono font-extrabold text-emerald-600">{t.level}</span>
                </div>
                <h3 className="text-[16px] font-display font-extrabold text-slate-950">{t.name}</h3>
                <p className="text-[13px] text-slate-600">{t.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* TAB CONTENT 3: BACKGROUND & PRINCIPLES */}
      {activeTab === 'education' && (
        <div className="space-y-8">
          {/* Education */}
          <motion.div variants={itemVariants} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <GraduationCap className="w-4 h-4" />
              </span>
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-wider text-slate-900">
                Formal Computer Science Education
              </h2>
            </div>

            {education.map((edu, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/60 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-[18px] font-display font-extrabold text-slate-950">{edu.degree}</h3>
                  <span className="text-[11px] font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                    {edu.year}
                  </span>
                </div>
                <strong className="text-[14px] text-slate-700 block font-mono">{edu.institution}</strong>
                <p className="text-[13.5px] text-slate-600 leading-relaxed">{edu.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Design Principles */}
          <motion.div variants={itemVariants} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-wider text-slate-900">
                Core Design Philosophy
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {philosophies.map((p, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/30 border border-slate-200/80 space-y-3 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border-l-4 border-l-indigo-600"
                >
                  <div>
                    <span className="text-[11px] font-mono font-extrabold text-indigo-600 block uppercase mb-2">
                      Principle 0{idx + 1}
                    </span>
                    <p className="text-[14px] font-display font-bold text-slate-900 leading-snug italic">
                      "{p.quote}"
                    </p>
                  </div>
                  <p className="text-[12px] text-slate-500 pt-2 border-t border-slate-200/60 leading-normal">
                    {p.sub}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default IdentityApp;
