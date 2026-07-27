import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, CheckCircle } from 'lucide-react';

const FigmaIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/>
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/>
    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/>
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/>
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
  </svg>
);

const ASSETS = [
  {
    name: 'Resume_PraveenKumar_2025.pdf',
    size: '2.4 MB',
    type: 'PDF',
    badgeText: 'PDF',
    desc: 'Full career history, Lead UI/UX Designer role highlights, key metrics, and professional references.',
  },
  {
    name: 'Revlitix_CaseStudy_Full.pdf',
    size: '8.1 MB',
    type: 'PDF',
    badgeText: 'PDF',
    desc: 'Comprehensive 42-page end-to-end UX case study covering SaaS workflow optimization and revenue analytics.',
  },
  {
    name: 'DesignSystem_Components.fig',
    size: '45 MB',
    type: 'FIG',
    badgeText: 'FIG',
    desc: 'Production Figma UI kit featuring auto-layout 5.0 components, WCAG AAA tokens, and state variants.',
  },
  {
    name: 'Portfolio_Presentation.pdf',
    size: '12 MB',
    type: 'PDF',
    badgeText: 'PDF',
    desc: 'High-resolution slide deck showcasing Move Money, Sonic AI, and Revlitix core design architecture.',
  },
  {
    name: 'UX_Research_Playbook.pdf',
    size: '3.2 MB',
    type: 'PDF',
    badgeText: 'PDF',
    desc: 'Standardized qualitative research frameworks, SUS usability testing templates, and user interview scripts.',
  },
  {
    name: 'Brand_Guidelines_v3.fig',
    size: '18 MB',
    type: 'FIG',
    badgeText: 'FIG',
    desc: 'Master visual identity system, typography specs, color scales, and icon library for Figma.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

const AssetsVaultApp = () => {
  const [downloading, setDownloading] = useState({});

  const handleDownload = (idx) => {
    setDownloading(prev => ({ ...prev, [idx]: true }));
    setTimeout(() => {
      setDownloading(prev => ({ ...prev, [idx]: false }));
    }, 1200);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 select-text font-body text-apple-text overflow-y-auto h-full bg-[#FAF9F6]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 pb-5">
        <div>
          <h1 className="text-2xl font-display font-bold text-apple-text flex items-center gap-2">
            Assets Vault 🔒
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">Verified downloads · 6 files</p>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 text-xs font-mono font-bold px-3 py-1.5 rounded-full border border-emerald-500/20 self-start sm:self-auto">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
          <span>VERIFIED ASSETS</span>
        </div>
      </div>

      {/* Grid of Assets */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {ASSETS.map((asset, idx) => {
          const isPdf = asset.type === 'PDF';
          const isDownloading = downloading[idx];

          return (
            <motion.div
              key={asset.name}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-white border border-black/5 shadow-xs hover:shadow-apple-md hover:border-black/10 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Icon & Badge Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isPdf
                          ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                          : 'bg-violet-500/10 text-violet-500 border border-violet-500/20'
                      }`}
                    >
                      {isPdf ? (
                        <FileText className="w-4 h-4 text-red-500" />
                      ) : (
                        <FigmaIcon className="w-4 h-4 text-violet-500" />
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                        isPdf
                          ? 'bg-red-50 text-red-600 border-red-200/60'
                          : 'bg-violet-50 text-violet-600 border-violet-200/60'
                      }`}
                    >
                      {asset.badgeText}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 font-semibold bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>✓ Verified</span>
                  </div>
                </div>

                {/* Name & Size */}
                <div>
                  <h3 className="text-sm font-display font-bold text-apple-text truncate text-ellipsis" title={asset.name}>
                    {asset.name}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {asset.size}
                  </p>
                </div>

                {/* Description */}
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  {asset.desc}
                </p>
              </div>

              {/* Download Button */}
              <button
                onClick={() => handleDownload(idx)}
                className="w-full py-2.5 rounded-xl bg-[#007AFF] hover:bg-blue-700 transition-colors text-white text-xs font-mono font-bold uppercase flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
              >
                <Download className="w-3.5 h-3.5" />
                {isDownloading ? 'Downloading...' : 'Download Asset'}
              </button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default AssetsVaultApp;
