import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, CheckCircle2, Shield, Zap, Award, Sparkles, Layers, Search, Code, Terminal, Box, Compass, ArrowUpRight, ChevronRight, Activity } from 'lucide-react';

const SKILL_NODES = [
  {
    id: 'ux',
    name: 'UX Strategy & IA',
    level: 'Level 9',
    xp: 95,
    exp: '5+ Years',
    status: 'MASTERED',
    statusColor: '#34C759',
    branch: 'Design Core',
    icon: Compass,
    accentColor: '#007AFF',
    desc: 'End-to-end product discovery, information architecture, user journey mapping, decision-centric wireframing, and usability specs.',
    subSkills: [
      'User Journey & Mental Model Mapping',
      'Information Architecture & Navigation Trees',
      'Decision-Centric Screen Hierarchy',
      'Low-to-High Fidelity Prototyping'
    ],
    caseStudyLink: 'mission',
    caseStudyName: 'Mission Control'
  },
  {
    id: 'ui',
    name: 'UI Systems & Tokens',
    level: 'Level 9',
    xp: 92,
    exp: '5+ Years',
    status: 'MASTERED',
    statusColor: '#34C759',
    branch: 'Design Core',
    icon: Layers,
    accentColor: '#8B5CF6',
    desc: 'Scalable Figma component libraries, auto-layout architectures, WCAG AAA accessible color spaces, and design-token JSON specs.',
    subSkills: [
      'Design Token JSON Schema & Variables',
      'Figma Component Properties & Auto-Layout 5',
      'WCAG 2.1 AAA Accessibility Auditing',
      'Multi-Brand Theme Tokens'
    ],
    caseStudyLink: 'revlitix-saas',
    caseStudyName: 'Revlitix SaaS'
  },
  {
    id: 'research',
    name: 'User Research & Testing',
    level: 'Level 8',
    xp: 85,
    exp: '4 Years',
    status: 'UNLOCKED',
    statusColor: '#007AFF',
    branch: 'Research & Testing',
    icon: Search,
    accentColor: '#FF9F0A',
    desc: 'Qualitative interview synthesis, quantitative SUS usability scoring, card sorting, A/B testing, and heat-map analytics parsing.',
    subSkills: [
      'System Usability Scale (SUS) Testing',
      '1-on-1 Discovery User Interviews',
      'Card Sorting & Mental Model Alignment',
      'Posthog / Hotjar Behavioral Analytics'
    ],
    caseStudyLink: 'sonic',
    caseStudyName: 'Sonic AI'
  },
  {
    id: 'fintech',
    name: 'Fintech & Settlement UX',
    level: 'Level 9',
    xp: 94,
    exp: '4 Years',
    status: 'MASTERED',
    statusColor: '#34C759',
    branch: 'Domain Expertise',
    icon: Shield,
    accentColor: '#34C759',
    desc: 'ACH batching, Fedwire/SWIFT RTGS, RTP, FedNow real-time rails, treasury workflow optimization, and transaction ledger states.',
    subSkills: [
      'ISO 20022 Payment Messaging Standard',
      'Real-Time Settlement State Machines',
      'Treasury Operations Dashboard Workflows',
      'Double-Authorization Security UX'
    ],
    caseStudyLink: 'move-money',
    caseStudyName: 'Move Money Platform'
  },
  {
    id: 'ai',
    name: 'AI Conversational UX',
    level: 'Level 8',
    xp: 88,
    exp: '2 Years',
    status: 'UNLOCKED',
    statusColor: '#007AFF',
    branch: 'Emerging Tech',
    icon: Sparkles,
    accentColor: '#00C6FF',
    desc: 'Conversational query parsers, predictive AI prompt states, streaming text UI feedback, and auto-generating chart components.',
    subSkills: [
      'Natural Language Query Parsing UI',
      'Streaming Token Feedback Loops',
      'Auto-Selecting Chart Visualization Engine',
      'Confidence Score Visual Indicators'
    ],
    caseStudyLink: 'sonic',
    caseStudyName: 'Sonic AI'
  },
  {
    id: 'react',
    name: 'React.js & CSS Engine',
    level: 'Level 8',
    xp: 85,
    exp: '4 Years',
    status: 'UNLOCKED',
    statusColor: '#007AFF',
    branch: 'Engineering Bridge',
    icon: Code,
    accentColor: '#61DAFB',
    desc: 'BCA Computer Science foundation. Production React JSX components, Tailwind CSS styling, Vite build tools, and Git workflows.',
    subSkills: [
      'Component State Management (Hooks/Context)',
      'Tailwind CSS Utility Design Tokens',
      'Framer Motion Spring Physics',
      'Clean Git Workflow & Handoff'
    ],
    caseStudyLink: 'lab',
    caseStudyName: 'Design Lab'
  },
  {
    id: 'motion',
    name: 'Motion & Physics UX',
    level: 'Level 8',
    xp: 82,
    exp: '3 Years',
    status: 'UNLOCKED',
    statusColor: '#007AFF',
    branch: 'Craft & Delight',
    icon: Zap,
    accentColor: '#FF2A54',
    desc: 'Framer Motion spring physics, micro-interactions, CSS keyframe orchestrations, and seamless page transition physics.',
    subSkills: [
      'Spring Mass/Stiffness Tuning',
      'AnimatePresence Page Transitions',
      'Interactive Drag Controls & Snap Points',
      'Hardware-Accelerated CSS Transformations'
    ],
    caseStudyLink: 'lab',
    caseStudyName: 'Design Lab'
  },
  {
    id: 'spatial',
    name: 'Spatial Computing UX',
    level: 'Level 6',
    xp: 65,
    exp: '1 Year',
    status: 'EXPLORING',
    statusColor: '#FF9F0A',
    branch: 'Emerging Tech',
    icon: Box,
    accentColor: '#AF52DE',
    desc: 'Apple Vision Pro spatial UI paradigms, depth-layer window hierarchy, eye-gaze target sizing, and glassmorphism materials.',
    subSkills: [
      'Depth Axis Window Z-Spacing',
      'Eye-Gaze 44pt Target Guidelines',
      'Spatial Ambient Backlighting',
      'Volumetric Object UI Containers'
    ],
    caseStudyLink: 'lab',
    caseStudyName: 'Design Lab'
  }
];

const BRANCHES = ['All', 'Design Core', 'Domain Expertise', 'Research & Testing', 'Engineering Bridge', 'Emerging Tech'];

const SkillTreeApp = () => {
  const [selectedNode, setSelectedNode] = useState(SKILL_NODES[0]);
  const [selectedBranch, setSelectedBranch] = useState('All');

  const filteredNodes = SKILL_NODES.filter(
    node => selectedBranch === 'All' || node.branch === selectedBranch
  );

  return (
    <div className="h-full bg-[#0A0A0F] text-white font-body select-text overflow-y-auto p-7 space-y-6">
      
      {/* App Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#8B5CF6] uppercase">COMPETENCY MATRIX v2.6</span>
          </div>
          <h1 className="text-[24px] font-display font-extrabold tracking-tight">Design & Tech Skill Tree</h1>
          <p className="text-[12px] text-[#8E8E93] mt-0.5">Interactive competency node map — bridging product design, fintech domain, and code feasibility.</p>
        </div>

        {/* Master Badge */}
        <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-2xl">
          <div className="w-7 h-7 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center">
            <Cpu className="w-4 h-4 text-[#8B5CF6]" />
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#8E8E93] uppercase block">Master Node</span>
            <span className="text-[11px] font-mono font-bold text-white">Lead Product Designer</span>
          </div>
        </div>
      </div>

      {/* Branch Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {BRANCHES.map((branch) => (
          <button
            key={branch}
            onClick={() => setSelectedBranch(branch)}
            className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold transition-all duration-200 cursor-default whitespace-nowrap border ${
              selectedBranch === branch
                ? 'bg-white text-[#0A0A0F] border-white/20 shadow-sm'
                : 'text-[#8E8E93] border-white/[0.06] hover:text-white hover:border-white/[0.12]'
            }`}
          >
            {branch.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Main Content Grid: Nodes Grid (Left) + Detail Inspector (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        
        {/* Left 2 Columns: Skill Nodes */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredNodes.map((node) => {
            const isSelected = selectedNode.id === node.id;
            const Icon = node.icon;
            return (
              <motion.div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className={`p-4 rounded-2xl border cursor-default flex flex-col justify-between h-[135px] relative overflow-hidden transition-all duration-300 ${
                  isSelected
                    ? 'bg-white/[0.04] border-white/25 shadow-[0_0_35px_rgba(139,92,246,0.12)]'
                    : 'bg-white/[0.015] border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.025]'
                }`}
              >
                {/* Node Top Header */}
                <div className="flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{ background: `${node.accentColor}18`, border: `1px solid ${node.accentColor}30` }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: node.accentColor }} />
                    </div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#8E8E93]">
                      {node.branch}
                    </span>
                  </div>

                  <span 
                    className="text-[8px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase"
                    style={{ color: node.statusColor, borderColor: `${node.statusColor}30`, background: `${node.statusColor}10` }}
                  >
                    {node.status}
                  </span>
                </div>

                {/* Node Title & Level */}
                <div className="relative z-10 space-y-1">
                  <h3 className="text-[14px] font-display font-extrabold text-white tracking-tight">{node.name}</h3>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold" style={{ color: node.accentColor }}>{node.level}</span>
                    <span className="text-[#8E8E93]">{node.exp}</span>
                  </div>
                </div>

                {/* XP Progress Bar */}
                <div className="relative z-10 w-full h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: node.accentColor }}
                    initial={{ width: 0 }}
                    animate={{ width: `${node.xp}%` }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Node Detail Inspector */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-5 space-y-5 relative overflow-hidden"
          >
            {/* Ambient Glow */}
            <div 
              className="absolute -top-16 -right-16 w-[160px] h-[160px] rounded-full blur-[60px] opacity-15 pointer-events-none"
              style={{ background: selectedNode.accentColor }}
            />

            {/* Header */}
            <div className="space-y-3 relative z-10 border-b border-white/[0.06] pb-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#8E8E93]">Node Inspector</span>
                <span className="text-[9px] font-mono font-bold text-white px-2 py-0.5 rounded bg-white/[0.06]">
                  XP: {selectedNode.xp}/100
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${selectedNode.accentColor}20`, border: `1px solid ${selectedNode.accentColor}35` }}
                >
                  {React.createElement(selectedNode.icon, { className: 'w-5 h-5', style: { color: selectedNode.accentColor } })}
                </div>
                <div>
                  <h2 className="text-[16px] font-display font-extrabold text-white tracking-tight">{selectedNode.name}</h2>
                  <span className="text-[10px] font-mono font-bold" style={{ color: selectedNode.accentColor }}>{selectedNode.level} · {selectedNode.exp}</span>
                </div>
              </div>

              <p className="text-[11px] text-[#8E8E93] leading-relaxed pt-1">
                {selectedNode.desc}
              </p>
            </div>

            {/* Sub-skills Checklist */}
            <div className="space-y-2.5 relative z-10">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#8E8E93] block">
                Mastered Capabilities
              </span>
              <div className="space-y-2">
                {selectedNode.subSkills.map((sub, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] text-[#C8C8CC] bg-white/[0.015] border border-white/[0.04] p-2.5 rounded-xl">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: selectedNode.accentColor }} />
                    <span className="leading-tight">{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Footer */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono relative z-10">
              <div className="flex items-center gap-1.5 text-[#34C759]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] animate-pulse" />
                <span className="font-bold">NODE ACTIVE</span>
              </div>
              <span className="text-[#8E8E93]">Branch: {selectedNode.branch}</span>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
};

export default SkillTreeApp;
