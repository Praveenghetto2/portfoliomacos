import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, CheckCircle2, ArrowRight, ShieldCheck, Zap, Activity, RefreshCw, Server, Lock, ArrowUpRight, DollarSign, Cpu, FileCode2 } from 'lucide-react';

const NODES = [
  {
    id: 'ach',
    title: 'ACH Payments',
    subtitle: 'Batch Settlement Rail',
    speed: '1-2 Business Days',
    type: 'Batch Clearing',
    status: 'OPERATIONAL',
    statusColor: '#34C759',
    accentColor: '#8B5CF6',
    meshGradient: 'radial-gradient(at 20% 30%, rgba(139,92,246,0.15) 0%, transparent 50%)',
    volume: '$1.42M Daily',
    isoMessage: 'pacs.008.001.08 — Financial Institution Direct Debit',
    desc: 'Automated Clearing House rail handling high-volume recurring payroll, vendor payouts, and B2B debit transactions across North American banking networks.',
    painPoint: 'Opaque settlement timelines created severe user anxiety. Treasury managers couldn’t track whether funds were stuck at ODFI or RDFI clearinghouse nodes.',
    opportunity: 'Engineered real-time pending ledger previews with websocket progress rings and automated return code error handling, cutting support tickets by 45%.',
    flowSteps: [
      'Validate Routing & Transit Number via Plaid API',
      'Batch transaction packet into NACHA formatted file',
      'Transmit payload to Federal Reserve Clearinghouse',
      'Receive RDFI credit confirmation & update ledger'
    ]
  },
  {
    id: 'wire',
    title: 'Fedwire / Swift',
    subtitle: 'RTGS High-Value System',
    speed: 'Same Day',
    type: 'RTGS High-Value',
    status: 'ONLINE',
    statusColor: '#007AFF',
    accentColor: '#FF9F0A',
    meshGradient: 'radial-gradient(at 20% 30%, rgba(255,159,10,0.15) 0%, transparent 50%)',
    volume: '$2.85M Daily',
    isoMessage: 'pacs.009.001.08 — Financial Institution Transfer',
    desc: 'Real-Time Gross Settlement rail for high-value corporate treasury transfers, cross-border SWIFT transactions, and institutional liquidity moves.',
    painPoint: 'Complex compliance fields and extreme penalty risk for mistyped BIC/IBAN routing codes created high cognitive load during manual entry.',
    opportunity: 'Built inline BIC/IBAN auto-validation, dual-key approval workflows, and instant OFAC sanctions screening visual feedback.',
    flowSteps: [
      'Lock treasury liquidity in escrow ledger',
      'Execute OFAC sanctions & AML screening check',
      'Dispatch ISO 20022 MT103 packet to Fedwire gateway',
      'Gross settlement finality confirmed by Federal Reserve'
    ]
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
    meshGradient: 'radial-gradient(at 20% 30%, rgba(52,199,89,0.15) 0%, transparent 50%)',
    volume: '$620K Daily',
    isoMessage: 'pacs.002.001.10 — Payment Status Report',
    desc: 'The U.S. Federal Reserve 24/7/365 instant payment network providing immediate gross settlement with zero intermediary delay.',
    painPoint: 'Irrevocable settlement means zero margin for error. A single wrong digit irrevocably transfers non-refundable capital instantly.',
    opportunity: 'Designed multi-factor biometric confirmation steps with clear finality warnings, dynamic payee name-matching, and instant reversal safety guards.',
    flowSteps: [
      'Handshake with Federal Reserve FedNow node',
      'Verify account name match via account inquiry service',
      'Reserve central bank master account funds',
      'Instant settlement complete (< 2.5 seconds)'
    ]
  },
  {
    id: 'rtp',
    title: 'RTP Network',
    subtitle: 'Clearing House Instant Rail',
    speed: 'Instant (< 10s)',
    type: 'Clearing House Real-Time',
    status: 'NOMINAL',
    statusColor: '#007AFF',
    accentColor: '#00C6FF',
    meshGradient: 'radial-gradient(at 20% 30%, rgba(0,198,255,0.15) 0%, transparent 50%)',
    volume: '$890K Daily',
    isoMessage: 'camt.053.001.08 — Bank to Customer Statement',
    desc: 'The Clearing House real-time payment network enabling instant credit transfers and interactive Request for Payment (RfP) workflows.',
    painPoint: 'Disparate message specifications (ISO 20022) were difficult for non-technical treasury managers to parse and debug during payment failures.',
    opportunity: 'Created simplified Request for Payment (RfP) UI templates with visual status timelines and human-readable payload specs.',
    flowSteps: [
      'Send Request for Payment (RfP) digital invoice',
      'Payee authenticates & approves transfer request',
      'RTP core validates liquidity in joint pool',
      'Funds credited instantly to payee account'
    ]
  }
];

const MoneyOSApp = () => {
  const [selectedNode, setSelectedNode] = useState(NODES[0]);
  const [txStep, setTxStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simComplete, setSimComplete] = useState(false);

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

  return (
    <div className="h-full bg-[#0A0A0F] text-white font-body select-text overflow-y-auto p-7 space-y-6">
      
      {/* App Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#34C759] uppercase">FINTECH PAYMENT RAILS ENGINE</span>
          </div>
          <h1 className="text-[24px] font-display font-extrabold tracking-tight">Money.OS Architecture</h1>
          <p className="text-[12px] text-[#8E8E93] mt-0.5">Interactive payment settlement rails universe — orchestrating ACH, Wire, RTP, and FedNow.</p>
        </div>

        {/* Telemetry pill */}
        <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-2xl">
          <div className="text-right">
            <span className="text-[9px] font-mono text-[#8E8E93] uppercase block">Total Volume</span>
            <span className="text-[12px] font-mono font-extrabold text-[#34C759]">$5.78M / Day</span>
          </div>
          <div className="w-px h-6 bg-white/[0.06]" />
          <div className="text-right">
            <span className="text-[9px] font-mono text-[#8E8E93] uppercase block">Active Rails</span>
            <span className="text-[12px] font-mono font-extrabold text-white">4 Unified</span>
          </div>
        </div>
      </div>

      {/* Payment Rails Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
        {NODES.map((node) => {
          const isSelected = selectedNode.id === node.id;
          return (
            <motion.div
              key={node.id}
              onClick={() => { setSelectedNode(node); setTxStep(0); setSimComplete(false); }}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between h-[120px] relative overflow-hidden transition-all duration-300 ${
                isSelected
                  ? 'bg-white/[0.04] border-white/25 shadow-[0_0_30px_rgba(52,199,89,0.12)]'
                  : 'bg-white/[0.015] border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.025]'
              }`}
            >
              {/* Card top */}
              <div className="flex justify-between items-start">
                <span 
                  className="text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                  style={{ color: node.accentColor, borderColor: `${node.accentColor}30`, background: `${node.accentColor}10` }}
                >
                  {node.type}
                </span>
                <span className="text-[9px] font-mono font-bold text-[#8E8E93]">{node.speed}</span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-[15px] font-display font-extrabold text-white tracking-tight">{node.title}</h3>
                <span className="text-[10px] text-[#8E8E93] block">{node.subtitle}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Deep Rail Inspector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        
        {/* Left 2 Columns: Architecture & Design Solution */}
        <div className="md:col-span-2 space-y-4">
          
          {/* Main Info Card */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 space-y-4 relative overflow-hidden">
            <div 
              className="absolute -top-16 -right-16 w-[200px] h-[200px] rounded-full blur-[80px] opacity-15 pointer-events-none"
              style={{ background: selectedNode.accentColor }}
            />

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2.5">
                <div 
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: `${selectedNode.accentColor}20`, border: `1px solid ${selectedNode.accentColor}35` }}
                >
                  <CreditCard className="w-4 h-4" style={{ color: selectedNode.accentColor }} />
                </div>
                <div>
                  <h2 className="text-[18px] font-display font-extrabold text-white tracking-tight">{selectedNode.title}</h2>
                  <span className="text-[10px] font-mono text-[#8E8E93]">{selectedNode.subtitle} · {selectedNode.speed}</span>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold text-white bg-white/[0.04] border border-white/[0.06] px-3 py-1 rounded-full">
                {selectedNode.volume}
              </span>
            </div>

            <p className="text-[12px] text-[#C8C8CC] leading-relaxed relative z-10">
              {selectedNode.desc}
            </p>

            {/* ISO 20022 Specs banner */}
            <div className="bg-[#05050A] border border-white/[0.05] rounded-xl p-3 flex items-center justify-between text-[10px] font-mono text-[#8E8E93] relative z-10">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-3.5 h-3.5" style={{ color: selectedNode.accentColor }} />
                <span>ISO 20022 Spec:</span>
                <span className="text-white font-bold">{selectedNode.isoMessage}</span>
              </div>
              <span className="text-[#34C759] font-bold">VALIDATED</span>
            </div>
          </div>

          {/* Problem vs Opportunity Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Pain point */}
            <div className="bg-white/[0.015] border border-[#FF3B30]/15 rounded-2xl p-4.5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF3B30]" />
                <span className="text-[9px] font-mono font-bold uppercase text-[#FF3B30] tracking-wider">User Friction Point</span>
              </div>
              <p className="text-[11px] text-[#8E8E93] leading-relaxed">{selectedNode.painPoint}</p>
            </div>

            {/* Opportunity */}
            <div className="bg-white/[0.015] border border-[#34C759]/15 rounded-2xl p-4.5 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#34C759]" />
                <span className="text-[9px] font-mono font-bold uppercase text-[#34C759] tracking-wider">Design Architecture Solution</span>
              </div>
              <p className="text-[11px] text-[#8E8E93] leading-relaxed">{selectedNode.opportunity}</p>
            </div>

          </div>

        </div>

        {/* Right Column: Live Settlement Simulator */}
        <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-5 space-y-4 relative overflow-hidden">
          
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" style={{ color: selectedNode.accentColor }} />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E8E93]">Live Rail Simulator</span>
            </div>
            <span className="text-[9px] font-mono font-bold text-[#34C759] bg-[#34C759]/10 px-2 py-0.5 rounded-full border border-[#34C759]/20">READY</span>
          </div>

          {/* Simulator button */}
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="w-full py-2.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02] disabled:opacity-50"
            style={{ background: `linear-gradient(135deg, ${selectedNode.accentColor}, #1C1C1E)` }}
          >
            {isSimulating ? 'Routing Payment Packets...' : `Run ${selectedNode.title} Routing Test`}
          </button>

          {/* Flow steps timeline */}
          <div className="space-y-2.5 pt-1">
            {selectedNode.flowSteps.map((step, idx) => {
              const isCurrent = isSimulating && txStep === idx;
              const isDone = simComplete || txStep > idx;
              return (
                <div 
                  key={idx}
                  className={`p-2.5 rounded-xl border text-[10px] font-mono transition-all duration-300 flex items-center gap-2.5 ${
                    isCurrent
                      ? 'bg-white/[0.05] border-white/30 text-white shadow-sm'
                      : isDone
                      ? 'bg-[#34C759]/5 border-[#34C759]/20 text-[#34C759]'
                      : 'bg-white/[0.01] border-white/[0.04] text-[#8E8E93]'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[8px] font-bold border" style={{ borderColor: isDone ? '#34C759' : isCurrent ? selectedNode.accentColor : 'rgba(255,255,255,0.1)' }}>
                    {isDone ? '✓' : idx + 1}
                  </div>
                  <span className="leading-tight flex-1">{step}</span>
                </div>
              );
            })}
          </div>

          {/* Settlement result badge */}
          {simComplete && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 bg-[#34C759]/10 border border-[#34C759]/25 rounded-xl text-center space-y-1"
            >
              <span className="text-[10px] font-mono font-bold text-[#34C759] uppercase block">✓ Settlement Finality Confirmed</span>
              <span className="text-[8px] font-mono text-[#8E8E93] block">Ledger Hash: 0x{selectedNode.id}98f24a77b10c</span>
            </motion.div>
          )}

        </div>

      </div>

    </div>
  );
};

export default MoneyOSApp;
