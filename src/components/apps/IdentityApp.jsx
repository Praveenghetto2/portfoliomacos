import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Calendar, Shield, Sparkles, Copy, ExternalLink, Briefcase, GraduationCap, Code, Check } from 'lucide-react';

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
      desc: 'Leading product design for enterprise digital interfaces and scaling internal design systems.',
      tag: 'Present',
      skills: ['Design Systems', 'Figma', 'Product Strategy']
    },
    { 
      year: '2023 – 2025', 
      role: 'UI/UX Designer', 
      company: 'Revlitix', 
      desc: 'Spearheaded UX strategy for AI revenue SaaS platform, driving +25% feature adoption lift.',
      tag: 'Full-time',
      skills: ['AI UX', 'SaaS Dashboards', 'Webflow']
    },
    { 
      year: '2021 – 2022', 
      role: 'UI Developer', 
      company: 'DSG Inc.', 
      desc: 'Built component architecture and client-facing dashboards bridging design to production React code.',
      tag: 'Full-time',
      skills: ['React.js', 'CSS Grid', 'WCAG AA']
    },
    { 
      year: '2020', 
      role: 'UI/UX Testing Intern', 
      company: 'IQVIA', 
      desc: 'Conducted data validation and interface usability testing for enterprise healthcare portals.',
      tag: 'Internship',
      skills: ['UI Testing', 'Data Quality']
    },
  ];

  const radarSkills = [
    { name: 'Design Systems & Tokens', score: 96, category: 'Core Architecture' },
    { name: 'Fintech & Payment Domain', score: 95, category: 'Domain Specialization' },
    { name: 'UX Strategy & Discovery', score: 92, category: 'Research & IA' },
    { name: 'AI Interface Design', score: 90, category: 'Emerging Tech' },
    { name: 'User Research & Testing', score: 88, category: 'Validation' },
    { name: 'Front-End React & CSS', score: 85, category: 'Execution' },
  ];

  const techStack = [
    { name: 'Figma & Variables Studio', category: 'Design Systems', level: 'Expert', desc: 'Auto-layout, variables, component libraries' },
    { name: 'React.js & Tailwind CSS', category: 'Front-End', level: 'Advanced', desc: 'Component architecture, CSS grid/flexbox' },
    { name: 'Webflow', category: 'Web Publishing', level: 'Advanced', desc: 'Custom JS injects, responsive layouts' },
    { name: 'Framer Motion', category: 'Motion Design', level: 'Advanced', desc: 'Spring physics, transition curves' },
    { name: 'UserTesting & Maze', category: 'Research', level: 'Proficient', desc: 'Unmoderated tests, quantitative metrics' },
    { name: 'WCAG 2.1 AAA Compliance', category: 'Accessibility', level: 'Expert', desc: 'Screen readers, color contrast, keyboard nav' },
  ];

  const education = [
    {
      degree: 'BCA — Computer Science',
      institution: 'Kristu Jayanti College (KJC), Bangalore',
      year: '2018 – 2021',
      desc: 'Formal computer science foundation covering data structures, object-oriented programming, and web development fundamentals.',
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

  return (
    <div 
      className="p-6 sm:p-10 space-y-6 select-text font-sans text-[#1D1D1F] overflow-y-auto h-full bg-[#F5F5F7]"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      
      {/* Apple Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar Monogram */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-[#E5E5EA] to-[#D1D1D6] flex items-center justify-center text-[#1D1D1F] text-2xl font-bold font-display shadow-inner border border-white">
              PK
            </div>
            <div className="absolute bottom-0 right-0 bg-[#34C759] w-5 h-5 rounded-full border-2 border-white shadow-xs" />
          </div>

          {/* Profile Summary */}
          <div className="text-center sm:text-left space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
                Praveen Kumar
              </h1>
              <span className="bg-[#007AFF]/10 text-[#007AFF] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                Verified Profile
              </span>
            </div>

            <p className="text-[14px] font-semibold text-[#007AFF]">
              Senior Product Designer & Systems Architect
            </p>

            <p className="text-[13.5px] text-[#86868B] leading-relaxed max-w-2xl font-normal">
              Combining formal Computer Science rigor with deep user research to translate complex enterprise FinTech and AI data into clean, intuitive digital experiences.
            </p>

            {/* Apple Pills */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-[12px] text-[#424245]">
              <span className="px-3 py-1 rounded-full bg-[#F5F5F7] border border-black/[0.04] font-medium">
                📍 Bangalore / Remote
              </span>
              <span className="px-3 py-1 rounded-full bg-[#F5F5F7] border border-black/[0.04] font-medium">
                🎓 BCA Computer Science
              </span>
              <span className="px-3 py-1 rounded-full bg-[#F5F5F7] border border-black/[0.04] font-medium">
                ⚡ 5+ Yrs EXP
              </span>
            </div>
          </div>
        </div>

        {/* Apple Action Buttons */}
        <div className="pt-4 border-t border-black/[0.06] flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#007AFF] hover:bg-[#0066CC] text-white text-[13px] font-medium transition-all cursor-pointer shadow-sm active:scale-95"
          >
            {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedEmail ? 'Copied Email' : 'praveenkumar.design@gmail.com'}</span>
          </button>

          <a
            href="https://github.com/Praveenghetto2/portfoliomacos"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#1D1D1F] text-[13px] font-medium transition-all cursor-pointer border border-black/[0.06] active:scale-95"
          >
            <ExternalLink className="w-4 h-4 text-[#86868B]" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Apple Segmented Control Tab Switcher */}
      <div className="bg-[#E5E5EA]/60 p-1 rounded-2xl flex items-center gap-1 border border-black/[0.04]">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 rounded-xl text-[12.5px] font-medium transition-all cursor-pointer text-center ${
            activeTab === 'overview'
              ? 'bg-white text-[#1D1D1F] shadow-sm font-semibold'
              : 'text-[#86868B] hover:text-[#1D1D1F]'
          }`}
        >
          Career & Skills
        </button>
        <button
          onClick={() => setActiveTab('stack')}
          className={`flex-1 py-2 rounded-xl text-[12.5px] font-medium transition-all cursor-pointer text-center ${
            activeTab === 'stack'
              ? 'bg-white text-[#1D1D1F] shadow-sm font-semibold'
              : 'text-[#86868B] hover:text-[#1D1D1F]'
          }`}
        >
          Tooling & Stack
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`flex-1 py-2 rounded-xl text-[12.5px] font-medium transition-all cursor-pointer text-center ${
            activeTab === 'education'
              ? 'bg-white text-[#1D1D1F] shadow-sm font-semibold'
              : 'text-[#86868B] hover:text-[#1D1D1F]'
          }`}
        >
          Education & Principles
        </button>
      </div>

      {/* TAB 1: CAREER & SKILLS */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Career Timeline */}
          <div className="p-6 rounded-3xl bg-white border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-5">
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#007AFF]" />
                <h2 className="text-[14px] font-semibold text-[#1D1D1F]">Career Experience</h2>
              </div>
              <span className="text-[11px] text-[#86868B]">4 Positions</span>
            </div>

            <div className="space-y-4">
              {timeline.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.03] space-y-2 hover:bg-[#EAEAEF] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[#007AFF]">{item.year}</span>
                    <span className="text-[11px] text-[#86868B] bg-white px-2 py-0.5 rounded-full border border-black/[0.05]">
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-[15px] font-bold text-[#1D1D1F]">
                      {item.role} <span className="text-[#86868B] font-normal">· {item.company}</span>
                    </h3>
                    <p className="text-[13px] text-[#424245] leading-relaxed mt-1">{item.desc}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.skills.map((s, i) => (
                      <span key={i} className="text-[11px] text-[#86868B] bg-white px-2 py-0.5 rounded-md border border-black/[0.04]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Matrix Index */}
          <div className="p-6 rounded-3xl bg-white border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-5">
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#007AFF]" />
                <h2 className="text-[14px] font-semibold text-[#1D1D1F]">Skill Matrix Index</h2>
              </div>
              <span className="text-[11px] text-[#86868B]">Competency %</span>
            </div>

            <div className="space-y-4">
              {radarSkills.map((skill, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#F5F5F7] border border-black/[0.03] space-y-2">
                  <div className="flex justify-between items-center text-[13px]">
                    <div>
                      <strong className="font-semibold text-[#1D1D1F] block">{skill.name}</strong>
                      <span className="text-[11px] text-[#86868B] block">{skill.category}</span>
                    </div>
                    <span className="text-[13px] font-bold text-[#007AFF]">
                      {skill.score}%
                    </span>
                  </div>

                  <div className="h-2 w-full bg-[#E5E5EA] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#007AFF] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.score}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TOOLING & STACK */}
      {activeTab === 'stack' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-5">
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-[#007AFF]" />
              <h2 className="text-[14px] font-semibold text-[#1D1D1F]">Tools & Proficiencies</h2>
            </div>
            <span className="text-[11px] text-[#86868B]">6 Primary Tools</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {techStack.map((t, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#F5F5F7] border border-black/[0.03] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#007AFF] bg-white px-2.5 py-0.5 rounded-full border border-black/[0.04]">
                    {t.category}
                  </span>
                  <span className="text-[11px] font-medium text-[#86868B]">{t.level}</span>
                </div>
                <h3 className="text-[15px] font-bold text-[#1D1D1F]">{t.name}</h3>
                <p className="text-[13px] text-[#424245]">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: EDUCATION & PRINCIPLES */}
      {activeTab === 'education' && (
        <div className="space-y-6">
          {/* Education */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center gap-2 border-b border-black/[0.06] pb-3">
              <GraduationCap className="w-4 h-4 text-[#007AFF]" />
              <h2 className="text-[14px] font-semibold text-[#1D1D1F]">Education Background</h2>
            </div>

            {education.map((edu, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#F5F5F7] border border-black/[0.03] space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-[16px] font-bold text-[#1D1D1F]">{edu.degree}</h3>
                  <span className="text-[11px] font-semibold text-[#007AFF] bg-white px-2.5 py-0.5 rounded-full border border-black/[0.04]">
                    {edu.year}
                  </span>
                </div>
                <strong className="text-[13px] text-[#424245] block">{edu.institution}</strong>
                <p className="text-[13px] text-[#86868B] leading-relaxed">{edu.desc}</p>
              </div>
            ))}
          </div>

          {/* Design Principles */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center gap-2 border-b border-black/[0.06] pb-3">
              <Sparkles className="w-4 h-4 text-[#FF9500]" />
              <h2 className="text-[14px] font-semibold text-[#1D1D1F]">Core Design Principles</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {philosophies.map((p, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#F5F5F7] border border-black/[0.03] space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-semibold text-[#FF9500] block mb-1">
                      Principle 0{idx + 1}
                    </span>
                    <p className="text-[13.5px] font-medium text-[#1D1D1F] leading-snug">
                      "{p.quote}"
                    </p>
                  </div>
                  <p className="text-[12px] text-[#86868B] pt-2 border-t border-black/[0.04]">
                    {p.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdentityApp;
