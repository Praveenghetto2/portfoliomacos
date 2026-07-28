import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Search, Clock, Calendar, ArrowLeft, Bookmark, Heart, 
  Share2, ChevronRight, Sparkles, Sliders, Type, Check, Tag
} from 'lucide-react';

const ARTICLES = [
  {
    id: 1,
    title: 'Why I Killed a Feature Users Asked For',
    category: 'Design Decision',
    readTime: '8 min read',
    date: 'Jun 2025',
    author: 'Praveen Kumar',
    authorRole: 'Lead Product Designer',
    summary: 'How contextual inquiry disproved our dashboard customization hypothesis and why saying no was the hardest design decision.',
    color: '#FF9F0A',
    content: [
      {
        heading: 'The Customization Trap',
        body: 'During initial discovery for our enterprise analytics platform, 8 out of 10 users explicitly requested a drag-and-drop customizable dashboard grid. "Let us arrange every metric widget wherever we want," they said. It felt like an obvious win. We built it, spent 4 weeks fine-tuning grid physics, and shipped it.'
      },
      {
        heading: 'The Shocking Usage Data',
        body: 'Thirty days post-launch, telemetry revealed a stark truth: 94% of active users left the default layout completely untouched. The 6% who customized their dashboard spent an average of 45 minutes tweaking widget positions on day one, only to submit support tickets a week later asking how to "reset to default" because they had broken their analytical mental model.'
      },
      {
        heading: 'The Underlying Mental Model',
        body: 'Contextual inquiry revealed the real issue: users didn’t actually want to be dashboard architects. They wanted answers. When faced with a blank grid, cognitive load skyrocketed. By removing the drag-and-drop customization and focusing 100% of our energy on perfecting three pre-configured role-based defaults (RevOps, VP Sales, Marketing Lead), user satisfaction scores surged by 27%.'
      },
      {
        heading: 'Key Takeaway for Design Leaders',
        body: 'User requests describe symptoms, not solutions. When users ask for infinite flexibility, they are often asking for clarity because the default experience failed them.'
      }
    ]
  },
  {
    id: 2,
    title: 'The Information Architecture Nobody Sees',
    category: 'Systems Design',
    readTime: '12 min read',
    date: 'Apr 2025',
    author: 'Praveen Kumar',
    authorRole: 'Lead Product Designer',
    summary: 'Reducing 28 navigation items to 15 — the invisible work that makes everything else possible.',
    color: '#007AFF',
    content: [
      {
        heading: 'Navigational Debt in B2B SaaS',
        body: 'As platforms grow, feature bloat creeps into the sidebar navigation. Every new feature team demands a top-level tab. Before our redesign, the platform had 28 top-level navigation items spread across nested drawers, tabs, and sub-menus.'
      },
      {
        heading: 'Open Card Sorting & Quantitative Mapping',
        body: 'We conducted open card sorting sessions with 16 enterprise power users. We asked them to group 28 feature capabilities into logical buckets. The results were unanimous: users organized their work around workflows (e.g. "Weekly Pipeline Audit"), not technical data schemas.'
      },
      {
        heading: 'The Flattened Flow Paradigm',
        body: 'We collapsed 28 isolated tabs into 15 contextual nodes organized into 3 primary hubs: Pipeline Intelligence, Revenue Attribution, and AI Action Center. Navigation friction dropped dramatically, and average task completion time dropped from 4.2 minutes down to 2.1 minutes.'
      }
    ]
  },
  {
    id: 3,
    title: 'Designing for Trust, Not Just Speed',
    category: 'UX Research',
    readTime: '6 min read',
    date: 'Feb 2025',
    author: 'Praveen Kumar',
    authorRole: 'Lead Product Designer',
    summary: 'Why adding context to raw metrics improved user confidence scores more than making the interface faster.',
    color: '#34C759',
    content: [
      {
        heading: 'Speed Means Nothing Without Clarity',
        body: 'Our engineering team optimized database query latency down from 4 seconds to 34ms. Yet, in usability testing, users still hesitated before making strategic budget decisions based on the data.'
      },
      {
        heading: 'The "Black Box" Hesitation',
        body: 'When a chart loads instantly without showing its data lineage, users assume it is an estimate or a cached snapshot. By adding a simple "Inspect Data Source" drawer that showed which Salesforce and HubSpot tables supplied the data, user confidence scores jumped from 2.8 to 3.9 out of 5.'
      }
    ]
  },
  {
    id: 4,
    title: 'From Figma Tokens to Production CSS',
    category: 'Engineering',
    readTime: '10 min read',
    date: 'Dec 2024',
    author: 'Praveen Kumar',
    authorRole: 'Lead Product Designer',
    summary: 'Building a design-to-code pipeline that actually works for a 3-person engineering team.',
    color: '#AF52DE',
    content: [
      {
        heading: 'Bridging the Design-Engineering Gap',
        body: 'Design systems often fail when Figma styles don’t map 1-to-1 with codebase CSS variables. We built a continuous sync pipeline using Style Dictionary that automatically transforms Figma design tokens into Tailwind utility classes on every Git commit.'
      },
      {
        heading: 'Tabular Numerals in Financial UI',
        body: 'In fintech and analytics interfaces, standard proportional numbers cause visual jitter when data streams live. Enforcing monospaced tabular numerals (`font-mono` / `tnum`) across all financial ledgers eliminated misread currency values during client audits.'
      }
    ]
  },
  {
    id: 5,
    title: 'AI as Co-Pilot: Lessons from Revlitix',
    category: 'Product Strategy',
    readTime: '7 min read',
    date: 'Oct 2024',
    author: 'Praveen Kumar',
    authorRole: 'Lead Product Designer',
    summary: 'What happened when we moved AI insights from a hidden tab to the primary viewport.',
    color: '#FF3B30',
    content: [
      {
        heading: 'The Isolated AI Tab Antipattern',
        body: 'Initially, our AI recommendation engine lived in a dedicated tab called "AI Insights". Adoption was dismal—less than 5% of weekly active users ever clicked into it.'
      },
      {
        heading: 'Inline Contextual AI Insights',
        body: 'We dismantled the standalone AI tab and embedded micro AI insight pills directly inside primary dashboard metric cards. When a pipeline metric dips, an inline AI pill appears next to the number explaining why. Feature engagement skyrocketed by 3x within 30 days.'
      }
    ]
  }
];

const CATEGORIES = ['All', 'Design Decision', 'Systems Design', 'UX Research', 'Engineering', 'Product Strategy'];

export default function JournalApp({ selectedNote, onSelectNote }) {
  const [selectedArticle, setSelectedArticle] = useState(ARTICLES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [fontSize, setFontSize] = useState('normal'); // 'small', 'normal', 'large'
  const [bookmarked, setBookmarked] = useState({});
  const [liked, setLiked] = useState({});

  useEffect(() => {
    if (selectedNote) {
      const found = ARTICLES.find(a => a.id === selectedNote.id || a.title === selectedNote.title);
      if (found) setSelectedArticle(found);
    }
  }, [selectedNote]);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((art) => {
      const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
      const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            art.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelect = (art) => {
    setSelectedArticle(art);
    if (onSelectNote) onSelectNote(art);
  };

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex h-full w-full bg-[#F5F5F7] text-[#1D1D1F] font-body overflow-hidden select-text" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}>
      
      {/* LEFT SIDEBAR: ARTICLE LIST & FILTERS */}
      <div className="w-full md:w-[380px] lg:w-[420px] border-r border-black/[0.06] bg-white flex flex-col h-full flex-shrink-0">
        
        {/* Header & Search */}
        <div className="p-4 border-b border-black/[0.04] bg-white/80 backdrop-blur-xl sticky top-0 z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-[#007AFF] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <BookOpen className="w-3.5 h-3.5" />
              </span>
              <h2 className="text-xl font-bold text-[#1D1D1F] tracking-tight">Design Journal</h2>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#86868B] bg-[#F5F5F7] px-2.5 py-0.5 rounded-full border border-black/[0.04]">
              {filteredArticles.length} ENTRIES
            </span>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868B]" />
            <input
              type="text"
              placeholder="Search essays, case notes, decisions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#F5F5F7] text-[12.5px] text-[#1D1D1F] placeholder-[#86868B] outline-none border border-black/[0.04] focus:border-[#007AFF]/40 focus:bg-white transition-all"
            />
          </div>

          {/* Filter Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-[#1D1D1F] text-white border-[#1D1D1F]'
                    : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article Cards Scroll List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {filteredArticles.map((art) => {
            const isSelected = selectedArticle?.id === art.id;
            return (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                onClick={() => handleSelect(art)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 relative group ${
                  isSelected
                    ? 'bg-[#007AFF]/10 border-[#007AFF]/30 shadow-xs'
                    : 'bg-white border-black/[0.05] hover:border-black/[0.1] hover:bg-[#F5F5F7]/60'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ color: art.color, background: `${art.color}15` }}
                    >
                      {art.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10.5px] font-mono text-[#86868B]">{art.date}</span>
                      <button 
                        onClick={(e) => toggleBookmark(art.id, e)}
                        className="text-[#86868B] hover:text-[#007AFF] transition-colors"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${bookmarked[art.id] ? 'fill-[#007AFF] text-[#007AFF]' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <h3 className={`text-[15px] font-bold tracking-tight leading-snug ${isSelected ? 'text-[#007AFF]' : 'text-[#1D1D1F] group-hover:text-[#007AFF]'} transition-colors`}>
                    {art.title}
                  </h3>

                  <p className="text-[12.5px] text-[#6E6E73] line-clamp-2 leading-relaxed font-normal">
                    {art.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10.5px] font-mono text-[#86868B] pt-1">
                  <span>{art.readTime}</span>
                  <span className="text-[#007AFF] font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Read Essay <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* RIGHT MAIN READER CANVAS */}
      <div className="flex-1 bg-[#F5F5F7] flex flex-col h-full overflow-hidden">
        {selectedArticle ? (
          <motion.div
            key={selectedArticle.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col overflow-y-auto"
          >
            {/* Editorial Sticky Header */}
            <div className="px-6 py-3.5 bg-white/80 backdrop-blur-xl border-b border-black/[0.05] sticky top-0 z-20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span 
                  className="text-[10.5px] font-mono font-bold uppercase tracking-wider px-3 py-0.5 rounded-full"
                  style={{ color: selectedArticle.color, background: `${selectedArticle.color}15` }}
                >
                  {selectedArticle.category}
                </span>
                <span className="text-[11px] font-mono text-[#86868B] hidden sm:inline">•</span>
                <span className="text-[11px] font-mono text-[#86868B] hidden sm:inline">{selectedArticle.readTime}</span>
              </div>

              {/* Font Size & Share Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-[#F5F5F7] p-1 rounded-xl border border-black/[0.04]">
                  <button 
                    onClick={() => setFontSize('small')}
                    className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-lg cursor-pointer ${fontSize === 'small' ? 'bg-white text-[#1D1D1F] shadow-xs' : 'text-[#86868B]'}`}
                  >
                    A-
                  </button>
                  <button 
                    onClick={() => setFontSize('normal')}
                    className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-lg cursor-pointer ${fontSize === 'normal' ? 'bg-white text-[#1D1D1F] shadow-xs' : 'text-[#86868B]'}`}
                  >
                    A
                  </button>
                  <button 
                    onClick={() => setFontSize('large')}
                    className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-lg cursor-pointer ${fontSize === 'large' ? 'bg-white text-[#1D1D1F] shadow-xs' : 'text-[#86868B]'}`}
                  >
                    A+
                  </button>
                </div>

                <button 
                  onClick={(e) => toggleLike(selectedArticle.id, e)}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${liked[selectedArticle.id] ? 'bg-rose-50 border-rose-200 text-rose-500' : 'bg-[#F5F5F7] border-black/[0.04] text-[#86868B] hover:text-[#1D1D1F]'}`}
                >
                  <Heart className={`w-3.5 h-3.5 ${liked[selectedArticle.id] ? 'fill-rose-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Main Article Sheet */}
            <div className="p-6 sm:p-10 lg:p-16 max-w-3xl mx-auto w-full space-y-8 flex-1">
              {/* Title & Metadata */}
              <div className="space-y-4">
                <h1 className="text-[28px] sm:text-[38px] font-extrabold text-[#1D1D1F] tracking-tight leading-[1.2]">
                  {selectedArticle.title}
                </h1>

                <div className="flex items-center gap-3 pt-1 border-b border-black/[0.06] pb-5">
                  <div className="w-10 h-10 rounded-full bg-[#007AFF] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    PK
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-[#1D1D1F] block leading-snug">{selectedArticle.author}</span>
                    <span className="text-[11px] font-mono text-[#86868B] block">{selectedArticle.authorRole} · {selectedArticle.date}</span>
                  </div>
                </div>
              </div>

              {/* Summary Lead Box */}
              <div className="p-5 rounded-2xl bg-white border border-black/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border-l-4" style={{ borderLeftColor: selectedArticle.color }}>
                <p className="text-[15px] sm:text-[16px] text-[#334155] leading-relaxed font-semibold">
                  {selectedArticle.summary}
                </p>
              </div>

              {/* Article Content Paragraphs */}
              <div className={`space-y-8 text-[#334155] font-normal leading-[1.8] ${fontSize === 'small' ? 'text-[14px]' : fontSize === 'large' ? 'text-[17px]' : 'text-[15.5px]'}`}>
                {selectedArticle.content.map((sec, i) => (
                  <div key={i} className="space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1D1D1F] tracking-tight">{sec.heading}</h3>
                    <p className="leading-relaxed">{sec.body}</p>
                  </div>
                ))}
              </div>

              {/* Article Footer Sign-off */}
              <div className="pt-8 border-t border-black/[0.06] flex items-center justify-between text-[12px] font-mono text-[#86868B]">
                <span>Published in Design Journal</span>
                <span>Praveen Kumar · Product Design</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <BookOpen className="w-12 h-12 text-[#86868B] mb-3" />
            <h3 className="text-lg font-bold text-[#1D1D1F]">Select an Essay</h3>
            <p className="text-[13px] text-[#86868B] max-w-sm mt-1">Choose an entry from the left sidebar to read case notes, product decisions, and UX essays.</p>
          </div>
        )}
      </div>

    </div>
  );
}
