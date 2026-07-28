import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, CheckCircle2, ArrowRight, ShieldCheck, Zap, Activity, RefreshCw, 
  Server, Lock, ArrowUpRight, DollarSign, Cpu, FileCode2, Eye, Play, AlertTriangle,
  ChevronRight, Shield, Layers, Copy, Check, Send, Sparkles, Building2, Globe
} from 'lucide-react';

const NODES = [
  {
    id: 'fednow',
    title: 'FedNow Real-Time Rail',
    subtitle: 'Federal Reserve 24/7 Instant Network',
    speed: 'Instant (< 2.5s)',
    type: 'Federal Reserve Real-Time',
    status: 'ONLINE',
    statusColor: '#34C759',
    accentColor: '#34C759',
    volume: '$620,000.00',
    dailyLimit: '$500,000 / tx',
    fee: '$0.045 / tx',
    isoMessage: 'pacs.002.001.10 — Real-Time Payment Status Report',
    desc: 'The U.S. Federal Reserve 24/7/365 instant payment network providing immediate gross settlement with zero intermediary delay and central bank finality.',
    painPoint: 'Irrevocable settlement means zero margin for error. A single mistyped routing digit irrevocably transfers non-refundable capital instantly.',
    opportunity: 'Designed multi-factor biometric confirmation steps with clear finality warnings, dynamic payee name-matching, and instant reversal safety guards.',
    flowSteps: [
      { step: '01', title: 'Node Handshake', desc: 'Secure TLS 1.3 handshake with Federal Reserve FedNow node' },
      { step: '02', title: 'Account Inquiry', desc: 'Verify beneficiary account name match via Plaid / Fed Inquiry' },
      { step: '03', title: 'Reserve Locking', desc: 'Reserve central bank master account funds at Fed District Bank' },
      { step: '04', title: 'Instant Finality', desc: 'Instant settlement complete in 1.8 seconds with immutable ledger hash' }
    ],
    sampleJson: `{
  "MessageHeader": {
    "MsgId": "FEDNOW-2025-081920",
    "CreDtTm": "2025-07-28T23:09:00Z"
  },
  "TxInformation": {
    "SttlmMtd": "CLRG",
    "SttlmTm": "2025-07-28T23:09:01.82Z",
    "Amt": { "Ccy": "USD", "Value": 620000.00 },
    "Status": "SETTLED_FINAL"
  }
}`
  },
  {
    id: 'wire',
    title: 'Fedwire / SWIFT RTGS',
    subtitle: 'High-Value Gross Settlement Rail',
    speed: 'Same Day (RTGS)',
    type: 'High-Value RTGS',
    status: 'OPERATIONAL',
    statusColor: '#007AFF',
    accentColor: '#007AFF',
    volume: '$2,850,000.00',
    dailyLimit: 'Unlimited',
    fee: '$15.00 / tx',
    isoMessage: 'pacs.009.001.08 — Financial Institution Direct Wire',
    desc: 'Real-Time Gross Settlement rail for high-value corporate treasury transfers, cross-border SWIFT transactions, and institutional liquidity moves.',
    painPoint: 'Complex compliance fields and extreme penalty risk for mistyped BIC/IBAN routing codes created high cognitive load during manual entry.',
    opportunity: 'Built inline BIC/IBAN auto-validation, dual-key approval workflows for transfers > $500K, and instant OFAC sanctions screening visual feedback.',
    flowSteps: [
      { step: '01', title: 'Escrow Lock', desc: 'Lock treasury liquidity in escrow ledger' },
      { step: '02', title: 'OFAC Sanctions', desc: 'Execute real-time OFAC sanctions & AML screening check' },
      { step: '03', title: 'ISO Dispatch', desc: 'Dispatch ISO 20022 MT103 packet to Fedwire gateway' },
      { step: '04', title: 'Fed Settlement', desc: 'Gross settlement finality confirmed by Federal Reserve' }
    ],
    sampleJson: `{
  "MessageHeader": {
    "MsgId": "WIRE-FED-991204",
    "CreDtTm": "2025-07-28T23:09:00Z",
    "Sndr": "FEDWUS33"
  },
  "CreditTransfer": {
    "Amt": { "Ccy": "USD", "Value": 2850000.00 },
    "IntrmyAgt": { "BIC": "CHASUS33" },
    "CdtrAgt": { "BIC": "BOFAUS3N" },
    "OFAC_Check": "PASSED_CLEARED"
  }
}`
  },
  {
    id: 'rtp',
    title: 'RTP Network',
    subtitle: 'Clearing House Real-Time Rail',
    speed: 'Instant (< 10s)',
    type: 'Clearing House Real-Time',
    status: 'NOMINAL',
    statusColor: '#007AFF',
    accentColor: '#5856D6',
    volume: '$890,000.00',
    dailyLimit: '$1,000,000 / tx',
    fee: '$0.10 / tx',
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
  "MessageHeader": {
    "MsgId": "RTP-TCH-441029",
    "CreDtTm": "2025-07-28T23:09:00Z"
  },
  "RfP_Payload": {
    "InvoiceRef": "INV-2025-99",
    "Amt": { "Ccy": "USD", "Value": 890000.00 },
    "RfP_Status": "APPROVED_BY_PAYEE"
  }
}`
  },
  {
    id: 'ach',
    title: 'ACH Batch Clearing',
    subtitle: 'North American Batch System',
    speed: '1-2 Business Days',
    type: 'Batch Clearing',
    status: 'OPERATIONAL',
    statusColor: '#34C759',
    accentColor: '#FF9F0A',
    volume: '$1,420,500.00',
    dailyLimit: '$1,000,000 / tx',
    fee: '$0.25 / tx',
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
  "MessageHeader": {
    "MsgId": "ACH-2025-081920",
    "CreDtTm": "2025-07-28T23:09:00Z",
    "NbOfTxs": "1"
  },
  "PmtInformation": {
    "PmtMtd": "ACH",
    "ReqdExctnDt": "2025-07-29",
    "Dbtr": { "Nm": "Acme Corp Treasury" },
    "Cdtr": { "Nm": "Global Supplies LLC" },
    "Amt": { "Ccy": "USD", "Value": 1420500.00 }
  }
}`
  }
];

export default function MoneyOSApp() {
  const [selectedNode, setSelectedNode] = useState(NODES[0]);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'simulator', 'iso', 'guardrails'
  const [txStep, setTxStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simComplete, setSimComplete] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  // Transfer Builder Form State
  const [transferAmount, setTransferAmount] = useState('250,000.00');
  const [recipientName, setRecipientName] = useState('Acme Global Treasury Corp');

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
    }, 600);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(selectedNode.sampleJson);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="h-full bg-[#F5F5F7] text-[#1D1D1F] select-text overflow-y-auto p-6 md:p-8 space-y-6" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}>
      
      {/* EXECUTIVE TREASURY HEADER */}
      <div className="bg-white rounded-3xl p-6 border border-black/[0.05] shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#34C759] animate-pulse" />
            <span className="text-[11px] font-mono font-extrabold text-[#007AFF] uppercase tracking-[0.16em]">
              MONEY.OS · COMMERCIAL BANKING TREASURY ENGINE
            </span>
          </div>

          <h1 className="text-[28px] sm:text-[34px] font-bold text-[#1D1D1F] tracking-tight leading-none">
            Unified Settlement Engine
          </h1>
          <p className="text-[13.5px] text-[#86868B]">
            Orchestrating FedNow, Fedwire/SWIFT, RTP, and ACH payment rails with real-time settlement tracking.
          </p>
        </div>

        {/* Live Treasury Balances & Telemetry */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-[#F5F5F7] p-3.5 rounded-2xl border border-black/[0.03]">
            <span className="text-[10px] font-mono font-bold text-[#86868B] uppercase block">Total Daily Volume</span>
            <span className="text-[16px] font-mono font-extrabold text-[#1D1D1F] block mt-0.5">$5,780,500.00</span>
          </div>

          <div className="bg-[#F5F5F7] p-3.5 rounded-2xl border border-black/[0.03]">
            <span className="text-[10px] font-mono font-bold text-[#86868B] uppercase block">Average Settlement</span>
            <span className="text-[16px] font-mono font-extrabold text-[#34C759] block mt-0.5">1.8 Seconds</span>
          </div>

          <div className="bg-[#F5F5F7] p-3.5 rounded-2xl border border-black/[0.03] col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono font-bold text-[#86868B] uppercase block">Uptime Telemetry</span>
            <span className="text-[16px] font-mono font-extrabold text-[#007AFF] block mt-0.5">99.999% SLA</span>
          </div>
        </div>
      </div>

      {/* VIEW NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'overview', label: 'Payment Rails Overview', icon: Layers },
          { id: 'simulator', label: 'Live Payment Simulator', icon: Play },
          { id: 'iso', label: 'ISO 20022 Spec Inspector', icon: FileCode2 },
          { id: 'guardrails', label: 'Compliance & Audit Checks', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-[12.5px] font-mono font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap border ${
                isActive
                  ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-sm'
                  : 'bg-white text-[#6E6E73] hover:text-[#1D1D1F] border-black/[0.06] hover:bg-[#E8E8ED]/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4 CORE PAYMENT RAIL CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {NODES.map((node) => {
          const isSelected = selectedNode.id === node.id;
          return (
            <motion.div
              key={node.id}
              onClick={() => { setSelectedNode(node); setTxStep(0); setSimComplete(false); }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`p-5 rounded-3xl border cursor-pointer flex flex-col justify-between min-h-[150px] transition-all duration-300 ${
                isSelected
                  ? 'bg-white border-[#007AFF] shadow-[0_8px_30px_rgba(0,122,255,0.14)] ring-2 ring-[#007AFF]/20'
                  : 'bg-white border-black/[0.06] hover:border-black/[0.12] shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
              }`}
            >
              <div className="flex justify-between items-start">
                <span 
                  className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                  style={{ color: node.accentColor, background: `${node.accentColor}15` }}
                >
                  {node.type.split(' ')[0]}
                </span>
                <span className="text-[10.5px] font-mono text-[#86868B] font-bold bg-[#F5F5F7] px-2.5 py-0.5 rounded-full">
                  {node.speed}
                </span>
              </div>

              <div className="py-2">
                <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight leading-snug">{node.title}</h3>
                <span className="text-[11.5px] text-[#86868B] block mt-0.5">{node.subtitle}</span>
              </div>

              <div className="pt-2 border-t border-black/[0.04] flex items-center justify-between text-[11px] font-mono">
                <span className="font-bold text-[#1D1D1F]">{node.volume}</span>
                <span className="font-bold text-[#34C759]">✓ {node.status}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* TAB CONTENT PANELS */}
      <AnimatePresence mode="wait">

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
          >
            {/* Left 2 Columns: Architecture & Friction Breakdown */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Selected Rail Overview Sheet */}
              <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 space-y-5 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow-xs"
                      style={{ background: selectedNode.accentColor }}
                    >
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#1D1D1F]">{selectedNode.title}</h2>
                      <span className="text-[11.5px] font-mono text-[#86868B]">{selectedNode.subtitle} · {selectedNode.speed}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-[#F5F5F7] px-3.5 py-1.5 rounded-xl border border-black/[0.03] text-right">
                      <span className="text-[9.5px] font-mono text-[#86868B] uppercase block">Transfer Limit</span>
                      <span className="text-[12px] font-mono font-bold text-[#1D1D1F]">{selectedNode.dailyLimit}</span>
                    </div>
                    <div className="bg-[#F5F5F7] px-3.5 py-1.5 rounded-xl border border-black/[0.03] text-right">
                      <span className="text-[9.5px] font-mono text-[#86868B] uppercase block">Rail Fee</span>
                      <span className="text-[12px] font-mono font-bold text-[#34C759]">{selectedNode.fee}</span>
                    </div>
                  </div>
                </div>

                <p className="text-[14.5px] text-[#424245] leading-relaxed font-normal">
                  {selectedNode.desc}
                </p>

                {/* ISO Message Spec */}
                <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11.5px] font-mono">
                  <div className="flex items-center gap-2.5">
                    <FileCode2 className="w-4 h-4 text-[#007AFF] flex-shrink-0" />
                    <span className="text-[#86868B]">ISO Spec:</span>
                    <span className="text-[#1D1D1F] font-bold">{selectedNode.isoMessage}</span>
                  </div>
                  <span className="text-[#34C759] font-bold bg-[#34C759]/10 px-3 py-1 rounded-full border border-[#34C759]/20 self-start sm:self-auto">
                    ✓ ACTIVE SPEC
                  </span>
                </div>
              </div>

              {/* Problem vs Solution UX Architecture */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-3xl border border-[#FF3B30]/20 p-6 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-[#FF3B30] font-mono font-bold text-[11px] uppercase">
                    <AlertTriangle className="w-4 h-4" />
                    <span>User Friction Point</span>
                  </div>
                  <p className="text-[13px] text-[#424245] leading-relaxed">{selectedNode.painPoint}</p>
                </div>

                <div className="bg-white rounded-3xl border border-[#34C759]/20 p-6 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-[#34C759] font-mono font-bold text-[11px] uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>UX Architecture Solution</span>
                  </div>
                  <p className="text-[13px] text-[#424245] leading-relaxed">{selectedNode.opportunity}</p>
                </div>
              </div>

            </div>

            {/* Right Column: Live Settlement Simulator Widget */}
            <div className="bg-white rounded-3xl border border-black/[0.06] p-6 space-y-5 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between border-b border-black/[0.05] pb-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#007AFF]" />
                  <span className="text-[11.5px] font-mono font-bold text-[#1D1D1F] uppercase">Live Rail Test</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#34C759] bg-[#34C759]/10 px-2.5 py-0.5 rounded-full border border-[#34C759]/20">
                  READY
                </span>
              </div>

              {/* Trigger Button */}
              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="w-full py-3.5 rounded-2xl bg-[#007AFF] hover:bg-blue-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
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
                      className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-start gap-3 ${
                        isCurrent
                          ? 'bg-[#007AFF]/10 border-[#007AFF]/40 text-[#007AFF] shadow-xs'
                          : isDone
                          ? 'bg-[#34C759]/10 border-[#34C759]/30 text-[#34C759]'
                          : 'bg-[#F5F5F7] border-black/[0.04] text-[#86868B]'
                      }`}
                    >
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold border mt-0.5"
                        style={{ 
                          borderColor: isDone ? '#34C759' : isCurrent ? '#007AFF' : 'rgba(0,0,0,0.1)',
                          background: isDone ? '#34C759' : isCurrent ? '#007AFF' : 'transparent',
                          color: isDone || isCurrent ? '#ffffff' : '#86868B'
                        }}
                      >
                        {isDone ? '✓' : step.step}
                      </div>
                      <div>
                        <strong className="text-[12.5px] font-mono font-bold block leading-snug">{step.title}</strong>
                        <span className="text-[11.5px] block mt-0.5 opacity-90 leading-relaxed">{step.desc}</span>
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
                  className="p-4 bg-[#34C759]/10 border border-[#34C759]/30 rounded-2xl text-center space-y-1"
                >
                  <div className="flex items-center justify-center gap-1.5 text-[#34C759] font-mono font-extrabold text-[12px] uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Settlement Finality Confirmed</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#86868B] block">Ledger Hash: 0x{selectedNode.id}98f24a77b10c</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 2: LIVE SIMULATOR */}
        {activeTab === 'simulator' && (
          <motion.div
            key="simulator"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 space-y-6 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.05] pb-4">
              <div>
                <h3 className="text-xl font-bold text-[#1D1D1F]">Payment Packet Simulator</h3>
                <p className="text-[13px] text-[#86868B]">Simulating multi-node settlement transit across interbank gateways.</p>
              </div>

              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="px-5 py-2.5 rounded-full bg-[#007AFF] hover:bg-blue-600 text-white font-mono text-xs font-bold uppercase transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                {isSimulating ? 'Routing...' : 'Execute Routing Test'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Originator (ODFI)', desc: 'Corporate Treasury Initiator', icon: Building2, color: '#007AFF' },
                { title: 'AML / OFAC Engine', desc: 'Sanctions & Fraud Screening', icon: ShieldCheck, color: '#FF9F0A' },
                { title: 'Clearinghouse Core', desc: 'FedNow / Fedwire Settlement', icon: Cpu, color: '#5856D6' },
                { title: 'Receiver (RDFI)', desc: 'Beneficiary Credit Confirmed', icon: CheckCircle2, color: '#34C759' },
              ].map((node, i) => {
                const Icon = node.icon;
                const active = isSimulating && txStep === i;
                return (
                  <div 
                    key={i}
                    className={`p-5 rounded-2xl border transition-all duration-300 space-y-3 ${
                      active
                        ? 'bg-[#007AFF]/10 border-[#007AFF] shadow-md scale-[1.02]'
                        : 'bg-[#F5F5F7] border-black/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xs" style={{ background: node.color }}>
                        <Icon className="w-4.5 h-4.5 text-white" />
                      </div>
                      <span className="text-[10px] font-mono text-[#86868B]">Node 0{i+1}</span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[#1D1D1F]">{node.title}</h4>
                      <p className="text-[11.5px] text-[#86868B] mt-0.5">{node.desc}</p>
                    </div>

                    <div className="pt-2 border-t border-black/[0.04] flex items-center justify-between text-[10.5px] font-mono text-[#86868B]">
                      <span>Latency:</span>
                      <span className="font-bold text-[#1D1D1F]">{i === 0 ? '1ms' : i === 1 ? '14ms' : i === 2 ? '22ms' : '< 2.5s'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* TAB 3: ISO INSPECTOR */}
        {activeTab === 'iso' && (
          <motion.div
            key="iso"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 space-y-5 shadow-xs font-mono"
          >
            <div className="flex items-center justify-between border-b border-black/[0.05] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#1D1D1F] flex items-center gap-2">
                  <FileCode2 className="w-5 h-5 text-[#007AFF]" />
                  <span>ISO 20022 Payload — {selectedNode.title}</span>
                </h3>
                <p className="text-[12px] text-[#86868B] font-sans mt-0.5">Live JSON schema message dispatched to Federal Reserve Clearinghouse.</p>
              </div>

              <button
                onClick={handleCopyJson}
                className="px-3.5 py-1.5 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-black/[0.04]"
              >
                {copiedJson ? <Check className="w-3.5 h-3.5 text-[#34C759]" /> : <Copy className="w-3.5 h-3.5 text-[#007AFF]" />}
                <span>{copiedJson ? 'Copied Payload!' : 'Copy JSON'}</span>
              </button>
            </div>

            <div className="bg-[#05050A] text-[#38BDF8] p-5 rounded-2xl border border-black/[0.1] text-[12px] overflow-x-auto leading-relaxed shadow-inner">
              <pre>{selectedNode.sampleJson}</pre>
            </div>
          </motion.div>
        )}

        {/* TAB 4: COMPLIANCE & GUARDRAILS */}
        {activeTab === 'guardrails' && (
          <motion.div
            key="guardrails"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { title: 'OFAC Sanctions Filter', status: 'Passed', desc: 'Real-time screening against Treasury SDN watchlist.', color: '#34C759' },
              { title: 'Dual-Key Authorization', status: 'Enforced', desc: 'Transactions > $500K require dual VP approvals.', color: '#007AFF' },
              { title: 'SOC2 Type II Audit', status: 'Compliant', desc: 'End-to-end TLS 1.3 encryption for ledger state.', color: '#5856D6' },
            ].map((guard, i) => (
              <div key={i} className="bg-white border border-black/[0.06] p-6 rounded-3xl space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <ShieldCheck className="w-6 h-6" style={{ color: guard.color }} />
                  <span className="text-[10.5px] font-mono font-bold px-2.5 py-0.5 rounded-full border" style={{ color: guard.color, borderColor: `${guard.color}40`, background: `${guard.color}15` }}>
                    {guard.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#1D1D1F]">{guard.title}</h4>
                <p className="text-[12.5px] text-[#86868B] leading-relaxed">{guard.desc}</p>
              </div>
            ))}
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
