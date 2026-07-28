import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const interests = [
  {
    id: 1,
    name: 'Music Production',
    color: 'bg-amber-500',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    description: 'Experimenting with synths and beats to create electronic soundscapes. Constantly exploring new plugins and sound design techniques.',
    tags: ['Ableton Live', 'Sound Design', 'Synthesizers']
  },
  {
    id: 2,
    name: 'Street Photography',
    color: 'bg-sky-500',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    description: 'Capturing candid moments and urban geometry. I love finding extraordinary stories in ordinary everyday scenes.',
    tags: ['Fujifilm', 'Urban', 'Black & White']
  },
  {
    id: 3,
    name: 'Gaming & Game Design',
    color: 'bg-violet-500',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11h.01M19 11h.01M17 9h.01M17 13h.01M11 15H7m2 2v-4m-6-3a9 9 0 0118 0c0 4.97-4.03 9-9 9s-9-4.03-9-9z" />
      </svg>
    ),
    description: 'Deep diving into game mechanics, narrative structures, and player psychology. Fascinated by interactive storytelling.',
    tags: ['Indie Games', 'Level Design', 'RPG']
  },
  {
    id: 4,
    name: 'Reading & Writing',
    color: 'bg-emerald-500',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    description: 'Devouring sci-fi, fantasy, and non-fiction. Occasional writer of short stories and tech articles.',
    tags: ['Sci-Fi', 'Non-fiction', 'Blogging']
  },
  {
    id: 5,
    name: 'Fitness & Wellness',
    color: 'bg-rose-500',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4v4H3v-4zm14 0h4v4h-4v-4zm-8 2h6" />
      </svg>
    ),
    description: 'Staying active through weightlifting, yoga, and outdoor running. Believer in a healthy body for a healthy mind.',
    tags: ['Weightlifting', 'Yoga', 'Nutrition']
  },
  {
    id: 6,
    name: 'Travel & Culture',
    color: 'bg-indigo-500',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    description: 'Exploring new cities, cuisines, and cultures. Always planning the next adventure to expand my worldview.',
    tags: ['Backpacking', 'Foodie', 'Languages']
  },
  {
    id: 7,
    name: 'Cinema & Filmmaking',
    color: 'bg-orange-500',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    ),
    description: 'Analyzing cinematography, directing styles, and screenplays. I appreciate indie films and classic cinema.',
    tags: ['Cinematography', 'Indie Films', 'Screenwriting']
  },
  {
    id: 8,
    name: 'AI & Machine Learning',
    color: 'bg-cyan-500',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    description: 'Fascinated by the rapidly evolving AI landscape. Exploring prompt engineering and generative models.',
    tags: ['LLMs', 'Generative AI', 'Prompt Eng']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24
    }
  }
};

export default function InterestsApp() {
  return (
    <div className="w-full h-full bg-[#F5F5F7] overflow-y-auto p-4 sm:p-6 md:p-8" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F]">
              Core Interests
            </h1>
            <span className="px-3 py-1 rounded-full bg-[#E8E8ED] text-[#6E6E73] text-sm font-medium flex items-center justify-center">
              {interests.length} Total
            </span>
          </div>
          <p className="text-[#86868B] text-base">
            Things that fuel my creative energy
          </p>
        </div>

        {/* Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {interests.map((interest) => (
              <motion.div
                key={interest.id}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                className="group cursor-pointer bg-white border border-black/[0.04] rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-black/[0.08] transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${interest.color}`}>
                    {interest.icon}
                  </div>
                  <h3 className="font-semibold text-[#1D1D1F] text-lg">
                    {interest.name}
                  </h3>
                </div>
                
                <p className="text-[#6E6E73] text-sm leading-relaxed mb-6 flex-grow">
                  {interest.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {interest.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-2.5 py-1 rounded-full bg-[#F5F5F7] text-[#6E6E73] text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="h-4"></div>
      </div>
    </div>
  );
}
