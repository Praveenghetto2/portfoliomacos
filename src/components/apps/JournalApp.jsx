import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const articles = [
  {
    id: 1,
    title: 'Why I Killed a Feature Users Asked For',
    category: 'Design Decision',
    readTime: '8 min read',
    date: 'Jun 2025',
    description: 'How contextual inquiry disproved our dashboard customization hypothesis and why saying no was the hardest design decision.',
    color: 'amber'
  },
  {
    id: 2,
    title: 'The Information Architecture Nobody Sees',
    category: 'Systems Design',
    readTime: '12 min read',
    date: 'Apr 2025',
    description: 'Reducing 28 navigation items to 15 — the invisible work that makes everything else possible.',
    color: 'blue'
  },
  {
    id: 3,
    title: 'Designing for Trust, Not Just Speed',
    category: 'UX Research',
    readTime: '6 min read',
    date: 'Feb 2025',
    description: 'Why adding context to raw metrics improved user confidence scores more than making the interface faster.',
    color: 'green'
  },
  {
    id: 4,
    title: 'From Figma Tokens to Production CSS',
    category: 'Engineering',
    readTime: '10 min read',
    date: 'Dec 2024',
    description: 'Building a design-to-code pipeline that actually works for a 3-person engineering team.',
    color: 'violet'
  },
  {
    id: 5,
    title: 'AI as Co-Pilot: Lessons from Revlitix',
    category: 'Product Strategy',
    readTime: '7 min read',
    date: 'Oct 2024',
    description: 'What happened when we moved AI insights from a hidden tab to the primary viewport.',
    color: 'rose'
  }
];

const getColorClasses = (color) => {
  const map = {
    amber: 'bg-amber-100 text-amber-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    violet: 'bg-violet-100 text-violet-700',
    rose: 'bg-rose-100 text-rose-700'
  };
  return map[color] || 'bg-gray-100 text-gray-700';
};

export default function JournalApp({ selectedNote, onSelectNote }) {
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    if (selectedNote) {
      const article = articles.find(a => a.id === selectedNote.id || a.title === selectedNote.title);
      if (article) {
        setSelectedArticle(article);
      }
    }
  }, [selectedNote]);

  const handleSelect = (article) => {
    setSelectedArticle(article);
    if (onSelectNote) {
      onSelectNote(article);
    }
  };

  return (
    <div className="flex h-full w-full bg-[#F5F5F7] text-slate-800 font-body overflow-hidden">
      {/* Left List Panel */}
      <div className={`flex flex-col border-r border-slate-200/60 transition-all duration-300 ${selectedArticle ? 'hidden md:flex md:w-[40%]' : 'w-full md:w-[40%]'}`}>
        <div className="p-4 border-b border-slate-200/60 sticky top-0 bg-[#F5F5F7]/80 backdrop-blur-md z-10">
          <h2 className="font-display font-bold text-xl text-slate-900">Journal</h2>
          <p className="text-xs text-slate-500 mt-1 font-mono">5 ENTRIES</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -2 }}
              onClick={() => handleSelect(article)}
              className={`group cursor-pointer p-5 rounded-2xl border transition-all duration-200 hover:shadow-md hover:border-black/[0.08] bg-white ${
                selectedArticle?.id === article.id ? 'ring-2 ring-[#007AFF] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border-transparent' : 'border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${getColorClasses(article.color)}`}>
                  {article.category}
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  {article.date} • {article.readTime}
                </span>
              </div>
              <h3 className="font-display font-bold text-slate-900 group-hover:text-[#007AFF] transition-colors mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                {article.description}
              </p>
              
              <div className="mt-3 flex items-center text-xs font-medium text-[#007AFF] opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                Read article
                <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Reader Panel */}
      <div className={`flex-1 flex flex-col bg-white overflow-hidden ${selectedArticle ? 'flex' : 'hidden md:flex'}`}>
        <AnimatePresence mode="wait">
          {selectedArticle ? (
            <motion.div
              key="reader"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col overflow-y-auto"
            >
              <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 p-4 flex items-center justify-between z-10">
                <button 
                  onClick={() => handleSelect(null)}
                  className="md:hidden flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <div className="hidden md:flex items-center space-x-2">
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${getColorClasses(selectedArticle.color)}`}>
                    {selectedArticle.category}
                  </span>
                </div>
                <button 
                  onClick={() => handleSelect(null)}
                  className="hidden md:flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Close article"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-8 md:p-12 max-w-3xl mx-auto w-full">
                <div className="mb-8">
                  <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mb-4 leading-tight">
                    {selectedArticle.title}
                  </h1>
                  <div className="flex flex-wrap items-center text-sm font-mono text-slate-500 gap-3">
                    <span className="md:hidden px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] uppercase font-sans font-bold">
                      {selectedArticle.category}
                    </span>
                    <span>{selectedArticle.date}</span>
                    <span>•</span>
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>
                
                <div className="prose prose-slate max-w-none">
                  <p className="text-lg text-slate-700 leading-relaxed font-medium mb-6">
                    {selectedArticle.description}
                  </p>
                  
                  <div className="h-px w-16 bg-slate-200 my-8"></div>
                  
                  <p className="text-slate-600 leading-relaxed mb-4">
                    This is a preview of the article. The full content would go here, expanding on the concepts mentioned in the description. In a production environment, this content might be loaded from a CMS or markdown files.
                  </p>
                  
                  <p className="text-slate-600 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50"
            >
              <div className="text-slate-400 mb-6 transition-all duration-500 hover:text-[#007AFF] hover:scale-110">
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl text-slate-800 mb-2">
                Select an article to read
              </h3>
              <p className="text-slate-500 max-w-sm">
                Explore thoughts on design decisions, information architecture, UX research, and product strategy.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
