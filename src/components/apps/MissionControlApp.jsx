import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, FileText, CheckCircle2, AlertCircle, Gauge, Lightbulb, 
  HelpCircle, Compass, Layers, Shield, TrendingUp, Award, Box, Monitor, Sparkles
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
    statusColor: '#10B981',
    latency: '34ms',
    accentColor: '#4F46E5',
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
      { type: 'ai', text: 'Pipeline risk detected: 3 deals need attention', tag: 'AI Insight', color: '#EF4444' },
      { type: 'metric', text: 'Revenue ↑12% vs. last quarter', tag: 'Quarterly Growth', color: '#10B981' },
      { type: 'kpi', text: '$2.4M pipeline coverage', tag: 'Coverage Ratio', color: '#4F46E5' },
      { type: 'forecast', text: '92% forecast accuracy', tag: 'AI Model Score', color: '#7C3AED' }
    ],

    heroMetrics: [
      { val: '2 steps', lbl: 'Time to Insight', detail: 'Cut from 5–6 clicks (roughly halved)' },
      { val: '15–18%', lbl: 'AI Engagement', detail: 'Rose from under 5% of weekly active sessions' },
      { val: '↓25%', lbl: 'Support Tickets', detail: 'Reduced by roughly a quarter' },
      { val: '3.9 / 5', lbl: 'User Confidence', detail: 'Improved from ~2.8 baseline trust score' }
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
          title: 'No Path from Data to Action',
          desc: 'Users had numbers but no clear next steps. AI Insights existed to solve this but were buried in an isolated tab, rarely discovered.',
          evidence: 'Joe Glenn: We spend 10-15 hours a week firefighting old problems.'
        }
      ]
    },

    research: {
      insights4: [
        {
          num: '01',
          title: "Consolidate the workflow; don't decorate the tabs.",
          text: 'Users think in terms of business questions ("Why did APAC pipeline dip?"), not in terms of feature modules. The IA was built around our database model, not the user\'s questions.',
          metric: '10 of 12 participants'
        },
        {
          num: '02',
          title: 'AI as an analyst, not a filing cabinet.',
          text: 'Users manually re-calculated conclusions the AI engine had already computed, simply because the AI tab wasn\'t in their daily workflow paths.',
          metric: '0.3% click-through rate'
        },
        {
          num: '03',
          title: 'A number without context is not an answer.',
          text: 'Seeing a raw metric created anxiety. Users immediately asked "Is that good?" or "Compared to what?". Contextual benchmarks are required to build trust.',
          metric: 'North star bottleneck'
        },
        {
          num: '04',
          title: 'Customization was a false user desire.',
          text: 'We assumed users wanted custom dashboards. Discovery disproved this: users avoided configuration because it was another task. They wanted opinionated defaults.',
          metric: 'Killed Custom Builder'
        }
      ]
    },

    fourReframes: [
      {
        num: '01',
        from: 'Start with module navigation',
        to: 'Start with business question'
      },
      {
        num: '02',
        from: 'AI insights in dedicated tab',
        to: 'AI insights in primary viewport'
      },
      {
        num: '03',
        from: 'Raw numbers without comparison',
        to: 'Context and trend attached by default'
      },
      {
        num: '04',
        from: 'One-off visual styles per module',
        to: 'Standardized layout tokens & cards'
      }
    ],

    top4HMWExpanded: [
      {
        num: 'HMW #1',
        q: 'How might we consolidate workflows into a single decision-centric view?',
        desc: 'Addressed the 5-click baseline for cross-module answers.'
      },
      {
        num: 'HMW #2',
        q: 'How might we make AI insights impossible to ignore?',
        desc: 'Moved AI Insights to the default home screen viewport hero header.'
      },
      {
        num: 'HMW #3',
        q: 'How might we simplify navigation for all while keeping power workflows?',
        desc: 'Designed a flattened IA with progressive disclosure drill-downs.'
      },
      {
        num: 'HMW #4',
        q: 'How might we build data trust at first glance?',
        desc: 'Attached comparisons, deltas, and benchmarks to every single metric card.'
      }
    ],

    sixPrinciples: [
      {
        num: '01',
        title: 'One view, one answer',
        desc: 'Any task requiring cross-referencing more than one screen is considered a design failure, not a feature gap.'
      },
      {
        num: '02',
        title: 'AI up front, not bolted on',
        desc: 'AI-derived insights load in the primary viewport by default; they are never an opt-in tab.'
      },
      {
        num: '03',
        title: 'Context by default, not on request',
        desc: 'Every metric must ship with a comparison (delta, trend, or benchmark) — a bare number is incomplete.'
      },
      {
        num: '04',
        title: 'Reusable over unique',
        desc: 'New UI is only justified if the existing component library cannot solve the problem; keeps component reuse at 90%.'
      }
    ],

    ideation: {
      sketches: 'Brainstormed over 30 layout variations before converging on a fixed, opinionated "answer card" layout.',
      rejected: [
        { title: 'Custom dashboard builder', reason: 'Power user feature that reintroduced the configuration burden we sought to solve.' },
        { title: 'Natural-language query bar', reason: 'Exciting but natural language processing reliability wasn\'t sufficient for our initial launch timeline.' },
        { title: 'Separate executive dashboard', reason: 'Risked creating two fragmented products and conflicting version truths.' }
      ]
    },

    infoArchitecture: [
      { node: 'Decision-Centric Home', desc: 'Surfaces AI Insights by default at the top of the viewport.' },
      { node: 'Answer a Question templates', desc: 'Maps directly to Performance, Attribution, and Forecasting entry points.' },
      { node: 'Consolidated Answer View', desc: 'Joins spend and pipeline data in one table with inline AI text.' }
    ],

    wireframeSpecs: [
      { title: 'V1 Out-of-Path AI Panel', desc: 'Treated AI Insights as a secondary sidebar panel (Rejected: users skipped it out of habit).' },
      { title: 'V2 Flattened Storyboard', desc: 'Primary viewport hero header dedicated to AI insights (Approved: drove 3x engagement).' }
    ],

    designSystem: {
      tokens: [
        { name: '--color-bg-primary', hex: '#F8FAFC', label: 'Canvas Background' },
        { name: '--color-accent-indigo', hex: '#4F46E5', label: 'Primary Brand Indigo' },
        { name: '--color-accent-violet', hex: '#7C3AED', label: 'Secondary Violet' },
        { name: '--color-success', hex: '#10B981', label: 'Positive Growth Emerald' },
        { name: '--color-warning', hex: '#F59E0B', label: 'Anomaly Alert Amber' }
      ]
    },

    edgeCases: [
      { title: 'Loading State', behavior: 'Skeleton screens matching the exact final layout to prevent content layout shifts.' },
      { title: 'Error State', behavior: 'Specific, actionable error copy explaining what broke instead of a generic failure toast.' },
      { title: 'Empty State', behavior: 'Clear call-to-action to adjust the date range (the most common cause of false "no data" reads).' }
    ],

    accessibilityAudit: [
      { criteria: 'Keyboard Navigation', result: 'End-to-end focus trapping and visible rings meeting WCAG AA requirements.' },
      { criteria: 'Screen Reader Support', result: 'Hidden tabular data elements for screen reader chart output.' },
      { criteria: 'Color Contrast', result: 'All text WCAG AA compliant. Primary metrics meet AAA ratio (7:1+).' }
    ],

    crossFunctional: [
      { team: 'Engineering', action: 'Collaborated on server-side data joining to support real-time unified dashboard loading.' },
      { team: 'Enterprise Accounts', action: 'Co-designed a "power user" filter view to protect their existing workflow within the flattened IA.' }
    ],

    businessImpact: [
      { val: '↓73%', lbl: 'Time to Insight', desc: 'Dropped from 45+ minutes to 12 minutes.' },
      { val: '↑300%', lbl: 'AI Engagement', desc: 'Insights per session increased 3x (0.3 to 2.1).' },
      { val: '↓40%', lbl: 'Support Tickets', desc: 'Navigation-related support tickets reduced by 40%.' },
      { val: '↑200%', lbl: 'User Confidence', desc: 'Measured confidence rating improved 2x (post-task 1-5 scale).' }
    ],

    lessonsLearned: [
      { num: '01', title: 'Address key definition alignment early', desc: 'Different teams had different metrics definitions. I should have pushed for a shared glossary feature from day one.' },
      { num: '02', title: 'Integrate accessibility into first-sprint constraints', desc: 'We treated accessibility as a late-stage audit check instead of designing it as a hard layout constraint from day one.' },
      { num: '03', title: 'Engage key enterprise clients before wireframing', desc: 'We redesigned the IA before checking with old power clients, resulting in intense pushback that required retrofitted designs.' }
    ]
  },
{
    id: 'move-money',
    num: '02',
    title: 'Move Money Platform',
    subtitle: 'Unified Enterprise Payment Rails Engine for High-Velocity Commercial Banking',
    desc: 'Unified enterprise payment rails engine streamlining ACH, Fedwire, RTP, and FedNow instant settlements.',
    company: 'Fintech Treasury Corp',
    product: 'Enterprise Move Money Checkout & Ledger Engine',
    category: 'Fintech Payments',
    role: 'Lead Product Designer',
    duration: '8 months (Q3 2024 – Q1 2025)',
    year: '2024–2025',
    team: '1 PM, 1 Lead Designer (Me), 4 Senior Full-Stack Engineers, 1 Compliance Officer',
    platforms: 'Desktop Web App, Responsive Tablet, Figma Token Engine',
    responsibilities: 'Product Strategy, Discovery Research, Information Architecture, Token System, Wireframing, Handoff & Design QA',
    status: 'OPERATIONAL',
    statusColor: '#10B981',
    latency: '42ms',
    accentColor: '#10B981',
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
      { val: '↓40%', lbl: 'Task Completion Time', detail: '4.2m → 2.5m via smart payee auto-fill' },
      { val: '↑27%', lbl: 'CSAT Satisfaction', detail: 'Increased user satisfaction from 68% to 95%' },
      { val: '↑19%', lbl: 'Instant Rail Adoption', detail: 'Shifted payout volume to FedNow & RTP' },
      { val: '↓65%', lbl: 'Support Ticket Volume', detail: 'Eliminated manual SWIFT entry routing errors' }
    ],

    execSummary: `Fintech Treasury Corp processes over $5.7B in annual commercial payments across North America. Before this initiative, commercial treasury customers were forced to navigate 7 disconnected legacy banking portals with separate authentication keys, fragmented settlement ledgers, and zero real-time visibility into modern instant payment rails (FedNow and RTP).\n\nAs Lead Product Designer, I spearheaded the complete end-to-end UX strategy, information architecture, and design system tokenization for a unified checkout engine. I collaborated directly with 4 senior engineers, 1 product manager, and 1 compliance risk officer over an 8-month design sprint.`,

    challenges: [
      { id: '1', title: 'Fragmented Portal Chaos', desc: 'Corporate treasurers had to use different UI paradigms for ACH vs Wire.' },
      { id: '2', title: 'High Error Rates', desc: 'Manual account entry led to a 12% failed transaction rate in QA audits.' },
      { id: '3', title: 'Zero Real-Time Tracking', desc: 'Users had no visual ledger for RTP or FedNow settlement statuses.' }
    ],

    solutionMetrics: [
      { label: 'Platform Consolidations', old: '7 Portals', new: '1 Unified Core', growth: '+100%' },
      { label: 'Payment Velocity', old: 'T+2 Days', new: 'Instant RTP', growth: '48hr diff' },
      { label: 'Failed Transfers', old: '12% Failure', new: '0.01% Error', growth: '99% Drop' }
    ],

    researchMethods: [
      { method: 'Contextual Inquiry', desc: 'Observed 8 Treasury Managers routing live payments.' },
      { method: 'Card Sorting', desc: 'Optimized the payment rail selector IA.' }
    ],

    researchInsights: [
      { text: 'Users don’t care about rails (ACH/Wire) — they care about SPEED and COST.', metric: '82% of users' },
      { text: 'Security anxiety is high; users repeatedly checked balances before and after.', metric: '94% of sessions' }
    ],

    howMightWe: [
      'How might we abstract complex payment rail logic (ACH vs RTP) so users only focus on delivery dates?',
      'How might we build a defensive, highly secure UI that prevents multi-million dollar typos?'
    ],

    designPrinciples: [
      { title: 'Confidence Through Clarity', desc: 'Every transaction state must be unambiguous.' },
      { title: 'Defensive By Default', desc: 'Enforce strict validation and 2FA before commit.' },
      { title: 'Abstract The Complexity', desc: 'Hide bank routing intricacies behind plain English.' }
    ],

    ideationNotes: 'Sketched out unified ledger views and a 1-click checkout flow replacing a 5-step wizard. Focused on moving rail selection into an auto-optimized background service.',

    infoArchitecture: [
      { node: 'Dashboard', desc: 'Global ledger overview and pending approvals' },
      { node: 'Smart Checkout', desc: 'Universal payment initiation flow' },
      { node: 'Counterparties', desc: 'Verified vendor directory' }
    ],

    wireframeSpecs: [
      { title: 'V1 Grid Layout', desc: 'Initial split-pane checkout layout (Rejected due to cognitive overload)' },
      { title: 'V2 Linear Stepper', desc: 'A secure, guided 3-step checkout (Approved for high-value transactions)' }
    ],

    tokenSystem: [
      { type: 'Color Tokens', count: '48', desc: 'Strict semantic tokens mapping Status (Success/Error/Warning)' },
      { type: 'Typography', count: '6', desc: 'Monospaced fonts for numerical ledger data alignment' },
      { type: 'Elevation', count: '4', desc: 'Z-index system for modals and secure popovers' }
    ],

    accessibilityAudit: [
      { criteria: 'WCAG 2.1 Contrast', result: 'AAA Compliant (8.5:1 ratio on critical financial text)' },
      { criteria: 'Keyboard Nav', result: 'Full focus trapping on 2FA modals' }
    ],

    crossFunctional: [
      { team: 'Compliance', action: 'Approved biometric and AML warning flags in UI' },
      { team: 'Engineering', action: 'Validated real-time WebSocket state management for UI' }
    ],

    businessImpact: [
      { val: '$1.4M', lbl: 'Cost Overhead Eliminated', desc: 'Zero entry routing errors in production' },
      { val: '85%', lbl: 'Manual Work Reduced', desc: 'Automated ledger reconciliation' },
      { val: '30%', lbl: 'Workflow Velocity Lift', desc: 'Faster treasury payout executions' },
      { val: '99.99%', lbl: 'Uptime Tracking', desc: 'Real-time WebSocket telemetry' }
    ],

    lessonsLearned: [
      { num: '01', title: 'Compliance is a UX partner, not a blocker.', desc: 'Bringing legal in during wireframing saved us weeks of rework.' },
      { num: '02', title: 'Monospaced numbers are non-negotiable in fintech.', desc: 'Tabular numerals prevented misreading million-dollar values.' }
    ]
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
    category: 'AI Conversational UX',
    role: 'UI/UX Designer',
    duration: '6 months (2024)',
    year: '2024',
    team: '1 Lead Designer (Me), 1 AI Engineer, 1 Product Manager',
    platforms: 'Web App, Mobile Chat Interface',
    responsibilities: 'Conversational UX, Query Inspector UI, Auto-Chart Engine, Usability Validation',
    status: 'ONLINE',
    statusColor: '#2563EB',
    latency: '85ms',
    accentColor: '#2563EB',
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
      { val: '↓60%', lbl: 'Query Discovery Time', detail: 'Instant Natural Language search' },
      { val: '↓40%', lbl: 'SQL Support Tickets', detail: 'Reduced analyst team workload' },
      { val: '85%', lbl: 'SUS Usability Score', detail: 'Verified across 12 user trials' },
      { val: '3→0 days', lbl: 'Wait Time Reduction', detail: 'Immediate self-serve reports' }
    ],

    execSummary: `Sonic AI is an AI-powered conversational query assistant that translates natural language questions into instant automated database visualizations. Before Sonic, non-technical GTM managers had to wait 3-5 days for data analysts to write SQL queries for routine marketing reports.\n\nMy role was to design a trust-building, highly transparent AI chat interface that didn't just spit out black-box answers, but actually showed its work (the SQL) and allowed users to easily pivot and tweak the generated visualizations.`,

    challenges: [
      { id: '1', title: 'The Black Box Problem', desc: 'Users inherently distrusted AI-generated numbers without seeing the source.' },
      { id: '2', title: 'Visualization Chaos', desc: 'LLMs would pick the wrong chart type (e.g. a pie chart for 50 data points).' },
      { id: '3', title: 'Hallucination Mitigation', desc: 'Needed UI defensive states for when the AI couldn\'t find the data.' }
    ],

    solutionMetrics: [
      { label: 'Analyst Workload', old: '40hrs/wk', new: '10hrs/wk', growth: '75% Drop' },
      { label: 'Report Generation', old: '3 Days', new: '5 Seconds', growth: 'Instant' },
      { label: 'User Adoption', old: '12 Users', new: '350+ Users', growth: 'Scale' }
    ],

    researchMethods: [
      { method: 'Wizard of Oz Testing', desc: 'Simulated AI chat responses to gauge user expectations.' },
      { method: 'Heuristic Evaluation', desc: 'Benchmarked ChatGPT and Claude data analysis interfaces.' }
    ],

    researchInsights: [
      { text: 'Transparency is > accuracy. If users can verify the SQL, they trust the AI.', metric: '100% agreement' },
      { text: 'Users want to instantly pivot from a chat to a permanent dashboard widget.', metric: '75% request rate' }
    ],

    howMightWe: [
      'How might we expose the AI’s logical steps without overwhelming a non-technical user?',
      'How might we gracefully handle ambiguous questions like "How did we do last month?"'
    ],

    designPrinciples: [
      { title: 'Show Your Work', desc: 'Always provide an expandable "View SQL" toggle.' },
      { title: 'Interactive Over Static', desc: 'Generated charts must be fully interactive components, not static images.' },
      { title: 'Graceful Degradation', desc: 'If data is missing, offer partial answers and suggest clarifying prompts.' }
    ],

    ideationNotes: 'Focused heavily on the "Thinking" state of the AI. Decided to build a multi-step loading animation (Parsing Intent -> Generating SQL -> Fetching Data -> Rendering) to build trust while waiting.',

    infoArchitecture: [
      { node: 'Chat Thread', desc: 'Main conversational interface' },
      { node: 'Data Inspector', desc: 'Slide-out panel for SQL and JSON verification' },
      { node: 'Widget Library', desc: 'Saved AI-generated charts' }
    ],

    wireframeSpecs: [
      { title: 'Inline Inspector', desc: 'SQL inspector directly in the chat bubble.' },
      { title: 'Suggestive Prompts', desc: 'Floating action buttons for follow-up questions.' }
    ],

    tokenSystem: [
      { type: 'Neon Gradients', count: '3', desc: 'Used exclusively for AI "generating" active states.' },
      { type: 'Data Visualization Palette', count: '12', desc: 'Colorblind-safe categorical color scales for the charts.' },
      { type: 'Glassmorphism', count: '2', desc: 'Frosted backgrounds for floating data tooltips.' }
    ],

    accessibilityAudit: [
      { criteria: 'Screen Readers', result: 'Added ARIA live regions for AI typing text.' },
      { criteria: 'Color Contrast', result: 'Verified all 12 categorical chart colors against WCAG AA.' }
    ],

    crossFunctional: [
      { team: 'AI Engineering', action: 'Collaborated on the JSON schema the LLM needed to return to render the UI.' },
      { team: 'Data Science', action: 'Verified the accuracy of the auto-generated chart heuristics.' }
    ],

    businessImpact: [
      { val: '↓60%', lbl: 'Query Time', desc: 'Instant Natural Language' },
      { val: '↓40%', lbl: 'SQL Tickets', desc: 'Reduced analyst workload' },
      { val: '85%', lbl: 'SUS Score', desc: 'Usability validation' },
      { val: '3→0 days', lbl: 'Wait Time', desc: 'Immediate reports' }
    ],

    lessonsLearned: [
      { num: '01', title: 'Designing for AI is designing for unpredictability.', desc: 'I had to design extreme edge cases for bizarre LLM hallucinations.' },
      { num: '02', title: 'Latency is a UX opportunity.', desc: 'The 3-second LLM response time was turned into a delightful "showing work" animation.' }
    ]
  }
];


const NAV_CHIPS = [
  { id: 'sec-overview', label: '01 / Overview & Summary' },
  { id: 'sec-problem', label: '02 / The Problem' },
  { id: 'sec-metrics', label: '03 / Success Metrics' },
  { id: 'sec-research', label: '04 / Discovery Research' },
  { id: 'sec-insights', label: '05 / Research Insights' },
  { id: 'sec-prioritization', label: '06 / Prioritization' },
  { id: 'sec-principles', label: '07 / Design Principles' },
  { id: 'sec-ia', label: '08 / Information Architecture' },
  { id: 'sec-hifi', label: '09 / High-Fidelity Design' },
  { id: 'sec-polish', label: '10 / Polish & Accessibility' },
  { id: 'sec-impact', label: '11 / Business Impact' },
  { id: 'sec-lessons', label: '12 / Retrospective' }
];

const CaseStudyVideoPlayer = ({ videoUrl, poster }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const videoRef = React.useRef(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src={videoUrl}
        poster={poster}
        controls={isPlaying}
        onClick={() => {
          if (isPlaying && videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }}
        className="w-full h-full object-cover object-top outline-none"
      />
      {!isPlaying && (
        <button
          onClick={handlePlayClick}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-radial from-black/50 via-black/30 to-transparent hover:from-black/60 hover:via-black/40 transition-all duration-300 group border-none outline-none z-30 cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 duration-200 animate-play-pulse">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#0F172A" className="ml-1">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
};


const RevlitixCaseStudy = ({ selectedProject, handleCopyToken, copiedToken, onZoomImage }) => {
  return (
    <div className="space-y-20 text-slate-800 font-sans text-[15.5px] leading-[1.75]">
      
      {/* SECTION 01: OVERVIEW */}
      <motion.section 
        id="sec-overview" 
        className="space-y-8 scroll-mt-24 pt-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6 relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[12px] font-mono font-extrabold tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/20 shadow-2xs">
              REVLITIX · PRODUCT DESIGN CASE STUDY
            </span>
            <span className="text-[12px] font-mono font-semibold text-slate-400">
              2022–2025 · 12 MIN READ
            </span>
          </div>

          <h1 className="text-[34px] sm:text-[46px] lg:text-[54px] font-extrabold tracking-[-0.035em] leading-[1.12] text-slate-950">
            Consolidating Fragmented Workflows{' '}
            <span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#7C3AED] inline-block"
              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              into One Decision-Centric Experience
            </span>
          </h1>

          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-indigo-50/70 via-slate-50 to-purple-50/50 border border-slate-200/80 shadow-xs border-l-4 border-l-[#4F46E5]">
            <p className="text-[16px] sm:text-[17.5px] text-slate-800 leading-[1.7] font-normal">
              Revlitix is a go-to-market (GTM) analytics platform that unifies data from over 50 tools in a customer's tech stack — Salesforce, HubSpot, Google Analytics, and others — into real-time insights and automated reporting, so revenue teams can make decisions without manually stitching together spreadsheets.
            </p>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-950 transition-all duration-350 hover:shadow-indigo-500/10">
          <CaseStudyVideoPlayer 
            videoUrl="/assets/Revlitix.mp4" 
            title="Revlitix Platform Overview" 
            subtitle="Consolidating 50+ data sources into actionable decision views" 
          />
        </div>

        <div className="space-y-4 text-slate-700 leading-[1.75]">
          <p>
            Launched in 2022, the product grew to 12–15 customers in three years, including Azuga, Vanco, and Aware, targeting mid-sized to large businesses with $10M+ in annual recurring revenue. The user base spans marketing directors, RevOps leads, and sales leaders — a range from highly technical to entirely non-technical, which became one of the central design constraints for everything that follows.
          </p>

          <div className="bg-gradient-to-br from-white to-indigo-50/30 p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 border-l-4 border-l-[#4F46E5]">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center text-[13px]">👤</span>
              <h3 className="text-[13px] font-mono font-bold text-[#4F46E5] uppercase tracking-wider">My Role</h3>
            </div>
            <p className="text-[15px] text-slate-700">
              Senior/lead product designer, owning the end-to-end experience for the core reporting and insights surface — research, information architecture, interaction design, prototyping, usability testing, and the supporting design system — working directly with one PM and a three-person engineering pod.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl shadow-2xl space-y-5 relative overflow-hidden">
            {/* Subtle gradient orb */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-[13px] font-mono font-bold text-indigo-300 uppercase tracking-widest relative z-10">Business Goals Set at Kickoff</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-white/10 p-5 rounded-xl border border-white/10 space-y-2 hover:bg-white/15 transition-colors duration-200">
                <span className="text-[12px] font-mono text-indigo-400 font-bold block">GOAL 01</span>
                <strong className="text-[15px] text-white block">Enhance decision-making</strong>
                <p className="text-[13px] text-slate-300">Real-time, actionable insight instead of stale, manually assembled reports.</p>
              </div>
              <div className="bg-white/10 p-5 rounded-xl border border-white/10 space-y-2 hover:bg-white/15 transition-colors duration-200">
                <span className="text-[12px] font-mono text-indigo-400 font-bold block">GOAL 02</span>
                <strong className="text-[15px] text-white block">Improve efficiency</strong>
                <p className="text-[13px] text-slate-300">Automate reporting and forecasting to cut manual work.</p>
              </div>
              <div className="bg-white/10 p-5 rounded-xl border border-white/10 space-y-2 hover:bg-white/15 transition-colors duration-200">
                <span className="text-[12px] font-mono text-indigo-400 font-bold block">GOAL 03</span>
                <strong className="text-[15px] text-white block">Drive revenue growth</strong>
                <p className="text-[13px] text-slate-300">Surface revenue leaks and conversion opportunities through AI-driven analysis.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200 p-5 sm:p-6 rounded-2xl text-amber-950 text-[14.5px] shadow-sm relative overflow-hidden">
            <strong>The Tension Underneath All Three:</strong> How do you make genuinely complex, multi-source data feel simple enough for a non-technical marketing director, without dumbing it down for the RevOps lead who needs the underlying detail? That tension is the design challenge this case study works through.
          </div>
        </div>

        {/* Slide Image 1 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/1.jpg', 'Fig 1.1 — Revlitix Overview & Executive Dashboard')}
          className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50 image-card-hover cursor-pointer group relative"
        >
          <div className="relative overflow-hidden">
            <img src="/assets/revlitix_slides/1.jpg" alt="Revlitix Slide 1" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-200 flex items-center justify-center pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg transition-all duration-200 flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0">
                <span className="text-[13px]">🔍</span> Click to inspect high-res
              </span>
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold flex items-center justify-between caption-shimmer transition-all duration-300">
            <span>Fig 1.1 — Revlitix Overview & Executive Dashboard</span>
            <span className="text-[10px] text-[#4F46E5] font-mono font-bold opacity-80 group-hover:opacity-100">FULLSCREEN ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 02: THE PROBLEM */}
      <motion.section 
        id="sec-problem" 
        className="space-y-8 scroll-mt-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
          <span className="text-[11px] font-mono font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200/80 shadow-sm">
            02 // THE PROBLEM
          </span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-extrabold tracking-[-0.02em] text-slate-950 leading-[1.15]">Grounded in the People Living with It</h2>

        <p className="text-[16px] text-slate-700 leading-[1.75]">
          I started by talking to six sales and marketing leaders across customer accounts, through structured interviews and standing feedback channels. Their language did more to align the team on urgency than any ticket count could:
        </p>

        {/* Customer Quotes Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <span className="text-[48px] text-rose-300/40 absolute top-2 right-3 select-none leading-none">“</span>
            <p className="text-[14px] italic text-slate-800 relative z-10 leading-relaxed">
              "Our tech stack felt like a maze with no exit. Visibility was a myth."
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-[11px]">AR</div>
              <div>
                <strong className="text-[12.5px] font-bold text-slate-900 block leading-none">Arpit R.</strong>
                <span className="text-[10px] text-slate-500 font-mono">Head of Marketing Operations</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <span className="text-[48px] text-rose-300/40 absolute top-2 right-3 select-none leading-none">“</span>
            <p className="text-[14px] italic text-slate-800 relative z-10 leading-relaxed">
              "I ask for an analysis, and it comes to me two weeks later in four different Excel sheets. I just ignore it."
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-[11px]">JC</div>
              <div>
                <strong className="text-[12.5px] font-bold text-slate-900 block leading-none">Jeremy Collins</strong>
                <span className="text-[10px] text-slate-500 font-mono">Chief Marketing Officer</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <span className="text-[48px] text-rose-300/40 absolute top-2 right-3 select-none leading-none">“</span>
            <p className="text-[14px] italic text-slate-800 relative z-10 leading-relaxed">
              "We spend at least 10–15 hours a week just firefighting."
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-[11px]">JG</div>
              <div>
                <strong className="text-[12.5px] font-bold text-slate-900 block leading-none">Joe Glenn</strong>
                <span className="text-[10px] text-slate-500 font-mono">Director of RevOps</span>
              </div>
            </div>
          </div>
        </div>

        {/* Failure Mode Matrix Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs space-y-3">
          <div className="p-4 bg-slate-50 border-b border-slate-100">
            <strong className="text-[12px] font-mono text-slate-600 uppercase tracking-wider block">Synthesizing into Three Failure Modes</strong>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-600 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-5 font-bold">Failure mode</th>
                  <th className="py-3 px-5 font-bold">Evidence</th>
                  <th className="py-3 px-5 font-bold">Cost to the business</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-rose-50/30 transition-colors duration-150">
                  <td className="py-3.5 px-5 font-bold text-rose-600 bg-rose-50/20">Fragmented visibility across tools</td>
                  <td className="py-3.5 px-5 text-slate-500 font-mono text-[12px]">Arpit R. and others</td>
                  <td className="py-3.5 px-5 text-slate-700">Undermines the core "unify your GTM data" value prop</td>
                </tr>
                <tr className="hover:bg-rose-50/30 transition-colors duration-150">
                  <td className="py-3.5 px-5 font-bold text-rose-600 bg-rose-50/20">Reporting latency</td>
                  <td className="py-3.5 px-5 text-slate-500 font-mono text-[12px]">Jeremy Collins, Kevin Bobowski</td>
                  <td className="py-3.5 px-5 text-slate-700">Insight arrives too late to act on — a CMO ignoring a two-week-old analysis is a churn signal</td>
                </tr>
                <tr className="hover:bg-rose-50/30 transition-colors duration-150">
                  <td className="py-3.5 px-5 font-bold text-rose-600 bg-rose-50/20">No path from data to action</td>
                  <td className="py-3.5 px-5 text-slate-500 font-mono text-[12px]">Joe Glenn, Faton Gjuka</td>
                  <td className="py-3.5 px-5 text-slate-700">Users have the numbers but no way to translate them into next steps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4 text-slate-700">
          <h3 className="text-[18px] font-bold text-slate-900">Restated at Product Scale</h3>
          <p>
            Eighteen months in, the product had grown into four separate modules — Pipeline, Spend, Cohorts, and AI Insights — each shipped independently, each solving its own problem well in isolation but not together. Answering a question like <em>"why did pipeline dip in APAC this quarter?"</em> meant opening three modules, holding the numbers in your head, and doing the math yourself. The AI Insights tab, meant to be the product's core differentiator, sat isolated behind its own navigation item and was rarely opened.
          </p>

          <h3 className="text-[18px] font-bold text-slate-900 pt-2">Quantifying the Baseline Before Proposing Solutions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-rose-50/30 border border-slate-200/80 space-y-1.5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <span className="text-[11px] font-mono text-slate-500 uppercase font-bold block">AI INSIGHTS CTR</span>
              <strong className="text-[22px] font-black text-rose-600 block">&lt; 5%</strong>
              <span className="text-[12px] text-slate-500 block">of weekly active sessions</span>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-rose-50/30 border border-slate-200/80 space-y-1.5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <span className="text-[11px] font-mono text-slate-500 uppercase font-bold block">CLICKS TO ANSWER</span>
              <strong className="text-[22px] font-black text-rose-600 block">5–6 Clicks</strong>
              <span className="text-[12px] text-slate-500 block">for cross-module answers</span>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-rose-50/30 border border-slate-200/80 space-y-1.5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <span className="text-[11px] font-mono text-slate-500 uppercase font-bold block">NAVIGATION TICKETS</span>
              <strong className="text-[22px] font-black text-rose-600 block font-mono">Trending Up</strong>
              <span className="text-[12px] text-slate-500 block">over 2 consecutive quarters</span>
            </div>
          </div>
          <p className="text-[13.5px] italic text-slate-500">
            These numbers became the scorecard I'd be held accountable to later.
          </p>
        </div>

        {/* Slide Image 2 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/2.jpg', 'Fig 2.1 — Baseline Friction & Fragmented User Journey')}
          className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50 image-card-hover cursor-pointer group relative"
        >
          <div className="relative overflow-hidden">
            <img src="/assets/revlitix_slides/2.jpg" alt="Revlitix Slide 2" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-200 flex items-center justify-center pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg transition-all duration-200 flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0">
                <span className="text-[13px]">🔍</span> Click to inspect high-res
              </span>
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold flex items-center justify-between caption-shimmer transition-all duration-300">
            <span>Fig 2.1 — Baseline Friction & Fragmented User Journey</span>
            <span className="text-[10px] text-[#4F46E5] font-mono font-bold opacity-80 group-hover:opacity-100">FULLSCREEN ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 03: SUCCESS METRICS */}
      <motion.section 
        id="sec-metrics" 
        className="space-y-8 scroll-mt-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5] shadow-[0_0_8px_rgba(79,70,229,0.4)]" />
          <span className="text-[11px] font-mono font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full bg-indigo-50 text-[#4F46E5] border border-indigo-200/80 shadow-sm">
            03 // SUCCESS METRICS
          </span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-extrabold tracking-[-0.02em] text-slate-950 leading-[1.15]">Defining What "Solved" Looks Like</h2>

        <p className="text-[16px] text-slate-700 leading-[1.75]">
          Before sketching a screen, I worked with the PM and data team to define what "solved" would look like — and just as important, what we'd explicitly <em>not</em> optimize for.
        </p>

        {/* North Star Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white shadow-2xl space-y-4 relative overflow-hidden">
          {/* Decorative starfield dots */}
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
            <div className="absolute w-1 h-1 rounded-full bg-indigo-300/30 top-[15%] left-[10%]" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-indigo-300/20 top-[25%] right-[15%]" />
            <div className="absolute w-1 h-1 rounded-full bg-purple-300/25 bottom-[20%] left-[25%]" />
            <div className="absolute w-0.5 h-0.5 rounded-full bg-white/30 top-[40%] right-[30%]" />
            <div className="absolute w-1 h-1 rounded-full bg-indigo-400/20 bottom-[35%] right-[10%]" />
          </div>
          <div className="flex items-center gap-2.5 relative z-10">
            <span className="text-[18px]">⭐</span>
            <strong className="text-[12px] font-mono text-indigo-300 font-bold uppercase tracking-widest">North Star Metric</strong>
          </div>
          <h3 className="text-[28px] sm:text-[32px] font-extrabold tracking-tight relative z-10">Time-to-Insight</h3>
          <p className="text-[14.5px] text-slate-300 leading-relaxed">
            The time from opening the product to reaching a decision-ready answer. Baseline required 5–6 clicks and manual cross-referencing; the target was a single consolidated view reachable in 2 steps.
          </p>
        </div>

        {/* Supporting Metrics Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs space-y-3">
          <div className="p-4 bg-slate-50 border-b border-slate-100">
            <strong className="text-[12px] font-mono text-slate-600 uppercase tracking-wider block">Supporting Metrics & Design Levers</strong>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-600 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-5 font-bold">Metric</th>
                  <th className="py-3 px-5 font-bold">What it validates</th>
                  <th className="py-3 px-5 font-bold">Design lever</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">AI feature engagement rate</td>
                  <td className="py-3.5 px-5 text-slate-600">Whether surfacing AI earlier changes behavior, not just visibility</td>
                  <td className="py-3.5 px-5 text-[#4F46E5] font-mono text-[12px]">AI Insights moved from a buried tab to the primary viewport</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">Navigation-related support tickets</td>
                  <td className="py-3.5 px-5 text-slate-600">Whether consolidation reduces confusion rather than relocating it</td>
                  <td className="py-3.5 px-5 text-[#4F46E5] font-mono text-[12px]">Flattened IA, single decision-centric home</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">Post-task user confidence (1–5 scale)</td>
                  <td className="py-3.5 px-5 text-slate-600">Whether users trust the number they're looking at, not just whether they can find it</td>
                  <td className="py-3.5 px-5 text-[#4F46E5] font-mono text-[12px]">Contextual framing (deltas, comparisons) attached to every metric</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">Reusable component coverage</td>
                  <td className="py-3.5 px-5 text-slate-600">Whether the solution scales to future modules</td>
                  <td className="py-3.5 px-5 text-[#4F46E5] font-mono text-[12px]">Componentized "answer card" pattern</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-5 bg-gradient-to-r from-slate-50 to-slate-100/50 border border-slate-200 rounded-xl text-slate-700 text-[14.5px] shadow-xs">
          <strong>Explicit Deprioritization Guardrail:</strong> I deliberately did not set a metric for "time spent in product" — the goal was faster answers, not more engagement, and I flagged this in the project brief so the roadmap wouldn't drift toward stickiness metrics that contradicted the actual user need.
        </div>

        {/* Slide Image 3 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/3.jpg', 'Fig 3.1 — Time-to-Insight & Success Metrics Scorecard')}
          className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50 image-card-hover cursor-pointer group relative"
        >
          <div className="relative overflow-hidden">
            <img src="/assets/revlitix_slides/3.jpg" alt="Revlitix Slide 3" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-200 flex items-center justify-center pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg transition-all duration-200 flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0">
                <span className="text-[13px]">🔍</span> Click to inspect high-res
              </span>
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold flex items-center justify-between caption-shimmer transition-all duration-300">
            <span>Fig 3.1 — Time-to-Insight & Success Metrics Scorecard</span>
            <span className="text-[10px] text-[#4F46E5] font-mono font-bold opacity-80 group-hover:opacity-100">FULLSCREEN ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 04: RESEARCH */}
      <motion.section 
        id="sec-research" 
        className="space-y-8 scroll-mt-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
          <span className="text-[11px] font-mono font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200/80 shadow-sm">
            04 // RESEARCH
          </span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-extrabold tracking-[-0.02em] text-slate-950 leading-[1.15]">Contextual Inquiry & Root-Cause Audits</h2>

        <div className="space-y-4 text-slate-700">
          <p>
            <strong>Method.</strong> Structured contextual inquiry: 12 sessions with existing customers across three segments (RevOps leads, marketing analysts, GTM executives), each completing a real task from their own workflow while thinking aloud. Paired with quantitative funnel analysis of the four existing modules, a support-ticket audit (87 tickets over two quarters, tagged and clustered by root cause), and five screen recordings used to build empathy with stakeholders who hadn't sat in on research directly.
          </p>

          <div className="p-6 rounded-2xl bg-indigo-50/70 border border-indigo-150 space-y-3">
            <h3 className="text-[16px] font-bold text-indigo-950">What We Found, Versus What We Assumed Going In</h3>
            <p className="text-[15px] text-slate-800 leading-relaxed">
              Our working hypothesis at kickoff was that users wanted <em>more</em> customization — the ability to build their own dashboards. Contextual inquiry disproved this: most participants, when given the option, avoided dashboard customization because configuring a dashboard was itself a task they didn't have time for. What they wanted was a system that made the right decision-ready view the default, with zero setup.
            </p>
            <div className="p-4 bg-gradient-to-r from-white to-indigo-50/50 rounded-xl border border-indigo-200 font-medium text-indigo-900 text-[14px] shadow-sm">
              👉 <strong>Key Call:</strong> This reversed an assumption the team had been designing against for two sprints, and I made the call to kill the in-progress "custom dashboard builder" spec rather than ship something research showed people wouldn't use.
            </div>
          </div>

          <p>
            <strong>Synthesis.</strong> I ran two affinity-mapping sessions with the PM, a data analyst, and two engineers in the room — not just designers — so implementation constraints surfaced during synthesis rather than after design was "done." Notes were clustered into four themes (Fragmentation, Buried Intelligence, Cognitive Load, Trust/Confidence), each checked against both the qualitative sessions and the funnel data before being promoted to an insight.
          </p>
        </div>

        {/* Slide Image 4 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/4.jpg', 'Fig 4.1 — Contextual Inquiry & Funnel Analysis Findings')}
          className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50 image-card-hover cursor-pointer group relative"
        >
          <div className="relative overflow-hidden">
            <img src="/assets/revlitix_slides/4.jpg" alt="Revlitix Slide 4" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-200 flex items-center justify-center pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg transition-all duration-200 flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0">
                <span className="text-[13px]">🔍</span> Click to inspect high-res
              </span>
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold flex items-center justify-between caption-shimmer transition-all duration-300">
            <span>Fig 4.1 — Contextual Inquiry & Funnel Analysis Findings</span>
            <span className="text-[10px] text-[#4F46E5] font-mono font-bold opacity-80 group-hover:opacity-100">FULLSCREEN ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 05: INSIGHTS */}
      <motion.section 
        id="sec-insights" 
        className="space-y-8 scroll-mt-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
          <span className="text-[11px] font-mono font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200/80 shadow-sm">
            05 // INSIGHTS
          </span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-extrabold tracking-[-0.02em] text-slate-950 leading-[1.15]">Three Strategic Shift Principles</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 mb-1"><span className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white text-[10px] font-mono font-bold flex items-center justify-center flex-shrink-0">01</span><span className="text-[11px] font-mono text-[#4F46E5] font-bold uppercase tracking-wider">Insight</span></div>
            <h3 className="text-[18px] font-bold text-slate-900">Consolidate the workflow; don't decorate the tabs</h3>
            <p className="text-[14px] text-slate-600 leading-relaxed">
              Most research participants described their task not in terms of a module ("I go to Pipeline") but in terms of a question ("I need to know why APAC dipped"). The IA was organized around our internal data model, not around the questions users actually asked. This reframed the problem from "improve four modules" to "design one consolidated answer surface."
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 mb-1"><span className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white text-[10px] font-mono font-bold flex items-center justify-center flex-shrink-0">02</span><span className="text-[11px] font-mono text-[#4F46E5] font-bold uppercase tracking-wider">Insight</span></div>
            <h3 className="text-[18px] font-bold text-slate-900">AI should function as an analyst, not a filing cabinet</h3>
            <p className="text-[14px] text-slate-600 leading-relaxed">
              Session recordings showed users manually re-deriving conclusions the AI engine had already computed, simply because the AI tab wasn't in their path. The fix wasn't a better AI feature — it was positional: put the existing intelligence where the decision was already being made.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 mb-1"><span className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white text-[10px] font-mono font-bold flex items-center justify-center flex-shrink-0">03</span><span className="text-[11px] font-mono text-[#4F46E5] font-bold uppercase tracking-wider">Insight</span></div>
            <h3 className="text-[18px] font-bold text-slate-900">A number without context is not an answer</h3>
            <p className="text-[14px] text-slate-600 leading-relaxed">
              When shown a raw metric (e.g., "$340K"), participants' first instinct was almost always a follow-up question — "is that good?", "compared to what?" — before trusting it enough to act. Confidence, not just speed, was the actual bottleneck, which is why user confidence became a first-class metric in Section 3.
            </p>
          </div>
        </div>

        {/* Slide Image 5 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/5.jpg', 'Fig 5.1 — Core Strategic Insight Principles')}
          className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50 image-card-hover cursor-pointer group relative"
        >
          <div className="relative overflow-hidden">
            <img src="/assets/revlitix_slides/5.jpg" alt="Revlitix Slide 5" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-200 flex items-center justify-center pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg transition-all duration-200 flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0">
                <span className="text-[13px]">🔍</span> Click to inspect high-res
              </span>
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold flex items-center justify-between caption-shimmer transition-all duration-300">
            <span>Fig 5.1 — Core Strategic Insight Principles</span>
            <span className="text-[10px] text-[#4F46E5] font-mono font-bold opacity-80 group-hover:opacity-100">FULLSCREEN ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 06: PRIORITIZATION */}
      <motion.section 
        id="sec-prioritization" 
        className="space-y-8 scroll-mt-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          <span className="text-[11px] font-mono font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-sm">
            06 // PRIORITIZATION
          </span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-extrabold tracking-[-0.02em] text-slate-950 leading-[1.15]">Impact vs. Feasibility Framework</h2>

        <p className="text-[16px] text-slate-700 leading-[1.75]">
          From the insights, the team generated a dozen "How Might We" directions. I ran a structured impact-vs-feasibility exercise with engineering leads present, so feasibility scores reflected actual technical cost, not designer guesswork.
        </p>

        <div className="space-y-4">
          <h3 className="text-[16px] font-mono font-bold text-slate-900 uppercase tracking-wider">The Three Directions We Committed To</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 flex items-start gap-4">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[12px] flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <div>
                <strong className="text-[15px] text-slate-900 block font-bold">How might we consolidate workflows into a single decision-centric view?</strong>
                <p className="text-[13.5px] text-slate-600 mt-1">Highest impact, moderate feasibility (required backend data joining; engineering scoped a ~6-week path).</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 flex items-start gap-4">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[12px] flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <div>
                <strong className="text-[15px] text-slate-900 block font-bold">How might we make AI insights impossible to ignore?</strong>
                <p className="text-[13.5px] text-slate-600 mt-1">High impact, low feasibility cost (largely a layout/hierarchy change, not new AI capability).</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 flex items-start gap-4">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[12px] flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <div>
                <strong className="text-[15px] text-slate-900 block font-bold">How might we simplify navigation without removing functionality power users relied on?</strong>
                <p className="text-[13.5px] text-slate-600 mt-1">Medium-high impact, most negotiation required, since two enterprise accounts had built habits around the existing tab structure (resolved in Section 11).</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 bg-gradient-to-r from-slate-50 to-slate-100/50 border border-slate-200 rounded-xl text-slate-700 text-[14.5px] shadow-xs">
          <strong>Deprioritized, and Why:</strong> A fully customizable dashboard builder (contradicted the Section 4 finding), and a natural-language query bar (validated as a phase-2 investment once the consolidated view had a baseline to build on).
        </div>

        {/* Slide Image 6 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/6.jpg', 'Fig 6.1 — Impact vs. Feasibility Trade-Off Matrix')}
          className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50 image-card-hover cursor-pointer group relative"
        >
          <div className="relative overflow-hidden">
            <img src="/assets/revlitix_slides/6.jpg" alt="Revlitix Slide 6" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-200 flex items-center justify-center pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg transition-all duration-200 flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0">
                <span className="text-[13px]">🔍</span> Click to inspect high-res
              </span>
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold flex items-center justify-between caption-shimmer transition-all duration-300">
            <span>Fig 6.1 — Impact vs. Feasibility Trade-Off Matrix</span>
            <span className="text-[10px] text-[#4F46E5] font-mono font-bold opacity-80 group-hover:opacity-100">FULLSCREEN ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 07: DESIGN PRINCIPLES */}
      <motion.section 
        id="sec-principles" 
        className="space-y-8 scroll-mt-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
          <span className="text-[11px] font-mono font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 shadow-sm">
            07 // DESIGN PRINCIPLES
          </span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-extrabold tracking-[-0.02em] text-slate-950 leading-[1.15]">Review Criteria for Design Critiques</h2>

        <p className="text-[16px] text-slate-700 leading-[1.75]">
          Four principles, socialized with engineering and PM, used as the actual review criteria in design critique:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <span className="text-[11px] font-mono text-[#4F46E5] font-bold block">PRINCIPLE 01</span>
            <h3 className="text-[17px] font-bold text-slate-900">One view, one answer</h3>
            <p className="text-[14px] text-slate-600 leading-relaxed">
              Any task requiring cross-referencing more than one screen was treated as a design failure, not a feature gap.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <span className="text-[11px] font-mono text-[#4F46E5] font-bold block">PRINCIPLE 02</span>
            <h3 className="text-[17px] font-bold text-slate-900">AI up front, not bolted on</h3>
            <p className="text-[14px] text-slate-600 leading-relaxed">
              AI-derived insights load in the primary viewport by default; never an opt-in tab.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <span className="text-[11px] font-mono text-[#4F46E5] font-bold block">PRINCIPLE 03</span>
            <h3 className="text-[17px] font-bold text-slate-900">Context by default, not on request</h3>
            <p className="text-[14px] text-slate-600 leading-relaxed">
              Every metric ships with a comparison (delta, trend, or benchmark) — a bare number is an incomplete design.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <span className="text-[11px] font-mono text-[#4F46E5] font-bold block">PRINCIPLE 04</span>
            <h3 className="text-[17px] font-bold text-slate-900">Reusable over unique</h3>
            <p className="text-[14px] text-slate-600 leading-relaxed">
              New UI is only justified if the existing component library can't solve the problem.
            </p>
          </div>
        </div>

        {/* Slide Image 7 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/7.jpg', 'Fig 7.1 — Design Review Criteria & System Rules')}
          className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50 image-card-hover cursor-pointer group relative"
        >
          <div className="relative overflow-hidden">
            <img src="/assets/revlitix_slides/7.jpg" alt="Revlitix Slide 7" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-200 flex items-center justify-center pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg transition-all duration-200 flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0">
                <span className="text-[13px]">🔍</span> Click to inspect high-res
              </span>
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold flex items-center justify-between caption-shimmer transition-all duration-300">
            <span>Fig 7.1 — Design Review Criteria & System Rules</span>
            <span className="text-[10px] text-[#4F46E5] font-mono font-bold opacity-80 group-hover:opacity-100">FULLSCREEN ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 08: FLATTENED FLOW & IA */}
      <motion.section 
        id="sec-ia" 
        className="space-y-8 scroll-mt-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-600 shadow-[0_0_8px_rgba(71,85,105,0.4)]" />
          <span className="text-[11px] font-mono font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full bg-slate-100 text-slate-800 border border-slate-300/80 shadow-sm">
            08 // FLATTENED FLOW & IA
          </span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-extrabold tracking-[-0.02em] text-slate-950 leading-[1.15]">From Fragmented IA to a 2-Step Flow</h2>

        <div className="space-y-4 text-slate-700">
          <p>
            <strong>Information architecture.</strong> The existing IA had 28 navigation items across 4 levels, largely mirroring backend service boundaries rather than user mental models. Working with engineering on what data could realistically be joined server-side, I restructured this to roughly 15 items across 2 levels, organized around the three question types users actually asked in research (performance, attribution, forecasting) rather than data source.
          </p>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <h3 className="text-[16px] font-bold text-slate-900">Divergent Exploration, and Why Most of It Was Rejected</h3>
            <p className="text-[14.5px] text-slate-600 leading-relaxed">
              I sketched over two dozen layout variations for the consolidated view, including several dashboard-customization approaches, before converging on a fixed, opinionated "answer card" layout. Every customizable variant reintroduced the configuration burden Section 4's research had identified as the core complaint. Constraint, in this case, was the feature.
            </p>
          </div>

          <p>
            <strong>From sketch to flow.</strong> The chosen direction reduced the core journey from 5–6 steps to 2: land on the consolidated home → see the AI-flagged anomaly with context already attached. Clickable prototypes tested with 6 of the original research participants showed a clear jump in stated post-task confidence versus the existing product.
          </p>
        </div>

        {/* Slide Image 8 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/8.jpg', 'Fig 8.1 — Information Architecture & Layout Exploration')}
          className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50 image-card-hover cursor-pointer group relative"
        >
          <div className="relative overflow-hidden">
            <img src="/assets/revlitix_slides/8.jpg" alt="Revlitix Slide 8" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-200 flex items-center justify-center pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg transition-all duration-200 flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0">
                <span className="text-[13px]">🔍</span> Click to inspect high-res
              </span>
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold flex items-center justify-between caption-shimmer transition-all duration-300">
            <span>Fig 8.1 — Information Architecture & Layout Exploration</span>
            <span className="text-[10px] text-[#4F46E5] font-mono font-bold opacity-80 group-hover:opacity-100">FULLSCREEN ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 09: HIGH-FIDELITY DESIGN */}
      <motion.section 
        id="sec-hifi" 
        className="space-y-8 scroll-mt-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
          <span className="text-[11px] font-mono font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200/80 shadow-sm">
            09 // HIGH-FIDELITY DESIGN
          </span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-extrabold tracking-[-0.02em] text-slate-950 leading-[1.15]">Core Interface Screens & System Primitives</h2>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <strong className="text-[13px] font-mono text-[#4F46E5] font-bold uppercase block">Screen 1 — The Decision-Centric Home</strong>
            <p className="text-[14.5px] text-slate-700 leading-relaxed">
              AI Insights occupies the top of the default viewport rather than living behind a tab. Below it, "Answer a Question" templated entry points map directly to the three question types identified in the IA work, so the most common jobs-to-be-done are one click away.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <strong className="text-[13px] font-mono text-[#4F46E5] font-bold uppercase block">Screen 2 — The Consolidated Answer View</strong>
            <p className="text-[14.5px] text-slate-700 leading-relaxed">
              Marketing Spend and Pipeline data, previously requiring a tab switch and manual cross-referencing, are joined in a single table view with the AI-generated explanation attached inline. This required a backend data-joining effort scoped jointly with engineering — a reminder that the interaction design decision had a real infrastructure cost, and part of my job was surfacing that trade-off early rather than discovering it in development.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <strong className="text-[13px] font-mono text-[#4F46E5] font-bold uppercase block">Screen 3 — The Design System</strong>
            <p className="text-[14.5px] text-slate-700 leading-relaxed">
              Every component used across the consolidated view — metric cards, comparison pills, trend indicators — was built as a reusable atomic pattern rather than a one-off. This is what let the same "answer card" primitive support pipeline, spend, and cohort data without three separate designs.
            </p>
          </div>
        </div>

        {/* Slide Image 9 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/9.jpg', 'Fig 9.1 — High-Fidelity Decision Home & Consolidated Views')}
          className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50 image-card-hover cursor-pointer group relative"
        >
          <div className="relative overflow-hidden">
            <img src="/assets/revlitix_slides/9.jpg" alt="Revlitix Slide 9" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-200 flex items-center justify-center pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg transition-all duration-200 flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0">
                <span className="text-[13px]">🔍</span> Click to inspect high-res
              </span>
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold flex items-center justify-between caption-shimmer transition-all duration-300">
            <span>Fig 9.1 — High-Fidelity Decision Home & Consolidated Views</span>
            <span className="text-[10px] text-[#4F46E5] font-mono font-bold opacity-80 group-hover:opacity-100">FULLSCREEN ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 10: POLISH & ACCESSIBILITY */}
      <motion.section 
        id="sec-polish" 
        className="space-y-8 scroll-mt-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.4)]" />
          <span className="text-[11px] font-mono font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/80 shadow-sm">
            10 // POLISH & ACCESSIBILITY
          </span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-extrabold tracking-[-0.02em] text-slate-950 leading-[1.15]">Edge Cases, Focus States & WCAG Compliance</h2>

        <div className="space-y-4 text-slate-700">
          <p>
            <strong>Micro-interactions reinforced hierarchy, not delight for its own sake.</strong> The AI Insights card got a subtle elevation state on hover specifically because usability testing showed users weren't sure whether it was actionable or purely informational.
          </p>

          <p>
            <strong>Edge cases were designed before happy-path polish.</strong> Three states were specified for every data view: loading (skeleton screens matching the final layout, so nothing "jumps" once data resolves), error (specific, actionable copy — several support tickets in the Section 4 audit traced back to users not knowing whether an empty screen meant "no data" or "broken"), and empty-state (a clear call to action to adjust the date range, the most common cause of a false "no data" read in testing).
          </p>

          <p>
            <strong>Accessibility was validated, not assumed.</strong> The consolidated view was tested end-to-end with keyboard-only navigation (Tab/Enter) and visible focus states meeting WCAG AA contrast requirements, and checked against screen reader output for the AI Insights card specifically, since it was new to the product with no prior accessibility precedent to inherit from.
          </p>
        </div>

        {/* Slide Image 10 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/10.jpg', 'Fig 10.1 — Micro-Interactions, Edge States & WCAG AA Audit')}
          className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50 image-card-hover cursor-pointer group relative"
        >
          <div className="relative overflow-hidden">
            <img src="/assets/revlitix_slides/10.jpg" alt="Revlitix Slide 10" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-200 flex items-center justify-center pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg transition-all duration-200 flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0">
                <span className="text-[13px]">🔍</span> Click to inspect high-res
              </span>
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold flex items-center justify-between caption-shimmer transition-all duration-300">
            <span>Fig 10.1 — Micro-Interactions, Edge States & WCAG AA Audit</span>
            <span className="text-[10px] text-[#4F46E5] font-mono font-bold opacity-80 group-hover:opacity-100">FULLSCREEN ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 11: ITERATION & BUSINESS IMPACT */}
      <motion.section 
        id="sec-impact" 
        className="space-y-8 scroll-mt-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          <span className="text-[11px] font-mono font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-sm">
            11 // ITERATION & BUSINESS IMPACT
          </span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-extrabold tracking-[-0.02em] text-slate-950 leading-[1.15]">Collaboration, Pivots & Proven Results</h2>

        <div className="space-y-4 text-slate-700">
          <p>
            <strong>The pivot.</strong> Our first shipped version still treated AI Insights as a secondary panel, out of caution about overwhelming users with AI-generated content on first load. Usability testing at the four-month mark showed this caution was misplaced — users still skipped past it out of habit. Reversing course meant asking engineering to rework the primary layout after it had already shipped. I brought session recordings directly to the team rather than just summary numbers, which made the case concretely, and we committed to moving AI Insights into the primary viewport for the next release.
          </p>

          <p>
            <strong>Stakeholder friction.</strong> Two enterprise accounts had built internal reporting habits around the old four-tab structure and pushed back on the IA flattening through their account manager. Rather than overriding this, I set up a working session with those accounts, walked them through the research behind the flattening, and co-designed a "power user" filter view that preserved their workflows within the new structure — without regressing the improvement for everyone else.
          </p>

          <p>
            <strong>Cross-functional rhythm.</strong> Design reviews included the PM and at least one engineer from kickoff onward, so feasibility questions surfaced during design, not after handoff.
          </p>
        </div>

        {/* Business Impact Scorecard Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs space-y-3">
          <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50 to-emerald-100/50 border-b border-emerald-200">
            <strong className="text-[12px] font-mono text-emerald-800 uppercase tracking-wider block">Quantified Business Impact Scorecard</strong>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-5 font-bold">Metric</th>
                  <th className="py-3 px-5 font-bold">Result</th>
                  <th className="py-3 px-5 font-bold">What it demonstrates</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">Time to insight</td>
                  <td className="py-3.5 px-5 font-extrabold text-emerald-600 bg-emerald-50/30 font-mono">Cut from 5–6 clicks to 2 steps</td>
                  <td className="py-3.5 px-5 text-slate-700">Consolidation solved the core navigation/cognitive-load problem</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">AI feature engagement</td>
                  <td className="py-3.5 px-5 font-extrabold text-emerald-600 bg-emerald-50/30 font-mono">Rose from &lt;5% to 15–18%</td>
                  <td className="py-3.5 px-5 text-slate-700">Positional change converted into real behavior change</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">Navigation support tickets</td>
                  <td className="py-3.5 px-5 font-extrabold text-emerald-600 bg-emerald-50/30 font-mono">Reduced by ~25%</td>
                  <td className="py-3.5 px-5 text-slate-700">Flattened IA reduced confusion rather than displacing it</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">Post-task user confidence</td>
                  <td className="py-3.5 px-5 font-extrabold text-emerald-600 bg-emerald-50/30 font-mono">Improved from 2.8 to 3.9 / 5</td>
                  <td className="py-3.5 px-5 text-slate-700">Contextual framing solved a trust problem, not just a speed problem</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">Reusable component coverage</td>
                  <td className="py-3.5 px-5 font-extrabold text-emerald-600 bg-emerald-50/30 font-mono">~75–80% coverage</td>
                  <td className="py-3.5 px-5 text-slate-700">The design system investment pays down cost on future modules</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Slide Image 11 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/11.jpg', 'Fig 11.1 — Usability Pivots & Quantified Business Impact Scorecard')}
          className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50 image-card-hover cursor-pointer group relative"
        >
          <div className="relative overflow-hidden">
            <img src="/assets/revlitix_slides/11.jpg" alt="Revlitix Slide 11" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-200 flex items-center justify-center pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg transition-all duration-200 flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0">
                <span className="text-[13px]">🔍</span> Click to inspect high-res
              </span>
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold flex items-center justify-between caption-shimmer transition-all duration-300">
            <span>Fig 11.1 — Usability Pivots & Quantified Business Impact Scorecard</span>
            <span className="text-[10px] text-[#4F46E5] font-mono font-bold opacity-80 group-hover:opacity-100">FULLSCREEN ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 12: RETROSPECTIVE & TAKEAWAY */}
      <motion.section 
        id="sec-lessons" 
        className="space-y-8 scroll-mt-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
          <span className="text-[11px] font-mono font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full bg-slate-900 text-white shadow-sm border border-slate-700">
            12 // RETROSPECTIVE
          </span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-extrabold tracking-[-0.02em] text-slate-950 leading-[1.15]">What I'd Do Differently & Key Takeaway</h2>

        <div className="space-y-4 text-slate-700">
          <p>
            Two things, with the benefit of hindsight. First, I'd run the keyboard-navigation and screen-reader validation earlier in the process — it was treated as a late-stage check rather than a constraint on the initial design, and we got lucky the final layout held up rather than designing for it from the start. Second, I'd bring the two enterprise accounts into research earlier, before the IA flattening was already in build — their pushback was resolved well, but it could have been designed around from day one rather than negotiated after the fact.
          </p>

          <div className="bg-gradient-to-r from-indigo-50/80 via-purple-50/40 to-white p-6 sm:p-8 rounded-2xl border border-indigo-200 mt-4 text-[15px] sm:text-[16px] leading-relaxed text-indigo-950 font-normal relative overflow-hidden shadow-sm border-l-4 border-l-[#4F46E5] animate-border-glow">
            <strong className="text-[11px] font-mono font-extrabold text-[#4F46E5] uppercase tracking-widest block mb-2 leading-none">// THE TAKEAWAY I'D LEAD WITH IN AN INTERVIEW</strong>
            "The biggest lever in this project wasn't a UI pattern — it was killing an in-progress feature (the customizable dashboard builder) because research contradicted the team's working assumption, and having the standing to make that call before more engineering time was spent on it. Every visual and interaction decision that followed was downstream of that harder call, not the other way around."
          </div>
        </div>

        {/* Slide Image 12 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/12.jpg', 'Fig 12.1 — Key Retrospective Takeaways & Interview Summary')}
          className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50 image-card-hover cursor-pointer group relative"
        >
          <div className="relative overflow-hidden">
            <img src="/assets/revlitix_slides/12.jpg" alt="Revlitix Slide 12" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-200 flex items-center justify-center pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg transition-all duration-200 flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0">
                <span className="text-[13px]">🔍</span> Click to inspect high-res
              </span>
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold flex items-center justify-between caption-shimmer transition-all duration-300">
            <span>Fig 12.1 — Key Retrospective Takeaways & Interview Summary</span>
            <span className="text-[10px] text-[#4F46E5] font-mono font-bold opacity-80 group-hover:opacity-100">FULLSCREEN ⤢</span>
          </div>
        </div>
      </motion.section>

    </div>
  );
};

const MissionControlApp = ({ initialMission = null, onClose = null }) => {
  const [activeMission, setActiveMission] = useState(initialMission || null);
  const [activeSection, setActiveSection] = useState('sec-hero');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [copiedToken, setCopiedToken] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const selectedProject = activeMission ? MISSIONS.find((m) => m.id === activeMission) || MISSIONS[0] : null;
  const scrollContainerRef = useRef(null);

  // Keyboard shortcut listener (Left / Right arrows for slide navigation, Esc for lightbox)
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

  // Filtered missions for landing view
  const filteredMissions = MISSIONS.filter((m) => {
    if (categoryFilter === 'all') return true;
    return m.tagCategory === categoryFilter;
  });

  // Landing page: show all case studies with category filters and featured lead card
  if (!activeMission) {
    return (
      <div className="h-full bg-[#F5F5F7] text-[#1D1D1F] select-text flex flex-col overflow-y-auto" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif' }}>
        {/* Header Section */}
        <div className="px-6 sm:px-10 lg:px-16 pt-10 pb-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
              <span className="text-[11px] font-mono font-extrabold text-[#007AFF] uppercase tracking-[0.18em] bg-[#007AFF]/10 px-3 py-1 rounded-full border border-[#007AFF]/20">
                PROVEN UX CASE STUDIES
              </span>
              <span className="text-[11px] font-mono text-[#86868B]">
                3 Shipped Systems · 100% Production Apps
              </span>
            </div>

            <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-[#1D1D1F] leading-tight">
              Case Studies
            </h1>
            <p className="text-[15px] text-[#86868B] mt-1.5 max-w-2xl leading-relaxed">
              End-to-end product design work across B2B SaaS, Commercial Banking Fintech, and Conversational AI — grounded in qualitative user research and business impact.
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

        {/* Case Study Cards Container */}
        <div className="px-6 sm:px-10 lg:px-16 pb-16 flex-1 space-y-6">
          {/* Featured Hero Banner for Project #1 (Revlitix SaaS) when 'all' or 'saas' is active */}
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
                className="bg-white rounded-3xl border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(79,70,229,0.18)] transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col lg:flex-row"
              >
                {/* Widescreen Image Area */}
                <div className="relative w-full lg:w-3/5 aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-950 min-h-[280px]">
                  <img
                    src="/assets/revlitix_saas_hero_ultra.jpg"
                    alt="Revlitix SaaS"
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-[#4F46E5] text-white font-mono font-black text-xs flex items-center justify-center shadow-md">
                      01
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#4F46E5] font-mono text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                      ★ FEATURED CASE STUDY
                    </span>
                  </div>

                  {/* Status */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="text-[10.5px] font-mono font-bold text-white uppercase">OPERATIONAL · 2022-2025</span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-6 sm:p-8 lg:w-2/5 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-[#4F46E5] uppercase tracking-widest">
                        B2B SaaS · Revenue Intelligence
                      </span>
                      <span className="text-[11px] font-mono text-[#86868B] bg-[#F5F5F7] px-2.5 py-0.5 rounded-full font-medium">
                        8 min read
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight group-hover:text-[#4F46E5] transition-colors">
                      REVLITIX
                    </h2>

                    <p className="text-[14px] text-[#6E6E73] leading-relaxed">
                      Redesigning an AI-powered Revenue Intelligence platform to unify GTM data from 50+ tools into a single source of truth. Reduced time-to-insight from 5–6 clicks to 2 steps.
                    </p>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-[#F5F5F7] p-3 rounded-2xl border border-black/[0.02]">
                      <span className="text-xl font-bold text-[#4F46E5] block">2 steps</span>
                      <span className="text-[11px] text-[#86868B] font-mono">Time to Insight</span>
                    </div>
                    <div className="bg-[#F5F5F7] p-3 rounded-2xl border border-black/[0.02]">
                      <span className="text-xl font-bold text-[#10B981] block">15–18%</span>
                      <span className="text-[11px] text-[#86868B] font-mono">AI Engagement</span>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="pt-2">
                    <div className="w-full py-3 rounded-xl bg-[#4F46E5] text-white text-xs font-mono font-bold uppercase flex items-center justify-center gap-2 group-hover:bg-indigo-700 transition-colors shadow-sm">
                      <span>Explore Revlitix Case Study</span>
                      <span className="text-sm font-normal group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Secondary Grid Cards (Move Money & Sonic AI) */}
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
                  className="text-left bg-white rounded-3xl border border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.12)] transition-all duration-300 overflow-hidden cursor-pointer group outline-none flex flex-col"
                >
                  {/* Hero Image Header */}
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

                  {/* Body Content */}
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

                    {/* Metrics row */}
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

                    {/* Bottom CTA */}
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

  return (
    <div className="h-full bg-[#F8FAFC] text-[#0F172A] select-text flex flex-col relative text-[16px] leading-[1.8] overflow-hidden" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "SF Pro", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      
      {/* APPLE/STRIPE STYLE STICKY TOP COMMAND BAR */}
      <header className="h-16 px-4 sm:px-8 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 flex items-center justify-between z-50 flex-shrink-0 shadow-xs">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => {
              setActiveMission(null);
              setScrollProgress(0);
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[12.5px] font-mono font-bold text-slate-800 hover:text-slate-900 transition-all cursor-pointer border border-slate-200/60"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Studies</span>
          </button>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          {/* Project Switcher Pills */}
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-full border border-slate-200/60">
            {MISSIONS.map(m => (
              <button
                key={m.id}
                onClick={() => {
                  setActiveMission(m.id);
                  setActiveSection('sec-overview');
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTop = 0;
                  }
                }}
                className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[12px] sm:text-[13px] font-mono font-bold transition-all cursor-pointer ${
                  activeMission === m.id
                    ? 'bg-white text-slate-950 shadow-sm font-extrabold border border-slate-200/40'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {m.num} {m.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Header Controls & Breadcrumb */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/60 text-[11.5px] font-mono font-bold text-slate-600">
            <span className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse" />
            <span>{NAV_CHIPS.find(n => n.id === activeSection)?.label || '01 / Overview'}</span>
          </div>

          <button
            onClick={() => handleCopyToken('Revlitix Case Study — Praveen Kumar')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 text-[#4F46E5] border border-indigo-200/60 text-[11.5px] font-mono font-bold transition-all cursor-pointer"
          >
            <span>{copiedToken ? '✓ Copied!' : '🔗 Share'}</span>
          </button>
        </div>
      </header>
      {/* TOP READING PROGRESS INDICATOR BAR */}
      <div className="h-1 bg-slate-100 w-full relative overflow-hidden z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#7C3AED] transition-all duration-150 ease-out rounded-r-full shadow-[0_0_8px_rgba(79,70,229,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* CORE WORKSPACE SLIT-VIEW CONTAINER */}
      <div className="flex-grow flex h-[calc(100%-4rem)] overflow-hidden">
        
        {/* LEFT SIDEBAR: STICKY TABLE OF CONTENTS */}
        <aside className="hidden lg:flex w-72 border-r border-slate-200/80 bg-white flex-col h-full flex-shrink-0">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-slate-500">Case Study Index</span>
            <span className="text-[10px] font-mono text-slate-400 font-bold">12 SECTIONS</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5" style={{ scrollbarWidth: 'thin' }}>
            {NAV_CHIPS.map((chip) => {
              const isActive = activeSection === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => scrollToSection(chip.id)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer border ${
                    isActive
                      ? 'bg-[#EEF2FF] border-[#4F46E5]/40 shadow-xs text-[#4F46E5]'
                      : 'bg-white border-transparent hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className={`text-[10px] font-mono font-extrabold w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive ? 'bg-[#4F46E5] text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {chip.label.split(' / ')[0]}
                    </span>
                    <span className={`text-[12.5px] font-bold truncate ${isActive ? 'text-[#4F46E5]' : 'text-slate-700'}`}>
                      {chip.label.split(' / ')[1]}
                    </span>
                  </div>
                  {isActive && (
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] shadow-[0_0_6px_rgba(79,70,229,0.8)]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* MAIN SCROLLABLE CONTAINER */}
        <main 
          className="flex-1 h-full overflow-y-auto p-4 sm:p-8 lg:p-12 space-y-16 bg-[#F8FAFC] scroll-smooth case-study-scroll" 
          ref={scrollContainerRef}
          style={{ scrollbarWidth: 'thin' }}
        >
          <div className="max-w-4xl mx-auto w-full space-y-16 pb-32">
            {selectedProject.id === 'revlitix-saas' ? (
              <RevlitixCaseStudy selectedProject={selectedProject} handleCopyToken={handleCopyToken} copiedToken={copiedToken} onZoomImage={(src, caption) => setZoomImage({ src, caption })} />
            ) : (
              <>
                {/* SECTION 1: HERO */}
            <motion.section 
              id="sec-hero"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-10 relative overflow-hidden group hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <span className="text-[13px] font-mono font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full bg-[#EEF2FF] text-[#4F46E5]">
                  {selectedProject.category}
                </span>
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full animate-pulse bg-emerald-500" />
                  <span className="text-[13px] font-mono font-bold text-slate-900">{selectedProject.status} · {selectedProject.latency}</span>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <h1 className="text-[36px] sm:text-[52px] font-bold tracking-[-0.03em] leading-[1.18] text-slate-950">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#7C3AED]" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {selectedProject.title}
                  </span>
                </h1>
                <p className="text-[20px] sm:text-[24px] font-display font-semibold text-slate-800 leading-snug max-w-3xl">
                  {selectedProject.subtitle}
                </p>
                <p className="text-[16px] text-slate-600 max-w-2xl font-body leading-relaxed">
                  {selectedProject.desc}
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl bg-slate-900">
                {selectedProject.videoUrl ? (
                  <CaseStudyVideoPlayer 
                    videoUrl={selectedProject.videoUrl} 
                    poster={selectedProject.heroImage} 
                  />
                ) : (
                  <img src={selectedProject.heroImage} alt={selectedProject.title} className="w-full h-auto max-h-[420px] object-cover object-top" />
                )}
                {(selectedProject.floatingCards || []).map((fc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="absolute hidden lg:block p-4 rounded-2xl border border-white/40 shadow-2xl backdrop-blur-xl bg-white/75 pointer-events-none select-none max-w-[240px] z-20 animate-float"
                    style={{
                      top: i === 0 ? '12%' : i === 1 ? '16%' : 'auto',
                      bottom: i === 2 ? '12%' : i === 3 ? '16%' : 'auto',
                      left: i === 0 ? '6%' : i === 2 ? '8%' : 'auto',
                      right: i === 1 ? '6%' : i === 3 ? '8%' : 'auto',
                      borderLeft: `4px solid ${fc.color}`
                    }}
                  >
                    <strong className="text-[10px] font-mono tracking-widest uppercase block" style={{ color: fc.color }}>{fc.tag}</strong>
                    <span className="text-[13px] font-display font-bold text-slate-900 block mt-1.5 leading-tight">{fc.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
                {(selectedProject.heroMetrics || []).map((met, i) => (
                  <div key={i} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
                    <span className="text-[28px] font-display font-black text-slate-900 tracking-tight block">{met.val}</span>
                    <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block mt-1">{met.lbl}</span>
                    <span className="text-[12px] text-slate-500 block mt-0.5 leading-tight">{met.detail}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* SECTION 2: EXECUTIVE SUMMARY */}
            <motion.section 
              id="sec-exec"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#4F46E5] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>02</span> / Executive Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <p className="text-[17px] text-slate-700 leading-relaxed font-body whitespace-pre-line">
                    {selectedProject.execSummary}
                  </p>
                  {selectedProject.pullQuote && (
                    <blockquote className="border-l-4 border-[#4F46E5] pl-4 italic text-slate-600 font-display font-medium my-4">
                      {selectedProject.pullQuote}
                    </blockquote>
                  )}
                </div>
                <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
                  <h3 className="text-[14px] font-mono font-bold text-slate-800 uppercase tracking-wider">Before vs After Performance</h3>
                  <div className="space-y-4">
                    {(selectedProject.execMetricsTable || []).map((row, i) => (
                      <div key={i} className="flex justify-between items-center py-2.5 border-b border-slate-200/60 last:border-0">
                        <div>
                          <strong className="text-[14px] font-display text-slate-900 block">{row.label}</strong>
                          <span className="text-[12px] text-slate-500 block">{row.desc}</span>
                        </div>
                        <div className="flex items-center gap-4 text-right">
                          <div>
                            <span className="text-[11px] font-mono text-slate-400 block uppercase">Before</span>
                            <span className="text-[13px] font-mono text-rose-500 font-bold">{row.old}</span>
                          </div>
                          <div className="h-6 w-px bg-slate-200" />
                          <div>
                            <span className="text-[11px] font-mono text-slate-400 block uppercase">After</span>
                            <span className="text-[13px] font-mono text-emerald-600 font-bold">{row.new}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* SECTION 3: COMPANY */}
            <motion.section 
              id="sec-company"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px]" style={{ borderTopColor: selectedProject.accentColor || '#4F46E5' }}
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#4F46E5] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>03</span> / Company Context & Role
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-[16px] text-slate-700 leading-relaxed font-body">
                    Operating in the complex enterprise business ecosystem, understanding the structural relationships of stakeholders, core product priorities, and multi-platform constraints was critical.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <strong className="text-[12px] font-mono text-slate-400 uppercase tracking-wider block">Duration</strong>
                      <span className="text-[14px] text-slate-800 font-bold block mt-1">{selectedProject.duration}</span>
                    </div>
                    <div>
                      <strong className="text-[12px] font-mono text-slate-400 uppercase tracking-wider block">Year</strong>
                      <span className="text-[14px] text-slate-800 font-bold block mt-1">{selectedProject.year}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 grid grid-cols-2 gap-4">
                  <div>
                    <strong className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Company</strong>
                    <span className="text-[13px] text-slate-900 font-bold block mt-0.5">{selectedProject.company}</span>
                  </div>
                  <div>
                    <strong className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Product</strong>
                    <span className="text-[13px] text-slate-900 font-bold block mt-0.5">{selectedProject.product}</span>
                  </div>
                  <div className="col-span-2">
                    <strong className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Team Structure</strong>
                    <span className="text-[13px] text-slate-700 block mt-0.5">{selectedProject.team}</span>
                  </div>
                  <div className="col-span-2">
                    <strong className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">My Responsibilities</strong>
                    <span className="text-[13px] text-slate-700 block mt-0.5">{selectedProject.responsibilities}</span>
                  </div>
                </div>
              </div>
              {selectedProject.id === 'revlitix-saas' && (
                <div className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50">
                  <img src="/assets/revlitix_data_integration_new.jpg" alt="Multi-Source Data Integration Platform" className="w-full h-auto max-h-[380px] object-cover object-top" />
                  <div className="p-3 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold">
                    <span>Fig 3.1 — Multi-Source GTM Data Integration Architecture</span>
                  </div>
                </div>
              )}
            </motion.section>

            {/* SECTION 4: CHALLENGE */}
            <motion.section 
              id="sec-challenge"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-rose-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6"
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-rose-500 flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>04</span> / The Challenge & Core Friction
              </h2>
              <p className="text-[16px] text-slate-700 font-body">
                Enterprise users faced systemic, compounding friction point-breakdowns. Legacy reporting tools prioritized data extraction over decision velocity, introducing catastrophic drop-off risks.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(selectedProject.challenge?.cards || []).map((card, i) => (
                  <div key={i} className="p-5 bg-rose-50/30 rounded-2xl border border-rose-100 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-mono font-extrabold text-rose-500 px-2 py-0.5 rounded-full bg-rose-100/50 inline-block mb-3">Friction {card.id}</span>
                      <h3 className="font-display font-extrabold text-[18px] tracking-tight text-slate-900 mb-2">{card.title}</h3>
                      <p className="text-[13px] text-slate-600 leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              {selectedProject.id === 'revlitix-saas' && (
                <div className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50">
                  <img src="/assets/revlitix_funnel.jpg" alt="Legacy Funnel Friction" className="w-full h-auto max-h-[380px] object-cover object-top" />
                  <div className="p-3 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold">
                    <span>Fig 4.1 — Funnel Anomaly & Decision Path Friction</span>
                  </div>
                </div>
              )}
              {selectedProject.id === 'move-money' && (
                <div className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50">
                  <img src="/assets/move_money_flow_1784827452411.jpg" alt="Legacy banking flow vs modern rail engine" className="w-full h-auto max-h-[380px] object-cover object-top" />
                  <div className="p-3 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold">
                    <span>Fig 4.1 — Legacy Treasury Steps vs. Instant Rail Optimization</span>
                  </div>
                </div>
              )}
            </motion.section>

            {/* SECTION 5: METRICS */}
            <motion.section 
              id="sec-metrics"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px]" style={{ borderTopColor: selectedProject.accentColor || '#4F46E5' }}
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#4F46E5] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>05</span> / Core Success Metrics (North Star)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(selectedProject.heroMetrics || []).map((met, i) => (
                  <div key={i} className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200/60 backdrop-blur-sm shadow-xs relative overflow-hidden border-l-3 border-l-amber-400 hover:shadow-md transition-all duration-200">
                    <div className="w-8 h-8 rounded-full bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-mono text-[12px] font-bold mb-3">{i+1}</div>
                    <span className="text-[36px] font-display font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] block leading-none">{met.val}</span>
                    <span className="text-[12px] font-mono font-bold text-slate-800 uppercase tracking-wider block mt-2">{met.lbl}</span>
                    <p className="text-[12px] text-slate-500 mt-1 leading-normal">{met.detail}</p>
                  </div>
                ))}
              </div>
              {selectedProject.id === 'revlitix-saas' && (
                <div className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50">
                  <img src="/assets/revlitix_website_product_images/68960bded69109f50c5ac276_outcomesimg.jpg" alt="Outcomes & Target Scorecard" className="w-full h-auto max-h-[380px] object-cover object-top" />
                  <div className="p-3 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold">
                    <span>Fig 5.1 — North Star Metrics Dashboard Performance</span>
                  </div>
                </div>
              )}
            </motion.section>

            {/* SECTION 6: RESEARCH */}
            <motion.section 
              id="sec-research"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px]" style={{ borderTopColor: selectedProject.accentColor || '#4F46E5' }}
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#4F46E5] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>06</span> / Research Wall & Qualitative Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-display font-extrabold text-[20px] tracking-tight text-slate-900">User Discovery Inquiry</h3>
                  <p className="text-[16px] text-slate-700 font-body">
                    Conducted quantitative data analysis and direct user contextual inquiries to extract key blockers and cognitive barriers.
                  </p>
                  <div className="space-y-3 pt-2">
                    {selectedProject.id === 'revlitix-saas' && (
                      <>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <strong className="text-[13px] text-slate-800 block">Contextual Inquiry (8 Revenue Directors)</strong>
                          <span className="text-[12px] text-slate-500 block">Identified manual Google Sheets reconciliation cycles averaging 12 hours/week.</span>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <strong className="text-[13px] text-slate-800 block">Funnel Mapping (3,400 sessions analyzed)</strong>
                          <span className="text-[12px] text-slate-500 block">Found a 43% user drop-off when drilling into detail anomalies.</span>
                        </div>
                      </>
                    )}
                    {selectedProject.id === 'move-money' && (
                      <>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <strong className="text-[13px] text-slate-800 block">Corporate Treasurer Inquiry (8 participants)</strong>
                          <span className="text-[12px] text-slate-500 block">Revealed high anxiety during rail selection due to unclear settlement cut-off windows.</span>
                        </div>
                      </>
                    )}
                    {selectedProject.id === 'sonic' && (
                      <>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <strong className="text-[13px] text-slate-800 block">Analyst Shadowing Sessions</strong>
                          <span className="text-[12px] text-slate-500 block">Observed SQL discovery lag times where users had no syntax previewing trust mechanisms.</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
                  <h3 className="text-[14px] font-mono font-bold text-slate-800 uppercase tracking-wider">Top Discovery Insights</h3>
                  <div className="space-y-4">
                    {(selectedProject.research?.insights4 || []).map((ins, i) => (
                      <div key={i} className="p-4 bg-white rounded-xl border border-slate-200/60">
                        <span className="text-[11px] font-mono font-extrabold text-[#4F46E5] block uppercase">{ins.metric}</span>
                        <p className="text-[13px] text-slate-700 font-medium mt-1 leading-normal">{ins.text}</p>
                      </div>
                    ))}
                    {(selectedProject.researchInsights || []).map((ins, i) => (
                      <div key={i} className="p-4 bg-white rounded-xl border border-slate-200/60">
                        <span className="text-[11px] font-mono font-extrabold text-[#4F46E5] block uppercase">{ins.metric || 'Insight'}</span>
                        <p className="text-[13px] text-slate-700 font-medium mt-1 leading-normal">{ins.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {selectedProject.id === 'revlitix-saas' && (
                <div className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50">
                  <img src="/assets/revlitix_journey_map_new.jpg" alt="User Discovery & Research Journey Mapping" className="w-full h-auto max-h-[380px] object-cover object-top" />
                  <div className="p-3 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold">
                    <span>Fig 6.1 — Qualitative User Research & Contextual Inquiry Journey Map</span>
                  </div>
                </div>
              )}
            </motion.section>

            {/* SECTION 7: REFRAMES */}
            <motion.section 
              id="sec-reframes"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px]" style={{ borderTopColor: selectedProject.accentColor || '#4F46E5' }}
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#4F46E5] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>07</span> / Strategic UX Reframes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(selectedProject.fourReframes || []).map((ref, i) => (
                  <div key={i} className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200/60 backdrop-blur-sm shadow-xs flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-4">
                      <div className="w-1/2">
                        <span className="text-[10px] font-mono text-rose-500 uppercase block font-extrabold">Legacy Framing</span>
                        <strong className="text-[14px] text-rose-700 block mt-1 leading-snug">{ref.from}</strong>
                      </div>
                      <div className="h-10 w-px bg-slate-200 self-center" />
                      <div className="w-1/2">
                        <span className="text-[10px] font-mono text-emerald-600 uppercase block font-extrabold">UX Reframe</span>
                        <strong className="text-[14px] text-emerald-800 block mt-1 leading-snug">{ref.to}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {selectedProject.id === 'revlitix-saas' && (
                <div className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50">
                  <img src="/assets/revlitix_wireframe_v3.jpg" alt="Low-Fi Wireframe Explorations" className="w-full h-auto max-h-[380px] object-cover object-top" />
                  <div className="p-3 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold">
                    <span>Fig 7.1 — Translating UX Reframes into Core Wireframe Layouts</span>
                  </div>
                </div>
              )}
            </motion.section>

            {/* SECTION 8: HMW */}
            <motion.section 
              id="sec-hmw"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px]" style={{ borderTopColor: selectedProject.accentColor || '#4F46E5' }}
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#4F46E5] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>08</span> / How Might We (HMW) Questions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(selectedProject.top4HMWExpanded || []).map((top, i) => (
                  <div key={i} className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200/60 backdrop-blur-sm shadow-xs flex gap-4 items-start">
                    <span className="text-[20px] font-display font-black text-[#4F46E5] leading-none mt-1">HMW</span>
                    <div>
                      <h3 className="font-display font-extrabold text-[16px] text-slate-900 leading-snug">{top.q}</h3>
                      <p className="text-[13px] text-slate-500 mt-2 leading-relaxed">{top.desc}</p>
                    </div>
                  </div>
                ))}
                {(selectedProject.howMightWe || []).map((hmw, i) => (
                  <div key={i} className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200/60 backdrop-blur-sm shadow-xs flex gap-4 items-start">
                    <span className="text-[20px] font-display font-black text-[#4F46E5] leading-none mt-1">HMW</span>
                    <div>
                      <h3 className="font-display font-extrabold text-[16px] text-slate-900 leading-snug">{hmw}</h3>
                    </div>
                  </div>
                ))}
              </div>
              {selectedProject.id === 'revlitix-saas' && (
                <div className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50">
                  <img src="/assets/revlitix_process_1783016419496.jpg" alt="Prioritization Matrix & Exploration Sprints" className="w-full h-auto max-h-[380px] object-cover object-top" />
                  <div className="p-3 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold">
                    <span>Fig 8.1 — Prioritization Matrix & Design Strategy Exploration Sprints</span>
                  </div>
                </div>
              )}
            </motion.section>

            {/* SECTION 9: PRINCIPLES */}
            <motion.section 
              id="sec-rules"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px]" style={{ borderTopColor: selectedProject.accentColor || '#4F46E5' }}
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#4F46E5] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>09</span> / System Design Principles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(selectedProject.sixPrinciples || []).map((rule, i) => (
                  <div key={i} className="p-5 bg-slate-50/50 border border-slate-100 rounded-2xl flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 hover:border-slate-200 transition-all duration-200">
                    <div>
                      <span className="text-[13px] font-mono font-extrabold text-[#4F46E5] block">0{rule.num || i+1}</span>
                      <strong className="text-[15px] font-display text-slate-900 block mt-2">{rule.title}</strong>
                      <p className="text-[13px] text-slate-600 mt-1 leading-relaxed">{rule.desc}</p>
                    </div>
                  </div>
                ))}
                {(selectedProject.designPrinciples || []).map((rule, i) => (
                  <div key={i} className="p-5 bg-slate-50/50 border border-slate-100 rounded-2xl flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 hover:border-slate-200 transition-all duration-200">
                    <div>
                      <span className="text-[13px] font-mono font-extrabold text-[#4F46E5] block">0{i+1}</span>
                      <strong className="text-[15px] font-display text-slate-900 block mt-2">{rule.title}</strong>
                      <p className="text-[13px] text-slate-600 mt-1 leading-relaxed">{rule.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              {selectedProject.id === 'revlitix-saas' && (
                <div className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50">
                  <img src="/assets/revlitix_design_system_v3.jpg" alt="120+ Design System Component Architecture" className="w-full h-auto max-h-[400px] object-cover object-top" />
                  <div className="p-3 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold">
                    <span>Fig 9.1 — 120+ Unified Design System Architecture Map</span>
                  </div>
                </div>
              )}
            </motion.section>

            {/* SECTION 10: IDEATION */}
            <motion.section 
              id="sec-ideation"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px]" style={{ borderTopColor: selectedProject.accentColor || '#4F46E5' }}
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#4F46E5] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>10</span> / Ideation & Sketches
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-display font-extrabold text-[20px] tracking-tight text-slate-900">
                    {selectedProject.ideation?.title || "Sketching & Validation"}
                  </h3>
                  <p className="text-[16px] text-slate-700 leading-relaxed font-body">
                    {selectedProject.ideation?.subtitle || selectedProject.ideationNotes || "Explored multi-tier layouts, comparing vertical workflows against linear hubs."}
                  </p>
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[13px] font-mono font-extrabold text-slate-400 uppercase tracking-wider">Concept Validation</h4>
                    {(selectedProject.ideation?.rejected || []).map((rej, i) => (
                      <div key={i} className="p-4 bg-rose-50/30 rounded-xl border border-rose-100 flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">×</span>
                        <div>
                          <strong className="text-[13px] text-slate-900 block">{rej.concept}</strong>
                          <span className="text-[12px] text-rose-700/80 block mt-0.5">{rej.why}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 flex flex-col justify-center">
                  <div className="border-l-4 border-emerald-500 pl-4 space-y-2">
                    <span className="text-[11px] font-mono font-extrabold text-emerald-600 block uppercase">Approved Direction</span>
                    <strong className="text-[16px] font-display text-slate-900 block">
                      {selectedProject.ideation?.approved?.title || "Decision-Centric Dashboard"}
                    </strong>
                    <p className="text-[13px] text-slate-600 leading-relaxed">
                      {selectedProject.ideation?.approved?.desc || "Optimized real-time telemetry pipelines to surface anomalies instantly in plain-language UI."}
                    </p>
                  </div>
                </div>
              </div>
              {selectedProject.id === 'revlitix-saas' && (
                <div className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50">
                  <img src="/assets/revlitix_ideation_sketches_new.jpg" alt="Whiteboard Sketches & Ideation Notes" className="w-full h-auto max-h-[380px] object-cover object-top" />
                  <div className="p-3 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-700 font-bold">
                    <span>Fig 10.1 — Whiteboard Sketches & Ideation Session Notes</span>
                  </div>
                </div>
              )}
            </motion.section>

            {/* SECTION 11: IA */}
            <motion.section 
              id="sec-ia"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px]" style={{ borderTopColor: selectedProject.accentColor || '#4F46E5' }}
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#4F46E5] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>11</span> / Information Architecture Map
              </h2>
              <p className="text-[16px] text-slate-700 font-body">
                Structured a low-friction hierarchical pathing model to streamline decision access across data boundaries.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(selectedProject.infoArchitecture || []).map((node, i) => (
                  <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-start gap-4 hover:shadow-md hover:border-[#4F46E5]/30 transition-all duration-200">
                    <span className="w-6 h-6 rounded-md bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-mono text-[12px] font-bold">{i+1}</span>
                    <div>
                      <strong className="text-[14px] text-slate-900 block">{node.node}</strong>
                      <span className="text-[12px] text-slate-500 block mt-0.5">{node.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              {selectedProject.id === 'revlitix-saas' && (
                <div className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50">
                  <img src="/assets/revlitix_process_journey.jpg" alt="Information Architecture Evolution Diagram" className="w-full h-auto max-h-[380px] object-cover object-top" />
                  <div className="p-3 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold">
                    <span>Fig 11.1 — Unified App Hierarchy Navigation Mapping</span>
                  </div>
                </div>
              )}
            </motion.section>

            {/* SECTION 12: ROUTING */}
            <motion.section 
              id="sec-routing"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px]" style={{ borderTopColor: selectedProject.accentColor || '#4F46E5' }}
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#4F46E5] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>12</span> / User Routing & Entry Points
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-display font-extrabold text-[20px] tracking-tight text-slate-900">NLP Intent Detection & Redirection</h3>
                  <p className="text-[16px] text-slate-700 font-body">
                    Designed intelligent gateway routing models ensuring GTM teams hit critical visualizations directly based on natural language questions.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 flex items-center justify-center font-mono text-[12px] text-slate-500">
                  Defensive routing ensures zero dead-ends inside query processing.
                </div>
              </div>
              {selectedProject.id === 'revlitix-saas' && (
                <div className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50">
                  <img src="/assets/revlitix_ai_v3.jpg" alt="Question-Based AI Intent Routing" className="w-full h-auto max-h-[380px] object-cover object-top" />
                  <div className="p-3 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold">
                    <span>Fig 12.1 — AI-Driven Question Routing Wireframe Map</span>
                  </div>
                </div>
              )}
              {selectedProject.id === 'sonic' && (
                <div className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50">
                  <img src="/assets/sonic_ai_routing_1784827567946.jpg" alt="AI Intent Routing Information Architecture" className="w-full h-auto max-h-[380px] object-cover object-top" />
                  <div className="p-3 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold">
                    <span>Fig 12.1 — NLU Intent Extraction & DB Visualizations Routing Map</span>
                  </div>
                </div>
              )}
            </motion.section>

            {/* SECTION 13: WIREFRAMES */}
            <motion.section 
              id="sec-wireframes"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px]" style={{ borderTopColor: selectedProject.accentColor || '#4F46E5' }}
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#4F46E5] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>13</span> / Wireframe Iterations & Specs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(selectedProject.wireframeSpecs || []).map((spec, i) => (
                  <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/60">
                    <strong className="text-[14px] font-display text-slate-900 block">{spec.title}</strong>
                    <span className="text-[12px] text-slate-500 block mt-1 leading-normal">{spec.desc}</span>
                  </div>
                ))}
              </div>
              {selectedProject.id === 'revlitix-saas' && (
                <div className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50">
                  <img src="/assets/revlitix_wireframe_v3.jpg" alt="Wireframe Specs" className="w-full h-auto max-h-[380px] object-cover object-top" />
                  <div className="p-3 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold">
                    <span>Fig 13.1 — Wireframe Layout Specifications & Dimensions</span>
                  </div>
                </div>
              )}
            </motion.section>

            {/* SECTION 14: HIFI */}
            <motion.section 
              id="sec-hifi"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px]" style={{ borderTopColor: selectedProject.accentColor || '#4F46E5' }}
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#4F46E5] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>14</span> / High-Fidelity Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-display font-extrabold text-[20px] tracking-tight text-slate-900">Pixel-Perfect Spec Outlines</h3>
                  <p className="text-[16px] text-slate-700 font-body">
                    Delivered comprehensive spacing parameters, typographic systems, and element hierarchy structures to match live CSS targets.
                  </p>
                  <div className="space-y-3 pt-2">
                    {(selectedProject.hiFiSpecs || []).map((spec, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                        <span className="text-[13px] text-slate-700 font-medium">{spec.component}</span>
                        <span className="text-[12px] font-mono font-bold text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded">{spec.spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 flex items-center justify-center font-mono text-[12px] text-slate-500">
                  Pristine keynote light mode typography spec values.
                </div>
              </div>
            </motion.section>

            {/* SECTION 15: MOTION */}
            <motion.section 
              id="sec-motion"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px]" style={{ borderTopColor: selectedProject.accentColor || '#4F46E5' }}
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#4F46E5] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>15</span> / Micro-Interactions & Hover States
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-display font-extrabold text-[20px] tracking-tight text-slate-900">Spring Physics & Interactive Feedback</h3>
                  <p className="text-[16px] text-slate-700 font-body">
                    Added rich tactile transitions on hover indicators, deal anomaly alerts, and dynamic visual graphs to increase dashboard interaction rates.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 flex items-center justify-center font-mono text-[12px] text-slate-500">
                  Framer Motion spring curves: stiffness: 350, damping: 30.
                </div>
              </div>
              {selectedProject.id === 'revlitix-saas' && (
                <div className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50">
                  <img src="/assets/revlitix_ai_v2.jpg" alt="AI Recommendations Motion & Hover Cards" className="w-full h-auto max-h-[380px] object-cover object-top" />
                  <div className="p-3 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold">
                    <span>Fig 15.1 — Floating AI Insight Hover States & Active Cards</span>
                  </div>
                </div>
              )}
            </motion.section>

            {/* SECTION 16: TOKENS */}
            <motion.section 
              id="sec-tokens"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px]" style={{ borderTopColor: selectedProject.accentColor || '#4F46E5' }}
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#4F46E5] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>16</span> / Design Tokens Studio
              </h2>
              <p className="text-[16px] text-slate-700 font-body">
                Structured unified typography scales, categorical colors, and spacing constants into exportable JSON tokens for cross-functional developer handoff.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(selectedProject.designSystem?.tokens || []).map((tok, i) => (
                  <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/60 flex flex-col justify-between relative group">
                    <div>
                      <span className="text-[11px] font-mono font-extrabold text-[#4F46E5] uppercase">{tok.type}</span>
                      <strong className="text-[14px] text-slate-900 block mt-2 font-mono">{tok.name || tok.count + ' variables'}</strong>
                      <span className="text-[12px] text-slate-500 block mt-1 leading-normal">{tok.value || tok.desc}</span>
                    </div>
                    {tok.name && (
                      <button
                        onClick={() => handleCopyToken(tok.name)}
                        className="absolute top-4 right-4 p-1.5 rounded-lg bg-white border border-slate-200 text-[11px] font-mono font-bold hover:bg-slate-50 transition-all cursor-default"
                      >
                        {copiedToken === tok.name ? 'Copied' : 'Copy'}
                      </button>
                    )}
                  </div>
                ))}
                {(selectedProject.tokenSystem || []).map((tok, i) => (
                  <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/60 flex flex-col justify-between relative">
                    <div>
                      <span className="text-[11px] font-mono font-extrabold text-[#4F46E5] uppercase">{tok.type}</span>
                      <strong className="text-[14px] text-slate-900 block mt-2 font-mono">{tok.count} variables</strong>
                      <span className="text-[12px] text-slate-500 block mt-1 leading-normal">{tok.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              {selectedProject.id === 'move-money' && (
                <div className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50">
                  <img src="/assets/move_money_design_system_1784827289843.jpg" alt="Design Token Architecture" className="w-full h-auto max-h-[380px] object-cover object-top" />
                  <div className="p-3 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold">
                    <span>Fig 16.1 — High-End Financial Product Design System Token Architecture Map</span>
                  </div>
                </div>
              )}
            </motion.section>

            {/* SECTION 17: EDGE CASES */}
            <motion.section 
              id="sec-edge"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px]" style={{ borderTopColor: selectedProject.accentColor || '#4F46E5' }}
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#4F46E5] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>17</span> / Defensive UI Edge Cases
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(selectedProject.edgeCases || []).map((ec, i) => (
                  <div key={i} className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200/60 backdrop-blur-sm shadow-xs relative overflow-hidden border-l-3 border-l-amber-400 hover:shadow-md transition-all duration-200">
                    <strong className="text-[15px] font-display text-slate-900 block">{ec.scenario || ec.title}</strong>
                    <p className="text-[13px] text-slate-600 mt-2 leading-relaxed">{ec.solution || ec.desc}</p>
                  </div>
                ))}
              </div>
              {selectedProject.id === 'revlitix-saas' && (
                <div className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50">
                  <img src="/assets/revlitix_website_product_images/6896135103e8ca6406b070d3_Frame 1321315475.png" alt="Defensive Error Guards & Empty States" className="w-full h-auto max-h-[380px] object-cover object-top" />
                  <div className="p-3 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold">
                    <span>Fig 17.1 — Empty States, Server Failures & API Disconnect Error Guards</span>
                  </div>
                </div>
              )}
              {selectedProject.id === 'move-money' && (
                <div className="rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-white my-6 ring-4 ring-slate-50/50">
                  <img src="/assets/move_money_security_1784827369109.jpg" alt="Defensive security biometrics and warnings" className="w-full h-auto max-h-[380px] object-cover object-top" />
                  <div className="p-3 bg-slate-50 border-t border-slate-200 text-center font-mono text-[12px] text-slate-600 font-bold">
                    <span>Fig 17.1 — Biometrics FaceID, 2FA Verification & Suspicious Device Flags</span>
                  </div>
                </div>
              )}
            </motion.section>

            {/* SECTION 18: ACCESSIBILITY */}
            <motion.section 
              id="sec-a11y"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px]" style={{ borderTopColor: selectedProject.accentColor || '#4F46E5' }}
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#4F46E5] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>18</span> / Accessibility Audit (WCAG 2.1)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(selectedProject.a11yChecklist || []).map((ac, i) => (
                  <div key={i} className="p-4 bg-emerald-50/20 border border-emerald-100 rounded-2xl flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold shadow-[0_0_6px_rgba(16,185,129,0.3)]">✓</span>
                    <div>
                      <strong className="text-[13px] text-slate-900 block">{ac.criteria}</strong>
                      <span className="text-[12px] text-emerald-800/80 block mt-0.5">{ac.result}</span>
                    </div>
                  </div>
                ))}
                {(selectedProject.accessibilityAudit || []).map((ac, i) => (
                  <div key={i} className="p-4 bg-emerald-50/20 border border-emerald-100 rounded-2xl flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold shadow-[0_0_6px_rgba(16,185,129,0.3)]">✓</span>
                    <div>
                      <strong className="text-[13px] text-slate-900 block">{ac.criteria}</strong>
                      <span className="text-[12px] text-emerald-800/80 block mt-0.5">{ac.result}</span>
                    </div>
                  </div>
                ))}
              </div>
              {selectedProject.id === 'revlitix-saas' && (
                <div className="rounded-[24px] overflow-hidden border border-emerald-200 shadow-md bg-white my-4">
                  <img src="/assets/revlitix_accessibility_new.jpg" alt="Accessibility Audit & High Contrast Compliance" className="w-full h-auto max-h-[380px] object-cover object-top" />
                  <div className="p-3 bg-emerald-50 border-t border-emerald-200 text-center font-mono text-[12px] text-emerald-900 font-bold">
                    <span>Fig 18.1 — WCAG 2.1 AAA High-Contrast Compliance Audit</span>
                  </div>
                </div>
              )}
            </motion.section>

            {/* SECTION 19: TIMELINE */}
            <motion.section 
              id="sec-timeline"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px]" style={{ borderTopColor: selectedProject.accentColor || '#4F46E5' }}
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#4F46E5] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>19</span> / Cross-functional Timeline
              </h2>
              <p className="text-[16px] text-slate-700 font-body">
                Coordinated iterative wireframing loops, engineering validation spikes, and QA reviews across structural milestones.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(selectedProject.crossFunctional || []).map((cf, i) => (
                  <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/60">
                    <span className="text-[11px] font-mono font-extrabold text-[#4F46E5] uppercase">{cf.team} Integration</span>
                    <p className="text-[13px] text-slate-700 font-bold mt-2 leading-snug">{cf.action}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* SECTION 20: HANDOFF */}
            <motion.section 
              id="sec-handoff"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px]" style={{ borderTopColor: selectedProject.accentColor || '#4F46E5' }}
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#4F46E5] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>20</span> / Developer Handoff QA Specs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-display font-extrabold text-[20px] tracking-tight text-slate-900">Production-Ready Assets</h3>
                  <p className="text-[16px] text-slate-700 font-body">
                    Provided unified layout tokens directly mapped to Tailwind parameters alongside active Figma redlines to ensure zero CSS layout shift.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 flex items-center justify-center font-mono text-[12px] text-slate-500">
                  CSS attributes exported directly to class constants.
                </div>
              </div>
            </motion.section>

            {/* SECTION 21: IMPACT */}
            <motion.section 
              id="sec-impact"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-emerald-50/80 border border-emerald-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6"
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-emerald-600 flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>21</span> / Quantified Business Impact
              </h2>
              <p className="text-[16px] text-emerald-950 font-body">
                Strategic design iteration yielded measurable, significant improvements in product performance and user engagement.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(selectedProject.businessImpact || []).map((o, i) => (
                  <div key={i} className="p-6 bg-white/95 rounded-2xl border border-emerald-100 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="text-[40px] font-display font-black tracking-tighter block leading-none bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 to-emerald-700" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{o.val}</span>
                      <span className="text-[12px] font-mono font-bold text-slate-800 uppercase tracking-wider block mt-2">{o.lbl}</span>
                    </div>
                    <p className="text-[12px] text-slate-500 mt-2 leading-relaxed">{o.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* SECTION 22: LESSONS */}
            <motion.section 
              id="sec-lessons"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px]" style={{ borderTopColor: selectedProject.accentColor || '#4F46E5' }}
            >
              <h2 className="text-[14px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#4F46E5] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#4F46E5'}, #7C3AED)` }}>22</span> / Retrospective & Lessons Learned
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(selectedProject.lessonsLearned || []).map((l, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-start gap-4">
                    <span className="w-6 h-6 rounded-md bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-mono text-[12px] font-bold flex-shrink-0">{l.num}</span>
                    <div>
                      <strong className="text-[15px] font-display text-slate-900 block leading-snug">{l.title}</strong>
                      <p className="text-[13px] text-slate-600 mt-1 leading-relaxed">{l.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* SECTION 24: GALLERY */}
            <motion.section 
              id="sec-gallery"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px]" style={{ borderTopColor: selectedProject.accentColor || '#4F46E5' }}
            >
              <h2 className="text-[22px] font-display font-black tracking-tight text-slate-900 flex items-center gap-3">
                <span className="w-8 h-[3px] bg-current opacity-30 block rounded-full"></span>SECTION 24: FINAL VISUAL SHOWCASE GALLERY
              </h2>
              {(selectedProject.mockups || []).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(selectedProject.mockups || []).map((imgSrc, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setZoomImage({ src: imgSrc, caption: `${selectedProject.title} — UI Screenshot ${idx + 1}` })}
                      className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white image-card-hover cursor-pointer group relative"
                    >
                      <div className="relative overflow-hidden">
                        <img src={imgSrc} alt={`UI Screenshot ${idx + 1}`} className="w-full h-[260px] object-cover object-top group-hover:scale-[1.02] transition-transform duration-300" />
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-200 flex items-center justify-center pointer-events-none">
                          <span className="opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg transition-all duration-200 flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0">
                            <span className="text-[13px]">🔍</span> Inspect
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.section>
              </>
            )}
            
          </div>
        </main>
      </div>

      {/* FLOATING STEP & SLIDE NAVIGATION BAR */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] hidden sm:flex items-center gap-3 bg-slate-900/95 text-white backdrop-blur-xl border border-white/15 px-5 py-3 rounded-2xl shadow-2xl animate-slide-up">
        <button
          onClick={() => {
            const idx = NAV_CHIPS.findIndex(c => c.id === activeSection);
            if (idx > 0) scrollToSection(NAV_CHIPS[idx - 1].id);
          }}
          disabled={NAV_CHIPS.findIndex(c => c.id === activeSection) === 0}
          className="px-3 py-1.5 rounded-xl text-[12px] font-mono font-bold bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span className="text-[10px] opacity-60">←</span> Prev
        </button>
        
        {/* Progress Dots */}
        <div className="flex items-center gap-1.5 px-2">
          {NAV_CHIPS.map((chip, i) => {
            const currentIdx = NAV_CHIPS.findIndex(c => c.id === activeSection);
            const isActive = i === currentIdx;
            const isPast = i < currentIdx;
            return (
              <button
                key={chip.id}
                onClick={() => scrollToSection(chip.id)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'w-6 h-2 bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]' 
                    : isPast 
                      ? 'w-2 h-2 bg-white/40 hover:bg-white/60' 
                      : 'w-2 h-2 bg-white/15 hover:bg-white/30'
                }`}
                title={chip.label}
              />
            );
          })}
        </div>

        <button
          onClick={() => {
            const idx = NAV_CHIPS.findIndex(c => c.id === activeSection);
            if (idx < NAV_CHIPS.length - 1) scrollToSection(NAV_CHIPS[idx + 1].id);
          }}
          disabled={NAV_CHIPS.findIndex(c => c.id === activeSection) === NAV_CHIPS.length - 1}
          className="px-3 py-1.5 rounded-xl text-[12px] font-mono font-bold bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer flex items-center gap-1.5"
        >
          Next <span className="text-[10px] opacity-60">→</span>
        </button>
      </div>

      {/* FULL-SCREEN IMAGE INSPECTOR LIGHTBOX MODAL */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 z-[9999] bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out select-none"
          >
            <div 
              className="relative max-w-6xl w-full max-h-[88vh] flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-slate-900/90 shadow-2xl p-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setZoomImage(null)}
                className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white font-bold text-[16px] flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-lg"
              >
                ×
              </button>

              {/* Keyboard hint */}
              <div className="absolute top-4 left-4 z-50 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-white/10 text-white/60 font-mono text-[10px] font-bold border border-white/10">ESC</span>
                <span className="text-white/40 font-mono text-[10px]">to close</span>
              </div>

              <div className="w-full overflow-auto max-h-[80vh] flex items-center justify-center p-2">
                <img 
                  src={zoomImage.src} 
                  alt="High-Res Zoom View" 
                  className="max-w-full h-auto object-contain rounded-lg shadow-2xl"
                />
              </div>

              {zoomImage.caption && (
                <div className="w-full p-3 bg-slate-950/80 border-t border-white/10 text-center font-mono text-[12.5px] text-slate-300 font-bold">
                  <span>{zoomImage.caption}</span>
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
