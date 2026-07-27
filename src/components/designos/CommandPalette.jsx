import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, Zap, CreditCard, Folder, FileText, Cpu, Compass, User, Award, Activity, Terminal } from 'lucide-react';

const SEARCH_ITEMS = [
  // Apps
  { id: 'identity', title: 'Identity.OS', category: 'Apps', subtitle: 'About Me, Bio, Radar & Philosophy', icon: User, type: 'app' },
  { id: 'mission', title: 'Mission Control', category: 'Apps', subtitle: 'NASA/Vision Pro Case Studies Workspace', icon: Folder, type: 'app' },
  { id: 'skills', title: 'Skill Tree', category: 'Apps', subtitle: 'AAA Video Game Skill Node Map', icon: Cpu, type: 'app' },
  { id: 'lab', title: 'Design Lab', category: 'Apps', subtitle: 'Spatial Design & AI Experiments', icon: Compass, type: 'app' },
  { id: 'money', title: 'Money.OS', category: 'Apps', subtitle: 'Fintech Payment Rails Universe', icon: CreditCard, type: 'app' },
  { id: 'journal', title: 'Journal', category: 'Apps', subtitle: 'Notes, Articles & Writing Studio', icon: FileText, type: 'app' },
  { id: 'vault', title: 'Assets Vault', category: 'Apps', subtitle: 'Resume & Portfolio Downloads', icon: Zap, type: 'app' },
  { id: 'interests', title: 'Interests', category: 'Apps', subtitle: 'Pinterest Visual Moodboards', icon: Award, type: 'app' },
  { id: 'travel', title: 'Travel Log', category: 'Apps', subtitle: 'Apple Maps Style Adventures', icon: Compass, type: 'app' },
  { id: 'fitness', title: 'Fitness', category: 'Apps', subtitle: 'Health Tracker & Habit Streaks', icon: Activity, type: 'app' },
  { id: 'terminal', title: 'Terminal', category: 'Apps', subtitle: 'Developer CLI Console', icon: Terminal, type: 'app' },

  // Payment Rails
  { id: 'ach', title: 'ACH Payments Architecture', category: 'Fintech Rails', subtitle: 'Batch Settlement & Clearing Workflows', icon: CreditCard, type: 'rail', appId: 'money' },
  { id: 'wire', title: 'Fedwire & Swift High-Value', category: 'Fintech Rails', subtitle: 'Real-Time Gross Settlement (RTGS)', icon: CreditCard, type: 'rail', appId: 'money' },
  { id: 'fednow', title: 'FedNow Instant Settlement', category: 'Fintech Rails', subtitle: 'Federal Reserve 24/7 Real-Time Rail', icon: CreditCard, type: 'rail', appId: 'money' },
  { id: 'rtp', title: 'RTP Clearing House Rail', category: 'Fintech Rails', subtitle: 'Real-Time Payment Confirmation System', icon: CreditCard, type: 'rail', appId: 'money' },

  // Case Studies
  { id: 'move-money', title: 'Move Money Platform', category: 'Case Studies', subtitle: '672+ Screens · 4 Payment Rails Unified', icon: Folder, type: 'project', appId: 'mission' },
  { id: 'revlitix-saas', title: 'Revlitix SaaS Platform', category: 'Case Studies', subtitle: 'AI Analytics & +25% Product Adoption', icon: Folder, type: 'project', appId: 'mission' },
  { id: 'sonic', title: 'Sonic AI Assistant', category: 'Case Studies', subtitle: 'Natural Language Query Engine', icon: Folder, type: 'project', appId: 'mission' },

  // Writing
  { id: 'art-fintech', title: 'Why Most Fintech Apps Fail', category: 'Journal Articles', subtitle: '5 lessons from redesigning enterprise payments', icon: FileText, type: 'article', appId: 'journal' },
  { id: 'art-ai-ux', title: 'The Future of AI UX Systems', category: 'Journal Articles', subtitle: 'Designing conversational trust and query logic', icon: FileText, type: 'article', appId: 'journal' },
];

const CommandPalette = ({ isOpen, onClose, onLaunchApp }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredItems = SEARCH_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelect = (item) => {
    onLaunchApp(item.appId || item.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-xl pointer-events-auto" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
          className="w-full max-w-2xl bg-[#1E1E22]/90 backdrop-blur-3xl border border-white/20 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.6)] overflow-hidden text-white font-body select-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3 bg-white/5">
            <Search className="w-5 h-5 text-white/50 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search DesignOS (e.g. ACH, Move Money, Identity, Skills)..."
              className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none font-body"
            />
            <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-white/60">
              <Command className="w-3 h-3" /> K
            </div>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-2 space-y-1">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-white/40 text-xs font-mono">
                No matching system assets or apps found for "{query}"
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const IconComponent = item.icon;
                const isSelected = idx === selectedIndex;

                return (
                  <div
                    key={`${item.id}-${idx}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-default transition-all ${
                      isSelected ? 'bg-[#007AFF] text-white shadow-apple-sm' : 'hover:bg-white/5 text-white/80'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-white/20' : 'bg-white/10'}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate flex items-center gap-2">
                          <span>{item.title}</span>
                          <span className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-white/10 text-white/50'}`}>
                            {item.category}
                          </span>
                        </div>
                        <p className={`text-[11px] truncate ${isSelected ? 'text-white/80' : 'text-white/40'}`}>
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-transform ${isSelected ? 'translate-x-1 opacity-100' : 'opacity-0'}`} />
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2 bg-black/30 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-white/40">
            <div className="flex gap-4">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>ESC Close</span>
            </div>
            <span>DesignOS Spotlight v1.0</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
