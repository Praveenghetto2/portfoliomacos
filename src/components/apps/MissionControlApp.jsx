import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, FileText, CheckCircle2, AlertCircle, Gauge, Lightbulb, 
  HelpCircle, Compass, Layers, Shield, TrendingUp, Award, Box, Monitor, Sparkles,
  Maximize2, Share2, ChevronRight, Clock, Zap, Target, BookOpen, Check
} from 'lucide-react';

const MISSIONS = [
  {
    id: 'revlitix-saas',
    videoUrl: '/assets/Revlitix.mp4',
    num: '01',
    title: 'REVLITIX',
    subtitle: 'Consolidating Fragmented Workflows into One Decision-Centric Experience',
    desc: 'Redesigning an AI-powered Revenue Intelligence platform to unify GTM data from 50+ tools into a single source of truth.',
    company: 'Revlitix · Series B',
    product: 'B2B Revenue Intelligence SaaS Platform',
    category: 'B2B SAAS · REVENUE INTELLIGENCE · 2022-2025',
    role: 'Senior/Lead Product Designer',
    duration: '3 years (2022 – 2025)',
    year: '2022–2025',
    team: '1 PM, Me (Lead Designer), 3-person engineering pod',
    platforms: 'Web application · Desktop-first responsive',
    responsibilities: 'Research, Information Architecture, Interaction Design, Usability Testing, Figma Design System',
    status: 'OPERATIONAL',
    statusColor: '#34C759',
    latency: '34ms',
    accentColor: '#007AFF',
    readTime: '8 min read',
    tagCategory: 'saas',

    heroImage: '/assets/revlitix_saas_hero_ultra.jpg',
    mockups: [
      '/assets/revlitix_data_integration_new.jpg',
      '/assets/revlitix_funnel.jpg',
      '/assets/revlitix_design_system_v3.jpg',
      '/assets/revlitix_waterfall_v3.jpg',
      '/assets/revlitix_wireframe_v3.jpg'
    ],

    floatingCards: [
      { type: 'ai', text: 'Pipeline risk detected: 3 deals need attention', tag: 'AI Insight', color: '#FF3B30' },
      { type: 'metric', text: 'Revenue ↑12% vs. last quarter', tag: 'Quarterly Growth', color: '#34C759' },
      { type: 'kpi', text: '$2.4M pipeline coverage', tag: 'Coverage Ratio', color: '#007AFF' },
      { type: 'forecast', text: '92% forecast accuracy', tag: 'AI Model Score', color: '#AF52DE' }
    ],

    heroMetrics: [
      { val: '2 steps', lbl: 'Time to Insight', detail: 'Cut from 5–6 clicks (roughly halved)', color: '#007AFF' },
      { val: '15–18%', lbl: 'AI Engagement', detail: 'Rose from under 5% of weekly active sessions', color: '#34C759' },
      { val: '↓25%', lbl: 'Support Tickets', detail: 'Reduced by roughly a quarter', color: '#FF9F0A' },
      { val: '3.9 / 5', lbl: 'User Confidence', detail: 'Improved from ~2.8 baseline trust score', color: '#AF52DE' }
    ],

    execSummary: `Revlitix is a go-to-market (GTM) analytics platform that unifies data from over 50 tools in a customer's tech stack — Salesforce, HubSpot, Google Analytics, and others — into real-time insights and automated reporting.\n\nBefore this initiative, answering a single strategic question required moving across four separate modules — Pipeline, Spend, Cohorts, and AI Insights. Users were acting as manual data-integration engineers instead of revenue strategists. To answer 'why did pipeline dip in APAC this quarter?', a user had to visit multiple tabs, check budget allocations, and mentally calculate the results.`,

    pullQuote: `"Revenue leaders don't suffer from a lack of dashboards. They suffer from a lack of clarity."`,

    execMetricsTable: [
      { label: 'Time-to-Insight', old: '5–6 clicks', new: '2 steps', growth: 'Roughly halved' },
      { label: 'AI Feature Engagement', old: 'Under 5%', new: 'Roughly 15–18%', growth: 'Real behavior change' },
      { label: 'Navigation Support Tickets', old: 'Trending up', new: 'Reduced by ~25%', growth: 'Reduced by a quarter' },
      { label: 'User Confidence', old: '~2.8 / 5', new: '~3.9 / 5', growth: 'Contextual framing trust' },
      { label: 'Design System Coverage', old: 'One-off code', new: '~75–80%', growth: 'Componentized cards' }
    ],

    challenge: {
      title: 'Users were acting as manual data-integration engineers instead of revenue strategists.',
      subtitle: 'Visibility was a myth, and trying to get a unified view of marketing efforts felt like a maze with no exit.',
      cards: [
        {
          num: '01',
          title: 'Fragmented Visibility',
          desc: 'Modern GTM organizations rely on dozens of disconnected systems. Sales lives in Salesforce, marketing performance in advertising platforms, customer health elsewhere.',
          evidence: 'Arpit R: Our tech stack felt like a maze with no exit. Visibility was a myth.'
        },
        {
          num: '02',
          title: 'Reporting Latency',
          desc: 'Answering simple questions took weeks of manual data-wrangling across Excel sheets. By the time reports were compiled, they were too stale to act on.',
          evidence: 'Jeremy Collins: I ask for analysis and it comes two weeks later. I just ignore it.'
        },
        {
          num: '03',
          title: 'Low AI Adoption',
          desc: 'The machine-learning insights engine sat isolated in its own tab with less than 5% adoption. Users didn\'t trust recommendations they couldn\'t verify.',
          evidence: 'Beta User: The AI suggestions felt like a black box. I couldn\'t see how it reached those conclusions.'
        }
      ]
    },

    metrics: [
      { val: '2 steps', label: 'Time-to-Insight', change: 'Halved from 5-6 clicks', trackColor: '#007AFF' },
      { val: '15-18%', label: 'AI Feature Engagement', change: 'Up from under 5%', trackColor: '#34C759' },
      { val: '↓25%', label: 'Support Ticket Volume', change: 'Navigation issues reduced', trackColor: '#FF9F0A' },
      { val: '3.9 / 5', label: 'User Confidence Score', change: 'Up from 2.8 baseline', trackColor: '#AF52DE' }
    ],

    research: {
      methodology: [
        { title: '14 Contextual Interviews', desc: 'Observed VP Sales and RevOps leads in their natural workflow during weekly pipeline reviews.' },
        { title: 'Screen-Share Shadowing', desc: 'Tracked cross-tab navigation paths to document mental context switches during reporting.' },
        { title: 'System Usability Scale (SUS)', desc: 'Ran SUS benchmarks establishing an initial score of 54/100 (below industry average).' }
      ],
      userQuotes: [
        { quote: 'I don\'t want 50 customizable widgets. I want to know if we\'re hitting quota this month.', author: 'RevOps Director, Series C SaaS' },
        { quote: 'Every Monday morning is spent copying numbers from three tools into a slide deck.', author: 'VP Marketing, Enterprise' }
      ]
    },

    insights: [
      { num: '01', title: 'Dashboards overload; users want answers', desc: 'Static charts force users to do mental math. Contextual text summaries drive faster decisions.' },
      { num: '02', title: 'Trust requires transparency', desc: 'Users only follow AI recommendations when they can inspect the underlying data sources.' },
      { num: '03', title: 'Workflows > Visualizations', desc: 'A chart without inline action buttons creates a dead-end experience.' },
      { num: '04', title: 'Defaults shape behavior', desc: '90% of users stick to default dashboard views — initial layout design is paramount.' }
    ],

    prioritization: {
      highImpactHighEffort: ['Unified Multi-Touch Attribution Engine', 'Automated Cohort Comparison Builder'],
      highImpactLowEffort: ['Contextual AI Insight Cards in Primary Viewport', 'Global Date-Range Sync across All Tabs'],
      lowImpactLowEffort: ['Customizable Dashboard Color Themes', 'Widget Grid Reordering Controls']
    },

    principles: [
      { num: '01', title: 'Answers Over Data', desc: 'Lead with conclusions, follow with evidence. Never show a chart without a clear textual summary.' },
      { num: '02', title: 'Contextual AI', desc: 'Embed AI insights directly alongside primary metrics, not in an isolated sidebar tab.' },
      { num: '03', title: 'Actionable Surface', desc: 'Every data card must provide a 1-click action path (e.g. Export, Share, Assign Task).' }
    ],

    retrospective: {
      learned: [
        { num: '01', title: 'Contextual AI beats dedicated AI tabs.', desc: 'Moving AI insights from a hidden sidebar tab to inline metric cards drove a 3x increase in adoption within 30 days.' },
        { num: '02', title: 'Design for default states first.', desc: 'Users rarely customize dashboards. Spending time perfecting default view presets yielded far higher satisfaction than advanced layout controls.' }
      ],
      mistakes: [
        { num: '01', title: 'Overestimating custom widget demand.', desc: 'We spent 4 weeks building drag-and-drop dashboard customization that only 6% of power users ever touched.' }
      ]
    }
  },
  {
    id: 'move-money',
    num: '02',
    title: 'Move Money Platform',
    subtitle: 'Unified Enterprise Payment Rails Engine for High-Velocity Commercial Banking',
    desc: 'Unified enterprise payment rails engine streamlining ACH, Fedwire, RTP, and FedNow instant settlements.',
    company: 'Fintech Treasury Corp',
    product: 'Enterprise Move Money Checkout & Ledger Engine',
    category: 'FINTECH PAYMENTS · TREASURY ENGINE · 2024-2025',
    role: 'Lead Product Designer',
    duration: '8 months (Q3 2024 – Q1 2025)',
    year: '2024–2025',
    team: '1 PM, 1 Lead Designer (Me), 4 Senior Full-Stack Engineers, 1 Compliance Officer',
    platforms: 'Desktop Web App, Responsive Tablet, Figma Token Engine',
    responsibilities: 'Product Strategy, Discovery Research, Information Architecture, Token System, Wireframing, Handoff & Design QA',
    status: 'OPERATIONAL',
    statusColor: '#34C759',
    latency: '42ms',
    accentColor: '#34C759',
    readTime: '6 min read',
    tagCategory: 'fintech',

    heroImage: '/assets/move_money_hero_ultra.jpg',
    mockups: [
      '/assets/move_money_dashboard_1784827266925.jpg',
      '/assets/move_money_design_system_1784827289843.jpg',
      '/assets/move_money_security_1784827369109.jpg',
      '/assets/move_money_flow_1784827452411.jpg'
    ],

    heroMetrics: [
      { val: '↓40%', lbl: 'Task Completion Time', detail: '4.2m → 2.5m via smart payee auto-fill', color: '#007AFF' },
      { val: '↑27%', lbl: 'CSAT Satisfaction', detail: 'Increased user satisfaction from 68% to 95%', color: '#34C759' },
      { val: '↑19%', lbl: 'Instant Rail Adoption', detail: 'Shifted payout volume to FedNow & RTP', color: '#AF52DE' },
      { val: '↓65%', lbl: 'Support Ticket Volume', detail: 'Eliminated manual SWIFT entry routing errors', color: '#FF9F0A' }
    ],

    execSummary: `Commercial banking treasury teams process millions in daily payouts across disparate settlement networks — ACH, Wire, RTP, and FedNow.\n\nLegacy treasury interfaces force users through different multi-step forms for each payment rail. The Move Money project unified all payment rails into a single smart checkout flow with real-time settlement tracking and automated compliance validation.`,

    pullQuote: `"Fintech speed is meaningless if users don't have total certainty about where their money is."`,

    challenge: {
      title: 'Disjointed payment rails created high error rates and delayed enterprise settlements.',
      subtitle: 'Users had to manually select payment types based on complex settlement rules.',
      cards: [
        { num: '01', title: 'Fragmented Portal Chaos', desc: 'Corporate treasurers had to use different UI paradigms for ACH vs Wire.', evidence: 'Treasury Analyst: Every payment rail feels like a completely different bank portal.' },
        { num: '02', title: 'High Error Rates', desc: 'Manual account entry led to a 12% failed transaction rate in QA audits.', evidence: 'Compliance Lead: One typo in routing numbers locks funds for 48 hours.' },
        { num: '03', title: 'Zero Real-Time Tracking', desc: 'Users had no visual ledger for RTP or FedNow settlement statuses.', evidence: 'Operations Manager: We get calls constantly asking if the money arrived.' }
      ]
    },

    principles: [
      { num: '01', title: 'Compliance is a UX partner, not a blocker.', desc: 'Bringing legal in during wireframing saved us weeks of rework.' },
      { num: '02', title: 'Monospaced numbers are non-negotiable in fintech.', desc: 'Tabular numerals prevented misreading million-dollar values.' }
    ],

    retrospective: {
      learned: [
        { num: '01', title: 'Tabular numerals prevent financial errors.', desc: 'Using monospaced numbers for all currency values eliminated visual misalignments in audit ledgers.' }
      ],
      mistakes: [
        { num: '01', title: 'Delayed compliance review.', desc: 'Waiting until mid-fidelity wireframes to review OFAC validation rules caused 2 weeks of flow restructuring.' }
      ]
    }
  },
  {
    id: 'sonic',
    videoUrl: '/assets/Sonic.mp4',
    num: '03',
    title: 'Sonic AI Query Engine',
    subtitle: 'Conversational Natural Language Analytics Assistant',
    desc: 'Conversational natural language analytics query assistant for instant SQL database visualizations.',
    company: 'Sonic Analytics',
    product: 'AI Conversational Query Engine',
    category: 'AI CONVERSATIONAL UX · DATA NLP · 2024',
    role: 'UI/UX Designer',
    duration: '6 months (2024)',
    year: '2024',
    team: '1 Lead Designer (Me), 1 AI Engineer, 1 Product Manager',
    platforms: 'Web App, Mobile Chat Interface',
    responsibilities: 'Conversational UX, Query Inspector UI, Auto-Chart Engine, Usability Validation',
    status: 'ONLINE',
    statusColor: '#007AFF',
    latency: '85ms',
    accentColor: '#007AFF',
    readTime: '5 min read',
    tagCategory: 'ai',

    heroImage: '/assets/sonic_ai_hero_ultra.jpg',
    mockups: [
      '/assets/sonic_ai_chat_1784827520021.jpg',
      '/assets/sonic_ai_routing_1784827567946.jpg',
      '/assets/sonic_ai_chat_1784827520021.jpg',
      '/assets/sonic_ai_routing_1784827567946.jpg'
    ],

    heroMetrics: [
      { val: '< 3 sec', lbl: 'Query Response', detail: 'From prompt to full SQL chart render', color: '#007AFF' },
      { val: '88%', lbl: 'First-Try Accuracy', detail: 'Natural language parser precision', color: '#34C759' },
      { val: '4.8 / 5', lbl: 'User Satisfaction', detail: 'Rated by data analytics leads', color: '#AF52DE' },
      { val: '0 SQL', lbl: 'Code Required', detail: 'Non-technical users create complex charts', color: '#FF9F0A' }
    ],

    execSummary: `Sonic AI turns natural language prompts like "Show top 5 revenue channels this month" into instant SQL queries and interactive charts.\n\nDesigned with defensive AI UX patterns, transparent SQL code inspection, and automatic chart type selection to build user confidence in generative analytics.`,

    pullQuote: `"Designing AI UX is less about making the bot sound human and more about building user trust."`,

    challenge: {
      title: 'Users lacked trust in AI analytics without query visibility.',
      subtitle: 'Black-box LLM answers led to hesitation in executive decision making.',
      cards: [
        { num: '01', title: 'The Black Box Problem', desc: 'Users inherently distrusted AI-generated numbers without seeing the source.', evidence: 'Data Lead: If I can\'t see the SQL, I can\'t put this in a board deck.' },
        { num: '02', title: 'Visualization Chaos', desc: 'LLMs would pick the wrong chart type (e.g. pie chart for 50 items).', evidence: 'Analyst: The default charts looked unusable.' },
        { num: '03', title: 'Hallucination Mitigation', desc: 'Needed defensive UI states for when data was missing.', evidence: 'Product Lead: We need transparent error boundaries.' }
      ]
    },

    principles: [
      { num: '01', title: 'Inspectable Intelligence', desc: 'Always provide a 1-click toggle to view generated SQL and raw data tables.' },
      { num: '02', title: 'Defensive Feedback', desc: 'Show explicit confidence scores when query ambiguity is high.' }
    ],

    retrospective: {
      learned: [
        { num: '01', title: 'Transparent SQL builds instant trust.', desc: 'Adding a collapsible "View Generated SQL" accordion increased query approval rates from 42% to 91%.' }
      ],
      mistakes: [
        { num: '01', title: 'Assuming users knew database schema terms.', desc: 'Initial prompts required exact table column names. Adding fuzzy auto-complete solved 80% of prompt failures.' }
      ]
    }
  }
];

const NAV_CHIPS = [
  { id: 'sec-hero', label: '01 / Overview' },
  { id: 'sec-overview', label: '02 / Summary' },
  { id: 'sec-problem', label: '03 / Problem' },
  { id: 'sec-metrics', label: '04 / Metrics' },
  { id: 'sec-principles', label: '05 / Principles' },
  { id: 'sec-hifi', label: '06 / Gallery' },
  { id: 'sec-lessons', label: '07 / Retrospective' }
];

const MissionControlApp = ({ initialMission = null, onClose = null }) => {
  const [activeMission, setActiveMission] = useState(initialMission || null);
  const [activeSection, setActiveSection] = useState('sec-hero');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [copiedToken, setCopiedToken] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const selectedProject = activeMission ? MISSIONS.find((m) => m.id === activeMission) || MISSIONS[0] : null;
  const scrollContainerRef = useRef(null);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && zoomImage) {
        setZoomImage(null);
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const currentIdx = NAV_CHIPS.findIndex(c => c.id === activeSection);
        if (currentIdx < NAV_CHIPS.length - 1) {
          scrollToSection(NAV_CHIPS[currentIdx + 1].id);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const currentIdx = NAV_CHIPS.findIndex(c => c.id === activeSection);
        if (currentIdx > 0) {
          scrollToSection(NAV_CHIPS[currentIdx - 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, zoomImage]);

  // Scroll spy + scroll progress tracking
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const totalScroll = scrollHeight - clientHeight;
      const currentProgress = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);

      const scrollPos = scrollTop + 200;
      for (const chip of NAV_CHIPS) {
        const el = container.querySelector(`#${chip.id}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(chip.id);
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeMission]);

  const scrollToSection = (id) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const el = container.querySelector(`#${id}`);
    if (el) {
      container.scrollTo({
        top: el.offsetTop - 24,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const handleCopyToken = (tokName) => {
    setCopiedToken(tokName);
    navigator.clipboard.writeText(tokName);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const filteredMissions = MISSIONS.filter((m) => {
    if (categoryFilter === 'all') return true;
    return m.tagCategory === categoryFilter;
  });

  // ═══════════════════════════════════════════════
  // LANDING PAGE VIEW (All Case Studies)
  // ═══════════════════════════════════════════════
  if (!activeMission) {
    return (
      <div className="h-full bg-[#F5F5F7] text-[#1D1D1F] select-text flex flex-col overflow-y-auto" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif' }}>
        {/* Header Section */}
        <div className="px-6 sm:px-10 lg:px-16 pt-10 pb-4 max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
              <span className="text-[11px] font-mono font-extrabold text-[#007AFF] uppercase tracking-[0.18em] bg-[#007AFF]/10 px-3.5 py-1 rounded-full border border-[#007AFF]/20 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                UX CASE STUDY PORTFOLIO
              </span>
              <span className="text-[11px] font-mono text-[#86868B] bg-white px-3 py-1 rounded-full border border-black/[0.04] shadow-xs">
                3 Production Systems · 100% Shipped Work
              </span>
            </div>

            <h1 className="text-[34px] sm:text-[46px] font-bold tracking-tight text-[#1D1D1F] leading-tight">
              Case Studies
            </h1>
            <p className="text-[15px] text-[#86868B] mt-2 max-w-2xl leading-relaxed">
              End-to-end product design work across B2B SaaS, Commercial Banking Fintech, and Conversational AI — grounded in qualitative user research, design systems, and business impact.
            </p>
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-2 mt-6 overflow-x-auto pb-1"
          >
            {[
              { id: 'all', label: 'All Projects', count: 3 },
              { id: 'saas', label: 'B2B SaaS', count: 1 },
              { id: 'fintech', label: 'Fintech Payments', count: 1 },
              { id: 'ai', label: 'AI Conversational UX', count: 1 },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-[12.5px] font-mono font-bold transition-all cursor-pointer whitespace-nowrap border ${
                  categoryFilter === cat.id
                    ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-sm'
                    : 'bg-white text-[#6E6E73] hover:text-[#1D1D1F] border-black/[0.06] hover:bg-[#E8E8ED]/60'
                }`}
              >
                {cat.label} <span className="opacity-60 ml-1 text-[11px]">({cat.count})</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Case Study Cards */}
        <div className="px-6 sm:px-10 lg:px-16 pb-16 flex-1 max-w-7xl mx-auto w-full space-y-6">
          {/* Featured Lead Hero Banner (Revlitix SaaS) */}
          {(categoryFilter === 'all' || categoryFilter === 'saas') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div 
                onClick={() => {
                  setActiveMission('revlitix-saas');
                  setActiveSection('sec-hero');
                }}
                className="bg-white rounded-3xl border border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_48px_rgba(0,122,255,0.15)] transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col lg:flex-row"
              >
                {/* Image Showcase */}
                <div className="relative w-full lg:w-3/5 aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-950 min-h-[300px]">
                  <img
                    src="/assets/revlitix_saas_hero_ultra.jpg"
                    alt="Revlitix SaaS"
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-[#007AFF] text-white font-mono font-black text-xs flex items-center justify-center shadow-md">
                      01
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#007AFF] font-mono text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                      ★ FEATURED CASE STUDY
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
                    <span className="text-[10.5px] font-mono font-bold text-white uppercase">OPERATIONAL · 2022-2025</span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-6 sm:p-8 lg:w-2/5 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-[#007AFF] uppercase tracking-widest">
                        B2B SaaS · Revenue Intelligence
                      </span>
                      <span className="text-[11px] font-mono text-[#86868B] bg-[#F5F5F7] px-2.5 py-0.5 rounded-full font-medium">
                        8 min read
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight group-hover:text-[#007AFF] transition-colors">
                      REVLITIX
                    </h2>

                    <p className="text-[14px] text-[#6E6E73] leading-relaxed">
                      Redesigning an AI-powered Revenue Intelligence platform to unify GTM data from 50+ tools into a single source of truth. Reduced time-to-insight from 5–6 clicks to 2 steps.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-[#F5F5F7] p-3 rounded-2xl border border-black/[0.02]">
                      <span className="text-xl font-bold text-[#007AFF] block">2 steps</span>
                      <span className="text-[11px] text-[#86868B] font-mono">Time to Insight</span>
                    </div>
                    <div className="bg-[#F5F5F7] p-3 rounded-2xl border border-black/[0.02]">
                      <span className="text-xl font-bold text-[#34C759] block">15–18%</span>
                      <span className="text-[11px] text-[#86868B] font-mono">AI Engagement</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="w-full py-3 rounded-xl bg-[#007AFF] text-white text-xs font-mono font-bold uppercase flex items-center justify-center gap-2 group-hover:bg-blue-700 transition-colors shadow-sm">
                      <span>Explore Revlitix Case Study</span>
                      <span className="text-sm font-normal group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Grid Cards (Move Money & Sonic AI) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMissions
              .filter((m) => !(categoryFilter === 'all' && m.id === 'revlitix-saas'))
              .map((m, idx) => (
                <motion.button
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  onClick={() => {
                    setActiveMission(m.id);
                    setActiveSection('sec-hero');
                  }}
                  className="text-left bg-white rounded-3xl border border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden cursor-pointer group outline-none flex flex-col"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={m.heroImage}
                      alt={m.title}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-500 block"
                      onError={(e) => {
                        if (m.mockups && m.mockups[0]) e.target.src = m.mockups[0];
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                    <div className="absolute top-3 left-3 w-8 h-8 rounded-xl flex items-center justify-center text-[12px] font-mono font-black text-white shadow-md z-10" style={{ background: m.accentColor }}>
                      {m.num}
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 z-10">
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: m.statusColor }} />
                      <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">{m.status}</span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10.5px] font-mono font-extrabold uppercase tracking-[0.14em]" style={{ color: m.accentColor }}>
                          {m.category}
                        </span>
                        <span className="text-[10.5px] font-mono text-[#86868B] bg-[#F5F5F7] px-2.5 py-0.5 rounded-full font-medium">
                          {m.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#1D1D1F] tracking-tight group-hover:text-[#007AFF] transition-colors">
                        {m.title}
                      </h3>

                      <p className="text-[13px] text-[#6E6E73] leading-relaxed">
                        {m.desc}
                      </p>
                    </div>

                    {m.heroMetrics && (
                      <div className="grid grid-cols-2 gap-2.5 pt-2">
                        {m.heroMetrics.slice(0, 2).map((metric, i) => (
                          <div key={i} className="bg-[#F5F5F7] p-2.5 rounded-xl border border-black/[0.02]">
                            <span className="text-[15px] font-bold block" style={{ color: m.accentColor }}>{metric.val}</span>
                            <span className="text-[10px] text-[#86868B] font-mono truncate block">{metric.lbl}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-[#1D1D1F] group-hover:text-[#007AFF] transition-colors">
                      <span>VIEW CASE STUDY</span>
                      <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </motion.button>
              ))}
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════
  // DETAILED EDITORIAL CASE STUDY VIEW
  // ═══════════════════════════════════════════════
  return (
    <div className="h-full bg-[#F5F5F7] text-[#1D1D1F] select-text flex flex-col relative text-[16px] leading-[1.8] overflow-hidden" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif' }}>
      
      {/* APPLE STICKY TOP COMMAND BAR */}
      <header className="h-16 px-4 sm:px-8 bg-white/80 backdrop-blur-xl border-b border-black/[0.05] flex items-center justify-between z-50 flex-shrink-0 shadow-xs">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => {
              setActiveMission(null);
              setScrollProgress(0);
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[12.5px] font-mono font-bold text-[#1D1D1F] transition-all cursor-pointer border border-black/[0.04]"
          >
            <ArrowLeft className="w-4 h-4 text-[#007AFF]" />
            <span>All Studies</span>
          </button>

          <div className="h-5 w-px bg-black/10 hidden sm:block" />

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-2 text-[12.5px] font-mono text-[#86868B]">
            <span>Portfolio</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-bold text-[#1D1D1F]">{selectedProject.title}</span>
          </div>
        </div>

        {/* Dynamic Header Controls & Share */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F7] border border-black/[0.04] text-[11.5px] font-mono font-bold text-[#6E6E73]">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: selectedProject.accentColor }} />
            <span>{NAV_CHIPS.find(n => n.id === activeSection)?.label || '01 / Overview'}</span>
          </div>

          <button
            onClick={() => handleCopyToken(`${selectedProject.title} Case Study — Praveen Kumar`)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#007AFF]/10 hover:bg-[#007AFF]/20 text-[#007AFF] border border-[#007AFF]/20 text-[11.5px] font-mono font-bold transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedToken ? '✓ Copied!' : 'Share'}</span>
          </button>
        </div>
      </header>

      {/* READING PROGRESS BAR */}
      <div className="h-1 bg-[#E8E8ED] w-full relative overflow-hidden z-50">
        <div 
          className="h-full transition-all duration-150 ease-out rounded-r-full shadow-xs"
          style={{ width: `${scrollProgress}%`, background: selectedProject.accentColor }}
        />
      </div>

      {/* CORE EDITORIAL SPLIT-VIEW CONTAINER */}
      <div className="flex-grow flex h-[calc(100%-4.25rem)] overflow-hidden relative">
        
        {/* LEFT SIDEBAR: STICKY INDEX */}
        <aside className="hidden lg:flex w-72 border-r border-black/[0.05] bg-white flex-col h-full flex-shrink-0">
          <div className="p-4 border-b border-black/[0.04] bg-[#F5F5F7]/60 flex items-center justify-between">
            <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#86868B]">Index</span>
            <span className="text-[10px] font-mono text-[#007AFF] font-bold bg-[#007AFF]/10 px-2 py-0.5 rounded-full">
              {NAV_CHIPS.length} SECTIONS
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {NAV_CHIPS.map((chip) => {
              const isActive = activeSection === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => scrollToSection(chip.id)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer border ${
                    isActive
                      ? 'bg-[#007AFF]/10 border-[#007AFF]/30 text-[#007AFF] font-bold shadow-xs'
                      : 'bg-white border-transparent hover:bg-[#F5F5F7] text-[#6E6E73]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className={`text-[10px] font-mono font-extrabold w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive ? 'bg-[#007AFF] text-white' : 'bg-[#F5F5F7] text-[#86868B]'
                    }`}>
                      {chip.label.split(' / ')[0]}
                    </span>
                    <span className="text-[12.5px] truncate">
                      {chip.label.split(' / ')[1]}
                    </span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF] shadow-xs" />
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* MAIN EDITORIAL SCROLLABLE CANVAS */}
        <main 
          className="flex-1 h-full overflow-y-auto p-4 sm:p-8 lg:p-12 space-y-12 bg-[#F5F5F7] scroll-smooth" 
          ref={scrollContainerRef}
        >
          <div className="max-w-4xl mx-auto w-full space-y-12 pb-32">
            
            {/* 01. HERO OVERVIEW SECTION */}
            <section id="sec-hero" className="space-y-6">
              {/* Category & Title */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-[#007AFF] bg-[#007AFF]/10 px-3 py-1 rounded-full border border-[#007AFF]/20">
                    {selectedProject.category}
                  </span>
                  <span className="text-[11px] font-mono text-[#86868B] bg-white px-3 py-1 rounded-full border border-black/[0.04]">
                    {selectedProject.year}
                  </span>
                </div>

                <h1 className="text-[36px] sm:text-[48px] font-bold text-[#1D1D1F] tracking-tight leading-[1.15]">
                  {selectedProject.title}
                </h1>
                <p className="text-[18px] text-[#6E6E73] leading-relaxed font-normal">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* Widescreen Hero Image Showcase */}
              <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden bg-slate-950 shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-black/[0.05]">
                <img
                  src={selectedProject.heroImage}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-top block"
                  onError={(e) => {
                    if (selectedProject.mockups && selectedProject.mockups[0]) e.target.src = selectedProject.mockups[0];
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <button
                  onClick={() => setZoomImage({ src: selectedProject.heroImage, caption: `${selectedProject.title} — Main Showcase` })}
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md hover:bg-white text-[#1D1D1F] px-4 py-2 rounded-full text-xs font-mono font-bold flex items-center gap-2 shadow-md cursor-pointer transition-all"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#007AFF]" />
                  <span>Enlarge Showcase</span>
                </button>
              </div>

              {/* Role & Metadata Card Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-5 rounded-2xl border border-black/[0.04] shadow-xs">
                <div>
                  <span className="text-[10px] font-mono text-[#86868B] uppercase block">Role</span>
                  <span className="text-[13px] font-bold text-[#1D1D1F] block mt-0.5">{selectedProject.role}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#86868B] uppercase block">Duration</span>
                  <span className="text-[13px] font-bold text-[#1D1D1F] block mt-0.5">{selectedProject.duration}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#86868B] uppercase block">Team</span>
                  <span className="text-[13px] font-bold text-[#1D1D1F] block mt-0.5">{selectedProject.team}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#86868B] uppercase block">Status</span>
                  <span className="text-[13px] font-bold text-[#34C759] block mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] animate-pulse" />
                    {selectedProject.status}
                  </span>
                </div>
              </div>

              {/* 4 KPI Impact Cards Grid */}
              {selectedProject.heroMetrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {selectedProject.heroMetrics.map((m, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-black/[0.04] shadow-xs space-y-1">
                      <span className="text-2xl sm:text-3xl font-bold block tracking-tight" style={{ color: m.color || selectedProject.accentColor }}>
                        {m.val}
                      </span>
                      <span className="text-[12px] font-bold text-[#1D1D1F] block">{m.lbl}</span>
                      <span className="text-[11px] text-[#86868B] block leading-snug">{m.detail}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 02. EXECUTIVE SUMMARY SECTION */}
            <section id="sec-overview" className="bg-white p-8 sm:p-10 rounded-3xl border border-black/[0.05] shadow-xs space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-[#007AFF] text-white font-mono font-bold text-xs flex items-center justify-center">02</span>
                <h2 className="text-xl font-bold text-[#1D1D1F]">Executive Summary</h2>
              </div>

              <div className="text-[15px] text-[#334155] leading-relaxed space-y-4 font-normal">
                {selectedProject.execSummary.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Pull Quote */}
              {selectedProject.pullQuote && (
                <div className="p-6 rounded-2xl bg-[#007AFF]/5 border border-[#007AFF]/15 text-[#007AFF] font-bold italic text-[17px] leading-relaxed">
                  {selectedProject.pullQuote}
                </div>
              )}

              {/* Executive Metrics Table */}
              {selectedProject.execMetricsTable && (
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left text-[13px] border-collapse">
                    <thead>
                      <tr className="border-b border-black/[0.08] text-[#86868B] font-mono uppercase text-[10px]">
                        <th className="pb-3 font-bold">Metric / Impact Area</th>
                        <th className="pb-3 font-bold">Before</th>
                        <th className="pb-3 font-bold">After (Redesign)</th>
                        <th className="pb-3 font-bold">Outcome</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.04]">
                      {selectedProject.execMetricsTable.map((row, i) => (
                        <tr key={i} className="hover:bg-[#F5F5F7] transition-colors">
                          <td className="py-3 font-bold text-[#1D1D1F]">{row.label}</td>
                          <td className="py-3 text-[#86868B] font-mono">{row.old}</td>
                          <td className="py-3 text-[#007AFF] font-mono font-bold">{row.new}</td>
                          <td className="py-3 text-[#34C759] font-semibold">{row.growth}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* 03. THE PROBLEM SECTION */}
            {selectedProject.challenge && (
              <section id="sec-problem" className="bg-white p-8 sm:p-10 rounded-3xl border border-black/[0.05] shadow-xs space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-[#FF9F0A] text-white font-mono font-bold text-xs flex items-center justify-center">03</span>
                  <h2 className="text-xl font-bold text-[#1D1D1F]">The Problem & Challenge</h2>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[#1D1D1F]">{selectedProject.challenge.title}</h3>
                  <p className="text-[14px] text-[#6E6E73]">{selectedProject.challenge.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {selectedProject.challenge.cards.map((c, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-[#FF9F0A]/5 border border-[#FF9F0A]/20 space-y-3">
                      <span className="text-xs font-mono font-bold text-[#FF9F0A] uppercase">{c.num} / Challenge</span>
                      <h4 className="text-sm font-bold text-[#1D1D1F]">{c.title}</h4>
                      <p className="text-[13px] text-[#6E6E73] leading-relaxed">{c.desc}</p>
                      {c.evidence && (
                        <div className="text-[11.5px] italic text-[#FF9F0A] font-medium border-t border-[#FF9F0A]/10 pt-2">
                          "{c.evidence}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 04. SUCCESS METRICS SECTION */}
            {selectedProject.metrics && (
              <section id="sec-metrics" className="bg-white p-8 sm:p-10 rounded-3xl border border-black/[0.05] shadow-xs space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-[#34C759] text-white font-mono font-bold text-xs flex items-center justify-center">04</span>
                  <h2 className="text-xl font-bold text-[#1D1D1F]">Success Metrics</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedProject.metrics.map((m, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-[#F5F5F7] border border-black/[0.03] space-y-2">
                      <span className="text-2xl font-bold block" style={{ color: m.trackColor }}>{m.val}</span>
                      <span className="text-sm font-bold text-[#1D1D1F] block">{m.label}</span>
                      <span className="text-[12px] text-[#86868B] block font-mono">{m.change}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 05. DESIGN PRINCIPLES SECTION */}
            {selectedProject.principles && (
              <section id="sec-principles" className="bg-white p-8 sm:p-10 rounded-3xl border border-black/[0.05] shadow-xs space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-[#AF52DE] text-white font-mono font-bold text-xs flex items-center justify-center">05</span>
                  <h2 className="text-xl font-bold text-[#1D1D1F]">Design Principles</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {selectedProject.principles.map((p, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-[#F5F5F7] border border-black/[0.03] space-y-2">
                      <span className="text-xs font-mono font-bold text-[#AF52DE]">{p.num}</span>
                      <h4 className="text-sm font-bold text-[#1D1D1F]">{p.title}</h4>
                      <p className="text-[13px] text-[#6E6E73] leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 06. GALLERY & MOCKUPS SECTION */}
            {selectedProject.mockups && (
              <section id="sec-hifi" className="bg-white p-8 sm:p-10 rounded-3xl border border-black/[0.05] shadow-xs space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-[#007AFF] text-white font-mono font-bold text-xs flex items-center justify-center">06</span>
                    <h2 className="text-xl font-bold text-[#1D1D1F]">Design Showcase & Gallery</h2>
                  </div>
                  <span className="text-[11px] font-mono text-[#86868B]">{selectedProject.mockups.length} Screens</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedProject.mockups.map((img, i) => (
                    <div 
                      key={i} 
                      onClick={() => setZoomImage({ src: img, caption: `${selectedProject.title} — Screen ${i + 1}` })}
                      className="group relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-black/[0.06] cursor-pointer shadow-xs hover:shadow-md transition-all"
                    >
                      <img src={img} alt={`Screen ${i+1}`} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 block" />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/90 text-[#1D1D1F] px-3 py-1.5 rounded-full text-xs font-mono font-bold shadow-md flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5 text-[#007AFF]" />
                          Enlarge Screen
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 07. RETROSPECTIVE SECTION */}
            {selectedProject.retrospective && (
              <section id="sec-lessons" className="bg-white p-8 sm:p-10 rounded-3xl border border-black/[0.05] shadow-xs space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-[#34C759] text-white font-mono font-bold text-xs flex items-center justify-center">07</span>
                  <h2 className="text-xl font-bold text-[#1D1D1F]">Retrospective & Takeaways</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedProject.retrospective.learned && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono font-bold text-[#34C759] uppercase tracking-wider">What Worked Well</h4>
                      {selectedProject.retrospective.learned.map((item, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-[#34C759]/5 border border-[#34C759]/20 space-y-1">
                          <span className="text-xs font-bold text-[#1D1D1F] block">{item.title}</span>
                          <span className="text-[13px] text-[#6E6E73] block">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedProject.retrospective.mistakes && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono font-bold text-[#FF9F0A] uppercase tracking-wider">Lessons Learned</h4>
                      {selectedProject.retrospective.mistakes.map((item, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-[#FF9F0A]/5 border border-[#FF9F0A]/20 space-y-1">
                          <span className="text-xs font-bold text-[#1D1D1F] block">{item.title}</span>
                          <span className="text-[13px] text-[#6E6E73] block">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

          </div>
        </main>
      </div>

      {/* FLOATING APPLE DOCK PROJECT SWITCHER */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 select-none">
        <div className="bg-white/90 backdrop-blur-2xl px-3 py-2 rounded-full border border-black/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex items-center gap-1.5">
          {MISSIONS.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setActiveMission(m.id);
                setActiveSection('sec-hero');
                if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
              }}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeMission === m.id
                  ? 'bg-[#1D1D1F] text-white shadow-sm'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: m.accentColor }} />
              <span>{m.num} {m.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* LIGHTBOX ZOOM MODAL */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setZoomImage(null)}
          >
            <div 
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/20 bg-slate-950 shadow-2xl p-3"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomImage(null)}
                className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white font-bold text-[16px] flex items-center justify-center border border-white/30 transition-all cursor-pointer"
              >
                ×
              </button>

              <div className="absolute top-4 left-4 z-50 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/80 font-mono text-[10px] font-bold border border-white/10">ESC</span>
                <span className="text-white/60 font-mono text-[11px]">to close</span>
              </div>

              <div className="w-full overflow-auto max-h-[82vh] flex items-center justify-center p-2">
                <img 
                  src={zoomImage.src} 
                  alt="Zoom View" 
                  className="max-w-full h-auto object-contain rounded-xl shadow-2xl"
                />
              </div>

              {zoomImage.caption && (
                <div className="w-full p-3 bg-slate-900 border-t border-white/10 text-center font-mono text-[12.5px] text-white/80 font-bold">
                  {zoomImage.caption}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default MissionControlApp;
