import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, ChevronRight, Activity, Cpu, Shield, Search } from 'lucide-react';
import './CaseStudy.css';

/* ═══════════════════════════════════════════════
   CASE STUDY DATA
   ═══════════════════════════════════════════════ */
const caseStudies = {
  'move-money': {
    title: 'Move Money Platform',
    subtitle: 'Unified Enterprise Payment Rails Engine for High-Velocity Commercial Banking',
    category: 'Fintech & Commercial Treasury',
    number: '01',
    accentColor: '#7C3AED',
    meta: {
      industry: 'Commercial Treasury, B2B Fintech',
      role: 'Lead Product Designer',
      scope: 'Rails Engine, Token System, Settlement Ledger'
    },
    sections: [
      {
        type: 'text-huge',
        content: 'Consolidating 4 Enterprise Banking Rails into a Single High-Velocity Checkout Engine'
      },
      {
        type: 'editorial-text',
        watermark: '01',
        label: 'Overview',
        title: 'Unified Clearing Hub',
        content: [
          "Fintech Treasury Corp processes over $5.7B in annual commercial payments. Prior to this initiative, treasury operations managers navigated 7 disconnected legacy bank portals with separate MFA keys and zero settlement visibility.",
          "As Lead Product Designer, I spearheaded the UX strategy, information architecture, and design token system for a unified checkout engine and real-time settlement ledger."
        ]
      },
      {
        type: 'list-massive',
        watermark: '02',
        label: 'Challenges',
        title: 'Core Friction Points',
        description: "Treasury teams lost hours daily on manual data entry and wire reconciliation. We designed a decision-centric system to eliminate human error and accelerate settlement loops:",
        items: [
          { title: "Portal Fragmentation", text: "Users logged into 7 separate legacy banking systems to execute ACH, Wire, RTP, and FedNow transfers." },
          { title: "Wire Routing Errors", text: "Manual entry of SWIFT/BIC codes resulted in high penalty fees and 48-hour settlement delays." },
          { title: "Black Hole Processing", text: "Legacy portals provided zero real-time progress indicators after wire submission, triggering duplicate transfers." },
          { title: "Manual Reconciliation", text: "Teams spent 4+ hours every morning matching paper bank statements to internal accounting ledgers." }
        ]
      },
      {
        type: 'editorial-text',
        watermark: '03',
        label: 'Solution',
        title: 'Smart-Clearing Checkout',
        content: [
          "We engineered an intelligent payment rail selector that auto-recommends the fastest and cheapest clearing channel based on transaction amount, fee thresholds, and recipient location.",
          "Paired with real-time WebSocket progress rings and a dual-key signature guard, the platform reduced manual work by 85% and eliminated routing error overhead."
        ]
      },
      {
        type: 'metrics',
        label: 'Impact',
        title: 'Measured Outcomes',
        items: [
          { prefix: '-', value: '85', suffix: '%', label: 'Manual Reconciliation' },
          { prefix: '+', value: '30', suffix: '%', label: 'Treasury Velocity' },
          { prefix: '', value: '99.99', suffix: '%', label: 'Settlement Uptime' }
        ]
      }
    ],
    nextProject: { id: 'revlitix-saas', title: 'Revlitix' },
  },
  'revlitix-saas': {
    title: 'Revlitix',
    subtitle: 'Turning Scattered Revenue Data Into Confident, Real-Time Decisions',
    category: 'SaaS & B2B Analytics',
    number: '02',
    accentColor: '#8B5CF6',
    meta: {
      industry: 'SaaS, Revenue Operations, B2B Analytics',
      role: 'Lead UI/UX Designer',
      scope: 'Product Strategy, Data Viz, System Architecture'
    },
    sections: [
      {
        type: 'text-huge',
        content: 'Designing an AI-Powered Control Room for Commercial Operations'
      },
      {
        type: 'editorial-text',
        watermark: '01',
        label: 'Overview',
        title: 'Unified Funnels',
        content: [
          "Revlitix is a B2B revenue intelligence hub built for scaling enterprises that need a single source of truth for their funnel and sales pipelines.",
          "The platform orchestrates analytics, cohort reporting, and predictive AI modeling into one shared, tokenized workspace for sales, marketing, and growth teams."
        ]
      },
      {
        type: 'list-massive',
        watermark: '02',
        label: 'Challenges',
        title: 'Core Objectives',
        description: "The existing reporting workflow was slow, fragmented, and hard to trust. We set out to design a system that consolidated multiple data sources and reduced interpretation lag:",
        items: [
          { title: "Data Fragmentation", text: "Teams manually consolidated numbers from dozens of spreadsheets and disconnected bank portals." },
          { title: "Lagging Visibility", text: "Users couldn't quickly pinpoint drop-offs in the acquisition funnel before they impacted MRR." },
          { title: "Cognitive Overload", text: "Traditional dashboards presented too much raw data without clear hierarchy or actionable takeaways." },
          { title: "Slow Action Loops", text: "Translating numbers into next steps required manual spreadsheet modeling and analyst hours." }
        ]
      },
      {
        type: 'editorial-text',
        watermark: '03',
        label: 'Process',
        title: 'Decision-First UX',
        content: [
          "I ran discovery workshops with sales, marketing, and RevOps stakeholders to map out daily decision cycles.",
          "Instead of grouping metrics by standard categories, we designed around actionable alerts — prioritizing what changed, why it changed, and what immediate action is required."
        ]
      },
      {
        type: 'metrics',
        label: 'Impact',
        title: 'Measured Outcomes',
        items: [
          { prefix: '+', value: '25', suffix: '%', label: 'User Adoption Rate' },
          { prefix: '-', value: '30', suffix: '%', label: 'Time to Insight' },
          { prefix: '+', value: '40', suffix: '%', label: 'Ops Velocity' }
        ]
      }
    ],
    nextProject: { id: 'sonic', title: 'Sonic AI' },
  },
  'sonic': {
    title: 'Sonic AI',
    subtitle: 'Interacting with complex databases in plain natural English.',
    category: 'Conversational UX & AI',
    number: '03',
    accentColor: '#007AFF',
    meta: {
      industry: 'AI Assistant, Database Query UX, Enterprise',
      role: 'Lead Interaction Designer',
      scope: 'Natural Language UX, Parser Visualizations'
    },
    sections: [
      {
        type: 'text-huge',
        content: 'Empowering Non-Technical Teams with Instant SQL Query Generation'
      },
      {
        type: 'editorial-text',
        watermark: '01',
        label: 'Overview',
        title: 'Conversational Analytics',
        content: [
          "Sonic AI is a conversational assistant that translates plain English prompts into real-time database queries, rendering automated visualization charts in milliseconds.",
          "It eliminates reporting bottlenecks by letting business managers bypass writing complex SQL statements entirely."
        ]
      },
      {
        type: 'list-massive',
        watermark: '02',
        label: 'Challenges',
        title: 'Design Goals',
        description: "The primary design challenge was building trust around AI interpretations. The interface had to guide users through parser feedback and display query logic clearly:",
        items: [
          { title: "Query Ambiguity", text: "Users write conversational questions that map to databases in unpredictable, non-standard ways." },
          { title: "Interpretation Trust", text: "Business users need to know exactly how the AI interpreted their text to trust the resulting charts." },
          { title: "Layout Adaptability", text: "The assistant must instantly generate the optimal chart format (bar, line, scatter) based on returned data structures." },
          { title: "Error Recovery", text: "When queries fail, users need actionable guidance to adjust their prompts rather than generic error codes." }
        ]
      },
      {
        type: 'metrics',
        label: 'Outcomes',
        title: 'Performance Growth',
        items: [
          { prefix: '', value: '60', suffix: '%', label: 'Faster Query Cycles' },
          { prefix: '-', value: '40', suffix: '%', label: 'Data Team Tickets' },
          { prefix: '', value: '85', suffix: '%', label: 'SUS Usability Score' }
        ]
      }
    ],
    nextProject: { id: 'move-money', title: 'Move Money Platform' },
  }
};

/* ═══════════════════════════════════════════════
   VERTICAL SECTIONS
   ═══════════════════════════════════════════════ */

const TextHugeSection = ({ content }) => (
  <div className="cs-section cs-text-huge">
    <motion.h2 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-h2"
    >
      {content}
    </motion.h2>
  </div>
);

const EditorialTextSection = ({ section, accentColor }) => (
  <div className="cs-section editorial-text-section">
    {section.watermark && <div className="editorial-watermark" style={{ color: `${accentColor}06` }}>{section.watermark}</div>}
    <div className="editorial-content">
      <div className="editorial-left">
        <span className="cs-label" style={{ color: accentColor }}>{section.label}</span>
        <h2 className="text-h2">{section.title}</h2>
      </div>
      <div className="editorial-right">
        {section.content && section.content.map((p, i) => (
          <p key={i} className="text-body" style={{ marginBottom: i < section.content.length - 1 ? '1.5rem' : '0' }}>{p}</p>
        ))}
      </div>
    </div>
  </div>
);

const ListMassiveSection = ({ section, accentColor }) => (
  <div className="cs-section cs-list-massive">
    {section.watermark && <div className="editorial-watermark" style={{ color: `${accentColor}06` }}>{section.watermark}</div>}
    <div className="cs-list-header">
      <span className="cs-label" style={{ color: accentColor }}>{section.label}</span>
      <h2 className="text-h2">{section.title}</h2>
      <p className="cs-list-desc">{section.description}</p>
    </div>
    <div className="cs-list">
      {section.items.map((item, i) => (
        <div key={i} className="cs-list-item">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <h3>{item.title}</h3>
          </div>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  </div>
);

const MetricsSection = ({ section, accentColor }) => (
  <div className="cs-section cs-metrics" style={{ border: `1px solid ${accentColor}15` }}>
    <div 
      className="absolute inset-0 blur-[80px] opacity-10 pointer-events-none"
      style={{ background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)` }}
    />
    <div className="cs-metrics-header z-10">
      <span className="cs-label" style={{ color: accentColor }}>{section.label}</span>
      <h2 className="text-h2">{section.title}</h2>
    </div>
    <div className="cs-metrics-grid z-10">
      {section.items.map((item, i) => (
        <div key={i} className="cs-metric">
          <span className="cs-metric-value" style={{ color: accentColor }}>
            {item.prefix}{item.value}{item.suffix}
          </span>
          <span className="cs-metric-label">{item.label}</span>
        </div>
      ))}
    </div>
  </div>
);

const NextProjectSection = ({ project, navigate, accentColor, onSelectProject }) => (
  <div 
    className="cs-section cs-next group cursor-pointer" 
    onClick={() => {
      if (onSelectProject) {
        onSelectProject(project.id);
      } else {
        navigate(`/case-study/${project.id}`);
      }
    }}
    style={{ border: `1px solid ${accentColor}15` }}
  >
    <div 
      className="absolute inset-0 blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
      style={{ background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)` }}
    />
    <div className="cs-next-content hover-target">
      <span className="cs-label">Next Case Study</span>
      <h2 className="text-h2 flex items-center justify-center gap-3 transition-colors duration-300 group-hover:text-white">
        {project.title} 
        <ArrowRight size={36} className="transition-transform duration-300 group-hover:translate-x-2" style={{ color: accentColor }} />
      </h2>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   INTERACTIVE PLAYGROUNDS FOR THE CASE STUDY
   ═══════════════════════════════════════════════ */

const MoveMoneyPlayground = ({ accentColor }) => {
  const [activeRail, setActiveRail] = useState('fednow');
  const rails = [
    { id: 'ach', name: 'ACH Batch', speed: '1-2 Days', fee: '$0.05', status: 'Standard Batch Clearing' },
    { id: 'wire', name: 'Fedwire RTGS', speed: '15 Minutes', fee: '$15.00', status: 'High-Value Gross Settlement' },
    { id: 'rtp', name: 'RTP Network', speed: 'Instant (2s)', fee: '$0.25', status: 'Real-Time Clearing Network' },
    { id: 'fednow', name: 'FedNow Instant', speed: 'Instant (1s)', fee: '$0.45', status: 'Federal Reserve Rail' },
  ];

  return (
    <div className="cs-section cs-interactive-module" style={{ border: `1px solid ${accentColor}15` }}>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
            <span className="text-[10px] font-mono text-[#86868B] uppercase tracking-wider">INTERACTIVE VISUAL: MOVE MONEY PLATFORM</span>
          </div>
          <h3 className="text-xl font-display font-extrabold text-white">Payment Rails Engine</h3>
          <p className="text-xs text-[#86868B] leading-relaxed">
            Select a payment rail to test real-time settlement telemetry and fee routing logic.
          </p>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {rails.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveRail(r.id)}
                className={`p-2.5 rounded-xl border text-left text-xs font-mono transition-all cursor-default ${
                  activeRail === r.id 
                    ? 'bg-white/10 text-white border-white/30' 
                    : 'bg-white/[0.02] text-[#86868B] border-white/[0.05] hover:text-white'
                }`}
              >
                <span className="font-bold block text-white">{r.name}</span>
                <span className="text-[10px] opacity-70 block">{r.speed} · {r.fee}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white/[0.02] rounded-xl p-5 border border-white/[0.06] flex flex-col justify-between min-h-[180px]">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-[#86868B] uppercase tracking-wider block">Selected Clearing Channel</span>
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-white uppercase font-mono">{activeRail} Rail</span>
              <span className="text-xs font-mono font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded">● Live Active</span>
            </div>
            <p className="text-xs text-[#86868B]">
              {rails.find(r => r.id === activeRail)?.status} — Processing speed {rails.find(r => r.id === activeRail)?.speed} with {rails.find(r => r.id === activeRail)?.fee} transaction fee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const RevlitixPlayground = ({ accentColor }) => {
  const [funnelStage, setFunnelStage] = useState(0);
  const stages = [
    { label: 'Unfiltered Traffic', val: '100%', desc: 'Initial multi-source channel visitor traffic.' },
    { label: 'Qualified Leads', val: '45%', desc: 'AI filters out low-intent bots and duplicates.' },
    { label: 'Opportunities Created', val: '18%', desc: 'Assigned to sales teams with auto-alerts.' },
    { label: 'Deals Closed Won', val: '8.4%', desc: 'Cleared and settlement verified on the ledger.' }
  ];

  return (
    <div className="cs-section cs-interactive-module" style={{ border: `1px solid ${accentColor}15` }}>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
            <span className="text-[10px] font-mono text-[#86868B] uppercase tracking-wider">INTERACTIVE VISUAL: REVLITIX FUNNEL</span>
          </div>
          <h3 className="text-xl font-display font-extrabold text-white">Visual Funnel Breakdown</h3>
          <p className="text-xs text-[#86868B] leading-relaxed">
            Click on the funnel segments to see how the design visualizes dropout rates and surfaces action-oriented alert notifications.
          </p>
          <div className="space-y-1 bg-white/[0.02] p-4 rounded-xl border border-white/[0.04]">
            <span className="text-[10px] font-mono text-[#86868B] uppercase font-bold tracking-wider">Stage Context</span>
            <h4 className="text-xs font-bold text-white mt-1">{stages[funnelStage].label}</h4>
            <p className="text-[11px] text-[#86868B] leading-relaxed mt-0.5">{stages[funnelStage].desc}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center relative min-h-[220px]">
          <div className="w-full max-w-[280px] space-y-2">
            {stages.map((st, idx) => {
              const widths = ['w-full', 'w-[75%]', 'w-[50%]', 'w-[25%]'];
              return (
                <div 
                  key={idx}
                  onClick={() => setFunnelStage(idx)}
                  className={`h-11 rounded-lg flex items-center justify-between px-4 cursor-pointer select-none transition-all duration-300 ${widths[idx]} mx-auto ${
                    funnelStage === idx 
                      ? 'border scale-[1.03] shadow-lg' 
                      : 'border border-transparent opacity-65 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: funnelStage === idx ? `${accentColor}20` : 'rgba(255,255,255,0.03)',
                    borderColor: funnelStage === idx ? accentColor : 'transparent'
                  }}
                >
                  <span className="text-[11px] font-medium text-white truncate pr-2">{st.label}</span>
                  <span className="text-[11px] font-mono font-bold" style={{ color: accentColor }}>{st.val}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const SonicPlayground = ({ accentColor }) => {
  const [queryInput, setQueryInput] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);
  const [queryResult, setQueryResult] = useState(null);

  const handleRunQuery = (qText) => {
    setQueryInput(qText);
    setIsQuerying(true);
    setQueryResult(null);
    setTimeout(() => {
      setIsQuerying(false);
      setQueryResult({
        title: qText.includes('MRR') ? 'Q2 Monthly Recurring Revenue' : 'User Conversion Metrics',
        summary: qText.includes('MRR') ? '$240K Total MRR (+18% MoM)' : '32% Conversion Rate (+4% MoM)',
        data: [42, 58, 65, 80]
      });
    }, 1500);
  };

  return (
    <div className="cs-section cs-interactive-module" style={{ border: `1px solid ${accentColor}15` }}>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
            <span className="text-[10px] font-mono text-[#86868B] uppercase tracking-wider">INTERACTIVE VISUAL: SONIC AI PARSER</span>
          </div>
          <h3 className="text-xl font-display font-extrabold text-white">Parser Simulation</h3>
          <p className="text-xs text-[#86868B] leading-relaxed">
            Run sample natural language queries to watch how the conversational UI parses text syntax into responsive charts.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => handleRunQuery('Calculate Q2 MRR by month')}
              className="px-3 py-1.5 border border-white/5 hover:border-[#007AFF]/30 hover:bg-[#007AFF]/5 rounded-lg text-[10px] text-white font-mono cursor-default"
            >
              "Calculate Q2 MRR"
            </button>
            <button
              onClick={() => handleRunQuery('Show user conversion rate this week')}
              className="px-3 py-1.5 border border-white/5 hover:border-[#007AFF]/30 hover:bg-[#007AFF]/5 rounded-lg text-[10px] text-white font-mono cursor-default"
            >
              "Show conversion"
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white/[0.01] rounded-xl p-4 border border-white/[0.04] flex flex-col justify-between min-h-[220px]">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2 text-[11px] font-mono text-white flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#86868B]" />
            <input 
              type="text" 
              value={queryInput} 
              readOnly 
              placeholder="Query database in plain English..." 
              className="bg-transparent border-none outline-none w-full text-white cursor-default"
            />
          </div>

          <div className="flex-1 flex items-center justify-center relative min-h-[140px]">
            {isQuerying && (
              <div className="text-center space-y-2 flex flex-col items-center">
                <Cpu className="w-5 h-5 animate-spin" style={{ color: accentColor }} />
                <p className="text-[10px] text-[#86868B] font-mono animate-pulse">AI Parsing SQL logic...</p>
              </div>
            )}

            {!isQuerying && !queryResult && (
              <span className="text-[10px] text-[#86868B] font-mono">Select a sample query to start</span>
            )}

            {!isQuerying && queryResult && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 space-y-2"
              >
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-white">{queryResult.title}</span>
                  <span className="font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded">{queryResult.summary}</span>
                </div>

                <div className="flex items-end justify-around h-16 pt-2">
                  {queryResult.data.map((val, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1 max-w-[30px]">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${val}%` }}
                        className="w-full rounded-t-sm"
                        style={{ backgroundColor: accentColor, height: `${val}%` }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
const CaseStudy = ({ activeProjectId = null, onClose = null }) => {
  const { id: routeId } = useParams();
  const navigate = useNavigate();
  
  const [currentId, setCurrentId] = useState(activeProjectId || routeId || 'move-money');

  useEffect(() => {
    if (activeProjectId) {
      setCurrentId(activeProjectId);
    } else if (routeId) {
      setCurrentId(routeId);
    }
  }, [activeProjectId, routeId]);

  const study = caseStudies[currentId] || caseStudies['move-money'] || caseStudies['revlitix-saas'];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [currentId]);

  if (!study) {
    return (
      <div className="ug-not-found">
        <h2 className="text-h2">Case Study Not Found</h2>
        <button onClick={() => onClose ? onClose() : navigate('/')} className="btn btn-outline">Return Home</button>
      </div>
    );
  }

  return (
    <div className="ug-page relative overflow-hidden bg-[#0D0D12] text-white">
      {/* Dynamic ambient colored glow orb in background */}
      <div 
        className="absolute -top-[200px] left-[15%] w-[800px] h-[800px] rounded-full blur-[160px] opacity-15 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle, ${study.accentColor} 0%, transparent 60%)`
        }}
      />

      {/* Scroll Reading Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 origin-left z-[101]"
        style={{ scaleX, backgroundColor: study.accentColor }}
      />
      
      {/* Top Header Section */}
      <header className="ug-hero-header relative z-10">
        <div className="ug-hero-header-inner">
          <button 
            onClick={() => {
              if (onClose) {
                onClose();
              } else {
                navigate('/');
              }
            }}
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#86868B] hover:text-white transition-colors cursor-default mb-8 bg-transparent border-none p-0 w-fit"
          >
            <ArrowLeft size={12} /> Back to Overview
          </button>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: study.accentColor }}>{study.number}</span>
            <span className="text-[#86868B] text-xs font-mono">/</span>
            <span className="text-xs font-mono font-bold text-[#86868B] uppercase tracking-wider">{study.category}</span>
          </div>

          <h1 className="ug-project-title uppercase text-white font-display font-extrabold leading-none tracking-tight">
            {study.title}
          </h1>
          <p className="ug-project-subtitle text-[#86868B] font-body leading-relaxed max-w-3xl mt-4">
            {study.subtitle}
          </p>

          <div className="ug-meta-grid border-white/10 mt-8">
            {Object.entries(study.meta).map(([key, value]) => (
              <div key={key} className="ug-meta-item">
                <strong className="text-[10px] text-[#86868B] tracking-wider uppercase">{key}</strong>
                <span className="text-[13px] text-white font-medium mt-1">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Centered Scrolling Content */}
      <main className="ug-content relative z-10">
        
        {/* Render Interactive Playground right after main hero intro */}
        {currentId === 'move-money' && <MoveMoneyPlayground accentColor={study.accentColor} />}
        {currentId === 'revlitix-saas' && <RevlitixPlayground accentColor={study.accentColor} />}
        {currentId === 'sonic' && <SonicPlayground accentColor={study.accentColor} />}

        {study.sections.map((section, index) => {
          switch (section.type) {
            case 'text-huge':
              return <TextHugeSection key={index} content={section.content} />;
            case 'editorial-text':
              return <EditorialTextSection key={index} section={section} accentColor={study.accentColor} />;
            case 'list-massive':
              return <ListMassiveSection key={index} section={section} accentColor={study.accentColor} />;
            case 'metrics':
              return <MetricsSection key={index} section={section} accentColor={study.accentColor} />;
            default:
              return null;
          }
        })}

        {study.nextProject && (
          <NextProjectSection 
            project={study.nextProject} 
            navigate={navigate} 
            accentColor={study.accentColor} 
            onSelectProject={(nextId) => setCurrentId(nextId)}
          />
        )}
      </main>
    </div>
  );
};

export default CaseStudy;
