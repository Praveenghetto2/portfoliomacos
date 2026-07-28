import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, CheckCircle2, ArrowRight, ShieldCheck, Zap, Activity, RefreshCw, 
  Server, Lock, ArrowUpRight, DollarSign, Cpu, FileCode2, Eye, Play, AlertTriangle,
  ChevronRight, Shield, Layers, Copy, Check
} from 'lucide-react';

const NODES = [
  {
    id: 'ach',
    title: 'ACH Payments',
    subtitle: 'Batch Settlement Rail',
    speed: '1-2 Business Days',
    type: 'Batch Clearing',
    status: 'OPERATIONAL',
    statusColor: '#34C759',
    accentColor: '#818CF8',
    glowColor: 'rgba(129, 140, 248, 0.25)',
    volume: '$1.42M Daily',
    limit: '$1,000,000 / tx',
    cost: '$0.25 / tx',
    isoMessage: 'pacs.008.001.08 — Financial Institution Direct Debit',
    desc: 'Automated Clearing House rail handling high-volume recurring payroll, vendor payouts, and B2B debit transactions across North American banking networks.',
    painPoint: 'Opaque settlement timelines created severe user anxiety. Treasury managers couldn’t track whether funds were stuck at ODFI or RDFI clearinghouse nodes.',
    opportunity: 'Engineered real-time pending ledger previews with websocket progress rings and automated return code error handling, cutting support tickets by 45%.',
    flowSteps: [
      { step: '01', title: 'Route Validation', desc: 'Validate Routing & Transit Number via Plaid API' },
      { step: '02', title: 'NACHA Batching', desc: 'Batch transaction packet into NACHA formatted file' },
      { step: '03', title: 'Fed Transmission', desc: 'Transmit payload to Federal Reserve Clearinghouse' },
      { step: '04', title: 'RDFI Settlement', desc: 'Receive RDFI credit confirmation & update ledger' }
    ],
    sampleJson: `{
  "Header": {
    "MsgId": "ACH-2025-081920",
    "CreDtTm": "2025-07-28T22:58:00Z",
    "NbOfTxs": "1"
  },
  "PmtInf": {
    "PmtMtd": "ACH",
    "ReqdExctnDt": "2025-07-29",
    "Dbtr": { "Nm": "Acme Corp Treasury" },
    "Cdtr": { "Nm": "Global Supplies LLC" },
    "Amt": { "Ccy": "USD", "Value": 1420500.00 }
  }
}`
  },
  {
    id: 'wire',
    title: 'Fedwire / SWIFT',
    subtitle: 'RTGS High-Value System',
    speed: 'Same Day',
    type: 'RTGS High-Value',
    status: 'ONLINE',
    statusColor: '#007AFF',
    accentColor: '#FF9F0A',
    glowColor: 'rgba(255, 159, 10, 0.25)',
    volume: '$2.85M Daily',
    limit: 'Unlimited',
    cost: '$15.00 / tx',
    isoMessage: 'pacs.009.001.08 — Financial Institution Transfer',
    desc: 'Real-Time Gross Settlement rail for high-value corporate treasury transfers, cross-border SWIFT transactions, and institutional liquidity moves.',
    painPoint: 'Complex compliance fields and extreme penalty risk for mistyped BIC/IBAN routing codes created high cognitive load during manual entry.',
    opportunity: 'Built inline BIC/IBAN auto-validation, dual-key approval workflows, and instant OFAC sanctions screening visual feedback.',
    flowSteps: [
      { step: '01', title: 'Liquidity Lock', desc: 'Lock treasury liquidity in escrow ledger' },
      { step: '02', title: 'OFAC Sanctions', desc: 'Execute OFAC sanctions & AML screening check' },
      { step: '03', title: 'ISO Dispatch', desc: 'Dispatch ISO 20022 MT103 packet to Fedwire gateway' },
      { step: '04', title: 'Fed Settlement', desc: 'Gross settlement finality confirmed by Federal Reserve' }
    ],
    sampleJson: `{
  "Header": {
    "MsgId": "WIRE-FED-991204",
    "CreDtTm": "2025-07-28T22:58:00Z",
    "Sndr": "FEDWUS33"
  },
  "CrdtTrf": {
    "Amt": { "Ccy": "USD", "Value": 2850000.00 },
    "IntrmyAgt": { "BIC": "CHASUS33" },
    "CdtrAgt": { "BIC": "BOFAUS3N" },
    "OFAC_Check": "PASSED_CLEARED"
  }
}`
  },
  {
    id: 'fednow',
    title: 'FedNow Rail',
    subtitle: 'Federal Real-Time Network',
    speed: 'Instant (24/7/365)',
    type: 'Federal Reserve Real-Time',
    status: 'ONLINE',
    statusColor: '#34C759',
    accentColor: '#34C759',
    glowColor: 'rgba(52, 199, 89, 0.25)',
    volume: '$620K Daily',
    limit: '$500,000 / tx',
    cost: '$0.045 / tx',
    isoMessage: 'pacs.002.001.10 — Payment Status Report',
    desc: 'The U.S. Federal Reserve 24/7/365 instant payment network providing immediate gross settlement with zero intermediary delay.',
    painPoint: 'Irrevocable settlement means zero margin for error. A single wrong digit irrevocably transfers non-refundable capital instantly.',
    opportunity: 'Designed multi-factor biometric confirmation steps with clear finality warnings, dynamic payee name-matching, and instant reversal safety guards.',
    flowSteps: [
      { step: '01', title: 'Handshake Node', desc: 'Handshake with Federal Reserve FedNow node' },
      { step: '02', title: 'Account Inquiry', desc: 'Verify account name match via account inquiry service' },
      { step: '03', title: 'Reserve Allocation', desc: 'Reserve central bank master account funds' },
      { step: '04', title: 'Instant Settlement', desc: 'Instant settlement complete (< 2.5 seconds)' }
    ],
    sampleJson: `{
  "Header": {
    "MsgId": "FEDNOW-881920",
    "CreDtTm": "2025-07-28T22:58:00Z"
  },
  "TxInf": {
    "SttlmMtd": "CLRG",
    "SttlmTm": "2025-07-28T22:58:02.14Z",
    "Amt": { "Ccy": "USD", "Value": 620000.00 },
    "Status": "SETTLED_FINAL"
  }
}`
  },
  {
    id: 'rtp',
    title: 'RTP Network',
    subtitle: 'Clearing House Instant Rail',
    speed: 'Instant (< 10s)',
    type: 'Clearing House Real-Time',
    status: 'NOMINAL',
    statusColor: '#007AFF',
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.25)',
    volume: '$890K Daily',
    limit: '$1,000,000 / tx',
    cost: '$0.10 / tx',
    isoMessage: 'camt.053.001.08 — Bank to Customer Statement',
    desc: 'The Clearing House real-time payment network enabling instant credit transfers and interactive Request for Payment (RfP) workflows.',
    painPoint: 'Disparate message specifications (ISO 20022) were difficult for non-technical treasury managers to parse and debug during payment failures.',
    opportunity: 'Created simplified Request for Payment (RfP) UI templates with visual status timelines and human-readable payload specs.',
    flowSteps: [
      { step: '01', title: 'RfP Dispatch', desc: 'Send Request for Payment (RfP) digital invoice' },
      { step: '02', title: 'Payee Approval', desc: 'Payee authenticates & approves transfer request' },
      { step: '03', title: 'Liquidity Check', desc: 'RTP core validates liquidity in joint pool' },
      { step: '04', title: 'Credit Finality', desc: 'Funds credited instantly to payee account' }
    ],
    sampleJson: `{
  "Header": {
    "MsgId": "RTP-TCH-441029",
    "CreDtTm": "2025-07-28T22:58:00Z"
  },
  "RfP_Payload": {
    "InvoiceRef": "INV-2025-99",
    "Amt": { "Ccy": "USD", "Value": 890000.00 },
    "RfP_Status": "APPROVED_BY_PAYEE"
  }
}`
  }
];

const MoneyOSApp = () => {
  const [selectedNode, setSelectedNode] = useState(NODES[0]);
  const [activeTab, setActiveTab] = useState('rails'); // 'rails', 'simulator', 'iso', 'security'
  const [txStep, setTxStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simComplete, setSimComplete] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimComplete(false);
    setTxStep(0);

    const interval = setInterval(() => {
      setTxStep(prev => {
        if (prev >= 3) {
          clearInterval(interval);
          setIsSimulating(false);
          setSimComplete(true);
          return 3;
        }
        return prev + 1;
      });
    }, 650);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(selectedNode.sampleJson);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="h-full bg-[#0A0A10] text-[#F1F5F9] font-body select-text overflow-y-auto p-6 md:p-8 space-y-6" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}>
      
      {/* APP HEADER & TELEMETRY BAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#34C759] animate-pulse shadow-[0_0_10px_#34C759]" />
            <span className="text-[10.5px] font-mono font-bold tracking-[0.2em] text-[#34C759] uppercase">FINTECH PAYMENT RAILS ENGINE</span>
          </div>
          <h1 className="text-[26px] sm:text-[30px] font-extrabold tracking-tight text-white flex items-center gap-3">
            Money.OS Architecture
          </h1>
          <p className="text-[13px] text-[#94A3B8] mt-0.5">Orchestrating high-velocity payment rails — ACH, Fedwire/SWIFT, FedNow, and RTP.</p>
        </div>

        {/* Global Telemetry Pill Bar */}
        <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 px-4 py-2.5 rounded-2xl shadow-md self-start lg:self-auto">
          <div>
            <span className="text-[9px] font-mono text-[#94A3B8] uppercase block">Daily Volume</span>
            <span className="text-[13px] font-mono font-black text-[#34C759]">$5.78M / Day</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div>
            <span className="text-[9px] font-mono text-[#94A3B8] uppercase block">Engine TPS</span>
            <span className="text-[13px] font-mono font-black text-[#38BDF8]">1,420 Tx/sec</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div>
            <span className="text-[9px] font-mono text-[#94A3B8] uppercase block">Uptime</span>
            <span className="text-[13px] font-mono font-black text-[#818CF8]">99.999%</span>
          </div>
        </div>
      </div>

      {/* VIEW TABS SWITCHER */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-white/[0.06]">
        {[
          { id: 'rails', label: 'Payment Rails Engine', icon: Layers },
          { id: 'simulator', label: 'Packet Routing Simulator', icon: Zap },
          { id: 'iso', label: 'ISO 20022 Spec Inspector', icon: FileCode2 },
          { id: 'security', label: 'Compliance & Audit Guardrails', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-[12px] font-mono font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap border ${
                isActive
                  ? 'bg-white text-slate-950 border-white shadow-md'
                  : 'bg-white/[0.03] text-[#94A3B8] hover:text-white border-white/5 hover:bg-white/[0.06]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-[#94A3B8]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4 CORE PAYMENT RAIL SELECTOR CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {NODES.map((node) => {
          const isSelected = selectedNode.id === node.id;
          return (
            <motion.div
              key={node.id}
              onClick={() => { setSelectedNode(node); setTxStep(0); setSimComplete(false); }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className={`p-5 rounded-2xl border cursor-pointer flex flex-col justify-between min-h-[140px] relative overflow-hidden transition-all duration-300 ${
                isSelected
                  ? 'bg-white/[0.06] border-white/30 shadow-lg'
                  : 'bg-white/[0.02] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04]'
              }`}
              style={{
                boxShadow: isSelected ? `0 0 30px ${node.glowColor}` : 'none'
              }}
            >
              {/* Glow overlay */}
              <div 
                className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none"
                style={{ background: node.accentColor }}
              />

              <div className="flex justify-between items-start relative z-10">
                <span 
                  className="text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                  style={{ color: node.accentColor, borderColor: `${node.accentColor}40`, background: `${node.accentColor}15` }}
                >
                  {node.type}
                </span>
                <span className="text-[10px] font-mono font-bold text-[#94A3B8] bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.06]">
                  {node.speed}
                </span>
              </div>

              <div className="relative z-10 pt-3">
                <h3 className="text-[17px] font-extrabold text-white tracking-tight leading-snug">{node.title}</h3>
                <span className="text-[11px] text-[#94A3B8] block mt-0.5">{node.subtitle}</span>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#94A3B8] relative z-10">
                <span>{node.volume}</span>
                <span className="font-bold text-[#34C759]">✓ {node.status}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* TAB CONTENT PANELS */}
      <AnimatePresence mode="wait">

        {/* TAB 1: PAYMENT RAILS ENGINE OVERVIEW */}
        {activeTab === 'rails' && (
          <motion.div
            key="rails"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
          >
            {/* Left 2 Columns: Architecture Overview & Friction Breakdown */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Selected Rail Detail Box */}
              <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-6 space-y-5 relative overflow-hidden shadow-xl">
                <div 
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[90px] opacity-25 pointer-events-none"
                  style={{ background: selectedNode.accentColor }}
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md"
                      style={{ background: `${selectedNode.accentColor}20`, border: `1px solid ${selectedNode.accentColor}40` }}
                    >
                      <CreditCard className="w-5 h-5" style={{ color: selectedNode.accentColor }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-white tracking-tight">{selectedNode.title}</h2>
                      <span className="text-[11px] font-mono text-[#94A3B8]">{selectedNode.subtitle} · {selectedNode.speed}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-white/[0.04] border border-white/10 px-3.5 py-1.5 rounded-xl text-right">
                      <span className="text-[9px] font-mono text-[#94A3B8] uppercase block">Transfer Limit</span>
                      <span className="text-[12px] font-mono font-bold text-white">{selectedNode.limit}</span>
                    </div>
                    <div className="bg-white/[0.04] border border-white/10 px-3.5 py-1.5 rounded-xl text-right">
                      <span className="text-[9px] font-mono text-[#94A3B8] uppercase block">Rail Fee</span>
                      <span className="text-[12px] font-mono font-bold text-[#34C759]">{selectedNode.cost}</span>
                    </div>
                  </div>
                </div>

                <p className="text-[13.5px] text-[#CBD5E1] leading-relaxed relative z-10 font-normal">
                  {selectedNode.desc}
                </p>

                {/* ISO Message Protocol Bar */}
                <div className="bg-[#05050A] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono text-[#94A3B8] relative z-10">
                  <div className="flex items-center gap-2.5">
                    <FileCode2 className="w-4 h-4 flex-shrink-0" style={{ color: selectedNode.accentColor }} />
                    <span>ISO 20022 Message Spec:</span>
                    <span className="text-white font-bold">{selectedNode.isoMessage}</span>
                  </div>
                  <span className="text-[#34C759] font-bold bg-[#34C759]/10 px-3 py-1 rounded-full border border-[#34C759]/20 self-start sm:self-auto">
                    ✓ ACTIVE SPEC
                  </span>
                </div>
              </div>

              {/* Problem vs UX Solution Architecture */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Friction Card */}
                <div className="bg-white/[0.02] border border-[#FF3B30]/20 rounded-3xl p-5 space-y-3 shadow-md">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#FF3B30]" />
                    <span className="text-[10px] font-mono font-extrabold uppercase text-[#FF3B30] tracking-wider">User Friction Point</span>
                  </div>
                  <p className="text-[12.5px] text-[#94A3B8] leading-relaxed">{selectedNode.painPoint}</p>
                </div>

                {/* UX Architecture Solution */}
                <div className="bg-white/[0.02] border border-[#34C759]/20 rounded-3xl p-5 space-y-3 shadow-md">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#34C759]" />
                    <span className="text-[10px] font-mono font-extrabold uppercase text-[#34C759] tracking-wider">UX Architecture Solution</span>
                  </div>
                  <p className="text-[12.5px] text-[#94A3B8] leading-relaxed">{selectedNode.opportunity}</p>
                </div>

              </div>

            </div>

            {/* Right Column: Live Rail Simulator Widget */}
            <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-6 space-y-5 relative overflow-hidden shadow-xl">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4" style={{ color: selectedNode.accentColor }} />
                  <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-white">Live Rail Simulator</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#34C759] bg-[#34C759]/10 px-2.5 py-0.5 rounded-full border border-[#34C759]/20">
                  READY
                </span>
              </div>

              {/* Simulation Trigger Button */}
              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="w-full py-3 rounded-xl text-[11px] font-mono font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(135deg, ${selectedNode.accentColor}, #0F172A)` }}
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isSimulating ? 'Routing Packets...' : `Test ${selectedNode.title}`}</span>
              </button>

              {/* Sequential Flow Steps */}
              <div className="space-y-3 pt-1">
                {selectedNode.flowSteps.map((step, idx) => {
                  const isCurrent = isSimulating && txStep === idx;
                  const isDone = simComplete || txStep > idx;
                  return (
                    <div 
                      key={idx}
                      className={`p-3 rounded-2xl border transition-all duration-300 flex items-start gap-3 ${
                        isCurrent
                          ? 'bg-white/[0.08] border-white/40 text-white shadow-md'
                          : isDone
                          ? 'bg-[#34C759]/5 border-[#34C759]/25 text-[#34C759]'
                          : 'bg-white/[0.015] border-white/[0.05] text-[#94A3B8]'
                      }`}
                    >
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold border mt-0.5" 
                        style={{ 
                          borderColor: isDone ? '#34C759' : isCurrent ? selectedNode.accentColor : 'rgba(255,255,255,0.1)',
                          background: isDone ? 'rgba(52, 199, 89, 0.15)' : 'transparent'
                        }}
                      >
                        {isDone ? '✓' : step.step}
                      </div>
                      <div>
                        <strong className="text-[12px] font-mono font-bold block leading-snug">{step.title}</strong>
                        <span className="text-[11px] block mt-0.5 opacity-80 leading-relaxed">{step.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Settlement Finality Result */}
              {simComplete && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-[#34C759]/10 border border-[#34C759]/30 rounded-2xl text-center space-y-1 shadow-md"
                >
                  <div className="flex items-center justify-center gap-1.5 text-[#34C759] font-mono font-extrabold text-[11px] uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Settlement Finality Confirmed</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#94A3B8] block">Ledger TxHash: 0x{selectedNode.id}98f24a77b10c99</span>
                </motion.div>
              )}

            </div>
          </motion.div>
        )}

        {/* TAB 2: PACKET ROUTING SIMULATOR FULL VIEW */}
        {activeTab === 'simulator' && (
          <motion.div
            key="simulator"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="bg-white/[0.025] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Visual Payment Packet Router</h3>
                <p className="text-[12px] text-[#94A3B8]">Simulating real-time ISO 20022 packet transit across interbank clearinghouse nodes.</p>
              </div>

              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="px-5 py-2.5 rounded-xl bg-[#007AFF] hover:bg-blue-600 text-white font-mono text-xs font-bold uppercase transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                {isSimulating ? 'Routing...' : 'Run All Rail Tests'}
              </button>
            </div>

            {/* Visual Node Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
              {[
                { title: 'Originator (ODFI)', desc: 'Corporate Treasury Initiator', icon: Server, color: '#818CF8' },
                { title: 'AML / OFAC Engine', desc: 'Sanctions & Fraud Screening', icon: ShieldCheck, color: '#FF9F0A' },
                { title: 'Clearinghouse Core', desc: 'FedNow / Fedwire Settlement', icon: Cpu, color: '#007AFF' },
                { title: 'Receiver (RDFI)', desc: 'Beneficiary Bank Credit', icon: CheckCircle2, color: '#34C759' },
              ].map((node, i) => {
                const Icon = node.icon;
                const active = isSimulating && txStep === i;
                return (
                  <div 
                    key={i} 
                    className={`p-5 rounded-2xl border transition-all duration-300 space-y-3 relative ${
                      active 
                        ? 'bg-white/[0.08] border-white/40 shadow-[0_0_24px_rgba(0,122,255,0.25)] scale-[1.02]' 
                        : 'bg-white/[0.02] border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${node.color}20`, border: `1px solid ${node.color}40` }}>
                        <Icon className="w-4 h-4" style={{ color: node.color }} />
                      </div>
                      <span className="text-[10px] font-mono text-[#94A3B8]">Node 0{i+1}</span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white">{node.title}</h4>
                      <p className="text-[11px] text-[#94A3B8] mt-0.5">{node.desc}</p>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[#94A3B8]">Latency:</span>
                      <span className="text-white font-bold">{i === 0 ? '1ms' : i === 1 ? '14ms' : i === 2 ? '22ms' : '< 2.5s'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* TAB 3: ISO 20022 SPEC INSPECTOR */}
        {activeTab === 'iso' && (
          <motion.div
            key="iso"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="bg-[#05050A] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl font-mono"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileCode2 className="w-5 h-5 text-[#818CF8]" />
                  <span>ISO 20022 Message Inspector — {selectedNode.title}</span>
                </h3>
                <p className="text-[11px] text-[#94A3B8] font-sans mt-0.5">Live JSON schema payload dispatched to Federal Reserve and Clearinghouse gateways.</p>
              </div>

              <button
                onClick={handleCopyJson}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedJson ? <Check className="w-3.5 h-3.5 text-[#34C759]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedJson ? 'Copied Payload!' : 'Copy JSON Payload'}</span>
              </button>
            </div>

            {/* Code block */}
            <div className="bg-[#0A0A10] p-5 rounded-2xl border border-white/10 text-[12px] text-[#38BDF8] overflow-x-auto leading-relaxed">
              <pre>{selectedNode.sampleJson}</pre>
            </div>
          </motion.div>
        )}

        {/* TAB 4: COMPLIANCE & SECURITY GUARDRAILS */}
        {activeTab === 'security' && (
          <motion.div
            key="security"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { title: 'OFAC Sanctions Filter', status: 'Passed', desc: 'Real-time screening against Treasury SDN watchlist.', color: '#34C759' },
              { title: 'Dual-Key Authorization', status: 'Enforced', desc: 'Transactions > $500K require dual VP approvals.', color: '#007AFF' },
              { title: 'SOC2 Type II Audit', status: 'Compliant', desc: 'End-to-end TLS 1.3 encryption for ledger state.', color: '#818CF8' },
            ].map((guard, i) => (
              <div key={i} className="bg-white/[0.025] border border-white/10 p-6 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <ShieldCheck className="w-6 h-6" style={{ color: guard.color }} />
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border" style={{ color: guard.color, borderColor: `${guard.color}40`, background: `${guard.color}15` }}>
                    {guard.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{guard.title}</h4>
                <p className="text-[12px] text-[#94A3B8] leading-relaxed">{guard.desc}</p>
              </div>
            ))}
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};

export default MoneyOSApp;
