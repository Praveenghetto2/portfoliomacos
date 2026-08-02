import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, FileText, CheckCircle2, AlertCircle, Gauge, Lightbulb, 
  HelpCircle, Compass, Layers, Shield, TrendingUp, Award, Box, Monitor, Sparkles
} from 'lucide-react';
import CaseStudyVideoPlayer from '../CaseStudyVideoPlayer';

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

    videoPoster: '/assets/revlitix_video_thumbnail.jpg',
    heroImage: '/assets/revlitix_listing_thumbnail.jpg',
    mockups: [
      '/assets/revlitix_listing_thumbnail.jpg',
      '/assets/revlitix_slides/1.jpg',
      '/assets/revlitix_slides/2.jpg',
      '/assets/revlitix_slides/3.jpg',
      '/assets/revlitix_slides/4.jpg',
      '/assets/revlitix_slides/5.jpg',
      '/assets/revlitix_slides/6.jpg',
      '/assets/revlitix_slides/7.jpg',
      '/assets/revlitix_slides/8.jpg',
      '/assets/revlitix_slides/9.jpg',
      '/assets/revlitix_slides/10.jpg',
      '/assets/revlitix_slides/11.jpg',
      '/assets/revlitix_slides/12.jpg'
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

    heroImage: '/assets/move_money_dashboard_1784827266925.jpg',
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
    title: 'REVLITIX SONIC',
    subtitle: 'Ask a question. Confirm what it means. Trust the answer.',
    desc: 'Designing a conversational AI layer for GTM analytics — built around a chat-first information architecture, a confirm-before-commit query pattern, and filter consistency that carries a user\'s context into every conversation.',
    company: 'Revlitix',
    product: 'Conversational AI Layer for GTM Analytics',
    category: 'AI INTERFACE · CONVERSATIONAL UX · TRUST DESIGN',
    role: 'Lead Product Designer',
    duration: '6 months',
    year: '2024–2025',
    team: 'PM · 2 ML Engineers · Frontend Lead · Founder',
    platforms: 'Web application, desktop-first',
    responsibilities: 'Conversational UX, Trust Design, Information Architecture, Component System, Usability Research',
    status: 'PRODUCTION',
    statusColor: '#007AFF',
    latency: '48ms',
    accentColor: '#007AFF',
    readTime: '6 min read',
    tagCategory: 'ai',

    heroImage: '/assets/sonic_listing_thumbnail.jpg',
    mockups: [
      '/assets/sonic_listing_thumbnail.jpg',
      '/assets/sonic_slides/1.jpg',
      '/assets/sonic_slides/2.jpg',
      '/assets/sonic_slides/3.jpg',
      '/assets/sonic_slides/4.jpg',
      '/assets/sonic_slides/5.jpg',
      '/assets/sonic_slides/6.jpg',
      '/assets/sonic_slides/7.jpg',
      '/assets/sonic_slides/8.jpg',
      '/assets/sonic_slides/9.jpg',
      '/assets/sonic_slides/10.jpg',
      '/assets/sonic_slides/11.jpg',
      '/assets/sonic_slides/12.jpg'
    ],

    heroMetrics: [
      { val: '~2× faster', lbl: 'Faster Access', detail: 'To a decision-ready answer vs. filter navigation' },
      { val: 'Under 5% → ~20%', lbl: 'AI Engagement', detail: 'From under 5% to ~20% of weekly sessions' },
      { val: '↓ ~25–30%', lbl: 'Support Tickets', detail: 'Navigation-related support tickets reduced' },
      { val: '~2.9 → ~3.8', lbl: 'User Confidence', detail: 'Usability testing rating on 1–5 scale' }
    ],

    execSummary: `Revlitix unifies GTM data from 50+ tools into one platform. As the dataset and the number of ways to slice it grew, adding more filters and tabs stopped scaling — getting a specific answer meant navigating dropdowns, applying filters, and knowing which of roughly 40 metrics to select.\n\nNatural-language input could remove that friction, but early prototypes surfaced a new problem: users didn't trust an AI-generated answer they couldn't verify. A CMO asking "which lead sources are underperforming" needed to know Sonic hadn't silently misread "underperforming" as "declining" instead of "below quota."\n\nWe designed Sonic around three decisions: a chat-first information architecture, a confirm-before-commit pattern, and global filter consistency. Together, these meaningfully cut the number of steps to an answer and drove real adoption of the AI feature.`,

    pullQuote: `"An AI that answers instantly is only useful if the user believes it answered the right question."`,

    challenges: [
      { id: '1', title: 'Schema Knowledge Bottleneck', desc: 'To answer routine questions, users needed schema knowledge — where data lived, which of ~40 metrics applied, which date-range control to use.' },
      { id: '2', title: 'Hidden Interpretation & Black Boxes', desc: 'Users had no way to tell whether the AI read "last month" as calendar month vs trailing 30 days, creating anxiety.' },
      { id: '3', title: 'Context Loss Between Screens', desc: 'Early plain chat boxes quietly ignored region filters set two screens earlier, forcing users to constantly restate context.' }
    ],

    solutionMetrics: [
      { label: 'Steps to Decision Answer', old: '4.5 min filter maze', new: '~2× faster', growth: 'Halved steps' },
      { label: 'AI Weekly Sessions', old: 'Under 5%', new: '~20%', growth: '4× Adoption' },
      { label: 'Navigation Support Tickets', old: 'High volume', new: '↓ ~25–30%', growth: 'Support drop' },
      { label: 'User Confidence Score', old: '~2.9 / 5', new: '~3.8 / 5', growth: 'Trust lift' }
    ],

    researchMethods: [
      { method: 'Contextual Inquiry', desc: 'Structured inquiry across ~8 sessions with existing customers.' },
      { method: 'Usability Testing', desc: 'Evaluated early chat-only prototype friction & trust boundaries.' },
      { method: 'Support Ticket Audit', desc: 'Reviewed tickets referencing "wrong" or "unexpected" AI answers.' }
    ],

    researchInsights: [
      { text: '"I don\'t know if that\'s actually what I asked for." — Users got answers but refused to act on them.', metric: '50% of sessions' },
      { text: 'Users who filtered the dashboard by region were confused when Sonic answers reset context.', metric: 'Universal pain point' }
    ],

    howMightWe: [
      'How might we let users see and correct the AI\'s interpretation before it runs?',
      'How might we carry a user\'s existing filter context into the conversation automatically?',
      'How might we make the conversation itself the primary surface, not a widget on top of the dashboard?'
    ],

    designPrinciples: [
      { title: '1. Confirm, then commit.', desc: 'No query executes against real data until the user has seen — and can edit — the system\'s plain-language interpretation of it.' },
      { title: '2. Context travels with the user.', desc: 'Any filter already active elsewhere in the product is visibly present and applied inside the conversation, never silently dropped.' },
      { title: '3. Chat is the surface, not a feature.', desc: 'The conversation carries the same weight as the dashboard, not a secondary panel bolted onto it.' },
      { title: '4. Show your filters, not just your answer.', desc: 'Every rendered result displays which filters and date range it actually used, so trust doesn\'t depend on memory.' }
    ],

    ideationNotes: 'The first version had no confirmation step at all — the AI just answered. Testing showed users didn\'t act on answers they weren\'t confident were correct. We explored a confirmation modal, but it broke conversational flow. An inline, editable restatement kept the conversation moving.',

    infoArchitecture: [
      { node: 'Conversational Input', nodeDesc: 'Pill input with persistent filter pill carried from dashboard' },
      { node: 'Confirmation Step', nodeDesc: 'Inline card with independently editable clauses before execution' },
      { node: 'Inline Visualization', nodeDesc: 'Expanded viewport chat bubble with interactive tables & charts' }
    ],

    wireframeSpecs: [
      { title: 'V1 Direct Answer (No Confirmation)', desc: 'AI answered immediately. Testing showed users lacked trust to act.' },
      { title: 'V2 Modal Popup Confirmation', desc: 'Pop-up window broke flow and added friction users resented.' },
      { title: 'V3 Inline Editable Restatement', desc: 'Inline card with single "Looks right" action (Approved for 70% reuse).' }
    ],

    tokenSystem: [
      { type: 'Component Reuse', count: '75%', desc: 'Atomic components (ChatBubble, ConfirmationCard, FilterPill, InlineChart, SuggestionChip)' },
      { type: 'Keyboard Navigation', count: 'WCAG AA', desc: '100% operable via Tab / Enter / Arrow keys with high contrast focus rings' }
    ],

    accessibilityAudit: [
      { criteria: 'KeyboardOperable', result: '100% operable with Tab/Enter/Arrow keys' },
      { criteria: 'Focus Indicators', result: 'Visible focus ring meeting WCAG AA contrast' },
      { criteria: 'Screen Readers', result: 'ARIA live regions for confirmation state changes' }
    ],

    crossFunctional: [
      { team: 'ML Engineering', action: '4 rounds of copy alignment to ensure plain-language restatements matched underlying query engine execution' },
      { team: 'Product & Founder', action: 'Pivoted at Month 3 to make filter state persist by default with confirmation safeguard' }
    ],

    businessImpact: [
      { val: '~2× faster', lbl: 'Decision-Ready Answers', desc: 'Cut steps roughly in half vs filter maze' },
      { val: '~20%', lbl: 'Weekly Active Engagement', desc: 'Up from under 5% of sessions' },
      { val: '↓ ~25–30%', lbl: 'Support Tickets', desc: 'Navigation-related tickets dropped' },
      { val: '~3.8 / 5', lbl: 'User Confidence', desc: 'Increased from ~2.9 baseline' }
    ],

    lessonsLearned: [
      { num: '01', title: 'A confirmable interpretation beats a confident-sounding answer.', desc: 'Our first instinct was to make the AI\'s tone reassuring; what actually built trust was letting users see and edit the literal interpretation before anything ran.' },
      { num: '02', title: 'Implicit context needs an explicit safeguard, not a ban.', desc: 'Carrying filters forward automatically felt risky until it was paired with the confirmation step — the combination, not either alone, is what worked.' },
      { num: '03', title: 'Chat-first doesn\'t mean text-only.', desc: 'Treating the conversation as the primary surface only worked once results could render inline, at full fidelity, without forcing users out to a separate report view.' }
    ]
  },
  {
    id: 'ai-banking',
    num: '04',
    title: 'AI Banking Assistant',
    subtitle: 'Intelligent Financial Advisor Powered by Contextual AI for Personalized Banking',
    desc: 'Designing a trust-first AI banking assistant that delivers personalized financial insights, proactive fraud alerts, and natural language account management.',
    company: 'NeoBank Digital',
    product: 'AI-Powered Personal Banking Assistant',
    category: 'AI × Banking',
    role: 'Lead Product Designer',
    duration: '10 months (2024–2025)',
    year: '2024–2025',
    team: '1 PM, 1 Lead Designer (Me), 2 ML Engineers, 3 Full-Stack Engineers, 1 Compliance Officer',
    platforms: 'iOS App, Android App, Responsive Web',
    responsibilities: 'Conversational UX Strategy, Trust Framework Design, AI Transparency Patterns, Cross-Platform Design System, Usability Testing',
    status: 'LIVE',
    statusColor: '#F59E0B',
    latency: '120ms',
    accentColor: '#F59E0B',
    readTime: '7 min read',
    tagCategory: 'ai-banking',

    heroImage: '/assets/light_bank_dashboard.jpg',
    mockups: [
      '/assets/light_bank_dashboard.jpg',
      '/assets/bank_transfer.jpg',
      '/assets/light_bank_success.jpg',
      '/assets/bank_dashboard.jpg'
    ],

    heroMetrics: [
      { val: '↑42%', lbl: 'Daily Active Users', detail: 'Engagement spike from AI financial insights' },
      { val: '↓55%', lbl: 'Fraud Response Time', detail: 'Proactive alerts reduced detection window' },
      { val: '4.8/5', lbl: 'App Store Rating', detail: 'Highest-rated AI banking feature' },
      { val: '↓38%', lbl: 'Support Call Volume', detail: 'Self-serve AI resolved common queries' }
    ],

    execSummary: `NeoBank Digital serves 2.4M retail banking customers across North America. Before this initiative, customers relied on static dashboards and manual searches to understand their financial health, missed critical fraud alerts buried in notification noise, and had to call support for routine account inquiries.\n\nAs Lead Product Designer, I designed an AI-powered banking assistant that uses contextual financial data to deliver proactive insights ("You're spending 23% more on dining this month"), real-time fraud detection with transparent explainability, and natural language account management — all within a trust-first conversational interface.`,

    challenges: [
      { id: '1', title: 'Trust Deficit with AI in Finance', desc: 'Users were deeply skeptical of AI making financial recommendations — 78% said they wouldn\'t trust automated financial advice.' },
      { id: '2', title: 'Notification Fatigue', desc: 'Existing alert systems generated 15+ notifications daily, causing users to disable them — including critical fraud alerts.' },
      { id: '3', title: 'Complex Query Resolution', desc: 'Simple questions like "Can I afford a vacation next month?" required navigating 4 separate screens and manual calculations.' }
    ],

    solutionMetrics: [
      { label: 'Financial Insight Delivery', old: 'Static Dashboard', new: 'Proactive AI Alerts', growth: 'Context-aware' },
      { label: 'Fraud Detection UX', old: '6hr avg response', new: '< 30 seconds', growth: '720x faster' },
      { label: 'Query Resolution', old: '4 screens', new: '1 conversation', growth: '75% fewer steps' }
    ],

    researchMethods: [
      { method: 'Diary Study (4 weeks)', desc: 'Tracked 24 users\' daily banking interactions and pain points.' },
      { method: 'Competitive Benchmarking', desc: 'Analyzed AI features in 8 leading neobanks and fintech apps.' }
    ],

    researchInsights: [
      { text: 'Users want AI to explain WHY, not just WHAT — "Why is this flagged?" was the #1 question.', metric: '91% of participants' },
      { text: 'Proactive nudges are only trusted when users can see the data source behind them.', metric: '86% preference rate' }
    ],

    howMightWe: [
      'How might we make AI financial advice feel trustworthy enough for users to act on it?',
      'How might we surface critical alerts without contributing to notification fatigue?'
    ],

    designPrinciples: [
      { title: 'Transparency First', desc: 'Every AI recommendation must show its reasoning and data sources.' },
      { title: 'Progressive Trust', desc: 'Start with low-stakes insights before recommending high-impact actions.' },
      { title: 'Contextual Intelligence', desc: 'Surface information based on user behavior patterns, not just raw data.' }
    ],

    ideationNotes: 'Explored multiple trust-building patterns: confidence scores, source attribution, and "AI thinking" transparency animations. Settled on a layered disclosure model — summary → reasoning → raw data.',

    infoArchitecture: [
      { node: 'AI Home Feed', desc: 'Personalized financial insights stream' },
      { node: 'Fraud Shield', desc: 'Real-time transaction monitoring and alerts' },
      { node: 'Ask Anything', desc: 'Natural language banking query interface' }
    ],

    wireframeSpecs: [
      { title: 'V1 Card-Based Feed', desc: 'Static insight cards without interaction (Rejected: felt like another dashboard).' },
      { title: 'V2 Conversational + Proactive', desc: 'Hybrid chat + proactive card feed with trust indicators (Approved: balanced engagement + trust).' }
    ],

    tokenSystem: [
      { type: 'Trust Indicators', count: '5', desc: 'Visual confidence levels from AI-generated to verified data.' },
      { type: 'Alert Severity Palette', count: '4', desc: 'Critical/High/Medium/Info gradient for prioritized notifications.' },
      { type: 'Financial Data Typography', count: '8', desc: 'Tabular lining numerals for account balances and transactions.' }
    ],

    accessibilityAudit: [
      { criteria: 'Voice Control', result: 'Full voice navigation support for hands-free banking.' },
      { criteria: 'Dynamic Type', result: 'All text scales with system accessibility settings on iOS/Android.' }
    ],

    crossFunctional: [
      { team: 'ML Engineering', action: 'Co-designed the confidence scoring model and explainability output format.' },
      { team: 'Compliance & Legal', action: 'Ensured all AI-generated financial advice included required regulatory disclaimers.' }
    ],

    businessImpact: [
      { val: '↑42%', lbl: 'DAU Increase', desc: 'Daily active users engaging with AI features' },
      { val: '↓55%', lbl: 'Fraud Response', desc: 'Average time to user action on fraud alerts' },
      { val: '4.8★', lbl: 'App Rating', desc: 'Highest-rated feature in App Store reviews' },
      { val: '↓38%', lbl: 'Support Calls', desc: 'Reduced volume for routine inquiries' }
    ],

    lessonsLearned: [
      { num: '01', title: 'Trust is earned in micro-moments, not grand gestures.', desc: 'Small transparency touches (showing data sources) had more impact than elaborate explainability features.' },
      { num: '02', title: 'AI personality needs guardrails in finance.', desc: 'We tested friendly vs. clinical tones — users wanted warmth for insights but clinical precision for transactions.' }
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


const RevlitixCaseStudy = ({ selectedProject, handleCopyToken, copiedToken, onZoomImage }) => {
  return (
    <div className="space-y-16">
      
      {/* SECTION 1: HERO & EXECUTIVE OVERVIEW */}
      <motion.section 
        id="sec-overview" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-10 relative overflow-hidden group hover:shadow-lg transition-all duration-300 font-dm"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <span className="text-[11px] font-mono font-normal tracking-widest uppercase px-4 py-1.5 rounded-full bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/20">
            {selectedProject.category}
          </span>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse bg-emerald-500" />
            <span className="text-[12px] font-mono font-normal text-slate-700">{selectedProject.status} · {selectedProject.latency}</span>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-[40px] sm:text-[60px] font-normal tracking-[-0.04em] leading-[1.05] text-slate-950 font-fragment">
            {selectedProject.title}
          </h1>
          <p className="text-[20px] sm:text-[24px] font-normal text-[#007AFF] leading-snug font-fragment">
            {selectedProject.subtitle}
          </p>
          <p className="text-[16px] text-slate-600 leading-relaxed font-normal max-w-4xl font-dm">
            {selectedProject.desc}
          </p>
        </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-slate-50 to-purple-50/60 border border-slate-200/80 shadow-apple-sm">
            <p className="text-[16.5px] sm:text-[18px] text-slate-800 leading-[1.7] font-normal">
              Revlitix is a go-to-market (GTM) analytics platform that unifies data from over 50 tools in a customer's tech stack — Salesforce, HubSpot, Google Analytics, and others — into real-time insights and automated reporting, so revenue teams can make decisions without manually stitching together spreadsheets.
            </p>
          </div>

        {/* 4-Column Metadata Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/60 text-[13px] font-dm">
          <div>
            <span className="block text-[10px] font-mono uppercase text-slate-400 font-normal">Role</span>
            <span className="font-normal text-slate-900">{selectedProject.role}</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono uppercase text-slate-400 font-normal">Team</span>
            <span className="font-normal text-slate-900">{selectedProject.team}</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono uppercase text-slate-400 font-normal">Duration</span>
            <span className="font-normal text-slate-900">{selectedProject.duration}</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono uppercase text-slate-400 font-normal">Platform</span>
            <span className="font-normal text-slate-900">{selectedProject.platforms}</span>
          </div>
        </div>

        {/* Video Player Container */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-apple-lg bg-slate-950 transition-all duration-350 hover:shadow-indigo-500/10 my-4">
          <CaseStudyVideoPlayer 
            videoUrl="/assets/Revlitix.mp4" 
            poster="/assets/revlitix_video_thumbnail.jpg"
            title="Revlitix Platform Overview" 
            subtitle="Consolidating 50+ data sources into actionable decision views" 
          />
        </div>


      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 2: THE PROBLEM */}
      <motion.section 
        id="sec-problem" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">02 // THE PROBLEM</span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-normal text-slate-950 tracking-tight leading-tight font-fragment">
          Grounded in the People Living with It
        </h2>

        <p className="text-[15.5px] sm:text-[16px] text-slate-600 leading-relaxed font-normal font-dm">
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
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-[10px] font-mono font-bold flex items-center justify-center">R1</span>
              <div>
                <strong className="text-[12px] text-slate-900 block font-bold">RevOps Lead</strong>
                <span className="text-[10px] text-slate-500 block">Mid-Market B2B SaaS</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <span className="text-[48px] text-rose-300/40 absolute top-2 right-3 select-none leading-none">“</span>
            <p className="text-[14px] italic text-slate-800 relative z-10 leading-relaxed">
              "Every Monday started with three tabs open, manually pasting numbers into a spreadsheet to answer one question."
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-[10px] font-mono font-bold flex items-center justify-center">R2</span>
              <div>
                <strong className="text-[12px] text-slate-900 block font-bold">VP Marketing</strong>
                <span className="text-[10px] text-slate-500 block">Growth-Stage Account</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <span className="text-[48px] text-rose-300/40 absolute top-2 right-3 select-none leading-none">“</span>
            <p className="text-[14px] italic text-slate-800 relative z-10 leading-relaxed">
              "We had an AI feature, but nobody clicked it because it lived off in its own tab. It felt like homework."
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-[10px] font-mono font-bold flex items-center justify-center">R3</span>
              <div>
                <strong className="text-[12px] text-slate-900 block font-bold">Marketing Analyst</strong>
                <span className="text-[10px] text-slate-500 block">Enterprise Account</span>
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

        <div className="space-y-4 text-slate-600 font-dm">
          <h3 className="text-[18px] font-normal text-slate-950 font-fragment">Restated at Product Scale</h3>
          <p className="text-[15.5px] leading-relaxed">
            Eighteen months in, the product had grown into four separate modules — Pipeline, Spend, Cohorts, and AI Insights — each shipped independently, each solving its own problem well in isolation but not together. Answering a question like <em>"why did pipeline dip in APAC this quarter?"</em> meant opening three modules, holding the numbers in your head, and doing the math yourself. The AI Insights tab, meant to be the product's core differentiator, sat isolated behind its own navigation item and was rarely opened.
          </p>

          <h3 className="text-[18px] font-normal text-slate-950 font-fragment pt-2">Quantifying the Baseline Before Proposing Solutions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-1.5">
              <span className="text-[10.5px] font-mono text-slate-500 uppercase font-normal block">AI INSIGHTS CTR</span>
              <strong className="text-[26px] font-normal text-[#007AFF] block font-fragment">&lt; 5%</strong>
              <span className="text-[12px] text-slate-500 block">of weekly active sessions</span>
            </div>
            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-1.5">
              <span className="text-[10.5px] font-mono text-slate-500 uppercase font-normal block">CLICKS TO ANSWER</span>
              <strong className="text-[26px] font-normal text-[#007AFF] block font-fragment">5–6 Clicks</strong>
              <span className="text-[12px] text-slate-500 block">for cross-module answers</span>
            </div>
            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-1.5">
              <span className="text-[10.5px] font-mono text-slate-500 uppercase font-normal block">NAVIGATION TICKETS</span>
              <strong className="text-[26px] font-normal text-[#007AFF] block font-fragment">Trending Up</strong>
              <span className="text-[12px] text-slate-500 block">over 2 consecutive quarters</span>
            </div>
          </div>
          <p className="text-[13.5px] italic text-slate-400 font-dm">
            These numbers became the scorecard I'd be held accountable to later.
          </p>
        </div>

        {/* Slide Image 02 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/2.jpg', 'Fig 2.1 — Baseline Friction & Fragmented User Journey Map')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/revlitix_slides/2.jpg" 
            alt="Fig 2.1 — Baseline Friction & Fragmented User Journey Map" 
            className="w-full h-auto object-contain block group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 2.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">Baseline Friction & Fragmented User Journey Map</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 3: SUCCESS METRICS */}
      <motion.section 
        id="sec-metrics" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">03 // SUCCESS METRICS</span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-normal text-slate-950 tracking-tight leading-tight font-fragment">
          Defining What "Solved" Looks Like
        </h2>

        <p className="text-[15.5px] sm:text-[16px] text-slate-600 leading-relaxed font-normal font-dm">
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
          <p className="text-[20px] font-display font-semibold text-[#EEF2FF] leading-snug relative z-10">
            Reduce average time-to-first-actionable-insight from <span className="text-rose-300 underline underline-offset-4 decoration-rose-400/50">14 minutes</span> to under <span className="text-emerald-300 underline underline-offset-4 decoration-emerald-400/50">3 minutes</span> per session.
          </p>
          <p className="text-[13.5px] text-slate-300 relative z-10 leading-relaxed max-w-2xl">
            (Measured as log-in timestamp to first export, alert trigger, or cross-filter action)
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

        {/* Slide Image 03 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/3.jpg', 'Fig 3.1 — Time-to-Insight & Success Metrics Scorecard')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/revlitix_slides/3.jpg" 
            alt="Fig 3.1 — Time-to-Insight & Success Metrics Scorecard" 
            className="w-full h-auto object-contain block group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 3.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">Time-to-Insight & Success Metrics Scorecard</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 4: RESEARCH */}
      <motion.section 
        id="sec-research" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">04 // RESEARCH</span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-normal text-slate-950 tracking-tight leading-tight font-fragment">
          Contextual Inquiry & Root-Cause Audits
        </h2>

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

        {/* Slide Image 04 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/4.jpg', 'Fig 4.1 — Contextual Inquiry & Funnel Analysis Findings')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/revlitix_slides/4.jpg" 
            alt="Fig 4.1 — Contextual Inquiry & Funnel Analysis Findings" 
            className="w-full h-auto object-contain block group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 4.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">Contextual Inquiry & Funnel Analysis Findings</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 5: INSIGHTS */}
      <motion.section 
        id="sec-insights" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">05 // INSIGHTS</span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-normal text-slate-950 tracking-tight leading-tight font-fragment">
          Three Strategic Shift Principles
        </h2>

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

        {/* Slide Image 05 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/5.jpg', 'Fig 5.1 — Core Strategic Insight Principles')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/revlitix_slides/5.jpg" 
            alt="Fig 5.1 — Core Strategic Insight Principles" 
            className="w-full h-auto object-contain block group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 5.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">Core Strategic Insight Principles</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 6: PRIORITIZATION */}
      <motion.section 
        id="sec-prioritization" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">06 // PRIORITIZATION</span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-normal text-slate-950 tracking-tight leading-tight font-fragment">
          Impact vs. Feasibility Framework
        </h2>

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

        {/* Slide Image 06 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/6.jpg', 'Fig 6.1 — Impact vs. Feasibility Trade-Off Matrix')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/revlitix_slides/6.jpg" 
            alt="Fig 6.1 — Impact vs. Feasibility Trade-Off Matrix" 
            className="w-full h-auto object-contain block group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 6.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">Impact vs. Feasibility Trade-Off Matrix</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 7: DESIGN PRINCIPLES */}
      <motion.section 
        id="sec-principles" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">07 // DESIGN PRINCIPLES</span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-normal text-slate-950 tracking-tight leading-tight font-fragment">
          Review Criteria for Design Critiques
        </h2>

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

        {/* Slide Image 07 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/7.jpg', 'Fig 7.1 — Design Review Criteria & System Rules')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/revlitix_slides/7.jpg" 
            alt="Fig 7.1 — Design Review Criteria & System Rules" 
            className="w-full h-auto object-contain block group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 7.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">Design Review Criteria & System Rules</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 8: FLATTENED FLOW & IA */}
      <motion.section 
        id="sec-ia" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">08 // FLATTENED FLOW & IA</span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-normal text-slate-950 tracking-tight leading-tight font-fragment">
          From Fragmented IA to a 2-Step Flow
        </h2>

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

        {/* Slide Image 08 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/8.jpg', 'Fig 8.1 — Information Architecture & Layout Exploration')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/revlitix_slides/8.jpg" 
            alt="Fig 8.1 — Information Architecture & Layout Exploration" 
            className="w-full h-auto object-contain block group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 8.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">Information Architecture & Layout Exploration</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 9: HIGH-FIDELITY DESIGN */}
      <motion.section 
        id="sec-hifi" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">09 // HIGH-FIDELITY DESIGN</span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-normal text-slate-950 tracking-tight leading-tight font-fragment">
          Core Interface Screens & System Primitives
        </h2>

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

        {/* Slide Image 09 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/9.jpg', 'Fig 9.1 — High-Fidelity Decision Home & Consolidated Views')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/revlitix_slides/9.jpg" 
            alt="Fig 9.1 — High-Fidelity Decision Home & Consolidated Views" 
            className="w-full h-auto object-contain block group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 9.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">High-Fidelity Decision Home & Consolidated Views</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 10: POLISH & ACCESSIBILITY */}
      <motion.section 
        id="sec-polish" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">10 // POLISH & ACCESSIBILITY</span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-normal text-slate-950 tracking-tight leading-tight font-fragment">
          Edge Cases, Focus States & WCAG Compliance
        </h2>

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
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/revlitix_slides/10.jpg" 
            alt="Fig 10.1 — Micro-Interactions, Edge States & WCAG AA Audit" 
            className="w-full h-auto object-contain block group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 10.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">Micro-Interactions, Edge States & WCAG AA Audit</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 11: ITERATION & BUSINESS IMPACT */}
      <motion.section 
        id="sec-impact" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">11 // ITERATION & BUSINESS IMPACT</span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-normal text-slate-950 tracking-tight leading-tight font-fragment">
          Collaboration, Pivots & Proven Results
        </h2>

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
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/revlitix_slides/11.jpg" 
            alt="Fig 11.1 — Usability Pivots & Quantified Business Impact Scorecard" 
            className="w-full h-auto object-contain block group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 11.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">Usability Pivots & Quantified Business Impact Scorecard</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      <div className="section-divider my-4"><span className="divider-dot" /></div>

      {/* SECTION 12: RETROSPECTIVE & TAKEAWAY */}
      <motion.section 
        id="sec-lessons" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">12 // RETROSPECTIVE</span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-normal text-slate-950 tracking-tight leading-tight font-fragment">
          What I'd Do Differently & Key Takeaway
        </h2>

        <div className="space-y-4 text-slate-700">
          <p>
            Two things, with the benefit of hindsight. First, I'd run the keyboard-navigation and screen-reader validation earlier in the process — it was treated as a late-stage check rather than a constraint on the initial design, and we got lucky the final layout held up rather than designing for it from the start. Second, I'd bring the two enterprise accounts into research earlier, before the IA flattening was already in build — their pushback was resolved well, but it could have been designed around from day one rather than negotiated after the fact.
          </p>

          <div className="bg-gradient-to-r from-indigo-50/80 via-purple-50/40 to-white p-6 sm:p-8 rounded-2xl border border-indigo-200 mt-4 text-[15px] sm:text-[16px] leading-relaxed text-indigo-950 font-normal relative overflow-hidden shadow-sm border border-black/[0.04] shadow-xs animate-border-glow">
            <strong className="text-[11px] font-mono font-extrabold text-[#4F46E5] uppercase tracking-widest block mb-2 leading-none">// THE TAKEAWAY I'D LEAD WITH IN AN INTERVIEW</strong>
            "The biggest lever in this project wasn't a UI pattern — it was killing an in-progress feature (the customizable dashboard builder) because research contradicted the team's working assumption, and having the standing to make that call before more engineering time was spent on it. Every visual and interaction decision that followed was downstream of that harder call, not the other way around."
          </div>
        </div>

        {/* Slide Image 12 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/revlitix_slides/12.jpg', 'Fig 12.1 — Key Retrospective Takeaways & Interview Summary')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/revlitix_slides/12.jpg" 
            alt="Fig 12.1 — Key Retrospective Takeaways & Interview Summary" 
            className="w-full h-auto object-contain block group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 12.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">Key Retrospective Takeaways & Interview Summary</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   REVLITIX SONIC — COMPLETE 12-SECTION CASE STUDY COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */
const SonicCaseStudy = ({ selectedProject, handleCopyToken, copiedToken, onZoomImage }) => {
  return (
    <div className="space-y-16">

      {/* SECTION 1: HERO */}
      <motion.section 
        id="sec-overview"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-10 relative overflow-hidden group hover:shadow-lg transition-all duration-300 font-dm"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <span className="text-[11px] font-mono font-normal tracking-widest uppercase px-4 py-1.5 rounded-full bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/20">
            {selectedProject.category}
          </span>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse bg-emerald-500" />
            <span className="text-[12px] font-mono font-normal text-slate-700">{selectedProject.status} · {selectedProject.latency}</span>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-[40px] sm:text-[60px] font-normal tracking-[-0.04em] leading-[1.05] text-slate-950 font-fragment">
            {selectedProject.title}
          </h1>
          <p className="text-[20px] sm:text-[24px] font-normal text-[#007AFF] leading-snug font-fragment">
            {selectedProject.subtitle}
          </p>
          <p className="text-[16px] text-slate-600 leading-relaxed font-normal max-w-4xl font-dm">
            {selectedProject.desc}
          </p>
        </div>

        {/* 4-Column Metadata Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/60 text-[13px] font-dm">
          <div>
            <span className="block text-[10px] font-mono uppercase text-slate-400 font-normal">Role</span>
            <span className="font-normal text-slate-900">{selectedProject.role}</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono uppercase text-slate-400 font-normal">Team</span>
            <span className="font-normal text-slate-900">{selectedProject.team}</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono uppercase text-slate-400 font-normal">Duration</span>
            <span className="font-normal text-slate-900">{selectedProject.duration}</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono uppercase text-slate-400 font-normal">Platform</span>
            <span className="font-normal text-slate-900">{selectedProject.platforms}</span>
          </div>
        </div>

        {/* Video Player Container — Section 01 Main Video Showcase */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-apple-lg bg-slate-950 transition-all duration-350 hover:shadow-blue-500/10 my-4">
          <CaseStudyVideoPlayer 
            videoUrl="/assets/Sonic.mp4" 
            poster="/assets/sonic_listing_thumbnail.jpg"
            title="REVLITIX SONIC — Conversational AI Layer Overview" 
            subtitle="Ask a question. Confirm what it means. Trust the answer." 
          />
        </div>

        {/* Hero Interactive Preview Mockup (MacBook style with confirmation step) */}
        <div className="cs-figure-frame rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-950 p-6 sm:p-8 space-y-6 text-white relative font-dm">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-[12px] font-mono text-slate-400 ml-2">Sonic Conversational Layer — Live Query Execution</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[11px] font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Region: APAC (Filter Carried)
            </div>
          </div>

          <div className="space-y-4">
            {/* Input message bubble */}
            <div className="flex justify-end">
              <div className="bg-[#007AFF] text-white px-5 py-3 rounded-2xl text-[14.5px] max-w-md font-normal shadow-sm">
                Show me lead sources by campaign this quarter
              </div>
            </div>

            {/* Confirmation step card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl space-y-3 max-w-xl text-left">
              <div className="flex items-center justify-between text-[11px] font-mono text-blue-300">
                <span>CONFIRMATION CHECKPOINT</span>
                <span className="cursor-pointer hover:underline text-white/80">Edit Query ✎</span>
              </div>
              <p className="text-[14px] text-slate-100 font-normal">
                Showing lead sources, grouped by campaign for <span className="text-blue-300 font-normal">Q3 2026</span> with global filter <span className="text-emerald-400 font-normal">Region: APAC</span>.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <button className="bg-[#007AFF] text-white text-[12px] px-4 py-1.5 rounded-lg font-normal hover:bg-[#0066CC] transition-colors">
                  Looks right →
                </button>
                <span className="text-[11px] text-slate-400 font-mono">Verifying interpretation before rendering data</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
            <div>
              <span className="text-[28px] sm:text-[36px] font-normal text-[#007AFF] block font-fragment">~2× faster</span>
              <span className="text-[12px] font-mono text-slate-600 uppercase tracking-wider">Faster Access to Decision-Ready Answer</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">vs. filter navigation</span>
          </div>
          <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
            <div>
              <span className="text-[28px] sm:text-[36px] font-normal text-emerald-600 block font-fragment">Under 5% → ~20%</span>
              <span className="text-[12px] font-mono text-slate-600 uppercase tracking-wider">Weekly AI Feature Engagement</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Real adoption</span>
          </div>
        </div>


      </motion.section>

      {/* SECTION 2: EXECUTIVE SUMMARY & CONTEXT */}
      <motion.section 
        id="sec-problem"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">02 // EXECUTIVE SUMMARY & CONTEXT</span>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-white p-6 sm:p-8 rounded-2xl border border-blue-200/70 text-[17px] leading-relaxed text-slate-900 font-normal italic font-fragment">
          "{selectedProject.pullQuote}"
        </div>

        <div className="space-y-4 text-[15.5px] text-slate-600 leading-relaxed font-normal font-dm">
          <p>
            Revlitix unifies GTM data from 50+ tools into one platform. As the dataset and the number of ways to slice it grew, adding more filters and tabs stopped scaling — getting a specific answer meant navigating dropdowns, applying filters, and knowing which of roughly 40 metrics to select.
          </p>
          <p>
            Natural-language input could remove that friction, but early prototypes surfaced a new problem: users didn't trust an AI-generated answer they couldn't verify. A CMO asking "which lead sources are underperforming" needed to know Sonic hadn't silently misread "underperforming" as "declining" instead of "below quota."
          </p>
          <p>
            We designed Sonic around three decisions: a <strong className="font-normal text-slate-950">chat-first information architecture</strong>, a <strong className="font-normal text-slate-950">confirm-before-commit pattern</strong>, and <strong className="font-normal text-slate-950">global filter consistency</strong>. Together, these meaningfully cut the number of steps to an answer and drove real adoption of the AI feature.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60">
            <span className="text-[24px] font-normal text-slate-950 block font-fragment">↓ ~25–30%</span>
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Navigation-Related Support Tickets</span>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60">
            <span className="text-[24px] font-normal text-slate-950 block font-fragment">~2.9 → ~3.8 / 5</span>
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">User Confidence Rating Lift</span>
          </div>
        </div>

        {/* Slide Figure 2 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/sonic_slides/2.jpg', 'Fig 2.1 — Executive Summary & Query Confirmation Architecture')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/sonic_slides/2.jpg" 
            alt="Fig 2.1 — Sonic Executive Summary" 
            className="w-full h-auto object-contain group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 2.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">Executive Summary & Query Confirmation Architecture</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      {/* SECTION 3: THE CHALLENGE (The "Before" State) */}
      <motion.section 
        id="sec-research"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-950 text-white border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl space-y-8 font-dm relative overflow-hidden"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-blue-400 uppercase tracking-widest">03 // THE CHALLENGE (THE "BEFORE" STATE)</span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-normal text-white tracking-tight leading-tight font-fragment">
          The filter bar was a bottleneck — and skipping it created a new one.
        </h2>
        <p className="text-[15.5px] text-slate-300 leading-relaxed max-w-4xl font-normal font-dm">
          To answer "which campaigns drove pipeline last month," users needed schema knowledge — where the data lived, which of ~40 metrics applied, which date-range control to use. Early attempts to bypass this with a plain chat box created a worse problem: users had no way to tell whether the AI read "last month" as calendar month vs trailing 30 days, or whether it quietly ignored active filters.
        </p>

        {/* Annotations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-[11px] font-mono text-red-400 block font-normal">ANNOTATION 01</span>
            <h4 className="text-[16px] font-normal text-white font-fragment">30-Option Dropdowns</h4>
            <p className="text-[13px] text-slate-400 font-dm">Required deep schema knowledge to locate the correct target tables.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-[11px] font-mono text-amber-400 block font-normal">ANNOTATION 02</span>
            <h4 className="text-[16px] font-normal text-white font-fragment">"Apply" Render Delays</h4>
            <p className="text-[13px] text-slate-400 font-dm">High friction and long wait times for rendering every minor filter change.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-[11px] font-mono text-[#007AFF] block font-normal">ANNOTATION 03</span>
            <h4 className="text-[16px] font-normal text-white font-fragment">Context Reset</h4>
            <p className="text-[13px] text-slate-400 font-dm">Previously set region filters greyed out and lost between screens.</p>
          </div>
        </div>

        {/* Slide Figure 3 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/sonic_slides/3.jpg', 'Fig 3.1 — Schema Bottlenecks & Filter Bar Friction')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-slate-900 my-6 cursor-pointer group relative border border-white/10"
        >
          <img 
            src="/assets/sonic_slides/3.jpg" 
            alt="Fig 3.1 — Sonic Filter Bar Challenge" 
            className="w-full h-auto object-contain group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-950/90 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-[12.5px] font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.4)]" />
              <span className="font-bold text-white">Fig 3.1</span>
              <span className="text-slate-600">•</span>
              <span className="font-medium text-slate-300">Schema Bottlenecks & Filter Bar Friction</span>
            </div>
            <span className="text-[11px] font-bold text-blue-400 group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      {/* SECTION 4: RESEARCH (The Evidence Wall) */}
      <motion.section 
        id="sec-insights"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">04 // RESEARCH (THE EVIDENCE WALL)</span>
        </div>
        <h2 className="text-[30px] sm:text-[38px] font-normal text-slate-950 tracking-tight leading-tight font-fragment">
          What we heard during contextual inquiry
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-amber-50 border border-amber-200/80 p-6 rounded-2xl text-amber-950 font-normal italic font-fragment">
              "I don't know if that's actually what I asked for."
            </div>
            <p className="text-[14.5px] text-slate-600 leading-relaxed font-normal font-dm">
              Structured contextual inquiry across ~8 sessions with existing customers, paired with usability testing on early chat prototypes, revealed users typed questions but refused to act on unverified AI answers.
            </p>
          </div>

          <div className="lg:col-span-7 bg-slate-50 border border-slate-200/60 p-6 rounded-2xl space-y-4">
            <span className="text-[11px] font-mono uppercase text-slate-400 block font-normal">// EVIDENCE OBSERVATIONS</span>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-xl border border-slate-200/70 text-[13.5px] text-slate-700">
                <strong className="text-slate-950 font-normal">Pattern 1:</strong> Users got an AI chart but immediately manually re-checked raw database tables to verify if "underperforming" matched company quota metrics.
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200/70 text-[13.5px] text-slate-700">
                <strong className="text-slate-950 font-normal">Pattern 2:</strong> Users who set a regional filter on the main dashboard assumed Sonic carried that filter forward, causing silent misread errors when context reset.
              </div>
            </div>
          </div>
        </div>

        {/* Slide Figure 4 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/sonic_slides/4.jpg', 'Fig 4.1 — Contextual Inquiry Observations & Trust Deficit Findings')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/sonic_slides/4.jpg" 
            alt="Fig 4.1 — Sonic Research Evidence" 
            className="w-full h-auto object-contain group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 4.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">Contextual Inquiry Observations & Trust Deficit Findings</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      {/* SECTION 5: INSIGHTS (The Reframes) */}
      <motion.section 
        id="sec-hmw"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">05 // INSIGHTS (THE REFRAMES)</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
            <span className="text-[12px] font-mono text-[#007AFF] block font-normal">INSIGHT 01</span>
            <h4 className="text-[17px] font-normal text-slate-950 font-fragment">Natural language solves typing, not understanding.</h4>
            <p className="text-[13.5px] text-slate-600 leading-relaxed font-dm">Speech input simplifies entry, but comprehension requires an explicit verification step before execution.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
            <span className="text-[12px] font-mono text-[#007AFF] block font-normal">INSIGHT 02</span>
            <h4 className="text-[17px] font-normal text-slate-950 font-fragment">Unseen interpretation is a black box.</h4>
            <p className="text-[13.5px] text-slate-600 leading-relaxed font-dm">Sealed answers create user anxiety. A plain-language editable restatement opens the box for user trust.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
            <span className="text-[12px] font-mono text-[#007AFF] block font-normal">INSIGHT 03</span>
            <h4 className="text-[17px] font-normal text-slate-950 font-fragment">Filter state is part of the question.</h4>
            <p className="text-[13.5px] text-slate-600 leading-relaxed font-dm">Filters set elsewhere on the dashboard must travel attached to the conversation rather than resetting.</p>
          </div>
        </div>

        {/* Slide Figure 5 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/sonic_slides/5.jpg', 'Fig 5.1 — Core Strategic Reframes & Filter State Persistence')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/sonic_slides/5.jpg" 
            alt="Fig 5.1 — Sonic Insights Reframe" 
            className="w-full h-auto object-contain group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 5.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">Core Strategic Reframes & Filter State Persistence</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      {/* SECTION 6: PRIORITIZATION (How Might We) */}
      <motion.section 
        id="sec-principles"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">06 // PRIORITIZATION (HOW MIGHT WE)</span>
        </div>
        
        {/* 2D Scatter Matrix */}
        <div className="bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
            <span className="text-[13px] font-mono text-slate-700 font-normal">2D Scatter Matrix: Feasibility vs. Impact on Trust & Adoption</span>
            <span className="text-[11px] font-mono text-slate-400">3 Committed HMWs</span>
          </div>

          <div className="space-y-4 font-dm">
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-[14px] text-emerald-950">
              <strong className="font-normal text-emerald-800">Committed 1:</strong> How might we let users see and correct the AI's interpretation before it runs? → Confirm-before-commit pattern.
            </div>
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-[14px] text-blue-950">
              <strong className="font-normal text-blue-800">Committed 2:</strong> How might we carry a user's existing filter context into the conversation automatically? → Global filter consistency.
            </div>
            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-[14px] text-indigo-950">
              <strong className="font-normal text-indigo-800">Committed 3:</strong> How might we make the conversation itself the primary surface, not a widget? → Chat-first IA.
            </div>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-[13.5px] text-slate-500 line-through">
              Deprioritized: Fully autonomous "just trust the AI" mode with no confirmation step — rejected directly by research.
            </div>
          </div>
        </div>

        {/* Slide Figure 6 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/sonic_slides/6.jpg', 'Fig 6.1 — 2D Feasibility vs. Impact Prioritization Matrix')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/sonic_slides/6.jpg" 
            alt="Fig 6.1 — Sonic Prioritization Matrix" 
            className="w-full h-auto object-contain group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 6.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">2D Feasibility vs. Impact Prioritization Matrix</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      {/* SECTION 7: DESIGN PRINCIPLES (The Guardrails) */}
      <motion.section 
        id="sec-architecture"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">07 // DESIGN PRINCIPLES (THE GUARDRAILS)</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-dm">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <h4 className="text-[16px] font-normal text-slate-950 font-fragment">1. Confirm, then commit.</h4>
            <p className="text-[13.5px] text-slate-600 leading-relaxed font-dm">No query executes against real data until the user has seen — and can edit — the system's plain-language interpretation.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <h4 className="text-[16px] font-normal text-slate-950 font-fragment">2. Context travels with the user.</h4>
            <p className="text-[13.5px] text-slate-600 leading-relaxed font-dm">Any filter already active elsewhere in the product is visibly present and applied inside the conversation.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <h4 className="text-[16px] font-normal text-slate-950 font-fragment">3. Chat is the surface, not a feature.</h4>
            <p className="text-[13.5px] text-slate-600 leading-relaxed font-dm">The conversation carries the same weight as the dashboard, not a secondary panel bolted onto it.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <h4 className="text-[16px] font-normal text-slate-950 font-fragment">4. Show your filters, not just your answer.</h4>
            <p className="text-[13.5px] text-slate-600 leading-relaxed font-dm">Every rendered result displays which filters and date range it actually used, so trust doesn't depend on memory.</p>
          </div>
        </div>

        {/* Slide Figure 7 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/sonic_slides/7.jpg', 'Fig 7.1 — Sonic Design Principles & Confirmation System Rules')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/sonic_slides/7.jpg" 
            alt="Fig 7.1 — Sonic Design Principles" 
            className="w-full h-auto object-contain group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 7.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">Sonic Design Principles & Confirmation System Rules</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      {/* SECTION 8: PROCESS (IA, Flows, Wireframes) */}
      <motion.section 
        id="sec-wireframes"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">08 // PROCESS (IA, FLOWS, WIREFRAMES)</span>
        </div>
        
        <div className="space-y-4 text-[15px] text-slate-600 leading-relaxed font-dm">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
            <span className="text-[11px] font-mono text-red-500 uppercase font-normal">Iteration 01 — Direct Answer (No Confirmation)</span>
            <p className="text-slate-800">AI answered immediately. Testing showed users lacked trust and refused to act on unverified results.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
            <span className="text-[11px] font-mono text-amber-500 uppercase font-normal">Iteration 02 — Confirmation Modal Popup</span>
            <p className="text-slate-800">Pop-up confirmation broke conversational flow and added a click users resented.</p>
          </div>
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1">
            <span className="text-[11px] font-mono text-[#007AFF] uppercase font-normal">Final Iteration — Inline Editable Restatement (Approved)</span>
            <p className="text-slate-950 font-normal">Inline card restates the query in plain language with independently editable clauses before chart execution.</p>
          </div>
        </div>

        {/* Slide Figure 8 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/sonic_slides/8.jpg', 'Fig 8.1 — Information Architecture & Inline Restatement Iterations')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/sonic_slides/8.jpg" 
            alt="Fig 8.1 — Sonic Process & Flows" 
            className="w-full h-auto object-contain group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 8.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">Information Architecture & Inline Restatement Iterations</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      {/* SECTION 9: HIGH-FIDELITY DESIGN (4 Views) */}
      <motion.section 
        id="sec-design-system"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-10 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">09 // HIGH-FIDELITY DESIGN (4 VIEWS)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-dm">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3 cursor-pointer group" onClick={() => onZoomImage && onZoomImage('/assets/sonic_slides/1.jpg', 'Fig 1.1 — Sonic Conversational Input & Persistent Filter Context')}>
            <div className="cs-figure-frame mb-3 overflow-hidden rounded-xl border border-slate-200">
              <img src="/assets/sonic_slides/1.jpg" alt="Sonic Input View" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <span className="text-[11px] font-mono text-[#007AFF] uppercase">VIEW 1 — CONVERSATIONAL INPUT</span>
            <h4 className="text-[18px] font-normal text-slate-950 font-fragment">Pill Input & Persistent Context</h4>
            <p className="text-[13.5px] text-slate-600 leading-relaxed font-dm">Carrying active region filters into the input bar eliminated "is this filtered right?" confusion.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3 cursor-pointer group" onClick={() => onZoomImage && onZoomImage('/assets/sonic_slides/2.jpg', 'Fig 2.1 — Inline Plain-Language Confirmation Checkpoint')}>
            <div className="cs-figure-frame mb-3 overflow-hidden rounded-xl border border-slate-200">
              <img src="/assets/sonic_slides/2.jpg" alt="Sonic Confirmation View" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <span className="text-[11px] font-mono text-[#007AFF] uppercase">VIEW 2 — CONFIRMATION STEP</span>
            <h4 className="text-[18px] font-normal text-slate-950 font-fragment">Inline Plain-Language Checkpoint</h4>
            <p className="text-[13.5px] text-slate-600 leading-relaxed font-dm">Each clause is independently editable with a single "Looks right" action before running.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3 cursor-pointer group" onClick={() => onZoomImage && onZoomImage('/assets/sonic_slides/3.jpg', 'Fig 3.1 — Full Viewport Visualization & Chart Engine')}>
            <div className="cs-figure-frame mb-3 overflow-hidden rounded-xl border border-slate-200">
              <img src="/assets/sonic_slides/3.jpg" alt="Sonic Inline Visualization" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <span className="text-[11px] font-mono text-[#007AFF] uppercase">VIEW 3 — INLINE VISUALIZATION</span>
            <h4 className="text-[18px] font-normal text-slate-950 font-fragment">Full Viewport Chat Bubble</h4>
            <p className="text-[13.5px] text-slate-600 leading-relaxed font-dm">Chat bubble expands to full viewport width containing styled interactive tables and charts.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3 cursor-pointer group" onClick={() => onZoomImage && onZoomImage('/assets/sonic_slides/4.jpg', 'Fig 4.1 — Sonic Atomic Component Design Tokens')}>
            <div className="cs-figure-frame mb-3 overflow-hidden rounded-xl border border-slate-200">
              <img src="/assets/sonic_slides/4.jpg" alt="Sonic Component System" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <span className="text-[11px] font-mono text-[#007AFF] uppercase">VIEW 4 — COMPONENT SYSTEM</span>
            <h4 className="text-[18px] font-normal text-slate-950 font-fragment">70–75% Component Reuse</h4>
            <p className="text-[13.5px] text-slate-600 leading-relaxed font-dm">Atomic tokens (ChatBubble, ConfirmationCard, FilterPill, InlineChart, SuggestionChip).</p>
          </div>
        </div>

        {/* Slide Figure 9 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/sonic_slides/9.jpg', 'Fig 9.1 — High-Fidelity Conversational Surface & Component System')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/sonic_slides/9.jpg" 
            alt="Fig 9.1 — Sonic High-Fidelity Design" 
            className="w-full h-auto object-contain group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 9.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">High-Fidelity Conversational Surface & Component System</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      {/* SECTION 10: POLISH, EDGE CASES & ACCESSIBILITY */}
      <motion.section 
        id="sec-edge-cases"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">10 // POLISH, EDGE CASES & ACCESSIBILITY</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-dm">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <h4 className="text-[15px] font-normal text-slate-950 font-fragment">Micro-Interactions</h4>
            <p className="text-[13px] text-slate-600 font-dm">Confirmation card resolves into charts with real-time preview updates when clauses are edited.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <h4 className="text-[15px] font-normal text-slate-950 font-fragment">Edge Case Conflicts</h4>
            <p className="text-[13px] text-slate-600 font-dm">Ambiguous queries prompt clarifying questions; EMEA vs APAC filter conflicts surface directly.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <h4 className="text-[15px] font-normal text-slate-950 font-fragment">WCAG AA Accessibility</h4>
            <p className="text-[13px] text-slate-600 font-dm">Full keyboard navigation (Tab/Enter/Arrow keys) with visible focus rings meeting WCAG AA contrast.</p>
          </div>
        </div>

        {/* Slide Figure 10 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/sonic_slides/10.jpg', 'Fig 10.1 — Micro-Interactions, Edge Case Conflict Handling & WCAG AA Audit')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/sonic_slides/10.jpg" 
            alt="Fig 10.1 — Sonic Edge Cases & Accessibility" 
            className="w-full h-auto object-contain group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 10.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">Micro-Interactions, Edge Case Conflict Handling & WCAG AA Audit</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      {/* SECTION 11: COLLABORATION & ITERATION */}
      <motion.section 
        id="sec-collaboration"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">11 // COLLABORATION & ITERATION</span>
        </div>
        
        <div className="space-y-4 text-[15px] text-slate-600 leading-relaxed font-normal font-dm">
          <p>
            <strong className="text-slate-950 font-normal">The Month 3 Pivot:</strong> Launched V1 without filter persistence, assuming explicit entry was safer. Testing showed restating regions was tedious. We rebuilt the input layer to persist filter state by default, paired with the confirmation step as a safeguard.
          </p>
          <p>
            <strong className="text-slate-950 font-normal">Cross-Functional ML Rhythm:</strong> Copy went through four rounds with ML engineers to ensure plain-language restatements matched underlying query execution logic exactly.
          </p>
        </div>

        {/* Slide Figure 11 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/sonic_slides/11.jpg', 'Fig 11.1 — Month 3 Pivot & Cross-Functional Engineering Rhythm')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/sonic_slides/11.jpg" 
            alt="Fig 11.1 — Sonic Collaboration & Pivot" 
            className="w-full h-auto object-contain group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 11.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">Month 3 Pivot & Cross-Functional Engineering Rhythm</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>
      </motion.section>

      {/* SECTION 12: BUSINESS IMPACT, LESSONS & WHAT'S NEXT */}
      <motion.section 
        id="sec-impact"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-10 font-dm"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#007AFF] uppercase tracking-widest">12 // BUSINESS IMPACT, LESSONS & WHAT'S NEXT</span>
        </div>

        {/* Business Impact Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100">
            <span className="text-[26px] font-normal text-[#007AFF] block font-fragment">~2× faster</span>
            <span className="text-[10.5px] font-mono text-slate-600 uppercase">Steps to Decision Answer</span>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <span className="text-[26px] font-normal text-emerald-600 block font-fragment">Under 5% → ~20%</span>
            <span className="text-[10.5px] font-mono text-slate-600 uppercase">AI Weekly Engagement</span>
          </div>
          <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-100">
            <span className="text-[26px] font-normal text-purple-600 block font-fragment">↓ ~25–30%</span>
            <span className="text-[10.5px] font-mono text-slate-600 uppercase">Support Tickets</span>
          </div>
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-100">
            <span className="text-[26px] font-normal text-amber-600 block font-fragment">~2.9 → ~3.8</span>
            <span className="text-[10.5px] font-mono text-slate-600 uppercase">User Confidence (1-5)</span>
          </div>
        </div>

        {/* Lessons Learned */}
        <div className="space-y-4">
          <h4 className="text-[18px] font-normal text-slate-950 font-fragment">Lessons Learned:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-dm">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <span className="text-[11px] font-mono text-[#007AFF]">LESSON 01</span>
              <p className="text-[13.5px] text-slate-700 font-dm">A confirmable interpretation beats a confident-sounding answer.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <span className="text-[11px] font-mono text-[#007AFF]">LESSON 02</span>
              <p className="text-[13.5px] text-slate-700 font-dm">Implicit context needs an explicit safeguard, not a ban.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <span className="text-[11px] font-mono text-[#007AFF]">LESSON 03</span>
              <p className="text-[13.5px] text-slate-700 font-dm">Chat-first doesn't mean text-only; full-fidelity inline results matter.</p>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 font-dm">
          <h4 className="text-[16px] font-normal text-slate-950 font-fragment">What's Next:</h4>
          <ul className="space-y-2 text-[14px] text-slate-600 list-disc list-inside">
            <li>Proactively flagging when a previously confirmed query's underlying data has shifted materially.</li>
            <li>Extending confirm-before-commit to write actions (e.g., updating a forecast), not just read queries.</li>
            <li>Letting a confirmation card itself become a saved, reusable query template.</li>
          </ul>
        </div>

        {/* Slide Figure 12 */}
        <div 
          onClick={() => onZoomImage && onZoomImage('/assets/sonic_slides/12.jpg', 'Fig 12.1 — Quantified Business Impact, Retrospective Lessons & Roadmap')}
          className="max-w-4xl mx-auto w-full cs-figure-frame bg-white my-6 cursor-pointer group relative"
        >
          <img 
            src="/assets/sonic_slides/12.jpg" 
            alt="Fig 12.1 — Sonic Business Impact & Lessons" 
            className="w-full h-auto object-contain group-hover:scale-[1.012] transition-transform duration-300" 
          />
          <div className="px-5 py-3.5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-[12.5px] font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] shadow-[0_0_6px_rgba(0,122,255,0.4)]" />
              <span className="font-bold text-slate-900">Fig 12.1</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">Quantified Business Impact, Retrospective Lessons & Roadmap</span>
            </div>
            <span className="text-[11px] font-bold text-[#007AFF] group-hover:translate-x-0.5 transition-transform duration-200">INSPECT HIGH-RES ⤢</span>
          </div>
        </div>

        {/* Final Closing Line Banner */}
        <div className="p-8 rounded-2xl bg-slate-950 text-white text-[18px] sm:text-[22px] font-normal text-center leading-relaxed font-fragment border border-slate-800">
          "Reduced cognitive load by replacing query builders with a conversation — and made that conversation trustworthy enough to act on."
        </div>
      </motion.section>

    </div>
  );
};

const MissionControlApp = ({ initialMission = null, onClose = null }) => {
  const [activeMission, setActiveMission] = useState(initialMission || null);
  const [activeSection, setActiveSection] = useState('sec-overview');
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

  // Landing page: Apple Light Mode with Glassmorphism Showcase
  if (!activeMission) {
    return (
      <div className="h-full bg-[#F5F5F7] text-[#1D1D1F] select-text flex flex-col overflow-y-auto relative" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif' }}>
        
        <div className="absolute top-0 left-1/4 w-[650px] h-[450px] bg-[#007AFF]/8 rounded-full blur-[150px] pointer-events-none" />
        <div className="px-6 sm:px-12 lg:px-16 xl:px-20 pt-12 pb-6 w-full text-left relative z-10">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
            className="text-left"
          >
            {/* Eyebrow Pill */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="text-[11px] font-mono font-normal text-[#007AFF] uppercase tracking-[0.2em] bg-[#007AFF]/10 px-4 py-1.5 rounded-full border border-[#007AFF]/20 backdrop-blur-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse" />
                SHIPPED UX CASE STUDIES
              </span>
              <span className="text-[11.5px] font-mono text-[#86868B] font-normal hidden sm:inline">
                {filteredMissions.length} Production Systems · 2022–2025
              </span>
            </motion.div>

            {/* Title */}
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="text-[42px] sm:text-[62px] lg:text-[76px] font-normal tracking-[-0.04em] text-[#0F172A] leading-[1.04] font-fragment"
              >
                Case Studies
              </motion.h1>
            </div>
            <div className="overflow-hidden mt-3">
              <motion.p
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="text-[17px] sm:text-[20px] text-slate-600 max-w-4xl leading-[1.65] font-normal font-dm"
              >
                End-to-end product design across <span className="text-[#007AFF] font-normal">B2B SaaS</span>, <span className="text-[#007AFF] font-normal">Commercial Banking</span>,{' '}
                <span className="text-[#007AFF] font-normal">Conversational AI</span>, and <span className="text-[#007AFF] font-normal">AI Banking</span> — grounded in qualitative user research and business impact.
              </motion.p>
            </div>
          </motion.div>

          {/* Light Glass Segmented Control Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-2.5 mt-8 overflow-x-auto pb-2"
          >
            {[
              { id: 'all', label: 'All Projects', count: 4 },
              { id: 'saas', label: 'B2B SaaS', count: 1 },
              { id: 'fintech', label: 'Fintech', count: 1 },
              { id: 'ai', label: 'AI/ML', count: 1 },
              { id: 'ai-banking', label: 'AI × Banking', count: 1 },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-mono font-normal transition-all cursor-pointer whitespace-nowrap backdrop-blur-md border ${
                  categoryFilter === cat.id
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md'
                    : 'bg-white/80 text-[#64748B] hover:text-[#0F172A] border-black/[0.06] hover:bg-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ═══════════════════ APPLE BENTO GRID SHOWCASE ═══════════════════ */}
        <div className="px-6 sm:px-12 lg:px-16 xl:px-20 pb-20 flex-1 w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredMissions.map((m, idx) => {
              const isFullWidth = idx === 0 || idx === 3;

              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 32, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`cs-card-3d ${isFullWidth ? 'col-span-1 md:col-span-2' : 'col-span-1'}`}
                >
                  <div
                    onClick={() => {
                      setActiveMission(m.id);
                      setActiveSection('sec-overview');
                    }}
                    className={`cs-card-3d-inner bg-white/90 backdrop-blur-2xl border border-white/90 rounded-[32px] overflow-hidden cursor-pointer group flex ${
                      isFullWidth ? 'flex-col lg:flex-row' : 'flex-col'
                    } h-full shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_60px_rgba(0,122,255,0.15)] hover:border-[#007AFF]/35 transition-all duration-500 relative`}
                  >
                    {/* Media Container */}
                    <div className={`relative overflow-hidden bg-slate-950 cs-parallax-img ${
                      isFullWidth ? 'w-full lg:w-3/5 aspect-[16/10]' : 'w-full aspect-[16/10]'
                    }`}>
                      <img
                        src={m.heroImage}
                        alt={m.title}
                        className="w-full h-full object-cover object-top block group-hover:scale-[1.04] transition-transform duration-700"
                        onError={(e) => {
                          if (m.mockups && m.mockups[0]) e.target.src = m.mockups[0];
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                      {/* Apple Blue Number Badge */}
                      <div className="absolute top-5 left-5 w-10 h-10 rounded-2xl flex items-center justify-center text-[14px] font-mono font-normal text-white shadow-xl z-10 backdrop-blur-md bg-[#007AFF]">
                        {m.num}
                      </div>

                      {/* Status Pill */}
                      <div className="absolute top-5 right-5 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 z-10">
                        <span className="w-2 h-2 rounded-full animate-pulse bg-emerald-500" />
                        <span className="text-[10.5px] font-mono font-normal text-white uppercase tracking-wider">{m.status}</span>
                      </div>

                      {/* Read Time Pill */}
                      <div className="absolute bottom-5 left-5 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[11px] font-mono font-normal text-white z-10">
                        {m.readTime}
                      </div>
                    </div>

                    {/* Bento Content Body */}
                    <div className={`p-8 sm:p-9 flex flex-col justify-between space-y-6 ${
                      isFullWidth ? 'w-full lg:w-2/5' : 'w-full flex-1'
                    }`}>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-normal uppercase tracking-[0.2em] text-[#007AFF] bg-[#007AFF]/10 px-3.5 py-1 rounded-full border border-[#007AFF]/20">
                            {m.category.split(' · ')[0]}
                          </span>
                          <span className="text-[11.5px] font-mono font-normal text-[#86868B]">{m.year}</span>
                        </div>

                        <h2 className="text-[28px] sm:text-[34px] font-normal text-slate-950 tracking-[-0.035em] leading-[1.08] group-hover:text-[#007AFF] transition-colors duration-300 font-fragment">
                          {m.title}
                        </h2>

                        <p className="text-[15px] sm:text-[15.5px] text-slate-600 leading-[1.65] line-clamp-3 font-normal font-dm">
                          {m.subtitle || m.desc}
                        </p>
                      </div>

                      {/* Specs / Hero Metrics Grid */}
                      {m.heroMetrics && (
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          {m.heroMetrics.slice(0, 2).map((metric, i) => (
                            <div key={i} className="bg-[#F8FAFC] backdrop-blur-sm p-4 rounded-2xl border border-black/[0.04] group-hover:bg-white group-hover:shadow-apple-sm transition-all duration-300">
                              <span className="text-[24px] sm:text-[28px] font-normal block leading-none tracking-tight text-[#007AFF]">{metric.val}</span>
                              <span className="text-[10px] text-slate-400 font-mono font-normal truncate block mt-2 uppercase tracking-[0.1em]">{metric.lbl}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Magnetic CTA */}
                      <div className="pt-2">
                        <div className="cs-magnetic-cta w-full py-3.5 rounded-xl text-[12px] font-mono font-normal uppercase flex items-center justify-center gap-2.5 transition-all duration-300 bg-[#007AFF]/10 text-[#007AFF] hover:bg-[#007AFF] hover:text-white border border-[#007AFF]/25 shadow-2xs">
                          <span>Explore Case Study</span>
                          <span className="text-[14px] group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#F8FAFC] text-[#0F172A] select-text flex flex-col relative text-[16px] leading-[1.8] overflow-hidden" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "SF Pro", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      
      {/* ═══ MINIMAL MAGAZINE-STYLE COMMAND BAR ═══ */}
      <header className="h-14 px-4 sm:px-8 bg-white/90 backdrop-blur-2xl border-b border-black/[0.04] flex items-center justify-between z-50 flex-shrink-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => {
              setActiveMission(null);
              setScrollProgress(0);
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full hover:bg-slate-100 text-[12px] font-mono font-bold text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <div className="h-4 w-px bg-slate-200/60 hidden sm:block" />

          {/* Minimal Project Switcher */}
          <div className="hidden sm:flex items-center gap-0.5 p-0.5 rounded-full bg-slate-100/80">
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
                className={`px-3.5 py-1 rounded-full text-[11.5px] font-mono font-bold transition-all cursor-pointer ${
                  activeMission === m.id
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {m.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          {/* Section Indicator */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono font-bold text-slate-400">
            <span className="text-[#4F46E5]">{NAV_CHIPS.find(n => n.id === activeSection)?.label.split(' / ')[0] || '01'}</span>
            <span>/</span>
            <span className="text-slate-600">{NAV_CHIPS.find(n => n.id === activeSection)?.label.split(' / ')[1] || 'Overview'}</span>
          </div>

          <button
            onClick={() => handleCopyToken(`${selectedProject?.title} Case Study — Praveen Kumar`)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 text-[11px] font-mono font-bold transition-all cursor-pointer"
          >
            <span>{copiedToken ? '✓ Copied' : 'Share'}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900 text-white hover:bg-red-600 text-[11px] font-mono font-bold transition-all cursor-pointer shadow-sm"
            >
              <span>✕ Close</span>
            </button>
          )}
        </div>
      </header>

      {/* Slim Reading Progress */}
      <div className="h-[2px] bg-slate-100/50 w-full relative overflow-hidden z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] transition-all duration-200 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* CORE WORKSPACE SLIT-VIEW CONTAINER */}
      <div className="flex-grow flex h-[calc(100%-4rem)] overflow-hidden">
        
        {/* LEFT SIDEBAR WITH PROGRESS RAIL */}
        <aside className="hidden lg:flex w-72 border-r border-black/[0.04] bg-white/95 flex-col h-full flex-shrink-0">
          {/* Sidebar Header */}
          <div className="px-5 py-4 flex items-center justify-between">
            <span className="text-[10px] font-mono font-extrabold uppercase tracking-[0.16em] text-slate-400">Contents</span>
            <span className="text-[10px] font-mono text-slate-300 font-bold">{Math.round(scrollProgress)}%</span>
          </div>

          {/* Progress Rail Navigation */}
          <div className="flex-1 overflow-y-auto px-4 pb-4 cs-progress-rail relative" style={{ scrollbarWidth: 'none' }}>
            {/* Animated Progress Fill */}
            <div 
              className="cs-progress-rail-fill" 
              style={{ height: `${scrollProgress}%` }}
            />

            <div className="space-y-0.5 relative z-10">
              {NAV_CHIPS.map((chip, chipIdx) => {
                const isActive = activeSection === chip.id;
                const currentIdx = NAV_CHIPS.findIndex(c => c.id === activeSection);
                const isPast = chipIdx < currentIdx;
                return (
                  <button
                    key={chip.id}
                    onClick={() => scrollToSection(chip.id)}
                    className={`w-full text-left pl-8 pr-3 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-3 cursor-pointer relative ${
                      isActive
                        ? 'text-[#4F46E5]'
                        : isPast
                          ? 'text-slate-400'
                          : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {/* Rail Dot */}
                    <div className={`absolute left-[14px] w-[10px] h-[10px] rounded-full border-2 transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#4F46E5] border-[#4F46E5] shadow-[0_0_10px_rgba(79,70,229,0.5)] scale-110' 
                        : isPast 
                          ? 'bg-[#4F46E5]/30 border-[#4F46E5]/40' 
                          : 'bg-white border-slate-200'
                    }`} />

                    {/* Label */}
                    <div className="flex items-center gap-2 truncate">
                      <span className={`text-[10px] font-mono font-extrabold transition-colors ${
                        isActive ? 'text-[#4F46E5]' : isPast ? 'text-slate-300' : 'text-slate-300'
                      }`}>
                        {chip.label.split(' / ')[0]}
                      </span>
                      <span className={`text-[12px] font-semibold truncate transition-colors ${
                        isActive ? 'text-[#4F46E5] font-bold' : isPast ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {chip.label.split(' / ')[1]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* MAIN SCROLLABLE CONTAINER */}
        <main 
          className="flex-1 h-full overflow-y-auto p-4 sm:p-8 lg:p-12 space-y-16 bg-[#F8FAFC] scroll-smooth case-study-scroll" 
          ref={scrollContainerRef}
          style={{ scrollbarWidth: 'thin' }}
        >
          <div className="max-w-6xl mx-auto w-full space-y-16 pb-32">
            {selectedProject.id === 'revlitix-saas' ? (
              <RevlitixCaseStudy selectedProject={selectedProject} handleCopyToken={handleCopyToken} copiedToken={copiedToken} onZoomImage={(src, caption) => setZoomImage({ src, caption })} />
            ) : selectedProject.id === 'sonic' ? (
              <SonicCaseStudy selectedProject={selectedProject} handleCopyToken={handleCopyToken} copiedToken={copiedToken} onZoomImage={(src, caption) => setZoomImage({ src, caption })} />
            ) : (
              <>
                {/* SECTION 1: OVERVIEW */}
            <motion.section 
              id="sec-overview"
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

              {/* SINGLE HERO IMAGE DISPLAY */}
              <div className="relative rounded-[26px] overflow-hidden border border-slate-200/90 shadow-xl bg-slate-950 cursor-pointer group image-card-hover" onClick={() => !selectedProject.videoUrl && setZoomImage({ src: selectedProject.heroImage, caption: `${selectedProject.title} — Primary Interface Showcase` })}>
                {selectedProject.videoUrl ? (
                  <CaseStudyVideoPlayer 
                    videoUrl={selectedProject.videoUrl} 
                    poster={selectedProject.videoPoster || selectedProject.heroImage} 
                  />
                ) : (
                  <div className="relative overflow-hidden w-full max-h-[460px]">
                    <img src={selectedProject.heroImage} alt={selectedProject.title} className="w-full h-auto max-h-[460px] object-cover object-top group-hover:scale-[1.03] transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 pointer-events-none">
                      <span className="self-end px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-[10.5px] font-bold border border-white/20">
                        HERO INTERFACE
                      </span>
                      <span className="self-center bg-white text-slate-950 font-mono text-[11.5px] font-bold px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span>🔍</span> Inspect High-Res Interface
                      </span>
                    </div>
                  </div>
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

            {/* SECTION 2: THE PROBLEM */}
            <motion.section 
              id="sec-problem"
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

            {/* SECTION 5: RESEARCH INSIGHTS */}
            <motion.section 
              id="sec-insights"
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

            {/* SECTION 8: PRIORITIZATION */}
            <motion.section 
              id="sec-prioritization"
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

            {/* SECTION 7: DESIGN PRINCIPLES */}
            <motion.section 
              id="sec-principles"
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

            {/* SECTION 10: POLISH & ACCESSIBILITY */}
            <motion.section 
              id="sec-polish"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(selectedProject.mockups || []).map((imgSrc, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setZoomImage({ src: imgSrc, caption: `${selectedProject.title} — UI Screenshot ${idx + 1}` })}
                      className="rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-slate-950 flex flex-col image-card-hover cursor-pointer group relative min-h-[220px] max-h-[260px]"
                    >
                      <div className="h-7 px-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between select-none shrink-0">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                        </div>
                        <div className="px-2.5 py-0.5 rounded-md bg-slate-800/80 text-slate-300 font-mono text-[9px] border border-slate-700/60 flex items-center gap-1">
                          <span className="text-[8px] opacity-40">🔒</span>
                          <span className="truncate max-w-[130px]">{selectedProject.company.toLowerCase().replace(/\s+/g, '')}.app/view</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-[#007AFF] text-white font-mono text-[8.5px] font-bold">
                          {idx === 0 ? 'PRIMARY VIEW' : `FIG ${idx + 1}`}
                        </span>
                      </div>
                      <div className="relative w-full flex-1 overflow-hidden bg-slate-950 flex items-center justify-center p-1">
                        <img 
                          src={imgSrc} 
                          alt={`UI Screenshot ${idx + 1}`} 
                          className="w-full h-full object-contain object-top group-hover:scale-[1.02] transition-transform duration-500 rounded-lg" 
                        />
                      </div>
                      <div className="px-3.5 py-2 bg-slate-900/90 border-t border-slate-800 text-[11px] font-mono text-slate-300 font-bold flex items-center justify-between shrink-0">
                        <span className="truncate">{selectedProject.title} — Fig {idx + 1}</span>
                        <span className="text-[9.5px] text-[#007AFF] font-bold">INSPECT ⤢</span>
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

      {/* ═══ GLASSMORPHISM FLOATING NAV ═══ */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] hidden sm:flex items-center gap-2 cs-glass-nav text-white px-4 py-2.5 rounded-2xl animate-slide-up">
        <button
          onClick={() => {
            const idx = NAV_CHIPS.findIndex(c => c.id === activeSection);
            if (idx > 0) scrollToSection(NAV_CHIPS[idx - 1].id);
          }}
          disabled={NAV_CHIPS.findIndex(c => c.id === activeSection) === 0}
          className="w-8 h-8 rounded-xl text-[14px] font-bold bg-white/10 hover:bg-white/20 disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer flex items-center justify-center"
        >
          ←
        </button>
        
        {/* Section Label */}
        <div className="flex items-center gap-2 px-3 min-w-[160px] justify-center">
          <span className="text-[10px] font-mono font-bold text-white/40">
            {NAV_CHIPS.find(c => c.id === activeSection)?.label.split(' / ')[0] || '01'}
          </span>
          <span className="text-[11px] font-mono font-bold text-white/90 truncate">
            {NAV_CHIPS.find(c => c.id === activeSection)?.label.split(' / ')[1] || 'Overview'}
          </span>
        </div>

        {/* Compact Progress Dots */}
        <div className="flex items-center gap-1 px-1">
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
                    ? 'w-5 h-1.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]' 
                    : isPast 
                      ? 'w-1.5 h-1.5 bg-white/35' 
                      : 'w-1.5 h-1.5 bg-white/12 hover:bg-white/25'
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
          className="w-8 h-8 rounded-xl text-[14px] font-bold bg-white/10 hover:bg-white/20 disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer flex items-center justify-center"
        >
          →
        </button>
      </div>

      {/* ═══ CINEMATIC LIGHTBOX ZOOM INSPECTION STUDIO ═══ */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 z-[9999] bg-black/92 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-6 select-none"
          >
            {/* Top Toolbar */}
            <div 
              className="w-full max-w-6xl flex items-center justify-between z-50 bg-slate-900/90 border border-white/10 p-3 rounded-2xl backdrop-blur-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <strong className="text-[13px] text-white font-mono font-bold block leading-none">{zoomImage.caption || 'Interface Showcase'}</strong>
                  <span className="text-[10px] text-slate-400 font-mono">HIGH-RESOLUTION INTERACTIVE INSPECTOR</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-mono text-[11px] font-bold border border-white/10 hidden sm:inline-block">
                  ESC to close
                </span>
                <button
                  onClick={() => setZoomImage(null)}
                  className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-[18px] flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                  title="Close Inspector"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Main Inspection View Container */}
            <div 
              className="cs-lightbox-enter relative max-w-6xl w-full flex-1 my-3 flex items-center justify-center overflow-auto rounded-3xl bg-slate-950/90 border border-white/10 shadow-2xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img 
                src={zoomImage.src} 
                alt="High-Res Inspection View" 
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl transition-transform duration-300 cursor-grab active:cursor-grabbing"
              />
            </div>

            {/* Bottom Spec Footer */}
            <div 
              className="w-full max-w-6xl bg-slate-900/90 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-xl flex items-center justify-between text-white/70 font-mono text-[11px] z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4">
                <span className="text-emerald-400 font-bold">● RETINA CANVAS</span>
                <span className="hidden sm:inline text-slate-400">|</span>
                <span className="hidden sm:inline">FORMAT: VECTOR RENDER</span>
              </div>
              <button 
                onClick={() => window.open(zoomImage.src, '_blank')}
                className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10.5px] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Open Raw Master</span> ↗
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MissionControlApp;
